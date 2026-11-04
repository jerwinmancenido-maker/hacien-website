"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuoteCart } from "@/components/QuoteCartProvider";

/**
 * The simple front door for /products. One description box, one button.
 * The detailed RequirementBuilder stays available, collapsed, for buyers
 * who want to specify every field — it is no longer the first thing a
 * customer has to build.
 */
export function SimpleRequestBox() {
  const router = useRouter();
  const { addRequirement } = useQuoteCart();
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");

  function handleSend() {
    const text = description.trim();
    if (!text) return;
    addRequirement({
      category: "other",
      categoryLabel: "Other / Not Listed",
      quantity: quantity || "1",
      brandPreference: "Any suitable option",
      otherBrand: "",
      equivalentAccepted: "Not sure",
      deadline: "",
      deliveryLocation: "",
      notes: text,
      fields: { "Describe what you need": text },
    });
    router.push("/quote");
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Simple request</div>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
        What do you need?
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        Type it in your own words — a model, a list, or just what it is for. HACIEN checks
        suppliers and sends a quotation within 1 business day. No package to build.
      </p>
      <label htmlFor="simple-request-description" className="mt-6 block text-sm font-semibold text-slate-700">
        Describe what you need
      </label>
      <textarea
        id="simple-request-description"
        rows={4}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Example: 10 laptops for office work, Dell or similar, 16GB, with monitors"
        className="mt-2 w-full rounded border border-slate-200 px-3 py-2 text-sm leading-6"
      />
      <div className="mt-4">
        <label htmlFor="simple-request-quantity" className="block text-sm font-semibold text-slate-700">
          Quantity <span className="font-normal text-slate-600">(optional)</span>
        </label>
        <input
          id="simple-request-quantity"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          className="mt-2 w-full max-w-[160px] rounded border border-slate-200 px-3 py-2 text-sm sm:w-auto"
        />
      </div>
      <button
        type="button"
        onClick={handleSend}
        disabled={!description.trim()}
        className="mt-6 rounded bg-[#2563EB] px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
      >
        Send this request
      </button>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Sending takes you to the quotation form, where you add your contact details.
      </p>
    </section>
  );
}
