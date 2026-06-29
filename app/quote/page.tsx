import type { Metadata } from "next";
import { QuoteCart } from "@/components/QuoteCart";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Universal RFQ Gateway",
  description:
    "Submit an RFQ procurement request to HACIEN with or without catalog products. No online payment is collected.",
};

export default function QuotePage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Universal Gateway Intake"
          as="h1"
          title="Start with the requirement. Catalog is optional."
          description="Describe the need, upload a BOQ, send government specifications, attach an existing supplier quote, use catalog items, or simply explain the outcome. Every path enters HACIEN through the Gateway before any Opportunity is created."
        />
        <div className="mt-10">
          <QuoteCart turnstileSiteKey={turnstileSiteKey} />
        </div>
      </div>
    </section>
  );
}
