import type { Metadata } from "next";
import { QuoteCart } from "@/components/QuoteCart";
import { PremiumPageHero } from "@/components/PremiumPageHero";

export const metadata: Metadata = {
  title: "Universal RFQ Gateway",
  description:
    "Submit an RFQ procurement request to HACIEN with or without catalog products. No online payment is collected.",
};

export default function QuotePage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";

  return (
    <>
      <PremiumPageHero
        eyebrow="Universal Gateway Intake"
        title="Start with the requirement. Catalog is optional."
        description="Describe the need, upload a BOQ, send government specifications, attach an existing supplier quote, use catalog items, or simply explain the outcome. Every path enters HACIEN through the Gateway before any Opportunity is created."
        image="commandCenter"
        primaryAction={{ href: "#rfq-form", label: "Start RFQ" }}
        secondaryAction={{ href: "/products", label: "Use RFQ Builder" }}
        highlights={[
          { label: "Free Text", text: "Describe the business need in plain language." },
          { label: "Files", text: "Attach BOQ, supplier quote, specs, image, Excel, PDF, or ZIP." },
          { label: "Reference", text: "Receive a tracking reference after submission." },
          { label: "Review First", text: "HACIEN reviews before creating an Opportunity." },
        ]}
      />

      <section id="rfq-form" className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <QuoteCart turnstileSiteKey={turnstileSiteKey} />
        </div>
      </section>
    </>
  );
}
