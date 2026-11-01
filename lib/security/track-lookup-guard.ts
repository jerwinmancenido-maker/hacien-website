import { createHmac, hkdfSync, timingSafeEqual } from "node:crypto";

const TRACK_LOOKUP_WINDOW_MS = 10 * 60 * 1000;
const TRACK_LOOKUP_MAX = 10;
const TRACK_LOOKUP_MAP_CAP = 2_000;
const TRACK_GRANT_TTL_MS = 300_000;
const TRACK_GRANT_HKDF_LABEL = "hacien-track-grant-v1";

export const TRACK_LOOKUP_GRANT_COOKIE = "hacien_track_grant";

export const TRACK_LOOKUP_GENERIC_MESSAGE =
  "Reference not found or the request could not be completed. Check the number, complete the security check, and try again later.";

type RateLimitEntry = {
  count: number;
  resetAt: number;
  touchedAt: number;
};

type EnvReader = Record<string, string | undefined>;

/**
 * Best-effort per-process fixed-window limiter. Multi-instance deployments do
 * not share this Map; Turnstile siteverify is the real cross-process gate.
 */
const rateLimitMap = new Map<string, RateLimitEntry>();

function evictOldest(map: Map<string, RateLimitEntry>, cap: number) {
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
 * - If site key is set but TURNSTILE_SECRET_KEY is missing: fail closed.
 * - If both are set: require token + Cloudflare siteverify.
 */
export async function verifyTrackLookupTurnstile(
  token: string | null | undefined,
  env: EnvReader = process.env,
): Promise<{ ok: boolean }> {
  const siteKey = String(env.TURNSTILE_SITE_KEY || "").trim();
  if (!siteKey) return { ok: true };

  const secret = String(env.TURNSTILE_SECRET_KEY || "").trim();
  if (!secret) return { ok: false };

  const trimmed = String(token || "").trim();
  if (!trimmed) return { ok: false };

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

function deriveTrackGrantKey(secret: string): Buffer {
  return Buffer.from(hkdfSync("sha256", secret, "", TRACK_GRANT_HKDF_LABEL, 32));
}

function signTrackGrantPayload(payload: string, secret: string): string {
  const key = deriveTrackGrantKey(secret);
  return createHmac("sha256", key).update(payload).digest("base64url");
}

function safeEqualBase64Url(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Stateless signed grant cookie: HMAC-SHA256(ref + expiry), key via HKDF from TURNSTILE_SECRET_KEY. */
export function issueTrackLookupGrant(
  referenceNumber: string,
  secret: string,
  now = Date.now(),
): string | null {
  const trimmedSecret = String(secret || "").trim();
  if (!trimmedSecret || !referenceNumber) return null;

  const expiresAt = now + TRACK_GRANT_TTL_MS;
  const payload = `${referenceNumber}.${expiresAt}`;
  const mac = signTrackGrantPayload(payload, trimmedSecret);
  const refPart = Buffer.from(referenceNumber, "utf8").toString("base64url");
  return `${refPart}.${expiresAt}.${mac}`;
}

/** Returns true when the signed cookie matches this reference, is unexpired, and MAC verifies. */
export function hasValidTrackLookupGrant(
  cookieValue: string | undefined | null,
  referenceNumber: string,
  secret: string,
  now = Date.now(),
): boolean {
  const trimmedSecret = String(secret || "").trim();
  if (!cookieValue || !trimmedSecret || !referenceNumber) return false;

  const parts = cookieValue.split(".");
  if (parts.length !== 3) return false;

  const [refPart, expiresRaw, mac] = parts;
  if (!refPart || !expiresRaw || !mac) return false;

  let cookieReference: string;
  try {
    cookieReference = Buffer.from(refPart, "base64url").toString("utf8");
  } catch {
    return false;
  }

  if (cookieReference !== referenceNumber) return false;

  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || now > expiresAt) return false;

  const payload = `${cookieReference}.${expiresAt}`;
  const expected = signTrackGrantPayload(payload, trimmedSecret);
  return safeEqualBase64Url(mac, expected);
}

/** Test-only: clear module rate-limit map between cases. */
export function resetTrackLookupGuardStoresForTests() {
  rateLimitMap.clear();
}
