import type { Metadata } from "next";
import { QuoteCart } from "@/components/QuoteCart";
import { BuyingTimeline } from "@/components/BuyingTimeline";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Request a quotation",
  description: "Attach an item list, a supplier quote, an image, a spreadsheet, a PDF, or a ZIP.",
  path: "/quote",
});

export default function QuotePage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";

  return (
    <>
      <PremiumPageHero
        eyebrow="Quotation request"
        title="Request a quotation."
        description="Attach an item list, a supplier quote, an image, a spreadsheet, a PDF, or a ZIP."
        image="commandCenter"
        primaryAction={{ href: "#rfq-form", label: "Request a Quote" }}
        secondaryAction={{ href: "/products", label: "Technology list" }}
        highlights={[
          { label: "Plain description", text: "Describe the product, quantity, delivery location, and deadline." },
          { label: "Reference", text: "You receive a reference number after you send the request." },
        ]}
      />

      <BuyingTimeline />

      <section id="rfq-form" className="scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <QuoteCart turnstileSiteKey={turnstileSiteKey} />
        </div>
      </section>
    </>
  );
}
