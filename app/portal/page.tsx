import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";
import { PremiumPageHero } from "@/components/PremiumPageHero";

export const metadata: Metadata = {
  title: "Customer Workspace",
  description:
    "HACIEN Customer Workspace direction for future RFQ tracking, quotation visibility, documents, support, and account continuity.",
};

const availableNow = [
  ["Request Quote", "Submit requirements, BOQs, files, existing quotes, or project details through the Gateway.", "/quote"],
  ["Track Reference", "Use a reference number to view request status and continue the inquiry path.", "/track/RFQ-2026-000009"],
  ["Contact Support", "Send follow-up details for quotation, fulfillment questions, or company communication.", "/support"],
];

const relationshipPath = [
  ["Discover", "Customer learns what HACIEN can support."],
  ["Request", "Requirement enters the Gateway with a reference."],
  ["Review", "HACIEN clarifies, sources, and prepares the next step."],
  ["Continue", "Customer follows status, documents, and support through one account history."],
];

export default function PortalPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Customer Workspace"
        title="A future workspace for customer continuity."
        description="Customer Workspace is HACIEN's planned customer layer for tracking requests, viewing approved documents, continuing support, and preserving procurement history."
        image="workspace"
        primaryAction={{ href: "/quote", label: "Request Quote" }}
        secondaryAction={{ href: "/access", label: "Access HACIEN" }}
        highlights={[
          { label: "Coming Soon", text: "Private customer access will be introduced when ready." },
          { label: "Controlled Visibility", text: "Customer-facing records will follow approved visibility rules." },
          { label: "Account Memory", text: "Requests, quotes, documents, and support belong to one history." },
          { label: "Available Now", text: "RFQ, tracking, clarification, contact, and support paths are active." },
        ]}
      />

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue">
              Available Now
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Customers can already begin and continue a request.
            </h2>
            <p className="mt-4 text-sm leading-7 text-grey-600">
              Customer Workspace is not publicly open yet. Until private access is introduced, customers
              should use the active public paths for requests, tracking, clarification, and support.
            </p>
          </AnimatedContent>

          <div className="grid gap-4 md:grid-cols-3">
            {availableNow.map(([title, text, href], index) => (
              <AnimatedContent key={title} delay={index * 70}>
                <Link href={href} className="group block h-full">
                  <SpotlightCard className="flex h-full flex-col rounded border border-grey-200 bg-white p-6 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                    <div className="grid h-11 w-11 place-items-center rounded bg-ink text-sm font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-ink group-hover:text-blue">
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-grey-600">{text}</p>
                    <div className="mt-5 text-sm font-bold text-blue">Continue</div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff_0%,#eef7f8_100%)] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue">
              Planned Workspace
            </div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Private access will be useful only when it protects customer records.
            </h2>
            <p className="mt-4 text-sm leading-6 text-grey-600">
              Phase 3 shows the direction without implying the customer portal is live.
            </p>
          </AnimatedContent>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              ["Request Tracking", "Milestones for RFQs, clarifications, quotation notes, and support."],
              ["Controlled Documents", "Document access only when visibility rules allow it."],
              ["Support History", "Follow-up details connected to the same customer record."],
              ["Account Memory", "Requests, quotes, and support stay tied to one history."],
            ].map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 60}>
                <SpotlightCard className="rounded-lg border border-grey-200 bg-white p-4 shadow-sm">
                  <div className="text-xs font-bold text-blue">{String(index + 1).padStart(2, "0")}</div>
                  <h3 className="mt-2 text-base font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-grey-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-4 py-12 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Account Continuity
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
              The customer should never feel they entered another system.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              The public website begins the request. Gateway preserves it. Workspace operates it.
              Customer Workspace will eventually continue it with controlled visibility.
            </p>
          </AnimatedContent>

          <div className="grid gap-4">
            {relationshipPath.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 70}>
                <BorderGlow tone="dark" className="rounded bg-white/[0.07] p-5">
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-sm font-bold text-[#0A0A0A]">
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

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded bg-ink p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Start now
                </div>
                <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
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
                  className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#0A0A0A]"
                >
                  Request Quote
                </Link>
                <Link
                  href="/contact"
                  className="interactive-link focus-ring glass-control-dark rounded px-6 py-3 text-center text-sm font-bold text-white"
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
