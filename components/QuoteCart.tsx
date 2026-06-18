"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { formatPeso } from "@/lib/format";
import { AnimatedCard, StaggerContainer } from "@/components/motion";

export function QuoteCart() {
  const { items, updateQuantity, removeItem, clearCart } = useQuoteCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    notes: "",
  });

  const estimatedTotal = items.reduce(
    (sum, item) => sum + item.product.estimatedPrice * item.quantity,
    0,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <div className="surface motion-slide-up mx-auto max-w-3xl rounded-lg p-8 text-center">
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1457d9]">Quote request received</div>
        <h1 className="mt-4 text-3xl font-bold text-slate-950">Thank you. HACIEN will review your request.</h1>
        <p className="mt-4 text-slate-600">
          This MVP stores no payment and creates no ERP record yet. The checkout structure is ready for future CRM lead and opportunity integration.
        </p>
        <Link href="/products" className="mt-6 inline-flex rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white">
          Continue browsing
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="surface rounded-lg p-6">
        <h2 className="text-xl font-bold text-slate-950">Quote cart</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {["Select Products", "Submit RFQ", "HACIEN Reviews", "Formal Quote"].map((step, index) => (
            <div key={step} className="rounded border border-slate-200 bg-white p-3 text-sm">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                {index + 1}
              </div>
              <div className="mt-2 font-semibold text-slate-800">{step}</div>
            </div>
          ))}
        </div>
        {items.length === 0 ? (
          <div className="mt-6 rounded border border-dashed border-blue-200 bg-blue-50/60 p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-lg font-bold text-[#1457d9] shadow-sm">
              RFQ
            </div>
            <p className="mt-4 font-semibold text-slate-800">Your quote cart is ready for product selection.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add items from the catalog and HACIEN will validate specs, supplier availability, warranty, and final pricing.
            </p>
            <Link href="/products" className="button-glow mt-5 inline-flex rounded bg-[#071426] px-4 py-2 text-sm font-bold text-white">
              Browse products
            </Link>
          </div>
        ) : (
          <StaggerContainer className="mt-6 grid gap-4">
            {items.map((item) => (
              <AnimatedCard key={item.product.id} className="rounded border border-slate-200 bg-white p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-bold text-slate-950">{item.product.name}</div>
                    <div className="mt-1 text-sm text-slate-500">
                      {item.product.id} - {formatPeso(item.product.estimatedPrice)} indicative
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.product.id, Number(event.target.value))}
                      className="w-20 rounded border border-slate-300 px-3 py-2"
                      aria-label={`Quantity for ${item.product.name}`}
                    />
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-red-300 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
            <div className="rounded bg-slate-950 p-5 text-white">
              <div className="text-sm text-slate-300">Indicative total for quotation basis</div>
              <div className="mt-1 text-2xl font-bold">{formatPeso(estimatedTotal)}</div>
            </div>
          </StaggerContainer>
        )}
      </div>

      <form onSubmit={handleSubmit} className="surface rounded-lg p-6">
        <h2 className="text-xl font-bold text-slate-950">Request quotation</h2>
        <p className="mt-2 text-sm text-slate-600">
          No online payment will be collected. Prices are indicative and subject to supplier availability.
          HACIEN will validate availability, specifications, and final pricing.
        </p>
        <div className="mt-6 grid gap-4">
          {[
            ["name", "Contact name", "text"],
            ["company", "Company / agency", "text"],
            ["email", "Email", "email"],
            ["phone", "Phone", "tel"],
            ["location", "Delivery location", "text"],
          ].map(([key, label, type]) => (
            <label key={key} className="grid gap-2 text-sm font-semibold text-slate-700">
              {label}
              <input
                required
                type={type}
                value={form[key as keyof typeof form]}
                onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                className="rounded border border-slate-300 px-3 py-2 font-normal"
              />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Notes / specifications
            <textarea
              value={form.notes}
              onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
              rows={5}
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />
          </label>
          <button
            type="submit"
            disabled={items.length === 0}
            className="button-glow rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Submit Request for Quotation
          </button>
        </div>
      </form>
    </div>
  );
}
