"use client";

import { useState } from "react";

export function QuoteRequestForm() {
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className="surface rounded-lg p-6">
      {done ? (
        <div className="motion-slide-up rounded border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
          Quote request prepared. HACIEN will validate final pricing and availability.
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (step === 1) {
              setStep(2);
              return;
            }
            setDone(true);
          }}
        >
          <h3 className="text-xl font-bold text-slate-950">Quick Request for Quotation</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Prices are indicative and subject to supplier availability. Final quotation will confirm exact model, warranty, lead time, and delivery terms.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-[0.12em]">
            <div className={`rounded px-3 py-2 ${step === 1 ? "bg-[#071426] text-white" : "bg-slate-100 text-slate-500"}`}>
              1 Requirement
            </div>
            <div className={`rounded px-3 py-2 ${step === 2 ? "bg-[#071426] text-white" : "bg-slate-100 text-slate-500"}`}>
              2 Buyer Details
            </div>
          </div>
          <div className="mt-5 grid gap-4">
            {step === 1 ? (
              <>
                <select required className="focus-ring rounded border border-slate-300 px-3 py-2" defaultValue="">
                  <option value="" disabled>Requirement type</option>
                  <option>Hardware procurement</option>
                  <option>Software licensing</option>
                  <option>Network / infrastructure project</option>
                  <option>Security / surveillance project</option>
                  <option>Government procurement support</option>
                </select>
                <select required className="focus-ring rounded border border-slate-300 px-3 py-2" defaultValue="">
                  <option value="" disabled>Budget range</option>
                  <option>Under PHP 50,000</option>
                  <option>PHP 50,000 - PHP 250,000</option>
                  <option>PHP 250,000 - PHP 1,000,000</option>
                  <option>Project budget to be discussed</option>
                </select>
                <select required className="focus-ring rounded border border-slate-300 px-3 py-2" defaultValue="">
                  <option value="" disabled>Target timeline</option>
                  <option>Immediate / urgent</option>
                  <option>Within 2-4 weeks</option>
                  <option>Within this quarter</option>
                  <option>Planning stage</option>
                </select>
                <textarea required placeholder="Describe products, specifications, quantities, delivery location, or RFQ details" rows={5} className="focus-ring rounded border border-slate-300 px-3 py-2" />
              </>
            ) : (
              <>
                <input required placeholder="Name" className="focus-ring rounded border border-slate-300 px-3 py-2" />
                <input required placeholder="Company / agency" className="focus-ring rounded border border-slate-300 px-3 py-2" />
                <input required type="email" placeholder="Email" className="focus-ring rounded border border-slate-300 px-3 py-2" />
                <input placeholder="Phone number" className="focus-ring rounded border border-slate-300 px-3 py-2" />
                <input placeholder="Industry / organization type" className="focus-ring rounded border border-slate-300 px-3 py-2" />
              </>
            )}
            <button className="button-glow rounded bg-[#071426] px-5 py-3 text-sm font-bold text-white hover:bg-[#1457d9]">
              {step === 1 ? "Continue to buyer details" : "Submit RFQ"}
            </button>
            {step === 2 ? (
              <button type="button" onClick={() => setStep(1)} className="text-sm font-semibold text-slate-500 hover:text-[#1457d9]">
                Back to requirement
              </button>
            ) : null}
          </div>
        </form>
      )}
    </div>
  );
}
