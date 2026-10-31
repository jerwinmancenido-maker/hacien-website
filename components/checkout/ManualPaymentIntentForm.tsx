"use client";

import { useState } from "react";
import { submitOrderIntent } from "@/app/actions/order-intent";

type IntentStatus = "idle" | "submitting" | "success" | "error";

export function ManualPaymentIntentForm({
  productId,
  publicationId,
  sku,
  name,
  sourceUrl,
  turnstileToken,
  antiSpamVerification,
}: {
  productId: string;
  publicationId: string;
  sku?: string;
  name: string;
  sourceUrl: string;
  turnstileToken?: string;
  antiSpamVerification?: Record<string, unknown>;
}) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<IntentStatus>("idle");
  const antiSpamVerificationPayload = antiSpamVerification
    ? JSON.stringify(antiSpamVerification)
    : "";

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    const result = await submitOrderIntent(formData);
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
  }

  return (
    <form action={handleSubmit} className="grid gap-3 rounded border border-slate-200 bg-white p-4">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="publicationId" value={publicationId} />
      <input type="hidden" name="sku" value={sku || ""} />
      <input type="hidden" name="name" value={name} />
      <input type="hidden" name="quantity" value="1" />
      <input type="hidden" name="sourceUrl" value={sourceUrl} />
      {turnstileToken ? (
        <input type="hidden" name="turnstileToken" value={turnstileToken} />
      ) : null}
      {antiSpamVerificationPayload ? (
        <input
          type="hidden"
          name="antiSpamVerification"
          value={antiSpamVerificationPayload}
        />
      ) : null}
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Work email
        <input
          name="customerEmail"
          type="email"
          required
          className="focus-ring min-h-12 rounded border border-slate-300 px-4"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold text-slate-700">
        Company or agency
        <input
          name="organizationName"
          required
          className="focus-ring min-h-12 rounded border border-slate-300 px-4"
        />
      </label>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="button-glow rounded bg-[#2563EB] px-5 py-3 text-sm font-bold text-white disabled:bg-slate-300"
      >
        {status === "submitting" ? "Submitting..." : "Start manual payment review"}
      </button>
      {message ? (
        <p
          className={
            status === "error"
              ? "text-sm font-semibold text-red-700"
              : "text-sm font-semibold text-emerald-700"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
