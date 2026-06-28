import Link from "next/link";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { BorderGlow, SpotlightCard } from "@/app/components/reactbits";

const commitments = [
  ["Clear communication", "Requirements, timelines, assumptions, and open questions should be visible before quotation work moves forward."],
  ["Transparent quotations", "Quoted items should be backed by supplier-confirmed availability, warranty, lead time, and delivery context where applicable."],
  ["Procurement accountability", "HACIEN keeps the discussion tied to documents, specifications, supplier inputs, and practical handover needs."],
  ["Practical recommendations", "Recommendations should fit the buyer's environment, not simply push a product class or brand preference."],
  ["Long-term support", "Delivery, warranty, renewal, replacement, and support conversations should remain connected after the first transaction."],
  ["Continuous improvement", "The ERP and portal roadmap is intended to make procurement records clearer and customer follow-up easier over time."],
];

const resources = [
  ["Company Profile", "Coming Soon", "A downloadable overview of HACIEN's company information, positioning, services, and contact details."],
  ["Capability Statement", "Coming Soon", "A concise buyer-facing summary of service coverage, procurement support, and operating focus."],
  ["Service Brochure", "Planned", "A future service overview for IT infrastructure, integration, sourcing, delivery, and support."],
  ["Product Catalog", "Planned", "A structured product category reference. Final pricing, stock, warranty, and models remain RFQ-based."],
  ["Government Procurement Guide", "Planned", "A future guide for specification review, equivalent matching, documentation, and quotation preparation."],
];

const journey = [
  ["Initial discussion", "Confirm buyer context, urgency, location, and procurement path."],
  ["Requirement gathering", "Collect product list, BOQ, specifications, quantities, constraints, and target delivery needs."],
  ["Technical review", "Check completeness, compatibility, equivalents, and questions that may affect quotation quality."],
  ["Supplier sourcing", "Coordinate supplier availability, warranty, lead time, and commercial conditions."],
  ["Quotation", "Prepare formal quotation support using verified inputs and stated assumptions."],
  ["Approval", "Support buyer review, clarification, and selected offer confirmation."],
  ["Procurement", "Coordinate ordering, documentation, supplier communication, and fulfillment readiness."],
  ["Delivery", "Align logistics, receiving requirements, handover details, and implementation context."],
  ["Ongoing support", "Keep warranty, renewal, replacement, and follow-up needs visible after delivery."],
];

export function OurCommitment({ className = "" }: { className?: string }) {
  return (
    <AnimatedSection className={`bg-white px-4 py-18 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Our Commitment</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Dependable procurement support is built from small, visible disciplines.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            HACIEN&apos;s trust promise is practical: communicate clearly, quote responsibly, document assumptions,
            and support the customer beyond the first transaction.
          </p>
        </div>
        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {commitments.map(([title, text]) => (
            <AnimatedCard key={title} className="h-full rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </AnimatedCard>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}

export function CapabilityResources({ inverse = false }: { inverse?: boolean }) {
  return (
    <section className={`${inverse ? "bg-[#071426] text-white" : "bg-slate-50 text-slate-950"} px-4 py-18 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className={`text-xs font-bold uppercase tracking-[0.18em] ${inverse ? "text-blue-300" : "text-[#1457d9]"}`}>
            Capability Resources
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Buyer resources are being prepared without implying documents exist today.
          </h2>
          <p className={`mt-4 text-base leading-7 ${inverse ? "text-slate-300" : "text-slate-600"}`}>
            These resources are placeholders for future downloadable materials. They should only become downloads when approved files are available.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {resources.map(([title, status, text]) => (
            <div
              key={title}
              className={`h-full rounded-lg border p-5 ${
                inverse ? "border-white/12 bg-white/[0.06]" : "border-slate-200 bg-white shadow-sm"
              }`}
            >
              <div className={`text-xs font-bold uppercase tracking-[0.16em] ${inverse ? "text-blue-200" : "text-[#1457d9]"}`}>
                {status}
              </div>
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className={`mt-3 text-sm leading-6 ${inverse ? "text-slate-300" : "text-slate-600"}`}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CustomerJourneyConfidence() {
  return (
    <AnimatedSection className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">What Happens Next</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            New customers should know what happens after they contact HACIEN.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The process may vary by requirement, but the intent is consistent: clarify, validate, quote, procure, deliver, and support with visible context.
          </p>
        </div>
        <div className="progress-line mt-12 grid gap-4">
          {journey.map(([title, text], index) => (
            <BorderGlow key={title} className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1457d9] text-sm font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </div>
            </BorderGlow>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function FutureProofAssets() {
  const assets = [
    "Client success stories",
    "Case studies",
    "Industry references",
    "Partner ecosystem",
    "Awards",
    "Certifications",
    "Customer testimonials",
  ];

  return (
    <section className="bg-white px-4 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Future Proof Assets</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Proof should be added only when it is real, approved, and supportable.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            HACIEN can support richer credibility sections later, but these should remain hidden or clearly marked until actual content is available.
          </p>
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {assets.map((asset) => (
            <div key={asset} className="rounded border border-dashed border-slate-300 bg-slate-50 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Placeholder</div>
              <div className="mt-3 text-sm font-bold text-slate-900">{asset}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustCta() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BorderGlow className="rounded-lg bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Procurement Confidence</div>
              <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                Have a requirement that needs careful review before quotation?
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                Send the requirement, specification, quantity, deadline, and delivery context. HACIEN will help organize the next supplier-ready step.
              </p>
            </div>
            <Link href="/quote" className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]">
              Submit RFQ
            </Link>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}

export function CompanyCredentials() {
  const credentials = [
    ["Company information", "HACIEN Information Technology Solutions operates as a Philippine IT procurement, sourcing, and technology solutions business."],
    ["Industries served", "Business, government, education, healthcare, construction, enterprise, and institutional buyers."],
    ["Core expertise", "IT infrastructure sourcing, systems integration support, software licensing, networking, security, project delivery, and procurement coordination."],
    ["Service coverage", "Requirement review, supplier canvass, quotation support, procurement coordination, delivery planning, and post-delivery follow-up."],
    ["Procurement methodology", "RFQ-first workflow that prioritizes documented requirements, technical validation, supplier confirmation, and clear assumptions."],
    ["Transparency commitment", "Future registrations, permits, memberships, certifications, and downloadable credentials should be added only when verified."],
  ];

  return (
    <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Company Credentials</div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Trust is presented as verifiable operating context, not inflated credentials.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            HACIEN should publish official documents and registrations only when approved copies are available. Until then, the website explains what the company does and how it operates.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {credentials.map(([title, text]) => (
            <SpotlightCard key={title} className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlannedWorkspacePreview({
  eyebrow,
  title,
  description,
  statusNote,
  dashboardTitle,
  modules,
}: {
  eyebrow: string;
  title: string;
  description: string;
  statusNote: string;
  dashboardTitle: string;
  modules: Array<[string, string, string, string]>;
}) {
  return (
    <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">{eyebrow}</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {description}
            </p>
            <div className="mt-6 rounded border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
              {statusNote}
            </div>
          </div>
          <BorderGlow className="rounded-lg bg-white p-4 shadow-2xl shadow-slate-950/10 sm:p-5">
            <div className="rounded border border-slate-200 bg-[#071426] p-4 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">HACIEN Customer Workspace</div>
                  <div className="mt-1 text-lg font-bold">{dashboardTitle}</div>
                </div>
                <span className="rounded-full border border-amber-200/40 bg-amber-300/12 px-3 py-1 text-xs font-bold text-amber-100">
                  Preview Only
                </span>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {modules.map(([title, status, label, text]) => (
                <div key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-950">{title}</h3>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{label}</p>
                    </div>
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1457d9]">
                      {status}
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-5 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
