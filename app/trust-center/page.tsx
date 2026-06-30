import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "HACIEN Trust Center for company identity, RFQ terms, support expectations, privacy, security, and commercial verification boundaries.",
};

const policyGroups = [
  ["Company identity", "Supported facts", "HACIEN INFORMATION TECHNOLOGY SOLUTIONS publishes supported DTI and BIR registration facts for customer and supplier confidence."],
  ["RFQ and quotation", "Review first", "RFQ submission starts review only. Formal quotation depends on supplier availability, warranty, lead time, and delivery context."],
  ["Payment instructions", "Formal documents only", "Payment details are shared through appropriate formal documents and verified business communication."],
  ["Warranty and returns", "Quote-specific terms", "Warranty, replacement, and return terms depend on the product, supplier basis, and formal quotation context."],
  ["Delivery expectations", "Confirmed per order", "Delivery commitments are confirmed in formal quotation, order, or project communication."],
  ["Support", "Available as inquiry path", "Support requests can be routed, but no unsupported SLA is claimed."],
  ["Privacy", "Website policy available", "Public forms collect voluntarily submitted inquiry and RFQ context only."],
  ["Security", "Conservative claims", "Security statements remain bounded to implemented controls and verified operating evidence."],
];

const documentRules = [
  "Public company facts should be supported by evidence before they appear on customer-facing pages.",
  "Customer-facing policies should show owner, version, effective date, review date, and status when published.",
  "ERP documents should reference the policy version that applied when issued.",
  "Commercial commitments should be made through formal quotations, orders, and written business communication.",
];

export default function TrustCenterPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 hq-grid opacity-80" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Trust Center
            </AnimatedContent>
            <h1 className="mt-5 max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl">
              Trust begins with clear boundaries.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              The Trust Center explains how HACIEN handles company identity, RFQ review, customer commitments, privacy, security, and support expectations without overstating commercial readiness.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="button-glow rounded bg-white px-5 py-3 text-center text-sm font-bold text-[#071426]">
                Submit RFQ
              </Link>
              <Link href="/support" className="interactive-link rounded border border-white/25 bg-white/8 px-5 py-3 text-center text-sm font-bold text-white">
                Contact support
              </Link>
            </div>
          </div>
          <BorderGlow tone="dark" className="rounded-lg bg-white/[0.07] p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Current Verification Status</div>
            <div className="mt-6 grid gap-3">
              {[
                ["DTI business name", "Verified"],
                ["Business Name No.", "8278010"],
                ["BIR registration facts", "Verified"],
                ["Payment details", "Formal documents"],
                ["Customer workspace", "Prepared"],
                ["RFQ intake", "Available"],
              ].map(([label, status]) => (
                <div key={label} className="flex items-center justify-between gap-4 rounded border border-white/12 bg-white/[0.06] px-4 py-3">
                  <span className="text-sm font-semibold text-slate-200">{label}</span>
                  <span className="text-right text-xs font-bold uppercase tracking-[0.12em] text-blue-200">{status}</span>
                </div>
              ))}
            </div>
          </BorderGlow>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Policy Registry</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Policies grouped by customer decisions.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              Public policies focus on the questions customers actually need answered before sending an inquiry, RFQ, or follow-up.
            </p>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {policyGroups.map(([title, status, text], index) => (
              <AnimatedContent key={title} delay={index * 45}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#1457d9]">{status}</div>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Document Rules</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Paper protects truth.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Financial, legal, and commercial commitments should remain clear, versioned, and reviewable.
            </p>
          </AnimatedContent>
          <div className="grid gap-4">
            {documentRules.map((rule, index) => (
              <AnimatedContent key={rule} delay={index * 70}>
                <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded bg-[#071426] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{rule}</p>
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
