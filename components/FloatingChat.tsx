"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { GuidedChat } from "@/components/GuidedChat";
import { AiChat } from "@/components/AiChat";
import { OPEN_CHAT_EVENT } from "@/components/ChatInvitation";

/** Pages where sending a request is the whole point: the chat panel opens
 *  by itself when one of them loads. */
const AUTO_OPEN_PATHS = ["/quote", "/contact", "/support"];

/** The guided chat lives in this floating panel on every page. On the
 *  quote, contact, and support pages it opens by itself — those pages show
 *  an invitation card behind it as the fallback. If the visitor closes the
 *  panel it stays closed for that page view. */
export function FloatingChat({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [open, setOpen] = useState(false);
  /** The panel opens on the AI assistant. If the AI reports itself
   *  unconfigured, the panel stays on the guided questions for the rest
   *  of the session — the visitor is never shown a broken chat. */
  const [mode, setMode] = useState<"ai" | "guided">("ai");
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const pathname = usePathname();
  const autoOpenedFor = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || !AUTO_OPEN_PATHS.includes(pathname)) return;
    if (autoOpenedFor.current === pathname) return;
    autoOpenedFor.current = pathname;
    setOpen(true);
  }, [pathname]);

  useEffect(() => {
    function onOpenRequest() {
      setOpen(true);
    }
    window.addEventListener(OPEN_CHAT_EVENT, onOpenRequest);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpenRequest);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {open ? (
        <div
          role="dialog"
          aria-label="Chat with the HACIEN team"
          className="fixed inset-x-4 bottom-24 top-20 z-40 flex flex-col overflow-hidden rounded-3xl border border-grey-200 bg-white shadow-2xl sm:inset-x-auto sm:right-6 sm:top-auto sm:h-[560px] sm:w-[380px] sm:max-h-[calc(100dvh-8rem)]"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="absolute top-3 right-3 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-grey-200 bg-white text-lg font-bold text-grey-700 hover:bg-grey-50"
          >
            ✕
          </button>
          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-5">
            {mode === "ai" && !aiUnavailable ? (
              <AiChat
                turnstileSiteKey={turnstileSiteKey}
                onUseGuided={() => setMode("guided")}
                onUnavailable={() => setAiUnavailable(true)}
              />
            ) : (
              <GuidedChat
                turnstileSiteKey={turnstileSiteKey}
                onUseAi={aiUnavailable ? undefined : () => setMode("ai")}
              />
            )}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label="Open chat with the HACIEN team"
        aria-expanded={open}
        className="fixed right-6 bottom-6 z-40 grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-blue text-white shadow-2xl hover:bg-blue-dark"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
