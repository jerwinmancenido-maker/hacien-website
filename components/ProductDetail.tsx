"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/products";
import { SlideUp } from "@/components/motion";
import { canCheckout, canRequestQuote, formatPrice } from "@/lib/products/purchase-mode";
import { ManualPaymentIntentForm } from "@/components/checkout/ManualPaymentIntentForm";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import billingSettings from "@/config/billing-compliance-settings.json";

export function ProductDetail({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  const { addRequirement } = useQuoteCart();
  const [added, setAdded] = useState(false);
  const priceText = formatPrice(product);
  const categoryLabel = category?.name ?? "ERP Catalog";
  const showManualPaymentIntent =
    product.isErpPublished === true &&
    product.manualPaymentEnabled === true &&
    Boolean(product.erpPublicationId);
  const showSandboxPaymentNotice =
    product.isErpPublished === true && product.sandboxPaymentEnabled === true;
  const stockBadges = billingSettings.stock_badges as Record<string, string>;
  const stockBadgeLabel = stockBadges[product.inventoryPolicy] || "Availability requires review";

  function handleAddToRfq() {
    addRequirement({
      category: product.categorySlug,
      categoryLabel,
      quantity: "1",
      brandPreference: "Any suitable option",
      equivalentAccepted: "Yes, equivalent options may be reviewed",
      notes: `${product.name} (${product.id}) - ${product.shortDescription}`,
      fields: {
        "Reference product": product.name,
        "Product ID": product.id,
        Unit: product.unit,
        Availability: product.availability,
      },
    });
    setAdded(true);
  }

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <SlideUp className="min-w-0">
        <div className="surface lift relative min-h-[300px] overflow-hidden rounded-lg p-4 sm:min-h-[420px] sm:p-6">
          <div className="absolute inset-0 animated-grid" />
          <div className="relative flex h-full flex-col justify-end">
            <div className="rounded border border-white/70 bg-white/90 p-5 backdrop-blur sm:p-6">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                {categoryLabel}
              </div>
              <div className="mt-4 text-2xl font-bold text-slate-950 sm:text-3xl">Capability review</div>
              <p className="mt-3 text-sm text-slate-600">{product.availability}</p>
            </div>
          </div>
        </div>
        </SlideUp>

        <SlideUp delay={120} className="min-w-0">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-[#1457d9]">{categoryLabel}</div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{product.longDescription}</p>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Quotation context</div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              This page explains a technology type HACIEN can review. Final model, quantity, pricing,
              warranty, supplier availability, delivery terms, and payment review are confirmed before any
              official order or invoice step.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold text-blue-800">
                {stockBadgeLabel}
              </span>
              <span className="rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-bold text-amber-800">
                Price context review available
              </span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                "Quantity and deployment size",
                "Preferred brand or equivalent rules",
                "Performance or compatibility needs",
                "Warranty and support expectations",
                "Delivery location and deadline",
                "BOQ, specification, image, or existing quote",
              ].map((item) => (
                <div key={item} className="rounded border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-bold text-slate-950">Typical sourcing targets</h2>
            <ul className="mt-4 grid gap-3 text-sm text-slate-700">
              {product.specs.map((spec) => (
                <li key={spec} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#1457d9]" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <h2 className="font-bold text-slate-950">Technical specification table</h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                These are RFQ planning targets, not guaranteed stock, pricing, or final model commitments.
              </p>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                <thead className="bg-white text-xs uppercase tracking-[0.12em] text-slate-500">
                  <tr>
                    <th scope="col" className="border-b border-slate-200 px-5 py-3 font-bold">
                      Field
                    </th>
                    <th scope="col" className="border-b border-slate-200 px-5 py-3 font-bold">
                      RFQ target
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {product.technicalSpecs.map((spec) => (
                    <tr key={spec.label}>
                      <th scope="row" className="w-48 px-5 py-4 align-top font-semibold text-slate-950">
                        {spec.label}
                      </th>
                      <td className="px-5 py-4 leading-6 text-slate-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 rounded border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-slate-700">
            <strong className="text-slate-950">Procurement note:</strong> {product.procurementNotes}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {canRequestQuote(product) ? (
              <button
                type="button"
                onClick={handleAddToRfq}
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white hover:bg-[#0f46b4]"
              >
                Add to RFQ
              </button>
            ) : null}
            <Link
              href="/quote"
              className="interactive-link focus-ring rounded border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900"
            >
              Continue to RFQ
            </Link>
            <Link
              href="/products"
              className="interactive-link focus-ring rounded border border-slate-300 px-5 py-3 text-sm font-bold text-slate-900"
            >
              View technology areas
            </Link>
            <Link
              href={`/quote?product=${encodeURIComponent(product.slug)}&context=price-review`}
              className="interactive-link focus-ring rounded border border-amber-300 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-900"
            >
              Request price context review
            </Link>
          </div>
          {priceText ? <p className="mt-4 text-sm font-semibold text-slate-900">Starting at {priceText}</p> : null}
          {showManualPaymentIntent ? (
            <div className="mt-8">
              <div className="mb-3 text-sm font-bold text-slate-950">Manual payment review</div>
              <ManualPaymentIntentForm
                productId={product.id}
                publicationId={product.erpPublicationId || ""}
                sku={product.sku}
                name={product.name}
                sourceUrl={`/product/${product.slug}`}
              />
              <p className="mt-3 text-xs leading-5 text-slate-500">
                This creates an ERP order intent for review. It does not create an official order, invoice,
                receipt, or paid transaction.
              </p>
            </div>
          ) : canCheckout(product) ? (
            <p className="mt-4 rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-800">
              Order intent is available only after ERP publication settings enable manual payment review.
            </p>
          ) : null}
          {showSandboxPaymentNotice ? (
            <p className="mt-4 rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
              Sandbox payment testing is enabled for this ERP publication. Live payment collection is not enabled.
            </p>
          ) : null}
          {added ? (
            <p className="mt-4 rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
              Added to the RFQ package. Continue to RFQ when ready to submit.
            </p>
          ) : null}
        </div>
        </SlideUp>
      </div>
    </section>
  );
}
