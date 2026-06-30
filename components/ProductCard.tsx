"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { categories } from "@/data/products";
import { AnimatedCard } from "@/components/motion";

export function ProductCard({ product }: { product: Product }) {
  const category = categories.find((item) => item.slug === product.categorySlug);

  return (
    <AnimatedCard className="surface lift flex h-full flex-col overflow-hidden rounded-lg">
      <Link href={`/products/${product.categorySlug}`} className="block">
        <div className="relative h-44 overflow-hidden bg-slate-100">
          <div className="absolute inset-0 animated-grid" />
          <div className="absolute inset-x-5 bottom-5 rounded border border-white/70 bg-white/85 p-4 backdrop-blur">
            <div className="text-xs font-semibold uppercase text-slate-500">{category?.name}</div>
            <div className="mt-1 text-sm font-bold text-slate-950">RFQ-ready capability</div>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-xs font-semibold text-[#1457d9]">{product.availability}</div>
        <Link href={`/products/${product.categorySlug}`}>
          <h3 className="mt-2 text-lg font-bold text-slate-950 hover:text-[#1457d9]">{product.name}</h3>
        </Link>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{product.shortDescription}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500">Commercial path</div>
            <div className="font-bold text-slate-950">Formal RFQ review</div>
            <div className="mt-1 text-xs text-slate-500">Availability confirmed before quotation</div>
          </div>
          <Link
            href="/quote"
            className="button-glow rounded px-4 py-2 text-sm font-bold text-white bg-[#071426] hover:bg-[#1457d9]"
          >
            Request this type
          </Link>
        </div>
        <Link
          href={`/products/${product.categorySlug}`}
          className="interactive-link mt-4 inline-flex text-sm font-bold text-[#1457d9]"
        >
          Review sourcing context
        </Link>
      </div>
    </AnimatedCard>
  );
}
