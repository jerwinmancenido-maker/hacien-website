"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { replyTime } from "@/data/companyContact";
import { TurnstileField } from "@/components/TurnstileField";

export function QuoteRequestForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [step, setStep] = useState(1);
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
    if (honeypot) return;

    const payload: Record<string, unknown> = {
      type: "Quick RFQ",
      website: data.get("_website"),
      formStartedAt: data.get("formStartedAt"),
      turnstileToken: data.get("cf-turnstile-response"),
      requirementType: data.get("requirementType"),
      budgetRange: data.get("budgetRange"),
      timeline: data.get("timeline"),
      message: data.get("message"),
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      phone: data.get("phone"),
      industry: data.get("industry"),
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
      <div className="surface rounded-lg p-6">
        <div className="motion-slide-up rounded border border-grey-200 bg-grey-50 p-5">
          <div className="text-sm font-bold text-ink">Quotation request sent</div>
          <p className="mt-2 text-sm leading-6 text-grey-700">
            Thank you. HACIEN received your request and will review the requirement details before any formal quotation is prepared.
          </p>
          {referenceNumber ? (
            <div className="mt-4 rounded border border-grey-200 bg-white p-3 text-sm text-ink">
              Reference: <span className="font-bold">{referenceNumber}</span>
              <Link href={`/track/${referenceNumber}`} className="ml-3 font-bold text-blue hover:underline">
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
      <div className="surface rounded-lg p-6">
        <div className="motion-slide-up rounded border border-red-200 bg-red-50 p-5">
          <div className="text-sm font-bold text-red-800">Unable to send</div>
          <p className="mt-2 text-sm leading-6 text-red-700">
            {errorMessage}
          </p>
          <button
            onClick={() => { setStatus("idle"); setStep(1); }}
            className="mt-4 rounded border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="surface rounded-lg p-6">
      <form
        ref={formRef}
        onFocusCapture={markFormStarted}
        onChangeCapture={markFormStarted}
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-bold text-ink">Request a quotation</h3>
        <p className="mt-2 text-sm leading-6 text-grey-600">{replyTime}</p>

        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="rfq-website">
            Website
            <input id="rfq-website" type="text" name="_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <input ref={startedAtInputRef} type="hidden" name="formStartedAt" />

        <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          <div
            className={`rounded px-3 py-2 ${
 step === 1 ? "bg-ink text-white" : "bg-grey-100 text-grey-600"
 }`}
          >
            1 Requirement
          </div>
          <div
            className={`rounded px-3 py-2 ${
 step === 2 ? "bg-ink text-white" : "bg-grey-100 text-grey-600"
 }`}
          >
            2 Buyer Details
          </div>
        </div>
        <div className="mt-5 grid gap-4">
          {step === 1 ? (
            <>
              <label htmlFor="rfq-requirement-type" className="sr-only">
                Requirement type
              </label>
              <select
                id="rfq-requirement-type"
                required
                name="requirementType"
                aria-label="Requirement type"
                className="focus-ring rounded border border-grey-200 px-3 py-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Requirement type
                </option>
                <option>Hardware procurement</option>
                <option>Software licensing</option>
                <option>Network / infrastructure project</option>
                <option>Security / surveillance project</option>
                <option>Institutional procurement support</option>
              </select>
              <label htmlFor="rfq-budget-range" className="sr-only">
                Budget range
              </label>
              <select
                id="rfq-budget-range"
                required
                name="budgetRange"
                aria-label="Budget range"
                className="focus-ring rounded border border-grey-200 px-3 py-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Budget range
                </option>
                <option>Under PHP 50,000</option>
                <option>PHP 50,000 - PHP 250,000</option>
                <option>PHP 250,000 - PHP 1,000,000</option>
                <option>Project budget to be discussed</option>
              </select>
              <label htmlFor="rfq-timeline" className="sr-only">
                Target timeline
              </label>
              <select
                id="rfq-timeline"
                required
                name="timeline"
                aria-label="Target timeline"
                className="focus-ring rounded border border-grey-200 px-3 py-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Target timeline
                </option>
                <option>Immediate / urgent</option>
                <option>Within 2-4 weeks</option>
                <option>Within this quarter</option>
                <option>Planning stage</option>
              </select>
              <label htmlFor="rfq-message" className="sr-only">
                Requirement details
              </label>
              <textarea
                id="rfq-message"
                required
                name="message"
                aria-label="Requirement details"
                placeholder="Describe products, specifications, quantities, or the delivery location"
                rows={5}
                className="focus-ring rounded border border-grey-200 px-3 py-2"
              />
            </>
          ) : (
            <>
              <label htmlFor="rfq-name" className="sr-only">
                Name
              </label>
              <input
                id="rfq-name"
                required
                name="name"
                aria-label="Name"
                autoComplete="name"
                placeholder="Name"
                className="focus-ring rounded border border-grey-200 px-3 py-2"
              />
              <label htmlFor="rfq-company" className="sr-only">
                Company or organization
              </label>
              <input
                id="rfq-company"
                required
                name="company"
                aria-label="Company or organization"
                autoComplete="organization"
                placeholder="Company / organization"
                className="focus-ring rounded border border-grey-200 px-3 py-2"
              />
              <label htmlFor="rfq-email" className="sr-only">
                Email
              </label>
              <input
                id="rfq-email"
                required
                name="email"
                type="email"
                aria-label="Email"
                autoComplete="email"
                placeholder="Email"
                className="focus-ring rounded border border-grey-200 px-3 py-2"
              />
              <label htmlFor="rfq-phone" className="sr-only">
                Phone number
              </label>
              <input
                id="rfq-phone"
                name="phone"
                aria-label="Phone number"
                autoComplete="tel"
                placeholder="Phone number"
                className="focus-ring rounded border border-grey-200 px-3 py-2"
              />
              <label htmlFor="rfq-industry" className="sr-only">
                Industry or organization type
              </label>
              <input
                id="rfq-industry"
                name="industry"
                aria-label="Industry or organization type"
                autoComplete="organization-title"
                placeholder="Industry / organization type"
                className="focus-ring rounded border border-grey-200 px-3 py-2"
              />
            </>
          )}

          {step === 2 && (
            <p className="text-xs text-grey-600">
              By submitting, you agree to our{" "}
              <Link href="/privacy" className="font-semibold text-blue hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="font-semibold text-blue hover:underline">
                Terms of Use
              </Link>.
            </p>
          )}

          {step === 2 && (
            <TurnstileField siteKey={turnstileSiteKey} resetSignal={turnstileResetSignal} />
          )}

          <button
            type={step === 1 ? "button" : "submit"}
            onClick={step === 1 ? () => setStep(2) : undefined}
            disabled={status === "sending"}
            className="button-glow rounded bg-ink px-5 py-3 text-sm font-bold text-white hover:bg-blue disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending"
              ? "Sending..."
              : step === 1
                ? "Continue to buyer details"
                : "Request a Quote"}
          </button>
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm font-semibold text-grey-600 hover:text-blue"
            >
              Back to requirement
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
