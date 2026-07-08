import type { Metadata } from "next";
import faqData from "@/config/faq-data.json";
import { FaqSearch, type FaqSection } from "@/components/FaqSearch";
import { PremiumPageHero } from "@/components/PremiumPageHero";

export const metadata: Metadata = {
  title: "FAQ | HACIEN",
  description: "Search HACIEN RFQ, payment, document, support, and tracking questions with evidence-safe answers.",
};

export default function FaqPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="FAQ"
        title="Evidence-safe answers for HACIEN buyers."
        description="Search common questions about RFQ intake, payment posture, documents, warranty context, and request tracking."
        image="knowledge"
        primaryAction={{ href: "/quote", label: "Start an RFQ" }}
        secondaryAction={{ href: "/help", label: "Open Help Center" }}
        highlights={[
          { label: "RFQ-first", text: "Requests are reviewed before business records." },
          { label: "No checkout claim", text: "Live online payment is not claimed here." },
          { label: "Document caution", text: "Official records require approved evidence." },
          { label: "Support path", text: "Track and follow up with request context." },
        ]}
      />
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <FaqSearch sections={faqData.sections as FaqSection[]} />
        </div>
      </section>
    </>
  );
}
