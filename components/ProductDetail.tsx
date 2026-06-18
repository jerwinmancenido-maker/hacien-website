"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/products";
import { formatPeso } from "@/lib/format";
import { useQuoteCart } from "@/components/QuoteCartProvider";

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useQuoteCart();
  const category = getCategory(product.categorySlug);

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <div className="surface relative min-h-[420px] overflow-hidden rounded-lg p-6">
          <div className="absolute inset-0 mesh" />
          <div className="relative flex h-full flex-col justify-end">
            <div className="rounded border border-white/70 bg-white/90 p-6 backdrop-blur">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                {category?.name}
              </div>
              <div className="mt-4 text-3xl font-bold text-slate-950">{product.id}</div>
              <p className="mt-3 text-sm text-slate-600">{product.availability}</p>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-[#1457d9]">{category?.name}</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{product.shortDescription}</p>

          <div className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
            <div>
              <div className="text-xs text-slate-500">Indicative price from</div>
              <div className="mt-1 text-2xl font-bold text-slate-950">{formatPeso(product.estimatedPrice)}</div>
              <div className="text-sm text-slate-500">per {product.unit}</div>
              <div className="mt-2 text-xs font-semibold text-slate-600">
                Prices are indicative and subject to supplier availability.
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500" htmlFor="quantity">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
                className="mt-2 w-full rounded border border-slate-300 bg-white px-3 py-2"
              />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-slate-950">Key specifications</h2>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700">
              {product.specs.map((spec) => (
                <li key={spec} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1457d9]" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
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
              className="rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f46b4]"
            >
              Add to Quote Cart
            </button>
            {added ? (
              <span className="rounded border border-emerald-200 bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700">
                Added to quote request.
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
