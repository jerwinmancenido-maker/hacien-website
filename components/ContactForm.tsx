"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { TurnstileField } from "@/components/TurnstileField";

type ContactFormType = "Contact" | "Supplier" | "Government";

export function ContactForm({
  type = "Contact",
  turnstileSiteKey,
}: {
  type?: ContactFormType;
  turnstileSiteKey: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtInputRef = useRef<HTMLInputElement>(null);
  const formStartedAtRef = useRef<number | null>(null);

  function markFormStarted() {
    if (formStartedAtRef.current) return;
    const startedAt = Date.now();
    formStartedAtRef.current = startedAt;
    if (startedAtInputRef.current) startedAtInputRef.current.value = String(startedAt);
  }

  function resetFormTiming() {
    formStartedAtRef.current = null;
    if (startedAtInputRef.current) startedAtInputRef.current.value = "";
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markFormStarted();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    const honeypot = data.get("_website") as string;
    if (honeypot) return; // silently discard bot submissions

    const payload: Record<string, unknown> = {
      type: `${type} Inquiry`,
      website: data.get("_website"),
      formStartedAt: data.get("formStartedAt"),
      turnstileToken: data.get("cf-turnstile-response"),
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      phone: data.get("phone"),
      inquiryType: data.get("inquiryType"),
      budgetRange: data.get("budgetRange"),
      timeline: data.get("timeline"),
      message: data.get("message"),
      submittedAt: new Date().toISOString(),
    };

    setStatus("sending");
    const result = await sendInquiryEmail(payload);

    if (result.success) {
      setReferenceNumber(result.referenceNumber || "");
      setStatus("success");
      form.reset();
      setTurnstileResetSignal((value) => value + 1);
      resetFormTiming();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Unable to send. Please try again later.");
      setTurnstileResetSignal((value) => value + 1);
      resetFormTiming();
    }
  }

  if (status === "success") {
    return (
      <div className="surface rounded-2xl p-6">
        <div className="motion-slide-up rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="text-sm font-bold text-emerald-800">Inquiry sent</div>
          <p className="mt-2 text-sm leading-6 text-emerald-700">
            Thank you. Your {type.toLowerCase()} inquiry has been received and is under HACIEN review.
          </p>
          {referenceNumber ? (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-3 text-sm text-emerald-800">
              Reference: <span className="font-bold">{referenceNumber}</span>
              <Link href={`/track/${referenceNumber}`} className="ml-3 font-bold text-[#1457d9] hover:underline">
                Track request
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="surface rounded-2xl p-6">
        <div className="motion-slide-up rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="text-sm font-bold text-red-800">Unable to send</div>
          <p className="mt-2 text-sm leading-6 text-red-700">
            {errorMessage}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onFocusCapture={markFormStarted}
      onChangeCapture={markFormStarted}
      onSubmit={handleSubmit}
      className="surface rounded-2xl p-6 sm:p-8"
    >
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">Support Channel</div>
      <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">{type} Inquiry</h3>

      {/* Honeypot — hidden from humans, visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={startedAtInputRef} type="hidden" name="formStartedAt" />

      <div className="mt-5 grid gap-4">
        <input
          required
          name="name"
          aria-label="Full name"
          autoComplete="name"
          placeholder="Full name"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
        />
        <input
          required
          name="company"
          aria-label="Company or agency"
          autoComplete="organization"
          placeholder="Company / agency"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
        />
        <input
          required
          name="email"
          type="email"
          aria-label="Email address"
          autoComplete="email"
          placeholder="Email address"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
        />
        <input
          name="phone"
          aria-label="Phone number"
          autoComplete="tel"
          placeholder="Phone number"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
        />
        <select
          name="inquiryType"
          aria-label="Inquiry type"
          className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
          defaultValue=""
        >
          <option value="" disabled>
            Inquiry type
          </option>
          <option>Request a quote</option>
          <option>Supplier partnership</option>
          <option>Government procurement</option>
          <option>Systems integration project</option>
        </select>
        <div className="grid gap-4 sm:grid-cols-2">
          <select
            name="budgetRange"
            aria-label="Budget range"
            className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
            defaultValue=""
          >
            <option value="" disabled>
              Budget range
            </option>
            <option>Under PHP 50,000</option>
            <option>PHP 50,000 - PHP 250,000</option>
            <option>PHP 250,000 - PHP 1,000,000</option>
            <option>To be discussed</option>
          </select>
          <select
            name="timeline"
            aria-label="Timeline"
            className="focus-ring min-h-12 rounded-xl border border-slate-300 bg-white px-4"
            defaultValue=""
          >
            <option value="" disabled>
              Timeline
            </option>
            <option>Urgent</option>
            <option>2-4 weeks</option>
            <option>This quarter</option>
            <option>Planning stage</option>
          </select>
        </div>
        <textarea
          required
          name="message"
          aria-label="Project description, specifications, quantities, or procurement context"
          placeholder="Project description, specifications, quantities, or procurement context"
          rows={5}
          className="focus-ring rounded-xl border border-slate-300 bg-white px-4 py-3"
        />

        <TurnstileField siteKey={turnstileSiteKey} resetSignal={turnstileResetSignal} />

        <p className="text-xs text-slate-500">
          By submitting, you agree to our{" "}
          <Link href="/privacy" className="font-semibold text-[#1457d9] hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/terms" className="font-semibold text-[#1457d9] hover:underline">
            Terms of Use
          </Link>.
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="button-glow rounded-full bg-[#1457d9] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f46b4] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}
