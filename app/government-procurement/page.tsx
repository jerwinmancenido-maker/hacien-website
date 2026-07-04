import type { Metadata } from "next";
import Link from "next/link";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  SplitText,
  SpotlightCard,
} from "@/app/components/reactbits";
import { ContactForm } from "@/components/ContactForm";
import { CapabilityResources, OurCommitment } from "@/components/TrustConfidence";
import { governmentTopics } from "@/data/governmentTopics";

export const metadata: Metadata = {
  title: "Government IT Procurement Support Philippines | HACIEN",
  description:
    "HACIEN supports government and institutional IT procurement preparation through specification review, approved equivalent matching, supplier-input review, quotation support, documentation support, and delivery-context review.",
};

const supportProcess = [
  ["Review", "Check specifications, compatibility, quantities, deadline, delivery site, and procurement context."],
  ["Match", "Identify compliant options or approved equivalents subject to supplier availability and buyer requirements."],
  ["Coordinate", "Review supplier-provided lead time, warranty, pricing conditions, documentation, and quotation readiness where available."],
  ["Support", "Help organize structured quotation inputs and delivery context without overstating accreditation or approval."],
];

const safeguards = [
  "No guaranteed award claims",
  "Careful accreditation language",
  "Equivalent options require buyer review",
  "Availability and pricing are confirmed per RFQ",
  "Documentation support is stated carefully",
  "Compliance language remains procurement-safe",
];

const confidenceAreas = [
  ["RFQ handling", "Requirements are reviewed for quantities, delivery context, deadline, supporting files, and unanswered questions before supplier coordination."],
  ["Technical specification review", "Specifications are checked for completeness, compatibility, model clarity, equivalent language, and procurement-ready detail."],
  ["Equivalent product evaluation", "Equivalent options are treated as buyer-review items, not automatic replacements or guaranteed approvals."],
  ["Supplier coordination", "Availability, warranty, lead time, documentation, and pricing conditions are reviewed per request where supplier inputs are available."],
  ["Documentation assistance", "HACIEN can help organize quotation details and supporting information without claiming buyer-side compliance authority."],
  ["Quotation discipline", "Formal quotation support should state assumptions, validity, availability, warranty, delivery conditions, and exclusions clearly."],
  ["Delivery planning", "Delivery site, schedule, receiving needs, and handover expectations are considered before fulfillment proceeds."],
];

export default function GovernmentProcurementPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY || "";

  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Government & Institutional Procurement
            </AnimatedContent>
            <SplitText
              as="h1"
              text="Support for formal, specification-driven technology buying."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                This page exists for buyers and organizations working with formal specifications, BOQs,
                approved equivalents, documentation requirements, and delivery expectations. It explains
                how HACIEN can support the quotation-preparation side of that work.
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Contact HACIEN
              </Link>
              <Link
                href="/quote"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Request Quote
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Support Scope
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                Specification review, equivalent matching, quotation support, and delivery-context review.
              </h2>
              <div className="mt-8 grid gap-3">
                {["Specifications", "Equivalents", "Suppliers", "Quotation", "Delivery"].map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{step}</span>
                  </div>
                ))}
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Public-Sector Support</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Institutional procurement needs clarity before supplier canvass.
            </h2>
          </AnimatedContent>
          <div className="grid gap-5 md:grid-cols-2">
            {governmentTopics.map((topic, index) => (
              <AnimatedContent key={topic.slug} delay={index * 60}>
                <Link href={`/government-procurement/${topic.slug}`} className="group block h-full">
                  <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-950 group-hover:text-[#1457d9]">{topic.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{topic.summary}</p>
                    <div className="mt-5 text-sm font-bold text-[#1457d9]">Learn more</div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Procurement-Safe Language</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              This is support for procurement preparation, not a claim of buyer-side authority.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {safeguards.map((item, index) => (
              <AnimatedContent key={item} delay={index * 55}>
                <div className="rounded border border-white/12 bg-white/[0.06] p-4 text-sm font-bold text-slate-100">
                  {item}
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Procurement Confidence</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Government and institutional buyers need careful quotation support, not generic product pushing.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              HACIEN&apos;s support is strongest when requirements, specifications, supplier conditions, and delivery assumptions are made visible before formal quotation decisions.
            </p>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {confidenceAreas.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 55}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Support Process</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              From requirement review to formal quotation support.
            </h2>
          </AnimatedContent>
          <div className="progress-line mt-12 grid gap-4">
            {supportProcess.map(([step, text], index) => (
              <AnimatedContent key={step} delay={index * 70}>
                <BorderGlow className="rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#1457d9] text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-950">{step}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  </div>
                </BorderGlow>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <OurCommitment className="bg-slate-50" />
      <CapabilityResources />

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Government Inquiry</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Send the requirement, schedule, location, and specification files.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              HACIEN will review the context and identify the next supplier-ready quotation step.
            </p>
          </AnimatedContent>
          <ContactForm type="Government" turnstileSiteKey={turnstileSiteKey} />
        </div>
      </section>
    </>
  );
}
