import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";

export const metadata: Metadata = {
  title: "Government Procurement Support",
  description:
    "HACIEN supports government procurement needs through IT sourcing, specification matching, quotation support, and supplier readiness.",
};

export default function GovernmentProcurementPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <SectionHeading
            eyebrow="Government Procurement"
            as="h1"
            title="Supplier-ready support for public sector and institutional IT requirements."
            description="HACIEN supports RFQ-driven buying with product sourcing, specification matching, equivalent options, delivery planning, and procurement documentation support."
          />
          <StaggerContainer className="mt-10 grid gap-4">
            {[
              "Product specification review and approved equivalent matching",
              "Supplier coordination for availability, warranty, and lead time",
              "Quotation support for hardware, software, network, and security needs",
              "Project delivery coordination for government and institutional buyers",
            ].map((item) => (
              <AnimatedCard key={item} className="rounded border border-slate-200 bg-white p-5 font-semibold text-slate-800">
                {item}
              </AnimatedCard>
            ))}
          </StaggerContainer>
          <AnimatedSection className="mt-10 rounded-lg border border-blue-100 bg-blue-50/60 p-6">
            <h2 className="text-2xl font-bold text-slate-950">Procurement support process</h2>
            <div className="progress-line mt-6 grid gap-4">
              {[
                ["Requirements Review", "Review buyer specifications, compatibility notes, and delivery expectations."],
                ["Product Matching", "Identify compliant or equivalent product options subject to supplier availability."],
                ["Supplier Coordination", "Validate lead time, warranty coverage, and quotation readiness."],
                ["Formal Quotation Support", "Prepare structured offer details without claiming accreditation until finalized."],
              ].map(([step, text], index) => (
                <div key={step} className="relative rounded border border-white bg-white/90 p-5">
                  <div className="flex gap-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#071426] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-bold text-slate-950">{step}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
        <ContactForm type="Government" />
      </div>
    </section>
  );
}
