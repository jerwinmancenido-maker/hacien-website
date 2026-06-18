"use client";

import { useState } from "react";

export function ContactForm({ type = "Contact" }: { type?: "Contact" | "Supplier" | "Government" }) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
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
        <input required placeholder="Full name" className="rounded border border-slate-300 px-3 py-2" />
        <input required placeholder="Company / agency" className="rounded border border-slate-300 px-3 py-2" />
        <input required type="email" placeholder="Email address" className="rounded border border-slate-300 px-3 py-2" />
        <input placeholder="Phone number" className="rounded border border-slate-300 px-3 py-2" />
        <select className="rounded border border-slate-300 px-3 py-2" defaultValue="">
          <option value="" disabled>Inquiry type</option>
          <option>Request a quote</option>
          <option>Supplier partnership</option>
          <option>Government procurement</option>
          <option>Systems integration project</option>
        </select>
        <textarea required placeholder="Tell us what you need" rows={5} className="rounded border border-slate-300 px-3 py-2" />
        <button className="rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f46b4]">
          Send Inquiry
        </button>
      </div>
    </form>
  );
}
