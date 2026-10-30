import type { NextConfig } from "next";
import {
  buildStrictTransportSecurity,
  shouldUpgradeInsecureRequests,
} from "./lib/security/hsts-headers";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  experimental: {
    cpus: Number(process.env.NEXT_BUILD_CPUS || 2),
    staticGenerationMaxConcurrency: Number(process.env.NEXT_STATIC_GENERATION_MAX_CONCURRENCY || 2),
    staticGenerationMinPagesPerWorker: Number(process.env.NEXT_STATIC_GENERATION_MIN_PAGES_PER_WORKER || 25),
    workerThreads: true,
  },

  async headers() {
    const securityEnv = {
      HSTS_ENABLE: process.env.HSTS_ENABLE,
      HSTS_MAX_AGE: process.env.HSTS_MAX_AGE,
      HSTS_INCLUDE_SUBDOMAINS: process.env.HSTS_INCLUDE_SUBDOMAINS,
      HSTS_PRELOAD: process.env.HSTS_PRELOAD,
      CSP_UPGRADE_INSECURE_REQUESTS: process.env.CSP_UPGRADE_INSECURE_REQUESTS,
    };
    const hstsValue = buildStrictTransportSecurity(securityEnv);
    const upgradeInsecureRequests = shouldUpgradeInsecureRequests(securityEnv);

    const scriptSrc =
      process.env.NODE_ENV === "production"
        ? "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com"
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com";
    const csp = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://images.unsplash.com",
      "media-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self' https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      ...(upgradeInsecureRequests ? ["upgrade-insecure-requests"] : []),
    ].join("; ");

    const headers: Record<string, string> = {
      "Content-Security-Policy": csp,
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy":
        "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    };

    if (hstsValue) {
      headers["Strict-Transport-Security"] = hstsValue;
    }

    return [
      {
        source: "/(.*)",
        headers: Object.entries(headers).map(([key, value]) => ({
          key,
          value,
        })),
      },
    ];
  },
};

export default nextConfig;
