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
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
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

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <AnimatedContent>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Working Standard</div>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Good sourcing is calm, specific, and written down.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                HACIEN keeps the request grounded in visible details: what is known, what is missing, what needs supplier input, and what should happen next.
              </p>
            </AnimatedContent>
            <div className="grid gap-3 md:grid-cols-2">
              {[...philosophy.map((item) => [item.title, item.text]), ...workflow.map((step) => [step, workflowCopy(step)])].map(([title, text], index) => (
                <AnimatedContent key={title} delay={Math.min(index * 45, 320)}>
                  <BorderGlow className="h-full rounded-lg bg-white p-4 shadow-sm">
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

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[linear-gradient(135deg,#071426_0%,#0b3142_58%,#123730_100%)] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Start with clarity
                </div>
                <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
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
