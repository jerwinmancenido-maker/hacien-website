import type { Metadata } from "next";
import { QuoteCart } from "@/components/QuoteCart";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Submit a request for quotation to HACIEN. No online payment is collected during quote checkout.",
};

export default function QuotePage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Quote Checkout"
          title="Request a quotation, not a paid checkout."
          description="This flow is designed for corporate, government, and project-based IT buying where final specifications, equivalent models, and delivery terms must be verified. Prices are indicative and subject to supplier availability."
        />
        <div className="mt-10">
          <QuoteCart />
        </div>
      </div>
    </section>
  );
}
