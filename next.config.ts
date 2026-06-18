import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  async headers() {
    const hstsEnabled = process.env.HSTS_ENABLE === "true";
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src 'none'",
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
