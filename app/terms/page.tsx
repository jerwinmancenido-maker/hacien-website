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
          description="The HACIEN website is an information and request-for-quotation channel. Catalog items help describe requirements; they are not paid checkout offers."
        />
        <div className="surface mt-10 grid gap-6 rounded-lg p-6 text-sm leading-7 text-slate-700">
          <p>
            Product descriptions, specifications, and availability notes are provided for quotation preparation only.
            Final offer details depend on supplier availability, brand/model confirmation, warranty terms, lead time,
            and delivery requirements.
          </p>
          <p>
            HACIEN uses legal-safe government procurement support language. This website does not claim PhilGEPS,
            ISO, mayor&apos;s permit, tax-readiness, or other accreditation status unless such status is explicitly
            finalized and published by HACIEN. BIR registration facts may be published separately from tax or
            accounting readiness claims.
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
