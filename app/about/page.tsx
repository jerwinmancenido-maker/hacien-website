import type { Metadata } from "next";
import Link from "next/link";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  Marquee,
  SpotlightCard,
} from "@/app/components/reactbits";
import { EnterprisePhotoPanel } from "@/components/EnterpriseImagery";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { CapabilityResources, CompanyCredentials, FutureProofAssets, OurCommitment } from "@/components/TrustConfidence";

export const metadata: Metadata = {
  title: "About HACIEN | IT Procurement & Technology Solutions",
  description:
    "HACIEN Information Technology Solutions helps Philippine organizations plan, source, procure, implement, and support technology projects through structured IT procurement workflows.",
};

const storySignals = [
  "Multiple suppliers with different formats",
  "Manual follow-ups across calls and email",
  "Inconsistent product specifications",
  "Unclear stock, lead time, and warranty details",
  "Delivery and implementation gaps",
];

const philosophy = [
  {
    title: "Requirements should be documented first.",
    text: "We begin by clarifying the product, technical, delivery, and deadline context before supplier coordination starts.",
  },
  {
    title: "Quotations should be technically useful.",
    text: "Model numbers, approved equivalents, warranty conditions, and availability details are treated as decision inputs, not afterthoughts.",
  },
  {
    title: "Procurement should stay visible.",
    text: "Customers need to know what has been reviewed, what is being sourced, and what still needs confirmation.",
  },
];

const workflow = [
  "Requirement",
  "Technical Review",
  "Supplier Canvass",
  "Quotation",
  "Award",
  "Procurement",
  "Delivery",
  "Implementation",
  "Support",
];

const industries = [
  ["Business", "Workstations, network upgrades, licensed software, and recurring office technology procurement."],
  ["Government", "Specification review, equivalent matching, quotation support, and documentation-aware delivery."],
  ["Education", "Classroom devices, connectivity equipment, security systems, and institutional purchasing support."],
  ["Healthcare", "Reliable endpoint, network, power, storage, and support materials for operational environments."],
  ["Construction", "Site connectivity, surveillance, project office equipment, and deployment materials."],
  ["Enterprise", "Multi-supplier coordination for infrastructure refreshes, rollout planning, and handover records."],
];

const focusAreas = [
  "Computers & Laptops",
  "Servers & Storage",
  "Network Equipment",
  "Printers & Peripherals",
  "Licensed Software",
  "Security & Surveillance",
  "Power & UPS",
  "Accessories & Consumables",
  "General Merchandise",
  "Project Materials",
  "IT Service Coordination",
];

export default function AboutPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Company"
        title="Building better IT procurement."
        description="HACIEN Information Technology Solutions helps organizations plan, source, procure, implement, and support technology projects through one organized workflow."
        image="workspace"
        primaryAction={{ href: "/quote", label: "Start an RFQ" }}
        secondaryAction={{ href: "/solutions", label: "Explore Solutions" }}
        highlights={[
          { label: "Registered Identity", text: "Company identity is published only where supported by verified facts." },
          { label: "Procurement Discipline", text: "Requirements, supplier inputs, assumptions, and handover stay connected." },
          { label: "Customer Trust", text: "Every inquiry should make the next step clearer for the buyer." },
          { label: "Operating Platform", text: "HACIEN uses its own Workspace, Timeline, and Guardian discipline." },
        ]}
      />

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Why HACIEN Exists</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              IT procurement often breaks before the purchase order is even issued.
            </h2>
          </AnimatedContent>
          <div className="space-y-6">
            <BlurReveal>
              <p className="text-base leading-8 text-slate-600">
                Many organizations do not struggle because they lack intent. They struggle because
                procurement becomes fragmented. Different suppliers send different details,
                specifications are hard to compare, and project teams spend too much time asking
                for clarification that should have been included from the start.
              </p>
            </BlurReveal>
            <BlurReveal delay={120}>
              <p className="text-base leading-8 text-slate-600">
                HACIEN was built to improve that experience. We combine technical review, supplier
                coordination, quotation discipline, project tracking, and connected operating workflows so
                customers can move from requirement to delivery with greater clarity.
              </p>
            </BlurReveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {storySignals.map((signal, index) => (
                <AnimatedContent key={signal} delay={index * 70}>
                  <SpotlightCard className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="text-sm font-bold text-slate-900">{signal}</div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CompanyCredentials />

      <section className="overflow-hidden bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Planning Context</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Regional planning needs visible assumptions.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300">
              HACIEN treats delivery, handover, and site constraints as planning details to be clarified during RFQ review.
              This is not a delivery commitment, coverage guarantee, or live logistics tracker.
            </p>
          </AnimatedContent>
          <AnimatedContent delay={120} direction="left">
            <EnterprisePhotoPanel
              image="strategy"
              eyebrow="Operations Review"
              title="Planning details stay visible before commitments are made."
              caption="Requirements, delivery assumptions, handover needs, and support context are reviewed before final commercial terms are confirmed."
            />
          </AnimatedContent>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Our Philosophy</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Technology should not be difficult to procure.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {philosophy.map((item, index) => (
              <AnimatedContent key={item.title} delay={index * 90}>
                <SpotlightCard
                  className="h-full rounded-lg border border-white/12 bg-white/[0.06] p-6"
                  spotlightColor="rgba(96, 165, 250, 0.14)"
                >
                  <div className="text-xs font-bold text-blue-200">0{index + 1}</div>
                  <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <OurCommitment />

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Our Workflow</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A procurement lifecycle designed for accuracy, accountability, and handover.
            </h2>
          </AnimatedContent>
          <div className="mt-12 max-w-full overflow-x-auto pb-4">
            <div className="grid min-w-[980px] grid-cols-9 gap-3 lg:min-w-0">
            {workflow.map((step, index) => (
              <AnimatedContent key={step} delay={Math.min(index * 55, 360)} distance={14}>
                <BorderGlow className="h-full rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex h-full flex-col">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1457d9] text-xs font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-bold text-slate-950">{step}</h3>
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        {workflowCopy(step)}
                      </p>
                    </div>
                  </div>
                </BorderGlow>
              </AnimatedContent>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Who We Support</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Built for buyers who need organized technology sourcing, not a generic catalog.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industries.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 65}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
          <Marquee className="mt-10" items={focusAreas} />
        </div>
      </section>

      <CapabilityResources />
      <FutureProofAssets />

      <section className="relative overflow-hidden bg-[#0b1220] px-4 py-18 text-white sm:px-6 lg:px-8">
        <GradientBackground className="opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Connected Operations</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              HACIEN is designed to keep procurement work connected.
            </h2>
            <p className="mt-5 max-w-3xl leading-7 text-slate-300">
              Every quotation request should keep its context: customer need, supplier inputs,
              commercial assumptions, delivery requirements, documents, and follow-up. That is how
              HACIEN protects continuity from first inquiry to support.
            </p>
            <Link
              href="/erp-platform"
              className="button-glow focus-ring mt-8 inline-flex rounded bg-white px-5 py-3 text-sm font-bold text-[#071426]"
            >
              Learn how HACIEN works
            </Link>
          </AnimatedContent>
          <AnimatedContent delay={120} direction="left">
            <BorderGlow tone="dark" className="rounded-lg bg-white/[0.07] p-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {["Lead", "Canvass", "Quote", "Award", "PO", "Delivery", "Billing", "Inventory", "Reports"].map(
                  (item, index) => (
                    <div key={item} className="rounded border border-white/12 bg-white/[0.06] p-4">
                      <div className="text-xs font-bold text-blue-200">0{index + 1}</div>
                      <div className="mt-2 text-sm font-bold">{item}</div>
                    </div>
                  ),
                )}
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Start with clarity
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Need an IT supplier that understands procurement workflows?
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                  Send your requirement list, deadline, delivery location, and supporting
                  specifications. HACIEN will help turn it into a review-ready RFQ.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/quote"
                  className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]"
                >
                  Submit RFQ
                </Link>
              </div>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}

function workflowCopy(step: string) {
  const copy: Record<string, string> = {
    Requirement: "Customer needs, timelines, budget context, and delivery location are clarified.",
    "Technical Review": "Specifications are checked for completeness, compatibility, and practical alternatives.",
    "Supplier Canvass": "Availability, lead time, warranty terms, and price conditions are validated.",
    Quotation: "Supplier inputs are organized into a clear quotation package for review.",
    Award: "Approved items, quantities, pricing, and conditions are confirmed before procurement.",
    Procurement: "Orders, supplier coordination, and documentation are tracked through fulfillment.",
    Delivery: "Logistics, receiving requirements, and handover documents are coordinated.",
    Implementation: "Setup, deployment materials, and project support needs are aligned where applicable.",
    Support: "Warranty, acceptance, and closeout details are kept visible after delivery.",
  };

  return copy[step];
}
