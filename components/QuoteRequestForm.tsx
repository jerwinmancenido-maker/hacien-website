"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";

export function QuoteRequestForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    const honeypot = data.get("_website") as string;
    if (honeypot) return;

    const payload: Record<string, unknown> = {
      type: "Quick RFQ",
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
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Unable to send. Please email sales@haciensolutions.com");
    }
  }

  if (status === "success") {
    return (
      <div className="surface rounded-lg p-6">
        <div className="motion-slide-up rounded border border-emerald-200 bg-emerald-50 p-5">
          <div className="text-sm font-bold text-emerald-800">RFQ request sent</div>
          <p className="mt-2 text-sm leading-6 text-emerald-700">
            Thank you. HACIEN will validate final pricing and availability and respond to{" "}
            <a href="mailto:sales@haciensolutions.com" className="font-semibold underline">
              sales@haciensolutions.com
            </a>{" "}
            within 1–2 business days.
          </p>
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
            {errorMessage}. Please email{" "}
            <a href="mailto:sales@haciensolutions.com" className="font-semibold underline">
              sales@haciensolutions.com
            </a>{" "}
            directly.
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
      <form ref={formRef} onSubmit={handleSubmit}>
        <h3 className="text-xl font-bold text-slate-950">Quick Request for Quotation</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          No fixed prices are published. HACIEN will review availability, equivalent options,
          warranty, delivery terms, and supplier quotations before issuing a formal quote.
        </p>

        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Website
            <input type="text" name="_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-[0.12em]">
          <div
            className={`rounded px-3 py-2 ${
              step === 1 ? "bg-[#071426] text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            1 Requirement
          </div>
          <div
            className={`rounded px-3 py-2 ${
              step === 2 ? "bg-[#071426] text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            2 Buyer Details
          </div>
        </div>
        <div className="mt-5 grid gap-4">
          {step === 1 ? (
            <>
              <select
                required
                name="requirementType"
                className="focus-ring rounded border border-slate-300 px-3 py-2"
                defaultValue=""
              >
                <option value="" disabled>
                  Requirement type
                </option>
                <option>Hardware procurement</option>
                <option>Software licensing</option>
                <option>Network / infrastructure project</option>
                <option>Security / surveillance project</option>
                <option>Government procurement support</option>
              </select>
              <select
                required
                name="budgetRange"
                className="focus-ring rounded border border-slate-300 px-3 py-2"
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
              <select
                required
                name="timeline"
                className="focus-ring rounded border border-slate-300 px-3 py-2"
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
              <textarea
                required
                name="message"
                placeholder="Describe products, specifications, quantities, delivery location, or RFQ details"
                rows={5}
                className="focus-ring rounded border border-slate-300 px-3 py-2"
              />
            </>
          ) : (
            <>
              <input
                required
                name="name"
                placeholder="Name"
                className="focus-ring rounded border border-slate-300 px-3 py-2"
              />
              <input
                required
                name="company"
                placeholder="Company / agency"
                className="focus-ring rounded border border-slate-300 px-3 py-2"
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email"
                className="focus-ring rounded border border-slate-300 px-3 py-2"
              />
              <input
                name="phone"
                placeholder="Phone number"
                className="focus-ring rounded border border-slate-300 px-3 py-2"
              />
              <input
                name="industry"
                placeholder="Industry / organization type"
                className="focus-ring rounded border border-slate-300 px-3 py-2"
              />
            </>
          )}

          {step === 2 && (
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
          )}

          <button
            type={step === 1 ? "button" : "submit"}
            onClick={step === 1 ? () => setStep(2) : undefined}
            disabled={status === "sending"}
            className="button-glow rounded bg-[#071426] px-5 py-3 text-sm font-bold text-white hover:bg-[#1457d9] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending"
              ? "Sending..."
              : step === 1
                ? "Continue to buyer details"
                : "Submit RFQ"}
          </button>
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-sm font-semibold text-slate-500 hover:text-[#1457d9]"
            >
              Back to requirement
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
