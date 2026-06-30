import Link from "next/link";
import type { Metadata } from "next";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  SplitText,
  SpotlightCard,
} from "@/app/components/reactbits";
import { OurCommitment } from "@/components/TrustConfidence";

export const metadata: Metadata = {
  title: "HACIEN Operating Platform | Procurement Continuity",
  description:
    "How HACIEN keeps RFQs, quotations, sourcing, delivery, support, and customer follow-through connected through one operating discipline.",
};

const operatingFlow = [
  ["Inquiry", "A customer describes the need or submits files for review."],
  ["Review", "HACIEN clarifies scope, quantity, timing, location, and procurement context."],
  ["Sourcing", "Availability, warranty, lead time, and commercial assumptions are checked before quotation."],
  ["Quotation", "A formal offer is prepared only after enough context exists to quote responsibly."],
  ["Fulfillment", "Procurement, receiving, delivery, and handover stay connected to the original requirement."],
  ["Support", "Follow-up, warranty, renewal, replacement, and customer-success context remain part of the relationship."],
];

const principles = [
  ["One relationship", "Customer context should continue from public inquiry through quotation, delivery, and support."],
  ["Formal commitments", "Pricing, payment, warranty, and delivery terms belong in formal documents and written business communication."],
  ["Procurement discipline", "Requirements, assumptions, supplier inputs, and delivery context are reviewed before commitments are made."],
  ["Founder-ready operation", "Internal systems should reduce remembering, switching, and manual follow-up for a one-person operating company."],
  ["Evidence before claims", "Company facts, commercial terms, and policy statements should be supported before they become public promises."],
  ["Customer clarity", "Every customer should know what happened, what HACIEN is reviewing, and what happens next."],
];

const customerSignals = [
  "Reference-based RFQ intake",
  "Clarification before quotation",
  "Quote-first product sourcing",
  "Documented assumptions",
  "Support path after inquiry",
  "Company identity facts from supported records",
];

export default function ErpPlatformPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              HACIEN Operating Platform
            </AnimatedContent>
            <SplitText
              as="h1"
              text="Procurement work should feel connected from first inquiry to support."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                HACIEN is organized around one practical operating path: receive the requirement,
                review the context, quote responsibly, coordinate fulfillment, and continue the relationship.
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Submit RFQ
              </Link>
              <Link
                href="/trust-center"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                View Trust Center
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Customer Continuity
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                The customer should never wonder where the request went.
              </h2>
              <div className="mt-6 grid gap-3">
                {customerSignals.map((signal) => (
                  <div key={signal} className="rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800">
                    {signal}
                  </div>
                ))}
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Operating Flow
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              From requirement to follow-through, each step keeps context alive.
            </h2>
          </AnimatedContent>
          <div className="progress-line mt-12 grid gap-4">
            {operatingFlow.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 70}>
                <BorderGlow tone="dark" className="rounded-lg bg-white/[0.07] p-5">
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-[#071426]">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-bold text-white">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                    </div>
                  </div>
                </BorderGlow>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Operating Principles
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              The platform exists to reduce uncertainty.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {principles.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 60}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <OurCommitment className="bg-slate-50" />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Start Safely
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                  The best first step is still a clear RFQ.
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                  Describe the requirement, attach supporting documents, and let HACIEN review the
                  context before any pricing, delivery, warranty, or payment commitment is made.
                </p>
              </div>
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]"
              >
                Submit RFQ
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
