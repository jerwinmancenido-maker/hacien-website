import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    cpus: Number(process.env.NEXT_BUILD_CPUS || 2),
    staticGenerationMaxConcurrency: Number(process.env.NEXT_STATIC_GENERATION_MAX_CONCURRENCY || 2),
    staticGenerationMinPagesPerWorker: Number(process.env.NEXT_STATIC_GENERATION_MIN_PAGES_PER_WORKER || 25),
    workerThreads: true,
  },

  async headers() {
    const hstsEnabled = process.env.HSTS_ENABLE === "true";
    const scriptSrc =
      process.env.NODE_ENV === "production"
        ? "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com"
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com";
    const csp = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self' https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");

    const headers: Record<string, string> = {
      "Content-Security-Policy": csp,
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy":
        "camera=(), microphone=(), geolocation=(), interest-cohort=()",
    };

    if (hstsEnabled) {
      headers["Strict-Transport-Security"] =
        "max-age=63072000; includeSubDomains; preload";
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
