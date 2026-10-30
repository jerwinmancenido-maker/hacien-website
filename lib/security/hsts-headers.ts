export type SecurityHeaderEnv = {
  HSTS_ENABLE?: string;
  HSTS_MAX_AGE?: string;
  HSTS_INCLUDE_SUBDOMAINS?: string;
  HSTS_PRELOAD?: string;
  CSP_UPGRADE_INSECURE_REQUESTS?: string;
};

export const DEFAULT_HSTS_MAX_AGE_SECONDS = 300;

/**
 * Parse HSTS max-age from env. Invalid or negative values fall back to 300.
 * Zero is allowed (valid HSTS directive that expires immediately).
 */
export function parseHstsMaxAge(
  raw: string | undefined,
  fallback: number = DEFAULT_HSTS_MAX_AGE_SECONDS,
): number {
  if (raw === undefined || raw.trim() === "") {
    return fallback;
  }

  const trimmed = raw.trim();
  // Plain non-negative integers only (reject floats, scientific notation, signs).
  if (!/^\d+$/.test(trimmed)) {
    return fallback;
  }

  const parsed = Number(trimmed);
  if (!Number.isSafeInteger(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

function isEnvTrue(value: string | undefined): boolean {
  return value === "true";
}

/**
 * Build Strict-Transport-Security value, or null when HSTS is disabled.
 * includeSubDomains / preload are opt-in only (default off).
 */
export function buildStrictTransportSecurity(env: SecurityHeaderEnv): string | null {
  if (!isEnvTrue(env.HSTS_ENABLE)) {
    return null;
  }

  const parts = [`max-age=${parseHstsMaxAge(env.HSTS_MAX_AGE)}`];

  if (isEnvTrue(env.HSTS_INCLUDE_SUBDOMAINS)) {
    parts.push("includeSubDomains");
  }

  if (isEnvTrue(env.HSTS_PRELOAD)) {
    parts.push("preload");
  }

  return parts.join("; ");
}

/**
 * CSP upgrade-insecure-requests is independent of HSTS_ENABLE.
 * Default is off so unset HSTS_ENABLE continues to omit the directive
 * (matching prior coupled behavior when HSTS was off/unset).
 */
export function shouldUpgradeInsecureRequests(env: SecurityHeaderEnv): boolean {
  return isEnvTrue(env.CSP_UPGRADE_INSECURE_REQUESTS);
}
