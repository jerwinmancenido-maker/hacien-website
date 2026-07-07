import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { InteractivePortalPreview } from "@/components/InteractivePortalPreview";

export const metadata: Metadata = {
  title: "Customer Workspace | HACIEN",
  description:
    "HACIEN Customer Workspace direction for future RFQ tracking, quotation visibility, documents, support, and relationship continuity.",
};

const availableNow = [
  ["Request Quote", "Submit requirements, BOQs, files, existing quotes, or project context through the Gateway.", "/quote"],
  ["Track Reference", "Use a reference number to view request status and continue the inquiry path.", "/track/RFQ-2026-000009"],
  ["Contact Support", "Send follow-up context for quotation, fulfillment questions, or company communication.", "/support"],
];

const futureCapabilities = [
  {
    title: "Request Tracking",
    text: "Customers will see meaningful milestones for RFQs, clarifications, quotations, fulfillment planning, and support.",
    image: "documentation",
  },
  {
    title: "Quotation Continuity",
    text: "Formal quotation context, supporting notes, and customer approvals will stay attached to the relationship.",
    image: "workspace",
  },
  {
    title: "Document Access",
    text: "Approved customers will access controlled documents only when visibility rules allow it.",
    image: "storage",
  },
  {
    title: "Support History",
    text: "Support, renewal, and service context will continue from the same customer record when evidence and visibility rules allow it.",
    image: "network",
  },
];

const relationshipPath = [
  ["Discover", "Customer learns what HACIEN can support."],
  ["Request", "Requirement enters the Gateway with a reference."],
  ["Review", "HACIEN clarifies, sources, and prepares the next step."],
  ["Continue", "Customer follows status, documents, and support through one relationship."],
];

export default function PortalPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Customer Workspace"
        title="A future workspace for customer continuity."
        description="Customer Workspace is HACIEN's planned customer relationship layer for tracking requests, viewing approved documents, continuing support, and preserving procurement history."
        image="workspace"
        primaryAction={{ href: "/quote", label: "Request Quote" }}
        secondaryAction={{ href: "/access", label: "Access HACIEN" }}
        highlights={[
          { label: "Coming Soon", text: "Private customer access will be introduced when ready." },
          { label: "Controlled Visibility", text: "Customer-facing records will follow approved visibility rules." },
          { label: "Relationship Memory", text: "Requests, quotes, documents, and support belong to one history." },
          { label: "Available Now", text: "RFQ, tracking, clarification, contact, and support paths are active." },
        ]}
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="mx-auto max-w-7xl">
          <InteractivePortalPreview />
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Available Now
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Customers can already begin and continue a relationship.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Customer Workspace is not publicly open yet. Until private access is introduced, customers
              should use the active public paths for requests, tracking, clarification, and support.
            </p>
          </AnimatedContent>

          <div className="grid gap-4 md:grid-cols-3">
            {availableNow.map(([title, text, href], index) => (
              <AnimatedContent key={title} delay={index * 70}>
                <Link href={href} className="group block h-full">
                  <SpotlightCard className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[#071426] text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-950 group-hover:text-[#1457d9]">
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{text}</p>
                    <div className="mt-5 text-sm font-bold text-[#1457d9]">Continue</div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Planned Workspace
            </div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Private access will be useful only when it protects the relationship.
            </h2>
          </AnimatedContent>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {futureCapabilities.map((capability, index) => (
              <AnimatedContent key={capability.title} delay={index * 60}>
                <SpotlightCard className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/10">
                  <div
                    className="h-44 bg-slate-950"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.02), rgba(7, 20, 38, 0.76)), url(${enterpriseImages[capability.image as keyof typeof enterpriseImages]})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <div className="p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">
                      Customer Workspace
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-950">{capability.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{capability.text}</p>
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Relationship Continuity
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              The customer should never feel they entered another system.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              The public website begins the relationship. Gateway preserves it. Workspace operates it.
              Customer Workspace will eventually continue it with controlled visibility.
            </p>
          </AnimatedContent>

          <div className="grid gap-4">
            {relationshipPath.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 70}>
                <BorderGlow tone="dark" className="rounded-2xl bg-white/[0.07] p-5">
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

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-2xl bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Start now
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Need HACIEN to review a requirement today?
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                  Submit the requirement through RFQ intake. HACIEN will keep the request connected through
                  review, clarification, quotation, and follow-up.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/quote"
                  className="button-glow focus-ring rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]"
                >
                  Request Quote
                </Link>
                <Link
                  href="/contact"
                  className="interactive-link focus-ring glass-control-dark rounded-full px-6 py-3 text-center text-sm font-bold text-white"
                >
                  Contact HACIEN
                </Link>
              </div>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
