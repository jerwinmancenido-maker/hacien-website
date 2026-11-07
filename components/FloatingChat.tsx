"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GuidedChat } from "@/components/GuidedChat";

/** The guided chat lives in this floating panel on every page — the
 *  quote, contact, and support pages show their full forms instead. */
export function FloatingChat({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [open, setOpen] = useState(false);

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
            <GuidedChat turnstileSiteKey={turnstileSiteKey} form={<FloatingFormLinks />} />
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

/** The full forms live on their own pages — the chat asks the same questions. */
function FloatingFormLinks() {
  return (
    <div className="space-y-3">
      <p className="text-sm leading-6 text-grey-700">
        The full forms live on their own pages — the chat asks the same questions.
      </p>
      <Link
        href="/quote"
        className="block min-h-11 rounded-full bg-blue px-5 py-3 text-center text-sm font-bold text-white hover:bg-blue-dark"
      >
        Open the full quote form
      </Link>
      <Link
        href="/contact"
        className="block min-h-11 rounded-full border border-grey-300 bg-white px-5 py-3 text-center text-sm font-bold text-ink hover:bg-grey-50"
      >
        Open the full contact form
      </Link>
    </div>
  );
}
