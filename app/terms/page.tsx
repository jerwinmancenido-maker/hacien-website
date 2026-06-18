import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for HACIEN Information Technology Solutions website, catalog, and RFQ flow.",
};

export default function TermsPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Terms"
          as="h1"
          title="Terms of Use"
          description="The HACIEN website is an information and request-for-quotation channel. Catalog prices are indicative and are not paid checkout prices."
        />
        <div className="surface mt-10 grid gap-6 rounded-lg p-6 text-sm leading-7 text-slate-700">
          <p>
            Product descriptions, specifications, availability notes, and indicative prices are provided for
            quotation preparation only. Final offer details depend on supplier availability, brand/model confirmation,
            warranty terms, lead time, and delivery requirements.
          </p>
          <p>
            HACIEN uses legal-safe government procurement support language. This website does not claim PhilGEPS,
            BIR, ISO, mayor&apos;s permit, or other accreditation status unless such status is explicitly finalized
            and published by HACIEN.
          </p>
          <p>
            Submitting an RFQ or inquiry does not create a purchase order, sales contract, payment obligation, or
            official quotation until HACIEN issues a formal response through an authorized channel.
          </p>
        </div>
      </div>
    </section>
  );
}
