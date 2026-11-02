"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface CookieNoticeProps {
  gaId: string;
}

const CONSENT_STORAGE_KEY = "hacien-consent";
const OPEN_EVENT = "hacien:open-cookie-notice";
const CHANGE_EVENT = "hacien:consent-changed";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener(OPEN_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener(OPEN_EVENT, callback);
  };
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return null;
}

export function CookieNotice({ gaId }: CookieNoticeProps) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isOpen = consent === null;
  const hasConsent = consent === "granted";

  useEffect(() => {
    if (hasConsent && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  }, [hasConsent]);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    } catch {}
    window.dispatchEvent(new Event(CHANGE_EVENT));
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "granted" });
    }
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    } catch {}
    window.dispatchEvent(new Event(CHANGE_EVENT));
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", { analytics_storage: "denied" });
    }
  };

  return (
    <>
      {hasConsent ? (
        <Script
          id="ga4-gtag"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
      ) : null}

      {isOpen ? (
        <aside
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed bottom-0 inset-x-0 z-50 border-t border-white/10 bg-ink p-4 text-white shadow-2xl sm:px-6 sm:py-4"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-grey-200">
              We&apos;d like to use Google Analytics cookies to see how visitors use our site. They stay off unless you accept.{" "}
              <Link
                href="/privacy"
                className="font-medium text-white underline hover:text-grey-300"
              >
                Privacy Policy
              </Link>
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAccept}
                className="flex-1 sm:flex-none min-h-11 sm:min-h-0 px-5 py-2 rounded text-sm font-semibold bg-white text-ink hover:bg-grey-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue cursor-pointer"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="flex-1 sm:flex-none min-h-11 sm:min-h-0 px-5 py-2 rounded text-sm font-semibold bg-white text-ink hover:bg-grey-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue cursor-pointer"
              >
                Decline
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.removeItem(CONSENT_STORAGE_KEY);
        } catch {}
        window.dispatchEvent(new Event(CHANGE_EVENT));
      }}
      className="inline-flex min-h-11 items-center text-left text-sm text-grey-300 hover:text-white sm:min-h-0 cursor-pointer"
    >
      Cookie settings
    </button>
  );
}
