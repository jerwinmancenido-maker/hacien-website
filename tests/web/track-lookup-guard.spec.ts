import { afterEach, describe, expect, it, vi } from "vitest";
import { getClientIp } from "@/lib/security/client-ip";
import {
  assertTrackLookupAllowed,
  consumeTrackLookupRateLimit,
  createTrackLookupRateLimiterForTests,
  hasValidTrackLookupGrant,
  issueTrackLookupGrant,
  resetTrackLookupGuardStoresForTests,
  verifyTrackLookupTurnstile,
  type TrackLookupRateLimitEntry,
} from "@/lib/security/track-lookup-guard";

const FAKE_SECRET = "1x0000000000000000000000000000000AA";

afterEach(() => {
  resetTrackLookupGuardStoresForTests();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("track lookup rate limit (b)", () => {
  it("allows up to the window max then blocks via production consumeTrackLookupRateLimit", () => {
    const limiter = createTrackLookupRateLimiterForTests({ max: 3, windowMs: 60_000 });
    expect(limiter.consume("203.0.113.10").allowed).toBe(true);
    expect(limiter.consume("203.0.113.10").allowed).toBe(true);
    expect(limiter.consume("203.0.113.10").allowed).toBe(true);
    expect(limiter.consume("203.0.113.10").allowed).toBe(false);
  });

  it("resets after the fixed window", () => {
    const limiter = createTrackLookupRateLimiterForTests({ max: 1, windowMs: 1_000 });
    const start = 1_000_000;
    expect(limiter.consume("198.51.100.2", start).allowed).toBe(true);
    expect(limiter.consume("198.51.100.2", start + 10).allowed).toBe(false);
    expect(limiter.consume("198.51.100.2", start + 1_001).allowed).toBe(true);
  });

  it("evicts oldest entries when the map is capped", () => {
    const limiter = createTrackLookupRateLimiterForTests({ max: 1, windowMs: 60_000, maxEntries: 2 });
    expect(limiter.consume("10.0.0.1", 100).allowed).toBe(true);
    expect(limiter.consume("10.0.0.2", 200).allowed).toBe(true);
    expect(limiter.size).toBe(2);
    expect(limiter.consume("10.0.0.3", 300).allowed).toBe(true);
    expect(limiter.size).toBe(2);
  });

  it("puts spoofed leftmost XFF into the same rate-limit bucket as the trusted hop", () => {
    resetTrackLookupGuardStoresForTests();
    const trusted = getClientIp({
      get: (name) => {
        if (name === "x-forwarded-for") return "198.51.100.1, 203.0.113.10";
        if (name === "x-real-ip") return "203.0.113.10";
        return null;
      },
    });
    const spoofed = getClientIp({
      get: (name) => {
        if (name === "x-forwarded-for") return "203.0.113.99, 203.0.113.10";
        if (name === "x-real-ip") return "203.0.113.10";
        return null;
      },
    });
    expect(trusted).toBe("203.0.113.10");
    expect(spoofed).toBe("203.0.113.10");
    expect(trusted).toBe(spoofed);

    expect(consumeTrackLookupRateLimit(trusted, { now: 1_000 }).allowed).toBe(true);
    for (let i = 0; i < 9; i += 1) {
      expect(consumeTrackLookupRateLimit(spoofed, { now: 1_000 + i }).allowed).toBe(true);
    }
    expect(consumeTrackLookupRateLimit(spoofed, { now: 1_010 }).allowed).toBe(false);
  });

  it("prefers cf-connecting-ip and uses rightmost XFF when proxy headers are absent", () => {
    expect(
      getClientIp({
        get: (name) => (name === "cf-connecting-ip" ? "203.0.113.40" : "9.9.9.9"),
      }),
    ).toBe("203.0.113.40");
    expect(
      getClientIp({
        get: (name) => (name === "x-forwarded-for" ? "198.51.100.1, 203.0.113.55" : null),
      }),
    ).toBe("203.0.113.55");
    expect(getClientIp({ get: () => null })).toBe("unknown");
  });

  it("counts grant-backed reloads against the budget and skips Gateway past the limit", () => {
    const store = new Map<string, TrackLookupRateLimitEntry>();
    const gateway = vi.fn();
    const ip = "203.0.113.77";
    const now = 5_000;

    function retrieveWithValidGrant() {
      // Mirrors app/track/[referenceNumber]/page.tsx: consume before Gateway.
      const budget = consumeTrackLookupRateLimit(ip, { store, max: 2, windowMs: 60_000, now });
      if (!budget.allowed) return "limited";
      gateway();
      return "fetched";
    }

    expect(retrieveWithValidGrant()).toBe("fetched");
    expect(retrieveWithValidGrant()).toBe("fetched");
    expect(retrieveWithValidGrant()).toBe("limited");
    expect(gateway).toHaveBeenCalledTimes(2);
  });
});

describe("track lookup turnstile gate", () => {
  it("allows when TURNSTILE_SITE_KEY is unset", async () => {
    await expect(verifyTrackLookupTurnstile("", {})).resolves.toEqual({ ok: true });
  });

  it("fails closed when site key is set but secret is missing", async () => {
    await expect(
      verifyTrackLookupTurnstile("cf-token", { TURNSTILE_SITE_KEY: "site-public" }),
    ).resolves.toEqual({ ok: false });

    await expect(
      assertTrackLookupAllowed({
        ip: "203.0.113.9",
        token: "cf-token",
        env: { TURNSTILE_SITE_KEY: "site-public" },
      }),
    ).resolves.toEqual({ ok: false, reason: "turnstile" });
  });

  it("siteverifies when TURNSTILE_SECRET_KEY is set", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      verifyTrackLookupTurnstile("cf-token", {
        TURNSTILE_SITE_KEY: "site-public",
        TURNSTILE_SECRET_KEY: FAKE_SECRET,
      }),
    ).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0];
    expect(String(init.body)).toContain(`secret=${FAKE_SECRET}`);
    expect(String(init.body)).toContain("response=cf-token");
  });
});

describe("track lookup signed grant cookie", () => {
  it("accepts a valid grant for the matching reference", () => {
    const now = 1_700_000_000_000;
    const cookie = issueTrackLookupGrant("RFQ-2026-000001", FAKE_SECRET, now);
    expect(cookie).toBeTruthy();
    expect(hasValidTrackLookupGrant(cookie, "RFQ-2026-000001", FAKE_SECRET, now + 1_000)).toBe(true);
  });

  it("rejects tampered, expired, and wrong-reference cookies", () => {
    const now = 1_700_000_000_000;
    const cookie = issueTrackLookupGrant("RFQ-2026-000001", FAKE_SECRET, now);
    expect(cookie).toBeTruthy();

    const tampered = `${cookie!.slice(0, -4)}AAAA`;
    expect(hasValidTrackLookupGrant(tampered, "RFQ-2026-000001", FAKE_SECRET, now + 1_000)).toBe(false);

    expect(
      hasValidTrackLookupGrant(cookie, "RFQ-2026-000001", FAKE_SECRET, now + 301_000),
    ).toBe(false);

    expect(hasValidTrackLookupGrant(cookie, "RFQ-2026-000002", FAKE_SECRET, now + 1_000)).toBe(false);
    expect(hasValidTrackLookupGrant(null, "RFQ-2026-000001", FAKE_SECRET, now)).toBe(false);
    expect(issueTrackLookupGrant("RFQ-2026-000001", "")).toBeNull();
  });
});
