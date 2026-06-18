import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";

export default function GovernmentProcurementPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <SectionHeading
            eyebrow="Government Procurement"
            title="Supplier-ready support for public sector and institutional IT requirements."
            description="HACIEN supports RFQ-driven buying with product sourcing, specification matching, equivalent options, delivery planning, and procurement documentation support."
          />
          <div className="mt-10 grid gap-4">
            {[
              "Product specification review and approved equivalent matching",
              "Supplier coordination for availability, warranty, and lead time",
              "Quotation support for hardware, software, network, and security needs",
              "Project delivery coordination for government and institutional buyers",
            ].map((item) => (
              <div key={item} className="rounded border border-slate-200 bg-white p-5 font-semibold text-slate-800">
                {item}
              </div>
            ))}
          </div>
        </div>
        <ContactForm type="Government" />
      </div>
    </section>
  );
}
