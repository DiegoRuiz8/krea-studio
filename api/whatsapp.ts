import { waitUntil } from "@vercel/functions";
import { callGemini, type GeminiMessage } from "./_lib/gemini.js";
import { markAsRead, sendText, verifySignature } from "./_lib/whatsapp.js";
import { DAILY_LIMIT, appendHistory, countMessage, getHistory, isDuplicate, isPaused, pause } from "./_lib/store.js";
import {
  ERROR_REPLY,
  HANDOFF_MARKER,
  HANDOFF_REPLY,
  LIMIT_REPLY,
  TEXT_ONLY_REPLY,
  buildSystemPrompt,
} from "./_lib/prompt.js";

const MAX_MESSAGE_LENGTH = 1000;
const HANDOFF_KEYWORDS = /\b(humano|asesor|persona real|hablar con alguien)\b/i;

interface IncomingMessage {
  from: string;
  id: string;
  type: string;
  text?: { body: string };
}

interface WebhookPayload {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      field?: string;
      value?: {
        metadata?: { phone_number_id?: string };
        contacts?: Array<{ wa_id: string; profile?: { name?: string } }>;
        messages?: IncomingMessage[];
      };
    }>;
  }>;
}

interface InboundMessage {
  message: IncomingMessage;
  contactName?: string;
}

function log(event: Record<string, unknown>) {
  console.log("[WA_BOT]", JSON.stringify({ ts: new Date().toISOString(), ...event }));
}

function extractMessages(payload: WebhookPayload): InboundMessage[] {
  const ownPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const inbound: InboundMessage[] = [];

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value;
      if (change.field !== "messages" || !value?.messages) continue;
      if (value.metadata?.phone_number_id !== ownPhoneId) continue;

      for (const message of value.messages) {
        const contactName = value.contacts?.find((c) => c.wa_id === message.from)?.profile?.name;
        inbound.push({ message, contactName });
      }
    }
  }
  return inbound;
}

async function replyWithGemini(waId: string, text: string, contactName?: string): Promise<string> {
  const history = await getHistory(waId);
  const userMessage: GeminiMessage = { role: "user", text };
  const raw = await callGemini(buildSystemPrompt(contactName), [...history, userMessage]);

  const wantsHuman = raw.includes(HANDOFF_MARKER);
  const reply = raw.replaceAll(HANDOFF_MARKER, "").trim() || HANDOFF_REPLY;

  await appendHistory(waId, userMessage, { role: "model", text: reply });
  if (wantsHuman) {
    await pause(waId);
    log({ event: "handoff", waId, contactName, reason: "gemini" });
  }
  return reply;
}

async function handleMessage({ message, contactName }: InboundMessage): Promise<void> {
  const waId = message.from;

  if (await isDuplicate(message.id)) return;
  if (await isPaused(waId)) {
    log({ event: "paused_skip", waId });
    return;
  }

  const count = await countMessage(waId);
  if (count > DAILY_LIMIT) {
    if (count === DAILY_LIMIT + 1) await sendText(waId, LIMIT_REPLY);
    log({ event: "rate_limited", waId, count });
    return;
  }

  await markAsRead(message.id).catch((err: Error) => log({ event: "mark_read_error", error: err.message }));

  if (message.type !== "text" || !message.text?.body) {
    await sendText(waId, TEXT_ONLY_REPLY);
    return;
  }

  const text = message.text.body.slice(0, MAX_MESSAGE_LENGTH);

  if (HANDOFF_KEYWORDS.test(text)) {
    await pause(waId);
    await sendText(waId, HANDOFF_REPLY);
    log({ event: "handoff", waId, contactName, reason: "keyword" });
    return;
  }

  try {
    const reply = await replyWithGemini(waId, text, contactName);
    await sendText(waId, reply);
    log({ event: "reply_ok", waId, length: reply.length });
  } catch (err) {
    log({ event: "reply_error", waId, error: (err as Error).message });
    await sendText(waId, ERROR_REPLY).catch((sendErr: Error) =>
      log({ event: "error_reply_failed", waId, error: sendErr.message }),
    );
  }
}

/** Verificación del webhook que hace Meta al registrarlo. */
export function GET(request: Request): Response {
  const params = new URL(request.url).searchParams;
  const mode = params.get("hub.mode");
  const token = params.get("hub.verify_token");
  const challenge = params.get("hub.challenge");

  if (mode === "subscribe" && token && token === process.env.WHATSAPP_VERIFY_TOKEN && challenge) {
    return new Response(challenge, { status: 200 });
  }
  return new Response("Forbidden", { status: 403 });
}

export async function POST(request: Request): Promise<Response> {
  const rawBody = await request.text();

  if (!verifySignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    log({ event: "invalid_signature" });
    return new Response("Unauthorized", { status: 401 });
  }

  let payload: WebhookPayload;
  try {
    payload = JSON.parse(rawBody) as WebhookPayload;
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  // Meta exige un 200 rápido; si tarda, reintenta y duplica mensajes.
  const work = Promise.all(
    extractMessages(payload).map((inbound) =>
      handleMessage(inbound).catch((err: Error) => log({ event: "handle_error", error: err.message })),
    ),
  );
  waitUntil(work);

  return new Response("EVENT_RECEIVED", { status: 200 });
}
