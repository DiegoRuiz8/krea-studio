// Helper mínimo para la REST API de Gemini (Google AI Studio), sin SDK.
// Basado en el de espaxio-web/src/lib/gemini.ts.

export type GeminiRole = "user" | "model";

export interface GeminiMessage {
  role: GeminiRole;
  text: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
}

// Alias oficiales que siempre apuntan al modelo vigente: evitan roturas cuando
// Google retira una versión fija. Si el principal está saturado, se prueba el
// de respaldo (más ligero y con otra cuota de capacidad).
const PRIMARY_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const FALLBACK_MODEL = process.env.GEMINI_FALLBACK_MODEL || "gemini-flash-lite-latest";

const ATTEMPTS_PER_MODEL = 2;
const RETRY_DELAY_MS = 1_500;
const REQUEST_TIMEOUT_MS = 15_000;
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

export class GeminiError extends Error {
  status?: number;
  retryable: boolean;
  constructor(message: string, status?: number, retryable = false) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
    this.retryable = retryable;
  }
}

const modelUrl = (model: string) => `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function requestModel(model: string, apiKey: string, body: unknown): Promise<string> {
  let res: Response;
  try {
    res = await fetch(modelUrl(model), {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (err) {
    throw new GeminiError(`No se pudo conectar con Gemini (${model}): ${(err as Error).message}`, undefined, true);
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new GeminiError(
      `Gemini (${model}) respondió ${res.status}: ${errText.slice(0, 300)}`,
      res.status,
      RETRYABLE_STATUS.has(res.status),
    );
  }

  const data = (await res.json()) as GeminiResponse;

  if (data.promptFeedback?.blockReason) {
    throw new GeminiError(`Gemini bloqueó la respuesta: ${data.promptFeedback.blockReason}`);
  }

  const text = data.candidates?.[0]?.content?.parts
    ?.map((p) => p.text || "")
    .join("")
    .trim();

  if (!text) throw new GeminiError("Gemini devolvió una respuesta vacía.");
  return text;
}

export async function callGemini(systemInstruction: string, history: GeminiMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new GeminiError("GEMINI_API_KEY no está configurada.");

  const body = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: history.map((m) => ({ role: m.role, parts: [{ text: m.text }] })),
    generationConfig: {
      temperature: 0.4,
      // El modelo "-latest" gasta presupuesto en "thinking" antes de la
      // respuesta visible; con menos de ~1024 corta el texto a la mitad.
      maxOutputTokens: 1024,
    },
  };

  let lastError = new GeminiError("Gemini no respondió.");

  for (const model of new Set([PRIMARY_MODEL, FALLBACK_MODEL])) {
    for (let attempt = 1; attempt <= ATTEMPTS_PER_MODEL; attempt++) {
      try {
        return await requestModel(model, apiKey, body);
      } catch (err) {
        if (!(err instanceof GeminiError)) throw err;
        lastError = err;
        if (!err.retryable) break;
        if (attempt < ATTEMPTS_PER_MODEL) await sleep(RETRY_DELAY_MS);
      }
    }
  }

  throw lastError;
}
