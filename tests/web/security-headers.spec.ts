import { describe, expect, it } from "vitest";

import {
  DEFAULT_HSTS_MAX_AGE_SECONDS,
  buildStrictTransportSecurity,
  parseHstsMaxAge,
  shouldUpgradeInsecureRequests,
} from "@/lib/security/hsts-headers";

describe("parseHstsMaxAge", () => {
  it("defaults to 300 when unset or blank", () => {
    expect(parseHstsMaxAge(undefined)).toBe(DEFAULT_HSTS_MAX_AGE_SECONDS);
    expect(parseHstsMaxAge("")).toBe(DEFAULT_HSTS_MAX_AGE_SECONDS);
    expect(parseHstsMaxAge("   ")).toBe(DEFAULT_HSTS_MAX_AGE_SECONDS);
  });

  it("accepts a custom non-negative integer", () => {
    expect(parseHstsMaxAge("0")).toBe(0);
    expect(parseHstsMaxAge("86400")).toBe(86400);
  });

  it("falls back to 300 for invalid or negative values", () => {
    expect(parseHstsMaxAge("abc")).toBe(DEFAULT_HSTS_MAX_AGE_SECONDS);
    expect(parseHstsMaxAge("12.5")).toBe(DEFAULT_HSTS_MAX_AGE_SECONDS);
    expect(parseHstsMaxAge("-1")).toBe(DEFAULT_HSTS_MAX_AGE_SECONDS);
    expect(parseHstsMaxAge("1e3")).toBe(DEFAULT_HSTS_MAX_AGE_SECONDS);
  });
});

describe("buildStrictTransportSecurity", () => {
  it("returns null when HSTS_ENABLE is off or unset", () => {
    expect(buildStrictTransportSecurity({})).toBeNull();
    expect(buildStrictTransportSecurity({ HSTS_ENABLE: "false" })).toBeNull();
    expect(buildStrictTransportSecurity({ HSTS_ENABLE: "1" })).toBeNull();
    expect(
      buildStrictTransportSecurity({
        HSTS_ENABLE: "false",
        HSTS_MAX_AGE: "63072000",
        HSTS_INCLUDE_SUBDOMAINS: "true",
        HSTS_PRELOAD: "true",
      }),
    ).toBeNull();
  });

  it("enables HSTS with default max-age=300 and no optional flags", () => {
    expect(buildStrictTransportSecurity({ HSTS_ENABLE: "true" })).toBe("max-age=300");
  });

  it("uses a custom max-age when valid", () => {
    expect(
      buildStrictTransportSecurity({
        HSTS_ENABLE: "true",
        HSTS_MAX_AGE: "86400",
      }),
    ).toBe("max-age=86400");
  });

  it("falls back to max-age=300 when max-age is invalid", () => {
    expect(
      buildStrictTransportSecurity({
        HSTS_ENABLE: "true",
        HSTS_MAX_AGE: "nope",
      }),
    ).toBe("max-age=300");
    expect(
      buildStrictTransportSecurity({
        HSTS_ENABLE: "true",
        HSTS_MAX_AGE: "-100",
      }),
    ).toBe("max-age=300");
  });

  it("adds includeSubDomains only when that flag is true", () => {
    expect(
      buildStrictTransportSecurity({
        HSTS_ENABLE: "true",
        HSTS_INCLUDE_SUBDOMAINS: "true",
      }),
    ).toBe("max-age=300; includeSubDomains");
    expect(
      buildStrictTransportSecurity({
        HSTS_ENABLE: "true",
        HSTS_INCLUDE_SUBDOMAINS: "false",
      }),
    ).toBe("max-age=300");
  });

  it("adds preload only when that flag is true", () => {
    expect(
      buildStrictTransportSecurity({
        HSTS_ENABLE: "true",
        HSTS_PRELOAD: "true",
      }),
    ).toBe("max-age=300; preload");
    expect(
      buildStrictTransportSecurity({
        HSTS_ENABLE: "true",
        HSTS_PRELOAD: "yes",
      }),
    ).toBe("max-age=300");
  });

  it("adds both includeSubDomains and preload when both flags are true", () => {
    expect(
      buildStrictTransportSecurity({
        HSTS_ENABLE: "true",
        HSTS_MAX_AGE: "63072000",
        HSTS_INCLUDE_SUBDOMAINS: "true",
        HSTS_PRELOAD: "true",
      }),
    ).toBe("max-age=63072000; includeSubDomains; preload");
  });
});

describe("shouldUpgradeInsecureRequests", () => {
  it("defaults off so unset HSTS keeps prior no-upgrade CSP behavior", () => {
    expect(shouldUpgradeInsecureRequests({})).toBe(false);
    expect(shouldUpgradeInsecureRequests({ HSTS_ENABLE: "true" })).toBe(false);
    expect(shouldUpgradeInsecureRequests({ CSP_UPGRADE_INSECURE_REQUESTS: "false" })).toBe(false);
  });

  it("turns on only when CSP_UPGRADE_INSECURE_REQUESTS=true", () => {
    expect(shouldUpgradeInsecureRequests({ CSP_UPGRADE_INSECURE_REQUESTS: "true" })).toBe(true);
    expect(
      shouldUpgradeInsecureRequests({
        HSTS_ENABLE: "false",
        CSP_UPGRADE_INSECURE_REQUESTS: "true",
      }),
    ).toBe(true);
  });
});
