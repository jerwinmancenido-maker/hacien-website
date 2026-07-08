import type { Metadata } from "next";
import Link from "next/link";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  SpotlightCard,
} from "@/app/components/reactbits";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { CompanyCredentials } from "@/components/TrustConfidence";

export const metadata: Metadata = {
  title: "About HACIEN | IT Procurement & Technology Solutions",
  description:
    "HACIEN Information Technology Solutions helps Philippine organizations prepare technology requirements, review supplier inputs, and move RFQs into formal business communication.",
};

const storySignals = [
  "Supplier quotes arrive in different formats",
  "Specs are incomplete or hard to compare",
  "Follow-ups disappear across inboxes",
  "Assumptions are not written down early enough",
];

const philosophy = [
  {
    title: "Start with the real business need.",
    text: "A useful request explains who will use the technology, where it will operate, and what outcome matters.",
  },
  {
    title: "Make uncertainty visible.",
    text: "Equivalents, missing specifications, assumptions, warranty terms, and lead-time questions should be clear before decisions harden.",
  },
  {
    title: "Keep follow-up connected.",
    text: "A customer should not need to repeat the same story each time a request moves from inquiry to quote to support.",
  },
];

const workflow = [
  "Requirement",
  "Review",
  "Supplier Input",
  "Quote Context",
  "Follow-up",
];

export default function AboutPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Company"
        title="A technology partner for requests that need sharper definition."
        description="HACIEN helps organizations turn rough requirements, product lists, and project notes into clearer RFQ conversations."
        image="workspace"
        primaryAction={{ href: "/quote", label: "Start an RFQ" }}
        secondaryAction={{ href: "/solutions", label: "Explore Solutions" }}
        highlights={[
          { label: "RFQ-first", text: "The website captures the request before formal quotation work." },
          { label: "Review discipline", text: "Missing details and assumptions stay visible." },
          { label: "Continuity", text: "Requests stay connected through follow-up." },
          { label: "Bounded claims", text: "Public pages avoid unsupported commercial promises." },
        ]}
      />

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Why HACIEN Exists</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Technology buying often gets messy before the first quote is useful.
            </h2>
          </AnimatedContent>
          <div className="space-y-4 sm:space-y-6">
            <BlurReveal>
              <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                Many teams already know what they need in practical terms: faster devices, a stable
                network, licensed software, better security, or a project closeout that will not fall apart.
                The hard part is turning that need into a request suppliers can answer clearly.
              </p>
            </BlurReveal>
            <BlurReveal delay={120}>
              <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                HACIEN was built around that gap. We help collect the details, surface the missing
                details, and keep the request organized before commercial terms are treated as final.
              </p>
            </BlurReveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {storySignals.map((signal, index) => (
                <AnimatedContent key={signal} delay={index * 70}>
                  <SpotlightCard className={`rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4 ${index > 1 ? "hidden sm:block" : ""}`}>
                    <div className="text-sm font-bold text-slate-900">{signal}</div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CompanyCredentials />

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <AnimatedContent>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Working Standard</div>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Good buying is calm, specific, and written down.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                HACIEN keeps the request grounded in visible details: what is known, what is missing, what needs supplier input, and what should happen next.
              </p>
            </AnimatedContent>
            <div className="grid gap-2 md:grid-cols-2 md:gap-3">
              {[...philosophy.map((item) => [item.title, item.text]), ...workflow.map((step) => [step, workflowCopy(step)])].map(([title, text], index) => (
                <AnimatedContent key={title} delay={Math.min(index * 45, 320)}>
                  <BorderGlow className={`h-full rounded-lg bg-white p-3 shadow-sm sm:p-4 ${index > 4 ? "hidden md:block" : ""}`}>
                    <div className="text-xs font-bold text-[#1457d9]">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="mt-2 text-sm font-bold text-slate-950">{title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
                  </BorderGlow>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[linear-gradient(135deg,#071426_0%,#0b3142_58%,#123730_100%)] p-5 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Start with clarity
                </div>
                <h2 className="mt-3 max-w-3xl text-xl font-bold tracking-tight sm:mt-4 sm:text-3xl">
                  Need an IT supplier that can turn scattered requirements into a clear RFQ?
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:mt-4">
                  Send your requirement list, deadline, delivery location, and supporting
                  specifications. HACIEN will help turn it into a usable RFQ.
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
    Requirement: "Need, quantity, location, timeline, and decision basis are clarified.",
    Review: "Missing details, compatibility questions, and practical alternatives are surfaced.",
    "Supplier Input": "Supplier-provided details are reviewed when available and relevant.",
    "Quote Context": "Assumptions and exclusions are made visible before formal terms are relied on.",
    "Follow-up": "The request reference keeps the next conversation connected.",
  };

  return copy[step];
}
