import { randomBytes } from "node:crypto";

const TRACK_LOOKUP_WINDOW_MS = 10 * 60 * 1000;
const TRACK_LOOKUP_MAX = 10;
const TRACK_LOOKUP_MAP_CAP = 2_000;
const TRACK_GRANT_TTL_MS = 5 * 60 * 1000;
const TRACK_GRANT_MAP_CAP = 2_000;

export const TRACK_LOOKUP_GRANT_COOKIE = "hacien_track_grant";

export const TRACK_LOOKUP_GENERIC_MESSAGE =
  "Reference not found or the request could not be completed. Check the number, complete the security check, and try again later.";

type RateLimitEntry = {
  count: number;
  resetAt: number;
  touchedAt: number;
};

type GrantEntry = {
  referenceNumber: string;
  expiresAt: number;
  touchedAt: number;
};

type HeaderReader = {
  get(name: string): string | null;
};

const rateLimitMap = new Map<string, RateLimitEntry>();
const grantMap = new Map<string, GrantEntry>();

function evictOldest<T extends { touchedAt: number }>(map: Map<string, T>, cap: number) {
  while (map.size > cap) {
    let oldestKey: string | null = null;
    let oldestTouched = Number.POSITIVE_INFINITY;
    for (const [key, entry] of map) {
      if (entry.touchedAt < oldestTouched) {
        oldestTouched = entry.touchedAt;
        oldestKey = key;
      }
    }
    if (!oldestKey) break;
    map.delete(oldestKey);
  }
}

/** First x-forwarded-for hop, else `unknown`. Never log the value. */
export function getTrackLookupClientIp(headerStore: HeaderReader): string {
  const forwarded = headerStore.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return "unknown";
}

/**
 * Fixed-window per-IP limiter. Over-limit returns false.
 * Map is capped; oldest touched entries are evicted.
 */
export function consumeTrackLookupRateLimit(
  ip: string,
  now = Date.now(),
  store: Map<string, RateLimitEntry> = rateLimitMap,
): { allowed: boolean } {
  const key = ip || "unknown";
  const existing = store.get(key);

  if (!existing || now > existing.resetAt) {
    store.set(key, {
      count: 1,
      resetAt: now + TRACK_LOOKUP_WINDOW_MS,
      touchedAt: now,
    });
    evictOldest(store, TRACK_LOOKUP_MAP_CAP);
    return { allowed: true };
  }

  existing.touchedAt = now;
  if (existing.count >= TRACK_LOOKUP_MAX) {
    store.set(key, existing);
    return { allowed: false };
  }

  existing.count += 1;
  store.set(key, existing);
  evictOldest(store, TRACK_LOOKUP_MAP_CAP);
  return { allowed: true };
}

/** Test helper: isolated limiter with injectable clock/map. */
export function createTrackLookupRateLimiterForTests(options?: {
  max?: number;
  windowMs?: number;
  maxEntries?: number;
}) {
  const max = options?.max ?? TRACK_LOOKUP_MAX;
  const windowMs = options?.windowMs ?? TRACK_LOOKUP_WINDOW_MS;
  const maxEntries = options?.maxEntries ?? TRACK_LOOKUP_MAP_CAP;
  const store = new Map<string, RateLimitEntry>();

  return {
    consume(ip: string, now = Date.now()): { allowed: boolean } {
      const key = ip || "unknown";
      const existing = store.get(key);
      if (!existing || now > existing.resetAt) {
        store.set(key, { count: 1, resetAt: now + windowMs, touchedAt: now });
        evictOldest(store, maxEntries);
        return { allowed: true };
      }
      existing.touchedAt = now;
      if (existing.count >= max) {
        store.set(key, existing);
        return { allowed: false };
      }
      existing.count += 1;
      store.set(key, existing);
      evictOldest(store, maxEntries);
      return { allowed: true };
    },
    get size() {
      return store.size;
    },
  };
}

async function siteverifyTurnstile(token: string, secret: string): Promise<boolean> {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
  });

  if (!response.ok) return false;
  const body = (await response.json().catch(() => null)) as { success?: boolean } | null;
  return Boolean(body?.success);
}

/**
 * Turnstile check using existing env names only.
 * - If TURNSTILE_SITE_KEY is unset: allow (widget not configured).
 * - If set: require a non-empty token.
 * - If TURNSTILE_SECRET_KEY is also set: Cloudflare siteverify.
 * - If site key set but secret missing: token presence only (CTO must confirm secret for website verify).
 */
type EnvReader = Record<string, string | undefined>;

export async function verifyTrackLookupTurnstile(
  token: string | null | undefined,
  env: EnvReader = process.env,
): Promise<{ ok: boolean }> {
  const siteKey = String(env.TURNSTILE_SITE_KEY || "").trim();
  if (!siteKey) return { ok: true };

  const trimmed = String(token || "").trim();
  if (!trimmed) return { ok: false };

  const secret = String(env.TURNSTILE_SECRET_KEY || "").trim();
  if (!secret) {
    return { ok: true };
  }

  try {
    const ok = await siteverifyTurnstile(trimmed, secret);
    return { ok };
  } catch {
    return { ok: false };
  }
}

export async function assertTrackLookupAllowed(options: {
  token?: string | null;
  ip: string;
  now?: number;
  env?: EnvReader;
}): Promise<{ ok: true } | { ok: false; reason: "rate_limited" | "turnstile" }> {
  const rate = consumeTrackLookupRateLimit(options.ip, options.now);
  if (!rate.allowed) {
    return { ok: false, reason: "rate_limited" };
  }

  const turnstile = await verifyTrackLookupTurnstile(options.token, options.env);
  if (!turnstile.ok) {
    return { ok: false, reason: "turnstile" };
  }

  return { ok: true };
}

export function issueTrackLookupGrant(
  referenceNumber: string,
  now = Date.now(),
  store: Map<string, GrantEntry> = grantMap,
): string {
  const id = randomBytes(18).toString("hex");
  store.set(id, {
    referenceNumber,
    expiresAt: now + TRACK_GRANT_TTL_MS,
    touchedAt: now,
  });
  evictOldest(store, TRACK_GRANT_MAP_CAP);
  return id;
}

/** Returns true when the grant matches this reference and is still valid. */
export function hasValidTrackLookupGrant(
  grantId: string | undefined | null,
  referenceNumber: string,
  now = Date.now(),
  store: Map<string, GrantEntry> = grantMap,
): boolean {
  if (!grantId) return false;
  const entry = store.get(grantId);
  if (!entry) return false;
  if (now > entry.expiresAt) {
    store.delete(grantId);
    return false;
  }
  if (entry.referenceNumber !== referenceNumber) return false;
  entry.touchedAt = now;
  store.set(grantId, entry);
  return true;
}

/** Test-only: clear module maps between cases. */
export function resetTrackLookupGuardStoresForTests() {
  rateLimitMap.clear();
  grantMap.clear();
}
