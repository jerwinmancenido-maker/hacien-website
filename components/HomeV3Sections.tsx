import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { EnterprisePhotoPanel, PremiumStatementBand, enterpriseImages } from "@/components/EnterpriseImagery";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { categories } from "@/data/products";
import { solutions } from "@/data/solutions";

const ecosystem = [
  ["Requirement context", "Business need, site conditions, users, quantities, deadline, and approval path."],
  ["Specification review", "Performance needs, compatibility, equivalent options, and missing details."],
  ["Supplier readiness", "Availability, warranty, lead time, commercial assumptions, and delivery constraints."],
  ["Quotation package", "Clear item context, assumptions, exclusions, validity, and next steps."],
  ["Delivery planning", "Receiving needs, handover records, schedule expectations, and follow-up context."],
  ["Relationship continuity", "Each request remains part of one customer relationship, not a forgotten email thread."],
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

const govFlow = ["RFQ", "Specification Matching", "Equivalent Review", "Supplier Availability", "Quotation Support", "Delivery Coordination"];

const solutionImages: Record<string, keyof typeof enterpriseImages> = {
  "it-infrastructure": "dataCenter",
  "hardware-software-procurement": "workstation",
  "systems-integration": "commandCenter",
  "managed-it-support": "office",
  "network-connectivity": "network",
  "servers-storage": "storage",
  "cloud-productivity": "cloud",
  cybersecurity: "cybersecurity",
  "security-surveillance": "cabling",
  "software-licensing": "silicon",
  "general-merchandise-procurement": "documentation",
  "project-delivery-support": "workspace",
};

const categoryImages: Record<string, keyof typeof enterpriseImages> = {
  "computers-laptops": "workstation",
  "servers-storage": "storage",
  "network-equipment": "network",
  "printers-peripherals": "office",
  "licensed-software": "silicon",
  "security-surveillance": "cybersecurity",
};

export function TechnologyEcosystem() {
  return (
    <AnimatedSection className="bg-[#071426] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">RFQ Readiness</div>
          <h2 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">From rough requirement to supplier-ready request.</h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            The first job is not to sell a model. It is to make the request clear enough for accurate review, responsible sourcing, and formal quotation.
          </p>
          <StaggerContainer className="mt-10 grid gap-3 sm:grid-cols-2">
            {ecosystem.map(([title, detail]) => (
              <AnimatedCard key={title} className="group rounded-lg border border-white/12 bg-white/[0.06] p-5 backdrop-blur">
                <div className="text-base font-bold">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
        <EnterprisePhotoPanel
          image="silicon"
          eyebrow="Procurement Clarity"
          title="Better quotations start with better requirements."
          caption="HACIEN keeps the buyer focused on context, assumptions, equivalents, supplier readiness, and the next practical step."
        />
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
          title="A relationship workflow, not a generic contact form."
          description="The public RFQ experience mirrors how technology requirements really move: from description or files to review, clarification, quotation support, fulfillment, and continuity."
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
          description="Solutions answer the problems HACIEN helps organizations solve across infrastructure, workplace, cybersecurity, cloud, procurement, and managed services."
        />
        <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.slice(0, 6).map((solution) => (
            <Link key={solution.slug} href={`/solutions/${solution.slug}`} className="group block">
              <AnimatedCard className="surface lift h-full overflow-hidden rounded-xl">
                <div
                  className="relative h-40 border-b border-slate-200 bg-slate-950 p-5"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.04), rgba(7, 20, 38, 0.76)), url(${enterpriseImages[solutionImages[solution.slug] || "network"]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="grid h-12 w-12 place-items-center rounded bg-white/90 text-xs font-bold text-[#071426] shadow-lg shadow-slate-950/20">{solution.icon}</div>
                </div>
                <div className="p-6">
                  <div className="text-xl font-bold text-slate-950 group-hover:text-[#1457d9]">{solution.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{solution.summary}</p>
                  <div className="mt-5 text-sm font-bold text-[#1457d9]">Explore solution</div>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </StaggerContainer>
        <div className="mt-10">
          <Link href="/solutions" className="interactive-link text-sm font-bold text-[#1457d9] hover:underline">
            View all solutions →
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ProductCatalogV3() {
  return (
    <AnimatedSection className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
          <SectionHeading
          eyebrow="Technology"
          title="Enterprise technology domains presented as operating needs."
          description="HACIEN does not lead with model numbers or prices. Technology pages help buyers describe the domain they need before formal review."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category) => (
            <Link key={category.slug} href={`/products/${category.slug}`} className="group block">
              <AnimatedCard className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                <div
                  className="h-32 bg-slate-950"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.06), rgba(7, 20, 38, 0.7)), url(${enterpriseImages[categoryImages[category.slug] || "dataCenter"]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
                <div className="p-7">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">Technology</div>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 group-hover:text-[#1457d9]">{category.name}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{category.summary}</p>
                <div className="mt-8 text-sm font-bold text-[#1457d9]">Build this requirement</div>
                </div>
              </AnimatedCard>
            </Link>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

export function ErpPreviewV3() {
  const platformLayers = [
    ["Workspace", "Secure internal operations"],
    ["Timeline", "Relationship memory"],
    ["Guardian", "Operational guidance"],
    ["Customer Workspace", "Future customer continuity"],
  ];

  return (
    <AnimatedSection className="bg-[#0b1220] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">HACIEN Platform</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">HACIEN operates through its own connected platform.</h2>
            <p className="mt-5 leading-7 text-slate-300">
              Workspace, Timeline, Guardian, and Customer Workspace exist to keep requests, operations, and relationship history connected. Future commercial availability will be announced only when mature.
            </p>
            <Link href="/platform" className="button-glow mt-8 inline-flex rounded bg-white px-5 py-3 text-sm font-bold text-[#071426]">
              Explore Platform
            </Link>
          </div>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {platformLayers.map(([title, text], index) => (
              <div key={title} className="rounded-lg border border-white/12 bg-white/[0.07] p-5">
                <div className="text-xs font-bold text-blue-200">0{index + 1}</div>
                <div className="mt-3 text-lg font-bold">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
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
    ["Verified identity", "DTI and BIR registration facts are available through the company profile and Trust & Compliance pages."],
    ["Quotation discipline", "Pricing, warranty, delivery, payment, and tax treatment are confirmed through formal quotation and written communication."],
    ["Relationship continuity", "Inquiries, quotations, delivery, support, and follow-up are treated as one continuing customer relationship."],
  ];

  return (
    <AnimatedSection className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Trust & Confidence"
          title="Trust without overstatement."
          description="HACIEN keeps public claims bounded, formal terms document-controlled, and customer communication clear."
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

export { PremiumStatementBand };

export function ExistingCustomerV3() {
  return (
    <AnimatedSection className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Access HACIEN</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Continue through one connected access point.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              Internal personnel can open Workspace. Customers can track requests, learn about the future Customer Workspace, or contact HACIEN for support.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/access"
              className="interactive-link rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-bold text-slate-900 hover:border-[#1457d9] hover:text-[#1457d9]"
            >
              Access HACIEN
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
