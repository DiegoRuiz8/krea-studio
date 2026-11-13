import { createHmac, timingSafeEqual } from "node:crypto";

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || "v23.0";

export class WhatsAppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WhatsAppError";
  }
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new WhatsAppError(`${name} no está configurada.`);
  return value;
}

async function postToGraph(payload: Record<string, unknown>): Promise<void> {
  const phoneNumberId = requireEnv("WHATSAPP_PHONE_NUMBER_ID");
  const token = requireEnv("WHATSAPP_TOKEN");

  const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ messaging_product: "whatsapp", ...payload }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new WhatsAppError(`Graph API respondió ${res.status}: ${errText.slice(0, 300)}`);
  }
}

/**
 * Meta entrega los móviles de México como 521 + 10 dígitos, pero la lista de
 * destinatarios del número de prueba los guarda como 52 + 10 dígitos y rechaza
 * el formato con el 1 (error 131030). Para enviar se usa el formato sin el 1.
 */
export function toSendFormat(waId: string): string {
  return waId.replace(/^521(\d{10})$/, "52$1");
}

export function sendText(to: string, body: string): Promise<void> {
  return postToGraph({
    recipient_type: "individual",
    to: toSendFormat(to),
    type: "text",
    text: { body, preview_url: false },
  });
}

export function markAsRead(messageId: string): Promise<void> {
  return postToGraph({ status: "read", message_id: messageId });
}

/** Valida X-Hub-Signature-256 (HMAC-SHA256 del body crudo con el App Secret). */
export function verifySignature(rawBody: string, header: string | null): boolean {
  const secret = process.env.META_APP_SECRET;
  if (!secret || !header) return false;

  const expected = `sha256=${createHmac("sha256", secret).update(rawBody, "utf8").digest("hex")}`;
  const a = Buffer.from(expected);
  const b = Buffer.from(header);
  return a.length === b.length && timingSafeEqual(a, b);
}
