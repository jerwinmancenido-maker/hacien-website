"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { getCategory } from "@/data/products";
import { getCategoryGuide } from "@/data/categoryGuides";
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
  const guide = getCategoryGuide(product.categorySlug);

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
      <div className={`mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 ${product.image ? "lg:grid-cols-[0.82fr_1.18fr]" : ""}`}>
        {product.image ? (
          <div className="min-w-0">
            <div className="surface overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element -- ERP photo URLs are not in the image optimizer allowlist */}
              <img src={product.image} alt={product.name} fetchPriority="high" className="h-full max-h-[480px] w-full object-cover" />
            </div>
          </div>
        ) : null}

        <div className="min-w-0">
          <div className="text-sm font-semibold text-grey-600">{categoryLabel}</div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-base leading-7 text-grey-600">{product.longDescription}</p>
          {guide ? (
            <div className="mt-6 max-w-3xl">
              <h2 className="text-lg font-bold text-ink">What buyers usually decide first</h2>
              <p className="mt-2 text-sm leading-6 text-grey-700">{guide.whatItIs[0]}</p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-grey-700">
                {guide.specs.slice(0, 3).map((row) => (
                  <li key={row.topic}>
                    <span className="font-bold text-ink">{row.topic}. </span>
                    {row.guidance}
                  </li>
                ))}
              </ul>
              <Link href={`/products/${product.categorySlug}`} className="mt-3 inline-flex text-sm font-bold text-blue hover:underline">
                Read the full {categoryLabel} guide
              </Link>
            </div>
          ) : null}

          <div className="mt-6 rounded-lg border border-grey-200 bg-grey-100 p-5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Quotation review</div>
            <p className="mt-3 text-sm leading-6 text-grey-600">
              This page explains a technology type HACIEN can review. Final model, quantity, pricing,
              warranty, supplier availability, delivery terms, and payment review are confirmed before any
              official order or invoice step.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-grey-200 bg-white px-3 py-1 text-xs font-bold text-grey-700">
                {stockBadgeLabel}
              </span>
              <span className="rounded-full border border-grey-200 bg-white px-3 py-1 text-xs font-bold text-grey-700">
                Price review available
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
                <div key={item} className="rounded border border-grey-200 bg-white px-4 py-3 text-sm font-semibold text-grey-700">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold text-ink sm:text-3xl">Typical request targets</h2>
            <ul className="mt-4 grid gap-3 text-sm text-grey-700">
              {product.specs.map((spec) => (
                <li key={spec} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded bg-blue" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-lg border border-grey-200">
            <div className="flex flex-col gap-1 border-b border-grey-200 bg-grey-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-ink sm:text-3xl">Technical specification table</h2>
                <p className="mt-1 text-sm leading-6 text-grey-600">
                  These are RFQ planning targets, not guaranteed stock, pricing, or final model commitments.
                </p>
              </div>
            </div>
            <div className="w-full max-w-full overflow-x-auto">
              <table className="w-full min-w-0 sm:min-w-[520px] border-collapse text-left text-sm">
                <thead className="hidden sm:table-header-group bg-white text-xs uppercase tracking-[0.12em] text-grey-600">
                  <tr>
                    <th scope="col" className="border-b border-grey-200 px-5 py-3 font-bold">
                      Field
                    </th>
                    <th scope="col" className="border-b border-grey-200 px-5 py-3 font-bold">
                      RFQ target
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {product.technicalSpecs.map((spec) => (
                    <tr key={spec.label} className="flex flex-col px-5 py-3.5 sm:table-row sm:px-0 sm:py-0">
                      <th scope="row" className="font-semibold text-ink sm:w-48 sm:px-5 sm:py-4 sm:align-top">
                        {spec.label}
                      </th>
                      <td className="mt-1 leading-6 text-grey-600 sm:mt-0 sm:px-5 sm:py-4">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 rounded border border-grey-200 bg-grey-50 p-5 text-sm leading-6 text-grey-700">
            <strong className="text-ink">Procurement note:</strong> {product.procurementNotes}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {canRequestQuote(product) ? (
              <button
                type="button"
                onClick={handleAddToRfq}
                className="button-glow focus-ring rounded bg-blue px-5 py-3 text-sm font-bold text-white hover:bg-blue-dark cursor-pointer"
              >
                Add to my request
              </button>
            ) : null}
            <Link
              href="/quote"
              className="interactive-link focus-ring rounded border border-grey-200 px-5 py-3 text-sm font-bold text-ink"
            >
              Continue to my request
            </Link>
            <Link
              href="/products"
              className="interactive-link focus-ring rounded border border-grey-200 px-5 py-3 text-sm font-bold text-ink"
            >
              Browse all products
            </Link>
            <Link
              href={`/quote?product=${encodeURIComponent(product.slug)}&context=price-review`}
              className="interactive-link focus-ring rounded border border-grey-200 bg-white px-5 py-3 text-sm font-bold text-ink hover:bg-grey-50"
            >
              Request a Quote
            </Link>
          </div>
          {priceText ? <p className="mt-4 text-sm font-semibold text-ink">Starting at {priceText}</p> : null}
          {showManualPaymentIntent ? (
            <div className="mt-8">
              <div className="mb-3 text-sm font-bold text-ink">Manual payment review</div>
              <ManualPaymentIntentForm
                productId={product.id}
                publicationId={product.erpPublicationId || ""}
                sku={product.sku}
                name={product.name}
                sourceUrl={`/product/${product.slug}`}
              />
              <p className="mt-3 text-xs leading-5 text-grey-600">
                This creates an ERP order intent for review. It does not create an official order, invoice,
                receipt, or paid transaction.
              </p>
            </div>
          ) : canCheckout(product) ? (
            <p className="mt-4 rounded border border-grey-200 bg-grey-50 px-4 py-3 text-sm font-semibold text-grey-700">
              Order intent is available only after ERP publication settings enable manual payment review.
            </p>
          ) : null}
          {showSandboxPaymentNotice ? (
            <p className="mt-4 rounded border border-grey-200 bg-grey-50 px-4 py-3 text-sm font-semibold text-grey-700">
              Sandbox payment testing is enabled for this ERP publication. Live payment collection is not enabled.
            </p>
          ) : null}
          {added ? (
            <p className="mt-4 rounded border border-grey-200 bg-grey-50 px-4 py-3 text-sm font-semibold text-ink">
              Added to your request. Continue to my request when ready to submit.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
