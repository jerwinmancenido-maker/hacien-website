"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { isValidGaId, GA4_ID_REGEX } from "@/lib/ga4";

export { isValidGaId, GA4_ID_REGEX };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_STORAGE_KEY = "hacien-consent";
export const OPEN_EVENT = "hacien:open-cookie-notice";
export const CHANGE_EVENT = "hacien:consent-changed";

let lastPushedConsent: "granted" | "denied" | null = null;

export function resetPushedConsentForTesting(): void {
  lastPushedConsent = null;
}

export function pushConsentUpdate(status: "granted" | "denied"): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: status });
    lastPushedConsent = status;
  }
}

export function handleAccept(): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
  } catch {}
  pushConsentUpdate("granted");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

export function handleDecline(): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
  } catch {}
  pushConsentUpdate("denied");
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
}

export function handleCookieSettings(): void {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {}
  lastPushedConsent = null;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(CHANGE_EVENT));
    window.dispatchEvent(new Event(OPEN_EVENT));
  }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
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
  if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
    return getSnapshot();
  }
  return null;
}

interface CookieNoticeProps {
  gaId: string;
}

export function CookieNotice({ gaId }: CookieNoticeProps) {
  const isValid = isValidGaId(gaId);
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isOpen = isValid && consent === null;
  const hasConsent = isValid && consent === "granted";

  useEffect(() => {
    if (hasConsent && lastPushedConsent !== "granted") {
      pushConsentUpdate("granted");
    }
  }, [hasConsent]);

  if (!isValid) {
    return null;
  }

  return (
    <>
      {hasConsent ? (
        <Script
          id="ga4-gtag"
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId.trim()}`}
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
  const rawId = process.env.NEXT_PUBLIC_HACIEN_GA4_ID;
  if (!isValidGaId(rawId)) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleCookieSettings}
      className="inline-flex min-h-11 items-center text-left text-sm text-grey-300 hover:text-white sm:min-h-0 cursor-pointer"
    >
      Cookie settings
    </button>
  );
}
