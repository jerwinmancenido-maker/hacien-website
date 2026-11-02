import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";

let mockUseClientStore = false;

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useSyncExternalStore: (
      subscribe: (onStoreChange: () => void) => () => void,
      getSnapshot: () => unknown,
      getServerSnapshot?: () => unknown,
    ) => {
      if (mockUseClientStore) {
        return getSnapshot();
      }
      return getServerSnapshot ? getServerSnapshot() : getSnapshot();
    },
  };
});

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "font-sans" }),
  Archivo_Black: () => ({ variable: "font-display" }),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/script", () => ({
  default: ({ src, id, ...props }: { src?: string; id?: string }) => {
    return React.createElement("script", { id, src, ...props });
  },
}));

import nextConfig from "@/next.config";
import RootLayout from "@/app/layout";
import {
  CookieNotice,
  CookieSettingsButton,
  getServerSnapshot,
  handleAccept,
  handleDecline,
  handleCookieSettings,
  resetPushedConsentForTesting,
} from "@/components/CookieNotice";
import { Footer } from "@/components/Footer";

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

describe("Footer Cookie settings link visibility and GA4 ID format", () => {
  const originalEnv = process.env.NEXT_PUBLIC_HACIEN_GA4_ID;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_HACIEN_GA4_ID;
    } else {
      process.env.NEXT_PUBLIC_HACIEN_GA4_ID = originalEnv;
    }
  });

  it("hides the footer 'Cookie settings' link when NEXT_PUBLIC_HACIEN_GA4_ID is unset", () => {
    delete process.env.NEXT_PUBLIC_HACIEN_GA4_ID;

    const footerHtml = renderToStaticMarkup(React.createElement(Footer));
    expect(footerHtml).not.toContain("Cookie settings");

    const buttonHtml = renderToStaticMarkup(React.createElement(CookieSettingsButton));
    expect(buttonHtml).toBe("");
  });

  it("hides the footer 'Cookie settings' link when NEXT_PUBLIC_HACIEN_GA4_ID does not match ^G-[A-Z0-9]+$", () => {
    const invalidIds = ["", "   ", "invalid", "12345", "G-", "G-lower", "UA-12345-1"];

    for (const invalidId of invalidIds) {
      process.env.NEXT_PUBLIC_HACIEN_GA4_ID = invalidId;

      const footerHtml = renderToStaticMarkup(React.createElement(Footer));
      expect(footerHtml, `Failed for ID: "${invalidId}"`).not.toContain("Cookie settings");

      const buttonHtml = renderToStaticMarkup(React.createElement(CookieSettingsButton));
      expect(buttonHtml, `Failed for ID: "${invalidId}"`).toBe("");
    }
  });

  it("shows the footer 'Cookie settings' link when NEXT_PUBLIC_HACIEN_GA4_ID matches ^G-[A-Z0-9]+$", () => {
    process.env.NEXT_PUBLIC_HACIEN_GA4_ID = "G-TEST000";

    const footerHtml = renderToStaticMarkup(React.createElement(Footer));
    expect(footerHtml).toContain("Cookie settings");

    const buttonHtml = renderToStaticMarkup(React.createElement(CookieSettingsButton));
    expect(buttonHtml).toContain("Cookie settings");
  });
});

describe("RootLayout and CookieNotice ID filtering", () => {
  const originalEnv = process.env.NEXT_PUBLIC_HACIEN_GA4_ID;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.NEXT_PUBLIC_HACIEN_GA4_ID;
    } else {
      process.env.NEXT_PUBLIC_HACIEN_GA4_ID = originalEnv;
    }
  });

  it("renders nothing for GA and no cookie banner when NEXT_PUBLIC_HACIEN_GA4_ID is unset or invalid", () => {
    const testCases = [undefined, "", "invalid-id", "12345", "G-", "G-lowercase"];

    for (const testCase of testCases) {
      if (testCase === undefined) {
        delete process.env.NEXT_PUBLIC_HACIEN_GA4_ID;
      } else {
        process.env.NEXT_PUBLIC_HACIEN_GA4_ID = testCase;
      }

      const html = renderToStaticMarkup(RootLayout({ children: null }));
      expect(html).not.toContain("googletagmanager.com");
      expect(html).not.toContain("google-analytics.com");
      expect(html).not.toContain("google-consent-default");
      expect(html).not.toContain("analytics_storage");
      expect(html).not.toContain("We&#x27;d like to use Google Analytics cookies");
      expect(html).not.toContain("We'd like to use Google Analytics cookies");

      if (testCase !== undefined) {
        const noticeHtml = renderToStaticMarkup(
          React.createElement(CookieNotice, { gaId: testCase }),
        );
        expect(noticeHtml).toBe("");
      }
    }
  });

  it("renders consent default denied before gtag.js and shows cookie banner when NEXT_PUBLIC_HACIEN_GA4_ID is valid", () => {
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

describe("CookieNotice consent transitions and gtag updates", () => {
  let mockStorage: Map<string, string>;
  let gtagCalls: unknown[][];
  const listeners: Map<string, Array<() => void>> = new Map();

  beforeEach(() => {
    mockStorage = new Map();
    gtagCalls = [];
    listeners.clear();

    const fakeWindow = {
      localStorage: {
        getItem: (k: string) => mockStorage.get(k) ?? null,
        setItem: (k: string, v: string) => mockStorage.set(k, v),
        removeItem: (k: string) => mockStorage.delete(k),
        clear: () => mockStorage.clear(),
      },
      gtag: (...args: unknown[]) => gtagCalls.push(args),
      dataLayer: [] as unknown[],
      addEventListener: (type: string, listener: () => void) => {
        const list = listeners.get(type) ?? [];
        list.push(listener);
        listeners.set(type, list);
      },
      removeEventListener: (type: string, listener: () => void) => {
        const list = listeners.get(type) ?? [];
        listeners.set(type, list.filter((l) => l !== listener));
      },
      dispatchEvent: (event: { type: string }) => {
        const list = listeners.get(event.type) ?? [];
        for (const listener of list) listener();
        return true;
      },
    };

    vi.stubGlobal("window", fakeWindow);
    vi.stubGlobal("localStorage", fakeWindow.localStorage);
    mockUseClientStore = true;
    resetPushedConsentForTesting();
  });

  afterEach(() => {
    mockUseClientStore = false;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    resetPushedConsentForTesting();
  });

  it("before Accept: no gtag/js script element is added, consent default is denied, and notice is visible", () => {
    process.env.NEXT_PUBLIC_HACIEN_GA4_ID = "G-TEST000";

    const layoutHtml = renderToStaticMarkup(RootLayout({ children: null }));
    expect(layoutHtml).toContain("'analytics_storage': 'denied'");

    const noticeHtml = renderToStaticMarkup(
      React.createElement(CookieNotice, { gaId: "G-TEST000" }),
    );

    expect(noticeHtml).toContain('role="dialog"');
    expect(noticeHtml).toContain("Accept");
    expect(noticeHtml).toContain("Decline");
    expect(noticeHtml).not.toContain("https://www.googletagmanager.com/gtag/js");
    expect(gtagCalls).toHaveLength(0);
  });

  it("Accept: stores granted and only then adds the googletagmanager gtag/js script, pushing consent update granted once", () => {
    // Before accept: no script
    const initialHtml = renderToStaticMarkup(
      React.createElement(CookieNotice, { gaId: "G-TEST000" }),
    );
    expect(initialHtml).not.toContain("https://www.googletagmanager.com/gtag/js");

    // Trigger Accept
    handleAccept();

    expect(mockStorage.get("hacien-consent")).toBe("granted");
    expect(gtagCalls).toEqual([["consent", "update", { analytics_storage: "granted" }]]);

    // Rerender CookieNotice: notice closed, script added
    const afterAcceptHtml = renderToStaticMarkup(
      React.createElement(CookieNotice, { gaId: "G-TEST000" }),
    );
    expect(afterAcceptHtml).not.toContain('role="dialog"');
    expect(afterAcceptHtml).toContain("https://www.googletagmanager.com/gtag/js?id=G-TEST000");

    // Verify granted consent update was pushed only once, not twice
    const grantedCalls = gtagCalls.filter(
      (c) =>
        c[0] === "consent" &&
        c[1] === "update" &&
        (c[2] as { analytics_storage?: string })?.analytics_storage === "granted",
    );
    expect(grantedCalls).toHaveLength(1);
  });

  it("Decline: stores denied, closes the notice, and adds no script", () => {
    handleDecline();

    expect(mockStorage.get("hacien-consent")).toBe("denied");
    expect(gtagCalls).toEqual([["consent", "update", { analytics_storage: "denied" }]]);

    const declinedHtml = renderToStaticMarkup(
      React.createElement(CookieNotice, { gaId: "G-TEST000" }),
    );
    expect(declinedHtml).not.toContain('role="dialog"');
    expect(declinedHtml).not.toContain("https://www.googletagmanager.com/gtag/js");
  });

  it("reload (remount) after Decline keeps it off", () => {
    // Simulate user previously declined
    mockStorage.set("hacien-consent", "denied");
    resetPushedConsentForTesting();

    const remountHtml = renderToStaticMarkup(
      React.createElement(CookieNotice, { gaId: "G-TEST000" }),
    );

    // Banner stays closed and no script is added
    expect(remountHtml).not.toContain('role="dialog"');
    expect(remountHtml).not.toContain("https://www.googletagmanager.com/gtag/js");

    const grantedCalls = gtagCalls.filter(
      (c) =>
        c[0] === "consent" &&
        c[1] === "update" &&
        (c[2] as { analytics_storage?: string })?.analytics_storage === "granted",
    );
    expect(grantedCalls).toHaveLength(0);
  });

  it("Cookie settings link reopens the notice; subsequent Decline pushes gtag('consent','update',{analytics_storage:'denied'})", () => {
    // 1. Initial Accept
    handleAccept();
    expect(mockStorage.get("hacien-consent")).toBe("granted");
    let html = renderToStaticMarkup(React.createElement(CookieNotice, { gaId: "G-TEST000" }));
    expect(html).toContain("https://www.googletagmanager.com/gtag/js?id=G-TEST000");
    expect(html).not.toContain('role="dialog"');

    // 2. Cookie settings clicked
    handleCookieSettings();
    expect(mockStorage.get("hacien-consent")).toBeUndefined();
    html = renderToStaticMarkup(React.createElement(CookieNotice, { gaId: "G-TEST000" }));
    expect(html).toContain('role="dialog"');
    expect(html).not.toContain("https://www.googletagmanager.com/gtag/js");

    // 3. User chooses Decline
    handleDecline();
    expect(mockStorage.get("hacien-consent")).toBe("denied");
    html = renderToStaticMarkup(React.createElement(CookieNotice, { gaId: "G-TEST000" }));
    expect(html).not.toContain('role="dialog"');
    expect(html).not.toContain("https://www.googletagmanager.com/gtag/js");

    // Must have pushed consent denied update
    expect(gtagCalls.at(-1)).toEqual(["consent", "update", { analytics_storage: "denied" }]);
  });
});

describe("Returning visitor first render and server snapshot", () => {
  it("server snapshot is null even when localStorage holds 'granted' or 'denied', and server markup is identical in both cases", () => {
    const mockStorage = new Map<string, string>();
    const fakeWindow = {
      localStorage: {
        getItem: (k: string) => mockStorage.get(k) ?? null,
        setItem: (k: string, v: string) => mockStorage.set(k, v),
        removeItem: (k: string) => mockStorage.delete(k),
        clear: () => mockStorage.clear(),
      },
    };
    vi.stubGlobal("window", fakeWindow);
    vi.stubGlobal("localStorage", fakeWindow.localStorage);

    mockStorage.set("hacien-consent", "granted");
    expect(getServerSnapshot()).toBeNull();
    const grantedMarkup = renderToStaticMarkup(
      React.createElement(CookieNotice, { gaId: "G-TEST000" }),
    );

    mockStorage.set("hacien-consent", "denied");
    expect(getServerSnapshot()).toBeNull();
    const deniedMarkup = renderToStaticMarkup(
      React.createElement(CookieNotice, { gaId: "G-TEST000" }),
    );

    expect(grantedMarkup).toBe(deniedMarkup);

    vi.unstubAllGlobals();
  });
});
