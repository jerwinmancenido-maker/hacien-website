import type { Metadata } from "next";
import { QuoteCart } from "@/components/QuoteCart";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "RFQ Cart",
  description:
    "Submit an RFQ procurement request to HACIEN. No online payment is collected.",
};

export default function QuotePage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Quote Checkout"
          as="h1"
          title="Request quotation, not checkout."
          description="This RFQ flow is designed for corporate, government, education, reseller, and project-based IT buying where final specifications, equivalent models, supplier availability, warranty, and delivery terms must be verified."
        />
        <div className="mt-10">
          <QuoteCart />
        </div>
      </div>
    </section>
  );
}
