import type { NextConfig } from "next";
import {
  buildStrictTransportSecurity,
  shouldUpgradeInsecureRequests,
} from "./lib/security/hsts-headers";

/** Above the 10 MB file check so multipart overhead is not rejected first. */
const uploadBodyLimitBytes = 11 * 1024 * 1024;

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    // Allow quality={70} used by EnterpriseMediaImage (Next default allowlist is [75] only).
    qualities: [70, 75],
    // Include 390 for mobile phones, 1440 for desktop, and 1600 so hero sizes do not jump to 1920.
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1440, 1600, 1920],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: uploadBodyLimitBytes,
    },
    proxyClientMaxBodySize: uploadBodyLimitBytes,
    cpus: Number(process.env.NEXT_BUILD_CPUS || 2),
    staticGenerationMaxConcurrency: Number(process.env.NEXT_STATIC_GENERATION_MAX_CONCURRENCY || 2),
    staticGenerationMinPagesPerWorker: Number(process.env.NEXT_STATIC_GENERATION_MIN_PAGES_PER_WORKER || 25),
    workerThreads: true,
  },

  async redirects() {
    const retired: Array<{ category: string; from: string; to: string }> = [
      {
        category: "servers-storage",
        from: "hpe-proliant-class-rack-server-options",
        to: "dell-lenovo-rack-server-options",
      },
      {
        category: "servers-storage",
        from: "synology-class-nas-backup-appliance",
        to: "nas-backup-appliance",
      },
      {
        category: "network-equipment",
        from: "fortinet-class-firewall-options",
        to: "cisco-firewall-options",
      },
      {
        category: "printers-peripherals",
        from: "epson-ecotank-class-mfp-options",
        to: "epson-brother-canon-mfp-options",
      },
      {
        category: "power-ups",
        from: "apc-smart-ups-class-power-protection",
        to: "apc-cyberpower-eaton-power-protection",
      },
      {
        category: "computers-laptops",
        from: "business-laptop-i5-16gb",
        to: "business-laptop-16gb",
      },
    ];

    return retired.flatMap(({ category, from, to }) => {
      const destination = `/products/${category}/${to}`;
      return [
        { source: `/products/${category}/${from}`, destination, permanent: true },
        { source: `/product/${from}`, destination, permanent: true },
      ];
    });
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
        ? "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com"
        : "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://www.googletagmanager.com";
    const csp = [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
      "media-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self' https://challenges.cloudflare.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
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
