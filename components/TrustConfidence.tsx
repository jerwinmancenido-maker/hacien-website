import Link from "next/link";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { BorderGlow, SpotlightCard } from "@/app/components/reactbits";
import {
  registeredCompanyName,
  registrationPapersNote,
  registrationStatuses,
} from "@/data/companyContact";

const commitments = [
  ["Clear communication", "Requirements, timelines, assumptions, and open questions should be visible before quotation work moves forward."],
  ["Transparent quotations", "Quoted items should be backed by request-specific supplier inputs, warranty evidence, lead time, and delivery details where applicable."],
  ["Procurement accountability", "HACIEN keeps the discussion tied to documents, specifications, supplier inputs, and practical closeout needs without treating unverified inputs as final."],
  ["Practical recommendations", "Recommendations should fit the buyer's environment, not simply push a product class or brand preference."],
  ["Long-term support", "Delivery, warranty, renewal, replacement, and support conversations should remain connected when a formal transaction record exists."],
  ["Continuous improvement", "Customer follow-up should become clearer every time HACIEN learns from real procurement work."],
];

const resources = [
  ["Company Profile", "Available", "A public overview of HACIEN's company information, positioning, services, and contact details."],
  ["Capability Statement", "Upon request", "A concise buyer-facing summary of service coverage, procurement support, and operating focus."],
  ["Service Overview", "Upon request", "A service overview for IT infrastructure, integration, delivery, and support."],
  ["Product Catalog", "RFQ-based", "A structured product category reference. Final pricing, stock, warranty, and models require request-specific supplier evidence and quotation review."],
  ["Institutional RFQ Support", "Available", "Guidance for specification review, equivalent matching, documentation, and quotation preparation."],
];

const journey = [
  ["Initial discussion", "Confirm buyer details, urgency, location, and purchase path."],
  ["Requirement gathering", "Collect product list, BOQ, specifications, quantities, constraints, and target delivery needs."],
  ["Technical review", "Check completeness, compatibility, equivalents, and questions that may affect quotation quality."],
  ["Supplier review", "Review supplier availability, warranty, lead time, and commercial-condition inputs where available."],
  ["Quotation", "Prepare quotation support using reviewed inputs and stated assumptions."],
  ["Approval", "Support buyer review, clarification, and selected offer confirmation."],
  ["Procurement", "Coordinate ordering and documentation only when formal transaction terms support it."],
  ["Delivery", "Align logistics, receiving requirements, closeout details, and implementation notes when delivery is in scope."],
  ["Ongoing support", "Keep warranty, renewal, replacement, and follow-up needs visible when post-delivery records exist."],
];

export function OurCommitment({ className = "" }: { className?: string }) {
  return (
    <AnimatedSection className={`bg-white px-4 py-12 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Our Commitment</div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
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
    <section className={`${inverse ? "bg-[#0A0A0A] text-white" : "bg-slate-50 text-slate-950"} px-4 py-12 sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className={`text-xs font-bold uppercase tracking-[0.18em] ${inverse ? "text-blue-300" : "text-[#2563EB]"}`}>
            Capability Resources
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Buyer resources are handled with the same discipline as quotations.
          </h2>
          <p className={`mt-4 text-base leading-7 ${inverse ? "text-grey-300" : "text-grey-600"}`}>
            Public resources stay concise. More detailed materials can be shared directly when they match the buyer, supplier, or request.
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
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue">
                {status}
              </div>
              <h3 className="mt-4 text-base font-bold">{title}</h3>
              <p className={`mt-3 text-sm leading-6 ${inverse ? "text-grey-300" : "text-grey-600"}`}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CustomerJourneyConfidence() {
  return (
    <AnimatedSection className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">What Happens Next</div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            New customers should know what happens after they contact HACIEN.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            The process may vary by requirement, but the intent is consistent: clarify, validate, quote, procure, deliver, and support with visible records.
          </p>
        </div>
        <div className="progress-line mt-12 grid gap-4">
          {journey.map(([title, text], index) => (
            <BorderGlow key={title} className="rounded-lg bg-white p-5 shadow-sm">
              <div className="flex gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded bg-[#2563EB] text-sm font-bold text-white">
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
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Future Proof Assets</div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
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
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BorderGlow className="rounded-lg bg-[#0A0A0A] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Procurement Confidence</div>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
                Have a requirement that needs careful review before quotation?
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-grey-300">
                Send the requirement, specification, quantity, deadline, and delivery details. HACIEN will help organize the next RFQ step.
              </p>
            </div>
            <Link href="/quote" className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#0A0A0A]">
              Request a Quote
            </Link>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}

export function CompanyCredentials() {
  return (
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Registrations</div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {registeredCompanyName}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{registrationPapersNote}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {registrationStatuses.map((item) => (
            <SpotlightCard key={item.label} className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-950">{item.label}</h3>
              {item.status ? <p className="mt-3 text-sm leading-6 text-slate-600">{item.status}</p> : null}
            </SpotlightCard>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/compliance" className="text-sm font-bold text-[#2563EB] hover:underline">
            See Government Compliance
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ControlledAccessPreview({
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
    <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">{eyebrow}</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {description}
            </p>
            <div className="mt-6 rounded border border-amber-200 bg-amber-50 p-4 text-sm font-semibold leading-6 text-amber-900">
              {statusNote}
            </div>
          </div>
          <BorderGlow className="rounded-lg bg-white p-4 sm:p-5">
            <div className="rounded border border-slate-200 bg-[#0A0A0A] p-4 text-white">
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
                    <span className="rounded-full border border-blue-100 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2563EB]">
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
