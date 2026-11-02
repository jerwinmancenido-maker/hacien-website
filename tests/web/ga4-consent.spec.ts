import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-sans" }),
  Archivo_Black: () => ({ variable: "font-display" }),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import nextConfig from "@/next.config";
import RootLayout from "@/app/layout";
import { CookieNotice } from "@/components/CookieNotice";

describe("GA4 Content Security Policy", () => {
  it("includes required Google Analytics and Tag Manager domains in CSP", async () => {
    const headers = await nextConfig.headers?.();
    const globalHeader = headers?.find((h) => h.source === "/(.*)" || h.source === "/:path*");
    const csp = globalHeader?.headers.find((h) => h.key === "Content-Security-Policy")?.value;
    expect(csp).toBeDefined();

    // script-src must include https://www.googletagmanager.com
    expect(csp).toMatch(/script-src[^;]*https:\/\/www\.googletagmanager\.com/);

    // connect-src must include https://*.google-analytics.com, https://*.analytics.google.com, https://www.googletagmanager.com
    expect(csp).toMatch(/connect-src[^;]*https:\/\/\*\.google-analytics\.com/);
    expect(csp).toMatch(/connect-src[^;]*https:\/\/\*\.analytics\.google\.com/);
    expect(csp).toMatch(/connect-src[^;]*https:\/\/www\.googletagmanager\.com/);

    // img-src must include https://*.google-analytics.com, https://*.analytics.google.com, https://www.googletagmanager.com
    expect(csp).toMatch(/img-src[^;]*https:\/\/\*\.google-analytics\.com/);
    expect(csp).toMatch(/img-src[^;]*https:\/\/\*\.analytics\.google\.com/);
    expect(csp).toMatch(/img-src[^;]*https:\/\/www\.googletagmanager\.com/);
  });
});

describe("RootLayout GA4 consent and banner rendering", () => {
  const originalEnv = process.env.NEXT_PUBLIC_HACIEN_GA4_ID;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_HACIEN_GA4_ID;
    } else {
      process.env.NEXT_PUBLIC_HACIEN_GA4_ID = originalEnv;
    }
  });

  it("renders nothing for GA and no cookie banner when NEXT_PUBLIC_HACIEN_GA4_ID is unset", () => {
    delete process.env.NEXT_PUBLIC_HACIEN_GA4_ID;
    const html = renderToStaticMarkup(RootLayout({ children: null }));

    expect(html).not.toContain("googletagmanager.com");
    expect(html).not.toContain("google-analytics.com");
    expect(html).not.toContain("google-consent-default");
    expect(html).not.toContain("analytics_storage");
    expect(html).not.toContain("We&#x27;d like to use Google Analytics cookies");
    expect(html).not.toContain("We'd like to use Google Analytics cookies");
  });

  it("renders consent default denied before gtag.js and shows cookie banner when NEXT_PUBLIC_HACIEN_GA4_ID is set", () => {
    process.env.NEXT_PUBLIC_HACIEN_GA4_ID = "G-TEST000";
    const html = renderToStaticMarkup(RootLayout({ children: null }));

    // Consent default denied must be rendered
    expect(html).toContain("google-consent-default");
    expect(html).toContain("'analytics_storage': 'denied'");
    expect(html).toContain("'ad_storage': 'denied'");
    expect(html).toContain("'ad_user_data': 'denied'");
    expect(html).toContain("'ad_personalization': 'denied'");
    expect(html).toContain("'allow_google_signals': false");
    expect(html).toContain("'allow_ad_personalization_signals': false");
    expect(html).toContain("G-TEST000");

    // Cookie notice banner must be rendered with exact text from Section C
    expect(html).toContain(
      "We&#x27;d like to use Google Analytics cookies to see how visitors use our site. They stay off unless you accept.",
    );
    expect(html).toContain('href="/privacy"');
    expect(html).toContain("Accept");
    expect(html).toContain("Decline");

    // Before Accept, gtag.js script is NOT loaded in HTML
    expect(html).not.toContain("https://www.googletagmanager.com/gtag/js");
  });
});

describe("Google Analytics request blocking before Accept", () => {
  it("proves nothing is requested from Google (googletagmanager.com / google-analytics.com) before Accept", () => {
    const networkRequests: string[] = [];

    // Intercept any fetch or network call
    const originalFetch = globalThis.fetch;
    globalThis.fetch = ((input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input instanceof URL ? input.toString() : input.url;
      networkRequests.push(url);
      return Promise.resolve(new Response("ok"));
    }) as typeof fetch;

    try {
      // Render initial state
      const html = renderToStaticMarkup(React.createElement(CookieNotice, { gaId: "G-TEST000" }));

      // Verify no script tag requesting Google services is rendered before Accept
      expect(html).not.toContain("https://www.googletagmanager.com/gtag/js");
      expect(html).not.toContain("google-analytics.com");

      // Verify no network requests were made to Google domains
      const googleRequests = networkRequests.filter(
        (url) => url.includes("googletagmanager.com") || url.includes("google-analytics.com"),
      );
      expect(googleRequests).toHaveLength(0);
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("updates consent to granted and loads gtag.js on Accept", () => {
    const mockStorage = new Map<string, string>();
    const gtagCalls: unknown[][] = [];

    const fakeWindow = {
      localStorage: {
        getItem: (k: string) => mockStorage.get(k) ?? null,
        setItem: (k: string, v: string) => mockStorage.set(k, v),
        removeItem: (k: string) => mockStorage.delete(k),
      },
      gtag: (...args: unknown[]) => gtagCalls.push(args),
      dataLayer: [] as unknown[],
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    };

    vi.stubGlobal("window", fakeWindow);
    vi.stubGlobal("localStorage", fakeWindow.localStorage);

    // Simulate clicking Accept
    fakeWindow.localStorage.setItem("hacien-consent", "granted");
    fakeWindow.gtag("consent", "update", { analytics_storage: "granted" });

    expect(mockStorage.get("hacien-consent")).toBe("granted");
    expect(gtagCalls).toEqual([
      ["consent", "update", { analytics_storage: "granted" }],
    ]);

    vi.unstubAllGlobals();
  });
});
