import type { Metadata } from "next";
import { ChatInvitation } from "@/components/ChatInvitation";
import { BuyingTimeline } from "@/components/BuyingTimeline";
import billingSettings from "@/config/billing-compliance-settings.json";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Request a quotation",
  description: "Attach an item list, a supplier quote, an image, a spreadsheet, a PDF, or a ZIP.",
  path: "/quote",
});

export default function QuotePage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Quotation request"
        title="Request a quotation."
        description="Attach an item list, a supplier quote, an image, a spreadsheet, a PDF, or a ZIP."
        image="commandCenter"
        primaryAction={{ href: "#start-chat", label: "Request a Quote" }}
        secondaryAction={{ href: "/products", label: "Product list" }}
        highlights={[
          { label: "Plain description", text: "Describe the product, quantity, delivery location, and deadline." },
          { label: "Reference", text: "You receive a reference number after you send the request." },
        ]}
      />

      <BuyingTimeline />

      <section id="start-chat" className="scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <ChatInvitation
            heading="Start in the chat"
            text="Tap below and answer a few questions. A real person from the HACIEN team reads every request and replies within 1 business day."
            buttonLabel="Start a quotation request"
            note="Built a requirement package on the Products page? It carries into the chat automatically."
          />
          <div className="mx-auto mt-6 max-w-3xl space-y-4">
            <p className="rounded border border-grey-200 bg-grey-100 p-3 text-xs leading-5 text-grey-600">
              <span className="font-bold text-slate-800">Please note:</span>{" "}
              Every request is reviewed before a quotation is prepared. No online payment is collected.
            </p>
            <div className="rounded-lg border border-grey-200 bg-grey-50 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-grey-700">
                {billingSettings.quote_validity_badge_label}
              </div>
              <p className="mt-2 text-xs leading-5 text-grey-700">{billingSettings.quote_validity_disclaimer}</p>
              <p className="mt-2 text-xs leading-5 text-grey-600">{billingSettings.compliance_disclaimer}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
