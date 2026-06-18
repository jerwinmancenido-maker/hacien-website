import { QuoteCart } from "@/components/QuoteCart";
import { SectionHeading } from "@/components/SectionHeading";

export default function QuotePage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Quote Checkout"
          title="Request a quotation, not a paid checkout."
          description="This flow is designed for corporate, government, and project-based IT buying where final specifications, equivalent models, and delivery terms must be verified."
        />
        <div className="mt-10">
          <QuoteCart />
        </div>
      </div>
    </section>
  );
}
