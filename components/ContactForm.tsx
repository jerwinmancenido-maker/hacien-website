"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";

type ContactFormType = "Contact" | "Supplier" | "Government";

export function ContactForm({
  type = "Contact",
}: {
  type?: ContactFormType;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    const honeypot = data.get("_website") as string;
    if (honeypot) return; // silently discard bot submissions

    const payload: Record<string, unknown> = {
      type: `${type} Inquiry`,
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
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Unable to send. Please try again later.");
    }
  }

  if (status === "success") {
    return (
      <div className="surface rounded-lg p-6">
        <div className="motion-slide-up rounded border border-emerald-200 bg-emerald-50 p-5">
          <div className="text-sm font-bold text-emerald-800">Inquiry sent</div>
          <p className="mt-2 text-sm leading-6 text-emerald-700">
            Thank you. Your {type.toLowerCase()} inquiry has been queued for HACIEN review. Keep your submitted context available for follow-up.
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
            {errorMessage}
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 rounded border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="surface rounded-lg p-6">
      <h3 className="text-xl font-bold text-slate-950">{type} Inquiry</h3>

      {/* Honeypot — hidden from humans, visible to bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Website
          <input type="text" name="_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-5 grid gap-4">
        <input
          required
          name="name"
          placeholder="Full name"
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
          placeholder="Email address"
          className="focus-ring rounded border border-slate-300 px-3 py-2"
        />
        <input
          name="phone"
          placeholder="Phone number"
          className="focus-ring rounded border border-slate-300 px-3 py-2"
        />
        <select
          name="inquiryType"
          aria-label="Inquiry type"
          className="focus-ring rounded border border-slate-300 px-3 py-2"
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
            className="focus-ring rounded border border-slate-300 px-3 py-2"
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
            className="focus-ring rounded border border-slate-300 px-3 py-2"
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
          placeholder="Project description, specifications, quantities, or procurement context"
          rows={5}
          className="focus-ring rounded border border-slate-300 px-3 py-2"
        />

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
          className="button-glow rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f46b4] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}
