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

// Alias oficial que siempre apunta al flash vigente: evita roturas cuando
// Google retira una versión fija.
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export class GeminiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "GeminiError";
    this.status = status;
  }
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

  let res: Response;
  try {
    res = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify(body),
    });
  } catch (err) {
    throw new GeminiError(`No se pudo conectar con Gemini: ${(err as Error).message}`);
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new GeminiError(`Gemini respondió ${res.status}: ${errText.slice(0, 300)}`, res.status);
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
