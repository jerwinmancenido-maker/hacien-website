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
        title="Send the requirement in whatever form you have."
        description="Use a BOQ, supplier quote, photo, spreadsheet, product link, or plain description. HACIEN reviews the context before any formal quote or business record is treated as ready."
        image="commandCenter"
        primaryAction={{ href: "#rfq-form", label: "Start RFQ" }}
        secondaryAction={{ href: "/products", label: "Use RFQ Builder" }}
        highlights={[
          { label: "Plain language", text: "Describe the need without perfect specs." },
          { label: "Files", text: "Attach BOQ, quote, image, spreadsheet, PDF, or ZIP." },
          { label: "Reference", text: "Receive a tracking reference after submission." },
          { label: "Review first", text: "HACIEN reviews before formal next steps." },
        ]}
      />

      <section id="rfq-form" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <QuoteCart turnstileSiteKey={turnstileSiteKey} />
        </div>
      </section>
    </>
  );
}
