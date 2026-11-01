import { afterEach, describe, expect, it, vi } from "vitest";
import {
  assertTrackLookupAllowed,
  createTrackLookupRateLimiterForTests,
  getTrackLookupClientIp,
  hasValidTrackLookupGrant,
  issueTrackLookupGrant,
  resetTrackLookupGuardStoresForTests,
  verifyTrackLookupTurnstile,
} from "@/lib/security/track-lookup-guard";

afterEach(() => {
  resetTrackLookupGuardStoresForTests();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("track lookup rate limit (b)", () => {
  it("allows up to the window max then blocks", () => {
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

  it("reads the first x-forwarded-for hop", () => {
    expect(
      getTrackLookupClientIp({
        get: (name) => (name === "x-forwarded-for" ? "203.0.113.50, 10.0.0.1" : null),
      }),
    ).toBe("203.0.113.50");
    expect(getTrackLookupClientIp({ get: () => null })).toBe("unknown");
  });
});

describe("track lookup turnstile gate", () => {
  it("allows when TURNSTILE_SITE_KEY is unset", async () => {
    await expect(verifyTrackLookupTurnstile("", {})).resolves.toEqual({ ok: true });
  });

  it("requires a token when TURNSTILE_SITE_KEY is set and secret is absent", async () => {
    await expect(
      verifyTrackLookupTurnstile("", { TURNSTILE_SITE_KEY: "site-public" }),
    ).resolves.toEqual({ ok: false });
    await expect(
      verifyTrackLookupTurnstile("cf-token", { TURNSTILE_SITE_KEY: "site-public" }),
    ).resolves.toEqual({ ok: true });
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
        TURNSTILE_SECRET_KEY: "site-secret",
      }),
    ).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [, init] = fetchMock.mock.calls[0];
    expect(String(init.body)).toContain("secret=site-secret");
    expect(String(init.body)).toContain("response=cf-token");
  });

  it("assertTrackLookupAllowed blocks missing tokens before issuing a grant path", async () => {
    const result = await assertTrackLookupAllowed({
      ip: "203.0.113.9",
      token: "",
      env: { TURNSTILE_SITE_KEY: "site-public" },
    });
    expect(result).toEqual({ ok: false, reason: "turnstile" });
  });

  it("grants unlock only for the matching reference", () => {
    const grantId = issueTrackLookupGrant("RFQ-2026-000001");
    expect(hasValidTrackLookupGrant(grantId, "RFQ-2026-000001")).toBe(true);
    expect(hasValidTrackLookupGrant(grantId, "RFQ-2026-000002")).toBe(false);
    expect(hasValidTrackLookupGrant("missing", "RFQ-2026-000001")).toBe(false);
  });
});
