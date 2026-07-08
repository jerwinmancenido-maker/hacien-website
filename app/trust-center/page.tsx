import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";

export const metadata: Metadata = {
  title: "Trust & Compliance",
  description:
    "HACIEN Trust Center for company identity, RFQ terms, support expectations, privacy, security, and commercial verification boundaries.",
};

const policyGroups = [
  ["Company identity", "Bounded facts", "HACIEN INFORMATION TECHNOLOGY SOLUTIONS publishes only bounded company information suitable for public review."],
  ["RFQ and quotation", "Review first", "RFQ submission starts review only. Formal quotation depends on request-specific supplier availability, warranty, lead time, delivery context, payment terms, tax treatment, and customer acceptance."],
  ["Payment and invoices", "Not published", "The website does not publish bank details, payment instructions, default payment terms, invoice treatment, tax treatment, or late charges."],
  ["Warranty and returns", "Request-specific", "Warranty, return, replacement, and refund handling must be confirmed through supplier, distributor, manufacturer, vendor, or formal HACIEN transaction evidence."],
  ["Delivery and acceptance", "Confirmed per request", "Delivery charges, receiving requirements, acceptance, and damage reporting are confirmed through request-specific formal documents or written communication."],
  ["Support", "Available as inquiry path", "Support requests are routed through the appropriate inquiry, RFQ, or follow-up channel."],
  ["Privacy", "Website policy available", "Public forms collect voluntarily submitted inquiry and RFQ context. Supplier sharing may occur for quotation preparation or deal registration."],
  ["Security", "Bounded statements", "Security statements remain tied to implemented controls and verified operating evidence."],
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
      <section className="relative overflow-hidden bg-[#071426] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-12">
        <div className="absolute inset-0 hq-grid opacity-80" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Trust & Compliance
            </AnimatedContent>
            <h1 className="mt-5 max-w-5xl text-3xl font-bold tracking-tight sm:text-5xl">
              Trust begins with clear boundaries.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Trust & Compliance explains how HACIEN handles company identity, RFQ review, customer commitments, privacy, security, and support expectations with clear public boundaries.
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
                ["Company information", "Bounded"],
                ["Business communication", "Review path"],
                ["Formal documents", "Upon approved request"],
                ["Payment details", "Not published"],
                ["RFQ intake", "Review path available"],
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

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Public Boundaries</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Customer questions grouped by evidence status.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              Public pages explain how to start safely. Commercial, payment, warranty, tax, and delivery terms remain controlled by verified formal documents.
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

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Document Rules</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
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
