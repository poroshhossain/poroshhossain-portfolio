/**
 * Minimal in-memory rate limiter for the contact form.
 *
 * Notes & limits:
 * - State lives per server instance and resets on deploy/restart, which is
 *   appropriate for a single-instance portfolio. For multi-instance
 *   deployments, swap this for a durable store (e.g. Upstash/Redis).
 */
const hits = new Map<string, number[]>();

export type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

export function checkRateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  const window = (hits.get(key) ?? []).filter((ts) => now - ts < windowMs);
  if (window.length >= limit) {
    const oldest = Math.min(...window);
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((windowMs - (now - oldest)) / 1000),
    };
  }
  window.push(now);
  hits.set(key, window);

  // Amortized cleanup: drop keys whose whole window has expired.
  if (hits.size > 1000) {
    for (const [k, timestamps] of hits) {
      if (timestamps.every((ts) => now - ts >= windowMs)) {
        hits.delete(k);
      }
    }
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
