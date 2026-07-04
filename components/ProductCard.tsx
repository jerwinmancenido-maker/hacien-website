"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { categories } from "@/data/products";
import { canCheckout, canRequestQuote } from "@/lib/products/purchase-mode";
import { AnimatedCard } from "@/components/motion";

export function ProductCard({ product }: { product: Product }) {
  const category = categories.find((item) => item.slug === product.categorySlug);
  const productHref = category
    ? `/products/${category.slug}/${product.slug}`
    : `/product/${product.slug}`;
  const modes = [
    canRequestQuote(product) ? "RFQ" : null,
    canCheckout(product) ? "Cart/Checkout" : null,
  ].filter(Boolean) as string[];

  return (
    <AnimatedCard className="surface lift flex h-full flex-col overflow-hidden rounded-lg">
      <Link href={productHref} className="block">
        <div className="relative h-44 overflow-hidden bg-slate-100">
          <div className="absolute inset-0 animated-grid" />
          <div className="absolute inset-x-5 bottom-5 rounded border border-white/70 bg-white/85 p-4 backdrop-blur">
            <div className="text-xs font-semibold uppercase text-slate-500">{category?.name}</div>
            <div className="mt-1 text-sm font-bold text-slate-950">{modes.length > 0 ? modes.join(" / ") : "RFQ-ready"}</div>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#1457d9]">
            <span>{product.availability}</span>
            <span>{modes.length > 0 ? modes.join(" + ") : "RFQ"}</span>
          </div>
        <Link href={productHref}>
          <h3 className="mt-2 text-lg font-bold text-slate-950 hover:text-[#1457d9]">{product.name}</h3>
        </Link>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{product.shortDescription}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500">Commercial path</div>
            <div className="font-bold text-slate-950">{modes.length > 0 ? modes.join(" + ") : "RFQ"}</div>
            <div className="mt-1 text-xs text-slate-500">Availability and terms confirmed before quotation</div>
          </div>
          <Link
            href={productHref}
            className="button-glow rounded px-4 py-2 text-sm font-bold text-white bg-[#071426] hover:bg-[#1457d9]"
          >
            View details
          </Link>
        </div>
        <Link
          href={productHref}
          className="interactive-link mt-4 inline-flex text-sm font-bold text-[#1457d9]"
        >
          Review technical targets
        </Link>
      </div>
    </AnimatedCard>
  );
}
