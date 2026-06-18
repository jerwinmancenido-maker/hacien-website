"use client";

import { useState } from "react";

export function QuoteRequestForm() {
  const [done, setDone] = useState(false);

  return (
    <div className="surface rounded-lg p-6">
      {done ? (
        <div className="rounded border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
          Quote request prepared. HACIEN will validate final pricing and availability.
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setDone(true);
          }}
        >
          <h3 className="text-xl font-bold text-slate-950">Quick Request for Quotation</h3>
          <div className="mt-5 grid gap-4">
            <input required placeholder="Name" className="rounded border border-slate-300 px-3 py-2" />
            <input required placeholder="Company / agency" className="rounded border border-slate-300 px-3 py-2" />
            <input required type="email" placeholder="Email" className="rounded border border-slate-300 px-3 py-2" />
            <input required placeholder="Product or service needed" className="rounded border border-slate-300 px-3 py-2" />
            <textarea placeholder="Quantity, specifications, deadline, delivery location" rows={5} className="rounded border border-slate-300 px-3 py-2" />
            <button className="rounded bg-[#071426] px-5 py-3 text-sm font-bold text-white hover:bg-[#1457d9]">
              Submit RFQ
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
