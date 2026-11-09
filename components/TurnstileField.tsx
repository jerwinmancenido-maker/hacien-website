"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

type TurnstileRenderOptions = {
  sitekey: string;
  theme?: "auto" | "light" | "dark";
  size?: "normal" | "flexible" | "compact";
  appearance?: "always" | "execute" | "interaction-only";
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function TurnstileField({
  siteKey,
  resetSignal,
  onTokenChange,
  highlight,
}: {
  siteKey: string;
  resetSignal?: number;
  /** Notified with the fresh token, and with "" when the token is lost
   *  (expired, errored, or reset) so callers can gate submit on it. */
  onTokenChange?: (token: string) => void;
  /** Ring the widget box while the caller is waiting on the visitor's
   *  tick (the AI chat gate's long wait). The ring only lands when a
   *  challenge is actually visible — the container has height — so a
   *  silent load is never outlined. */
  highlight?: boolean;
}) {
  const id = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  // Ready at once when the Turnstile API is already on the page: a
  // remount (AiChat moves this field when its gate passes) must not
  // wait for the Script tag's onReady, which only fires for the first
  // mount — the widget would never re-render and no fresh token would
  // ever arrive.
  const [scriptReady, setScriptReady] = useState(
    () => typeof window !== "undefined" && Boolean(window.turnstile),
  );
  const [widgetMessage, setWidgetMessage] = useState("");
  const onTokenChangeRef = useRef(onTokenChange);
  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  // A challenge is visible exactly when the widget container has
  // height: interaction-only rendering keeps it at zero until
  // Cloudflare asks for a tick.
  const [challengeVisible, setChallengeVisible] = useState(false);
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      setChallengeVisible(node.clientHeight > 10);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!siteKey || !scriptReady || !containerRef.current || !window.turnstile) {
      return;
    }

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      size: "flexible",
      appearance: "interaction-only",
      callback: (value) => {
        if (inputRef.current) inputRef.current.value = value;
        setWidgetMessage("");
        onTokenChangeRef.current?.(value);
      },
      "expired-callback": () => {
        if (inputRef.current) inputRef.current.value = "";
        onTokenChangeRef.current?.("");
        setWidgetMessage("Security check expired. Please try again.");
        // Issue a fresh token straight away so the caller is not stuck
        // waiting on a token that will never arrive on its own.
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
      "error-callback": () => {
        if (inputRef.current) inputRef.current.value = "";
        onTokenChangeRef.current?.("");
        setWidgetMessage("Security check could not complete. Please retry.");
      },
    });

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [scriptReady, siteKey]);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = "";
    onTokenChangeRef.current?.("");
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  return (
    <div className="grid gap-2">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />
      <input ref={inputRef} type="hidden" name="cf-turnstile-response" />
      <div
        id={`turnstile-${id}`}
        ref={containerRef}
        className={
          highlight && challengeVisible
            ? "mt-1 min-h-0 rounded-md ring-2 ring-blue ring-offset-2"
            : "min-h-0"
        }
      />
      {widgetMessage ? (
        <p className="text-xs font-semibold text-grey-700" role="status" aria-live="polite">
          {widgetMessage}
        </p>
      ) : null}
      {!siteKey ? (
        <p className="text-xs font-semibold text-grey-700" role="status" aria-live="polite">
          Security verification is not configured. Please try again later.
        </p>
      ) : null}
    </div>
  );
}
