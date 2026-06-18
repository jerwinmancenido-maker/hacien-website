import { ContactForm } from "@/components/ContactForm";
import { QuoteRequestForm } from "@/components/QuoteRequestForm";
import { SectionHeading } from "@/components/SectionHeading";

export default function ContactPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact HACIEN"
          title="Talk to us about sourcing, procurement, or IT project support."
          description="Use the forms below for quote requests, supplier partnership inquiries, government procurement needs, or systems integration projects."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <QuoteRequestForm />
          <ContactForm type="Supplier" />
        </div>
      </div>
    </section>
  );
}
