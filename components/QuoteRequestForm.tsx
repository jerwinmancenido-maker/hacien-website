"use client";

import { useState, useRef, useId } from "react";
import Link from "next/link";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";
import { replyTime } from "@/data/companyContact";
import { TurnstileField } from "@/components/TurnstileField";

export function QuoteRequestForm({ turnstileSiteKey }: { turnstileSiteKey: string }) {
  const baseId = useId();
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
        <p className="mt-1 text-xs text-grey-600">* required</p>

        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor={`${baseId}-website`}>
            Website
            <input id={`${baseId}-website`} type="text" name="_website" tabIndex={-1} autoComplete="off" />
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
              <div>
                <label htmlFor={`${baseId}-requirement-type`} className="block text-sm font-semibold text-grey-700 mb-1">
                  Requirement type <span className="text-grey-600">*</span>
                </label>
                <select
                  id={`${baseId}-requirement-type`}
                  required
                  aria-required="true"
                  name="requirementType"
                  aria-label="Requirement type"
                  className="focus-ring w-full rounded border border-grey-200 px-3 py-2"
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
              </div>
              <div>
                <label htmlFor={`${baseId}-budget-range`} className="block text-sm font-semibold text-grey-700 mb-1">
                  Budget range <span className="text-grey-600">*</span>
                </label>
                <select
                  id={`${baseId}-budget-range`}
                  required
                  aria-required="true"
                  name="budgetRange"
                  aria-label="Budget range"
                  className="focus-ring w-full rounded border border-grey-200 px-3 py-2"
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
              </div>
              <div>
                <label htmlFor={`${baseId}-timeline`} className="block text-sm font-semibold text-grey-700 mb-1">
                  Target timeline <span className="text-grey-600">*</span>
                </label>
                <select
                  id={`${baseId}-timeline`}
                  required
                  aria-required="true"
                  name="timeline"
                  aria-label="Target timeline"
                  className="focus-ring w-full rounded border border-grey-200 px-3 py-2"
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
              </div>
              <div>
                <label htmlFor={`${baseId}-message`} className="block text-sm font-semibold text-grey-700 mb-1">
                  Requirement details <span className="text-grey-600">*</span>
                </label>
                <textarea
                  id={`${baseId}-message`}
                  required
                  aria-required="true"
                  name="message"
                  aria-label="Requirement details"
                  placeholder="Describe products, specifications, quantities, or the delivery location"
                  rows={5}
                  className="focus-ring w-full rounded border border-grey-200 px-3 py-2"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor={`${baseId}-name`} className="block text-sm font-semibold text-grey-700 mb-1">
                  Name <span className="text-grey-600">*</span>
                </label>
                <input
                  id={`${baseId}-name`}
                  required
                  aria-required="true"
                  name="name"
                  aria-label="Name"
                  autoComplete="name"
                  placeholder="Name"
                  className="focus-ring w-full rounded border border-grey-200 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-company`} className="block text-sm font-semibold text-grey-700 mb-1">
                  Company or organization <span className="text-grey-600">*</span>
                </label>
                <input
                  id={`${baseId}-company`}
                  required
                  aria-required="true"
                  name="company"
                  aria-label="Company or organization"
                  autoComplete="organization"
                  placeholder="Company / organization"
                  className="focus-ring w-full rounded border border-grey-200 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-email`} className="block text-sm font-semibold text-grey-700 mb-1">
                  Email <span className="text-grey-600">*</span>
                </label>
                <input
                  id={`${baseId}-email`}
                  required
                  aria-required="true"
                  name="email"
                  type="email"
                  aria-label="Email"
                  autoComplete="email"
                  placeholder="Email"
                  className="focus-ring w-full rounded border border-grey-200 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-phone`} className="block text-sm font-semibold text-grey-700 mb-1">
                  Phone number
                </label>
                <input
                  id={`${baseId}-phone`}
                  name="phone"
                  aria-label="Phone number"
                  autoComplete="tel"
                  placeholder="Phone number"
                  className="focus-ring w-full rounded border border-grey-200 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor={`${baseId}-industry`} className="block text-sm font-semibold text-grey-700 mb-1">
                  Industry or organization type
                </label>
                <input
                  id={`${baseId}-industry`}
                  name="industry"
                  aria-label="Industry or organization type"
                  autoComplete="organization-title"
                  placeholder="Industry / organization type"
                  className="focus-ring w-full rounded border border-grey-200 px-3 py-2"
                />
              </div>
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
