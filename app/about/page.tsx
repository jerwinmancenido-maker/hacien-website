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
import { CapabilityResources, CompanyCredentials, OurCommitment } from "@/components/TrustConfidence";

export const metadata: Metadata = {
  title: "About HACIEN | IT Procurement & Technology Solutions",
  description:
    "HACIEN Information Technology Solutions helps Philippine organizations plan, source, procure, implement, and support technology projects through structured IT procurement workflows.",
};

const storySignals = [
  "Supplier quotes arrive in different formats",
  "Specs are incomplete or hard to compare",
  "Follow-ups disappear across inboxes",
  "Assumptions are not written down early enough",
];

const philosophy = [
  {
    title: "Start with the real operating need.",
    text: "The request should explain who will use the technology, where it will operate, and what would make the outcome successful.",
  },
  {
    title: "Make uncertainty visible.",
    text: "Equivalents, missing specifications, assumptions, warranty context, and lead-time questions should be clear before decisions harden.",
  },
  {
    title: "Keep follow-up connected.",
    text: "A customer should not need to restart the story every time the request moves from inquiry to review to support.",
  },
];

const workflow = [
  "Requirement",
  "Review",
  "Supplier Input",
  "Quote Context",
  "Follow-up",
];

const industries = [
  ["Business", "Workstations, network upgrades, licensed software, and recurring office technology procurement."],
  ["Institutional", "Specification review, equivalent matching, quotation support, and documentation-aware delivery."],
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
        title="A technology partner for requests that need structure."
        description="HACIEN helps organizations turn rough requirements, product lists, and project context into clearer RFQ conversations."
        image="workspace"
        primaryAction={{ href: "/quote", label: "Start an RFQ" }}
        secondaryAction={{ href: "/solutions", label: "Explore Solutions" }}
        highlights={[
          { label: "RFQ-first", text: "The website captures context before formal quotation work." },
          { label: "Review discipline", text: "Missing details and assumptions stay visible." },
          { label: "Continuity", text: "Requests stay connected through follow-up." },
          { label: "Bounded claims", text: "Public pages avoid unsupported commercial promises." },
        ]}
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Why HACIEN Exists</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Technology buying often gets messy before the first quote is useful.
            </h2>
          </AnimatedContent>
          <div className="space-y-6">
            <BlurReveal>
              <p className="text-base leading-8 text-slate-600">
                Many teams already know what they need in practical terms: faster devices, a stable
                network, licensed software, better security, or a project handover that will not fall apart.
                The hard part is turning that need into a request suppliers can answer clearly.
              </p>
            </BlurReveal>
            <BlurReveal delay={120}>
              <p className="text-base leading-8 text-slate-600">
                HACIEN was built around that gap. We help collect the context, surface the missing
                details, and keep the request organized before commercial terms are treated as final.
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

      <section className="overflow-hidden bg-[#071426] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Planning Context</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Planning works better when assumptions are visible.
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

      <section className="bg-[#071426] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Our Philosophy</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Good sourcing is calm, specific, and written down.
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

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Our Workflow</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A compact workflow for turning loose requests into usable next steps.
            </h2>
          </AnimatedContent>
          <div className="mt-8 max-w-full overflow-x-auto pb-4">
            <div className="grid min-w-[640px] grid-cols-5 gap-3 lg:min-w-0">
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

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Who We Support</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Useful for teams that need clarity before they commit.
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

      <section className="relative overflow-hidden bg-[#0b1220] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-14">
        <GradientBackground className="opacity-40" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Connected Operations</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              HACIEN is designed to keep request work connected.
            </h2>
            <p className="mt-5 max-w-3xl leading-7 text-slate-300">
              Every RFQ should keep its context: customer need, supplier inputs,
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
    Requirement: "Need, quantity, location, timeline, and decision context are clarified.",
    Review: "Missing details, compatibility questions, and practical alternatives are surfaced.",
    "Supplier Input": "Supplier-provided details are reviewed when available and relevant.",
    "Quote Context": "Assumptions and exclusions are made visible before formal terms are relied on.",
    "Follow-up": "The request reference keeps the next conversation connected.",
  };

  return copy[step];
}
