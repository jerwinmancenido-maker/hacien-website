import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { products } from "@/data/products";
import { solutions } from "@/data/solutions";

const ecosystem = [
  ["End User Computing", "Dell Latitude, Lenovo ThinkPad, HP ProDesk class devices"],
  ["Servers & Storage", "Synology NAS, tower/rack servers, backup storage"],
  ["Networking", "Cisco-class switching, WiFi, routing, structured connectivity"],
  ["Security", "Fortinet-class firewall options, CCTV, endpoint protection"],
  ["Cloud & Software", "Microsoft 365, productivity, security, business apps"],
  ["Power & Infrastructure", "UPS, racks, cabling, peripherals, consumables"],
];

const howItWorks = [
  ["Requirements Gathering", "Capture business need, site context, specs, quantity, budget range, and target delivery timeline."],
  ["Product Matching", "Translate buyer requirements into viable branded or equivalent technology options."],
  ["Supplier Canvass", "Coordinate availability, warranty, lead time, and procurement constraints across suppliers."],
  ["Quotation", "Prepare formal quotation support with supplier-validated conditions and delivery assumptions."],
  ["Award", "Support buyer-side comparison and selected offer documentation without claiming accreditation."],
  ["Procurement", "Coordinate ordering, fulfillment readiness, and project delivery materials."],
  ["Delivery", "Align delivery coordination, handover needs, and follow-up support."],
];

const erpFlow = ["Lead", "Opportunity", "Supplier Canvass", "Quotation", "Award", "PO", "Delivery", "Invoice"];
const govFlow = ["RFQ", "Specification Matching", "Equivalent Review", "Supplier Availability", "Quotation Support", "Delivery Coordination"];

export function TechnologyEcosystem() {
  return (
    <AnimatedSection className="bg-[#071426] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Technology Ecosystem</div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Sourced technologies for real IT environments.</h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            HACIEN presents representative technologies as sourcing categories, not partner badges or reseller claims.
            Brand and model availability are confirmed during quotation.
          </p>
        </div>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2">
          {ecosystem.map(([title, detail]) => (
            <AnimatedCard key={title} className="group rounded-lg border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
                </div>
                <div className="h-9 w-9 rounded-full border border-blue-300/40 bg-blue-300/10 transition-transform group-hover:scale-110" />
              </div>
            </AnimatedCard>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}

export function HowHacienWorks() {
  return (
    <AnimatedSection className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How HACIEN Works"
          title="A procurement workflow, not a generic contact form."
          description="The public RFQ experience mirrors how IT requirements really move: from specifications to supplier canvass, quotation support, award, procurement, and delivery coordination."
        />
        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <div className="grid divide-y divide-slate-200 lg:grid-cols-7 lg:divide-x lg:divide-y-0">
            {howItWorks.map(([title, text], index) => (
              <details key={title} className="group p-5 open:bg-white">
                <summary className="cursor-pointer list-none">
                  <div className="grid h-10 w-10 place-items-center rounded bg-[#071426] text-sm font-bold text-white">{index + 1}</div>
                  <div className="mt-4 font-bold text-slate-950">{title}</div>
                </summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function SolutionsV3() {
  return (
    <AnimatedSection className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Solutions"
          title="Built around sourcing, deployment, and operational handover."
          description="Every solution path leads to a real page with procurement workflow context."
        />
        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Link key={solution.slug} href={`/solutions/${solution.slug}`} className="group block">
              <AnimatedCard className="surface lift h-full overflow-hidden rounded-xl">
                <div className="animated-grid h-32 border-b border-slate-200 p-5">
                  <div className="grid h-12 w-12 place-items-center rounded bg-[#071426] text-xs font-bold text-white">{solution.icon}</div>
                </div>
                <div className="p-6">
                  <div className="text-xl font-bold text-slate-950 group-hover:text-[#1457d9]">{solution.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{solution.summary}</p>
                  <div className="mt-5 text-sm font-bold text-[#1457d9]">View workflow</div>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </StaggerContainer>
      </div>
    </AnimatedSection>
  );
}

export function ProductCatalogV3() {
  return (
    <AnimatedSection className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="RFQ Catalog"
          title="Procurement-style product presentation."
          description="Products are shown as representative sourcing classes. Final quotation confirms brand, model, stock, warranty, and lead time."
        />
        <div className="mt-10">
          <ProductGrid products={products.filter((product) => product.featured || product.availability !== "Project order").slice(0, 6)} />
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ErpPreviewV3() {
  return (
    <AnimatedSection className="bg-[#0b1220] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">HACIEN Operations</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Procurement work should stay connected from inquiry to follow-through.</h2>
            <p className="mt-5 leading-7 text-slate-300">
              HACIEN is organized around one operating path: capture the requirement, review the context, quote responsibly, coordinate fulfillment, and keep customer follow-up connected.
            </p>
            <Link href="/erp-platform" className="button-glow mt-8 inline-flex rounded bg-white px-5 py-3 text-sm font-bold text-[#071426]">
              Learn how HACIEN works
            </Link>
          </div>
          <StaggerContainer className="grid gap-3 sm:grid-cols-4">
            {erpFlow.map((step, index) => (
              <div key={step} className="rounded border border-white/12 bg-white/[0.07] p-4">
                <div className="text-xs font-bold text-blue-200">0{index + 1}</div>
                <div className="mt-2 font-bold">{step}</div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function GovernmentV3() {
  return (
    <AnimatedSection className="bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Government Procurement Support</div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight">Documentation-aware sourcing for bid-driven IT needs.</h2>
          <p className="mt-5 leading-7 text-slate-300">
            HACIEN supports requirements review, equivalent matching, supplier availability checks, formal quotation support, and delivery coordination.
          </p>
          <Link href="/government-procurement" className="interactive-link mt-8 inline-flex rounded border border-white/30 px-5 py-3 text-sm font-bold text-white">
            View government support
          </Link>
        </div>
        <div className="progress-line grid gap-4">
          {govFlow.map((step, index) => (
            <div key={step} className="relative rounded border border-white/12 bg-white/[0.07] p-5">
              <div className="flex gap-4">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-500 text-sm font-bold text-white">{index + 1}</div>
                <div className="font-bold">{step}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function TrustV3() {
  const trustCards = [
    ["Procurement-first approach", "HACIEN starts with the requirement, buyer context, deadline, delivery location, and documentation needs before treating a request as ready to quote."],
    ["Technical validation before quotation", "Specifications, equivalents, compatibility, warranty, lead time, and practical constraints are reviewed before formal quotation support."],
    ["Transparent RFQ process", "The RFQ path is designed to clarify what is known, what needs supplier confirmation, and what assumptions affect the final offer."],
    ["Long-term customer partnership", "Customer value should continue after delivery through warranty, renewal, replacement, and support follow-through."],
    ["Project documentation discipline", "Quotations, supplier inputs, delivery context, and handover needs are treated as part of one procurement record."],
    ["Connected operating discipline", "Inquiry, quotation, sourcing, delivery, support, and customer history should remain part of one relationship."],
  ];

  return (
    <AnimatedSection className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trust & Confidence"
          title="Why Organizations Trust HACIEN"
          description="HACIEN builds confidence through practical procurement discipline, not inflated claims. Every trust signal should be visible in how requirements are reviewed, sourced, quoted, delivered, and supported."
        />
        <StaggerContainer className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {trustCards.map(([title, detail]) => (
            <AnimatedCard key={title} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="font-bold text-slate-950">{title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
            </AnimatedCard>
          ))}
        </StaggerContainer>
        <div className="mt-8">
          <Link
            href="/about/company-profile"
            className="interactive-link inline-flex text-sm font-bold text-[#1457d9] hover:underline"
          >
            Read HACIEN company profile →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ExistingCustomerV3() {
  const erpUrl =
    process.env.NEXT_PUBLIC_ERP_URL?.trim() || "https://erp.haciensolutions.com/login";
  const isErpExternal = erpUrl.startsWith("http");

  return (
    <AnimatedSection className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Existing Customers</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Already working with HACIEN?
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              Existing customers can continue through RFQ, tracking, clarification, contact, support, and authorized ERP access where applicable.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={erpUrl}
              target={isErpExternal ? "_blank" : undefined}
              rel={isErpExternal ? "noopener noreferrer" : undefined}
              className="interactive-link rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-bold text-slate-900 hover:border-[#1457d9] hover:text-[#1457d9]"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="button-glow rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
            >
              Contact HACIEN
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export { CTABand };
