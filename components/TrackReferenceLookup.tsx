"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function TrackReferenceLookup({ initialReference = "" }: { initialReference?: string }) {
  const router = useRouter();
  const [referenceNumber, setReferenceNumber] = useState(initialReference);

  function submitReference(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextReference = referenceNumber.trim();
    if (!nextReference) return;
    router.push(`/track/${encodeURIComponent(nextReference)}`);
  }

  return (
    <form action="/track" method="get" onSubmit={submitReference} className="mt-6 grid gap-3 rounded-lg border border-grey-200 bg-white/80 p-4 shadow-sm backdrop-blur sm:grid-cols-[1fr_auto]">
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
        />
      </div>
      <button
        type="submit"
        className="button-glow self-end rounded bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-blue"
      >
        Track request
      </button>
    </form>
  );
}
