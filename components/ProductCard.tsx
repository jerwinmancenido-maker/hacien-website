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
    canCheckout(product) ? "Order intent" : null,
  ].filter(Boolean) as string[];

  return (
    <AnimatedCard className="surface lift flex h-full flex-col overflow-hidden rounded-lg">
      {product.image ? (
        <Link href={productHref} className="block">
          <div className="relative h-44 overflow-hidden bg-grey-100">
            {/* eslint-disable-next-line @next/next/no-img-element -- ERP photo URLs are not in the image optimizer allowlist */}
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          </div>
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-grey-600">
          <span>{product.availability}</span>
        </div>
        <Link href={productHref}>
          <h3 className="mt-2 text-lg font-semibold text-ink hover:text-blue">{product.name}</h3>
        </Link>
        <p className="mt-3 flex-1 text-sm leading-6 text-grey-600">{product.shortDescription}</p>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs text-grey-600">Commercial path</div>
            <div className="font-semibold text-ink">{modes.length > 0 ? modes.join(" + ") : "RFQ"}</div>
            <div className="mt-1 text-xs text-grey-600">Availability and terms confirmed before quotation</div>
          </div>
          <Link
            href={productHref}
            className="shrink-0 whitespace-nowrap rounded bg-blue px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-dark cursor-pointer"
          >
            View details
          </Link>
        </div>
        <Link
          href={productHref}
          className="interactive-link mt-4 inline-flex text-sm font-medium text-blue cursor-pointer"
        >
          Review technical targets
        </Link>
      </div>
    </AnimatedCard>
  );
}
