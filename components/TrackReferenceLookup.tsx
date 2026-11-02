"use client";

import { useState } from "react";
import { submitTrackLookup } from "@/app/actions/track-lookup";
import { TurnstileField } from "@/components/TurnstileField";

export function TrackReferenceLookup({
  initialReference = "",
  turnstileSiteKey,
  errorMessage,
}: {
  initialReference?: string;
  turnstileSiteKey: string;
  errorMessage?: string;
}) {
  const [referenceNumber, setReferenceNumber] = useState(initialReference);
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);

  async function handleTrackLookup(formData: FormData) {
    try {
      await submitTrackLookup(formData);
    } finally {
      // Same pattern as QuoteRequestForm: spent tokens must not block the next attempt
      // (including success redirects back to the same /track/[ref] route).
      setTurnstileResetSignal((value) => value + 1);
    }
  }

  return (
    <form action={handleTrackLookup} className="mt-6 grid gap-4 rounded-lg border border-grey-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      {errorMessage ? (
        <p className="rounded border border-grey-200 bg-grey-50 px-4 py-3 text-sm leading-6 text-grey-700" role="status">
          {errorMessage}
        </p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <label htmlFor="tracking-reference" className="text-xs font-bold uppercase tracking-[0.16em] text-grey-600">
            Reference number
          </label>
          <input
            id="tracking-reference"
            name="referenceNumber"
            value={referenceNumber}
            onChange={(event) => setReferenceNumber(event.target.value)}
            placeholder="Example: RFQ-2026-000001"
            className="mt-2 w-full rounded border border-grey-200 bg-white px-4 py-3 text-sm font-semibold text-ink shadow-inner outline-none transition focus:border-[#2563EB] focus:ring-4 focus:ring-blue-100"
            required
          />
        </div>
        <button
          type="submit"
          className="button-glow self-end rounded bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-blue cursor-pointer"
        >
          Track request
        </button>
      </div>
      <TurnstileField siteKey={turnstileSiteKey} resetSignal={turnstileResetSignal} />
    </form>
  );
}
