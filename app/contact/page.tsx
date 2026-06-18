import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact HACIEN for IT procurement, quote requests, supplier partnerships, and government procurement support.",
};

export default function ContactPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact HACIEN"
          title="Talk to us about sourcing, procurement, or IT project support."
          description="Use the forms below for quote requests, supplier partnership inquiries, government procurement needs, or systems integration projects."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="surface rounded-lg p-5">
            <div className="text-sm font-bold text-slate-950">Sales and RFQ</div>
            <a className="mt-2 block text-sm text-[#1457d9]" href="mailto:sales@haciensolutions.com">
              sales@haciensolutions.com
            </a>
          </div>
          <div className="surface rounded-lg p-5">
            <div className="text-sm font-bold text-slate-950">Business address</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center,
              San Antonio, Pasig City.
            </p>
          </div>
          <div className="surface rounded-lg p-5">
            <div className="text-sm font-bold text-slate-950">Inquiry categories</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Request a quote, supplier partnership, government procurement support,
              systems integration, and project-based IT support.
            </p>
          </div>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <QuoteRequestForm />
          <ContactForm type="Supplier" />
        </div>
      </div>
    </section>
  );
}
