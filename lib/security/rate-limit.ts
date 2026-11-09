import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * 5 messages per IP per 10 minutes.
 *
 * With UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN set (free Upstash
 * Redis, or the Vercel marketplace integration), the limit is shared across
 * every serverless instance. Without them it falls back to an in-memory
 * limiter, which is per-instance and only a best effort.
 */
const LIMIT = Number(process.env.CONTACT_RATE_LIMIT ?? 5);
const WINDOW_MS = 10 * 60 * 1000;

const upstash =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(LIMIT, "10 m"),
        prefix: "portfolio:contact",
        analytics: false,
      })
    : null;

const memory = new Map<string, number[]>();

export async function isRateLimited(key: string): Promise<boolean> {
  if (upstash) {
    try {
      const { success } = await upstash.limit(key);

      return !success;
    } catch (err) {
      // Never block real visitors because the limiter is unreachable
      // eslint-disable-next-line no-console
      console.error("rate-limit: upstash error, allowing request", err);

      return false;
    }
  }

  const now = Date.now();
  const recent = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  recent.push(now);
  memory.set(key, recent);

  return recent.length > LIMIT;
}

export const rateLimitBackend = () => (upstash ? "upstash" : "memory");
