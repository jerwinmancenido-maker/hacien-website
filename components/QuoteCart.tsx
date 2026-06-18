"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useQuoteCart } from "@/components/QuoteCartProvider";
import { formatPeso } from "@/lib/format";
import { AnimatedCard, StaggerContainer } from "@/components/motion";
import { sendInquiryEmail } from "@/app/actions/send-inquiry";

export function QuoteCart() {
  const { items, updateQuantity, removeItem, clearCart } = useQuoteCart();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const estimatedTotal = items.reduce(
    (sum, item) => sum + item.product.estimatedPrice * item.quantity,
    0,
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    const honeypot = data.get("_website") as string;
    if (honeypot) return;

    const itemLines = items.map(
      (item) =>
        `${item.product.id} — ${item.product.name} x${item.quantity} @ ${formatPeso(item.product.estimatedPrice)} each = ${formatPeso(item.product.estimatedPrice * item.quantity)}`,
    );

    const payload: Record<string, unknown> = {
      type: "Quote Cart RFQ",
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      phone: data.get("phone"),
      location: data.get("location"),
      notes: data.get("notes"),
      items: itemLines.join("\n"),
      estimatedTotal: formatPeso(estimatedTotal),
      submittedAt: new Date().toISOString(),
    };

    setStatus("sending");
    const result = await sendInquiryEmail(payload);

    if (result.success) {
      setStatus("success");
      clearCart();
    } else {
      setStatus("error");
      setErrorMessage(result.error || "Unable to send. Please email sales@haciensolutions.com");
    }
  }

  if (status === "success") {
    return (
      <div className="surface motion-slide-up mx-auto max-w-3xl rounded-lg p-8 text-center">
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-[#1457d9]">
          Quote request received
        </div>
        <h1 className="mt-4 text-3xl font-bold text-slate-950">
          Thank you. HACIEN will review your request.
        </h1>
        <p className="mt-4 text-slate-600">
          Your RFQ has been sent to{" "}
          <a href="mailto:sales@haciensolutions.com" className="font-semibold text-[#1457d9]">
            sales@haciensolutions.com
          </a>.
          HACIEN will validate specifications, supplier availability, warranty, and final pricing
          and respond within 1–2 business days.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white"
        >
          Continue browsing
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="surface motion-slide-up mx-auto max-w-3xl rounded-lg p-8 text-center">
        <div className="text-sm font-bold uppercase tracking-[0.18em] text-red-600">
          Unable to send
        </div>
        <h1 className="mt-4 text-2xl font-bold text-slate-950">
          Your quote request could not be sent.
        </h1>
        <p className="mt-4 text-slate-600">
          {errorMessage}. Please email your request directly to{" "}
          <a href="mailto:sales@haciensolutions.com" className="font-semibold text-[#1457d9]">
            sales@haciensolutions.com
          </a>.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 rounded border border-red-300 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="surface rounded-lg p-6">
        <h2 className="text-xl font-bold text-slate-950">Quote cart</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          {[
            "Select Products",
            "Submit RFQ",
            "HACIEN Reviews",
            "Formal Quote",
          ].map((stepText, index) => (
            <div
              key={stepText}
              className="rounded border border-slate-200 bg-white p-3 text-sm"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                {index + 1}
              </div>
              <div className="mt-2 font-semibold text-slate-800">{stepText}</div>
            </div>
          ))}
        </div>
        {items.length === 0 ? (
          <div className="mt-6 rounded border border-dashed border-blue-200 bg-blue-50/60 p-8 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-lg font-bold text-[#1457d9] shadow-sm">
              RFQ
            </div>
            <p className="mt-4 font-semibold text-slate-800">
              Your quote cart is ready for product selection.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add items from the catalog and HACIEN will validate specs, supplier
              availability, warranty, and final pricing.
            </p>
            <Link
              href="/products"
              className="button-glow mt-5 inline-flex rounded bg-[#071426] px-4 py-2 text-sm font-bold text-white"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <StaggerContainer className="mt-6 grid gap-4">
            {items.map((item) => (
              <AnimatedCard
                key={item.product.id}
                className="rounded border border-slate-200 bg-white p-4"
              >
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
                      onChange={(event) =>
                        updateQuantity(item.product.id, Number(event.target.value))
                      }
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
              <div className="text-sm text-slate-300">
                Indicative total for quotation basis
              </div>
              <div className="mt-1 text-2xl font-bold">{formatPeso(estimatedTotal)}</div>
            </div>
          </StaggerContainer>
        )}
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="surface rounded-lg p-6">
        <h2 className="text-xl font-bold text-slate-950">Request quotation</h2>
        <p className="mt-2 text-sm text-slate-600">
          No online payment will be collected. Prices are indicative and subject to supplier
          availability. HACIEN will validate availability, specifications, and final pricing.
        </p>

        {/* Honeypot */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label>
            Website
            <input type="text" name="_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

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
                name={key}
                className="rounded border border-slate-300 px-3 py-2 font-normal"
              />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-semibold text-slate-700">
            Notes / specifications
            <textarea
              name="notes"
              rows={5}
              className="rounded border border-slate-300 px-3 py-2 font-normal"
            />
          </label>

          <p className="text-xs text-slate-500">
            By submitting, you agree to our{" "}
            <Link href="/privacy" className="font-semibold text-[#1457d9] hover:underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="font-semibold text-[#1457d9] hover:underline">
              Terms of Use
            </Link>.
          </p>

          <button
            type="submit"
            disabled={items.length === 0 || status === "sending"}
            className="button-glow rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {status === "sending" ? "Sending..." : "Submit Request for Quotation"}
          </button>
        </div>
      </form>
    </div>
  );
}
