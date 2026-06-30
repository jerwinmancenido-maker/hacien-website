"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/products";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { SlideUp, StaggerContainer } from "@/components/motion";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useQuoteCart();
  const category = getCategory(product.categorySlug);

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <SlideUp>
        <div className="surface lift relative min-h-[420px] overflow-hidden rounded-lg p-6">
          <div className="absolute inset-0 animated-grid" />
          <div className="relative flex h-full flex-col justify-end">
            <div className="rounded border border-white/70 bg-white/90 p-6 backdrop-blur">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                {category?.name}
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">Capability review</div>
              <p className="mt-3 text-sm text-slate-600">{product.availability}</p>
            </div>
          </div>
        </div>
        </SlideUp>

        <SlideUp delay={120}>
        <div>
          <div className="text-sm font-semibold text-[#1457d9]">{category?.name}</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{product.shortDescription}</p>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">RFQ requirement panel</div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Final pricing will be confirmed through formal quotation. Equivalent models may be recommended
              based on stock, warranty, and specification requirements.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold uppercase text-slate-500" htmlFor="quantity">
                Quantity
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
                  className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 normal-case"
                />
              </label>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Preferred brand/model
                <input className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 normal-case" placeholder="Optional" />
              </label>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Target capability
                <input className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 normal-case" placeholder="Performance, users, workload, ports, license count..." />
              </label>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Warranty requirement
                <input className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 normal-case" placeholder="1 year, 3 years, onsite, carry-in..." />
              </label>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Delivery location
                <input className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 normal-case" placeholder="City / site location" />
              </label>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Target delivery date
                <input type="date" className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 normal-case" />
              </label>
              <label className="text-xs font-semibold uppercase text-slate-500 sm:col-span-2">
                Notes
                <textarea rows={3} className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2 normal-case" placeholder="BOQ line, bid requirement, equivalent rules, accessories, or installation notes" />
              </label>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-slate-950">Typical sourcing targets</h2>
            <StaggerContainer className="mt-4 grid gap-3 text-sm text-slate-700">
              {product.specs.map((spec) => (
                <li key={spec} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1457d9]" />
                  <span>{spec}</span>
                </li>
              ))}
            </StaggerContainer>
          </div>

          <div className="mt-8 rounded border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-slate-700">
            <strong className="text-slate-950">Procurement note:</strong> {product.procurementNotes}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                addItem(product, quantity);
                setAdded(true);
              }}
              className="button-glow rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f46b4]"
            >
              Add to RFQ
            </button>
            {added ? (
              <span className="rounded border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
                Added to RFQ request.
              </span>
            ) : null}
          </div>
        </div>
        </SlideUp>
      </div>
    </section>
  );
}
