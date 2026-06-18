"use client";

import { useState } from "react";

export function ContactForm({ type = "Contact" }: { type?: "Contact" | "Supplier" | "Government" }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="motion-slide-up rounded border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
        Thank you. Your {type.toLowerCase()} inquiry has been prepared for HACIEN follow-up.
      </div>
    );
  }

  return (
    <form
      className="surface rounded-lg p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <h3 className="text-xl font-bold text-slate-950">{type} Inquiry</h3>
      <div className="mt-5 grid gap-4">
        <input required placeholder="Full name" className="focus-ring rounded border border-slate-300 px-3 py-2" />
        <input required placeholder="Company / agency" className="focus-ring rounded border border-slate-300 px-3 py-2" />
        <input required type="email" placeholder="Email address" className="focus-ring rounded border border-slate-300 px-3 py-2" />
        <input placeholder="Phone number" className="focus-ring rounded border border-slate-300 px-3 py-2" />
        <select className="focus-ring rounded border border-slate-300 px-3 py-2" defaultValue="">
          <option value="" disabled>Inquiry type</option>
          <option>Request a quote</option>
          <option>Supplier partnership</option>
          <option>Government procurement</option>
          <option>Systems integration project</option>
        </select>
        <div className="grid gap-4 sm:grid-cols-2">
          <select className="focus-ring rounded border border-slate-300 px-3 py-2" defaultValue="">
            <option value="" disabled>Budget range</option>
            <option>Under PHP 50,000</option>
            <option>PHP 50,000 - PHP 250,000</option>
            <option>PHP 250,000 - PHP 1,000,000</option>
            <option>To be discussed</option>
          </select>
          <select className="focus-ring rounded border border-slate-300 px-3 py-2" defaultValue="">
            <option value="" disabled>Timeline</option>
            <option>Urgent</option>
            <option>2-4 weeks</option>
            <option>This quarter</option>
            <option>Planning stage</option>
          </select>
        </div>
        <textarea required placeholder="Project description, specifications, quantities, or procurement context" rows={5} className="focus-ring rounded border border-slate-300 px-3 py-2" />
        <button className="button-glow rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f46b4]">
          Send Inquiry
        </button>
      </div>
    </form>
  );
}
