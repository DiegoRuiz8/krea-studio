import { Redis } from "@upstash/redis";
import type { GeminiMessage } from "./gemini.js";

const DAY_SECONDS = 60 * 60 * 24;
const MAX_HISTORY = 20; // mensajes (≈10 turnos)
export const DAILY_LIMIT = 30;

// La integración de Upstash en el Marketplace de Vercel inyecta KV_REST_API_*;
// una base creada directo en Upstash usa UPSTASH_REDIS_REST_*.
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL ?? "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN ?? "",
});

const keys = {
  message: (id: string) => `wa:msg:${id}`,
  history: (waId: string) => `wa:hist:${waId}`,
  paused: (waId: string) => `wa:pause:${waId}`,
  usage: (waId: string) => `wa:rl:${waId}:${new Date().toISOString().slice(0, 10)}`,
};

/** Meta reintenta webhooks; true si este message.id ya se procesó. */
export async function isDuplicate(messageId: string): Promise<boolean> {
  const result = await redis.set(keys.message(messageId), 1, { nx: true, ex: DAY_SECONDS });
  return result === null;
}

export async function getHistory(waId: string): Promise<GeminiMessage[]> {
  return redis.lrange<GeminiMessage>(keys.history(waId), 0, -1);
}

export async function appendHistory(waId: string, ...messages: GeminiMessage[]): Promise<void> {
  const key = keys.history(waId);
  await redis
    .pipeline()
    .rpush(key, ...messages)
    .ltrim(key, -MAX_HISTORY, -1)
    .expire(key, DAY_SECONDS)
    .exec();
}

export async function pause(waId: string): Promise<void> {
  await redis.set(keys.paused(waId), 1, { ex: DAY_SECONDS });
}

export async function isPaused(waId: string): Promise<boolean> {
  return (await redis.exists(keys.paused(waId))) === 1;
}

/** Cuenta el mensaje y devuelve cuántos lleva hoy este número. */
export async function countMessage(waId: string): Promise<number> {
  const key = keys.usage(waId);
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, DAY_SECONDS);
  return count;
}
