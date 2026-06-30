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
import { ControlledAccessPreview } from "@/components/TrustConfidence";

export const metadata: Metadata = {
  title: "Customer Access | HACIEN",
  description:
    "Understand HACIEN's controlled customer access boundary for RFQ tracking, quotations, support, documents, and procurement continuity.",
};

const portalModules = [
  ["RFQs", "Private access", "Review submitted requirements and continue procurement conversations without starting from zero."],
  ["Quotations", "Private access", "See quotation history, status, and document context when supported."],
  ["Orders", "Private access", "Monitor procurement, fulfillment, delivery, and handover milestones."],
  ["Invoices", "Controlled documents", "Access invoice and procurement document downloads in a verified account area."],
  ["Software Licenses", "Relationship-based", "Track licenses, renewals, seats, subscriptions, and subscription-related support."],
  ["Support Tickets", "Relationship-based", "Request help for warranty, delivery, implementation, or renewal concerns."],
  ["Company Profile", "Controlled records", "Maintain organization details, contacts, billing context, and purchasing preferences."],
  ["Procurement History", "Relationship memory", "See a connected record of RFQs, quotations, orders, documents, and follow-up."],
];

const previewModules: Array<[string, string, string, string]> = [
  ["RFQs", "Private access", "Requirement review", "Track submitted RFQ context and follow-up notes."],
  ["Quotations", "Private access", "Commercial review", "View quotation history and supporting document context."],
  ["Orders", "Private access", "Fulfillment visibility", "Monitor procurement, delivery, and handover milestones."],
  ["Invoices", "Controlled documents", "Document access", "Access invoice and procurement document records when authorized."],
  ["Software Licenses", "Relationship-based", "Renewal planning", "Track seats, renewals, subscriptions, and support context."],
  ["Support Tickets", "Relationship-based", "Post-delivery support", "Request assistance for warranty, delivery, renewal, or replacement concerns."],
  ["Company Profile", "Controlled records", "Account details", "Maintain organization, contact, billing, and purchasing details."],
];

const ecosystem = [
  ["Website", "Public RFQ, product, insight, and company entry points."],
  ["Customer Account", "Verified access for approved customer records."],
  ["Customer Access", "Controlled visibility for procurement history and support."],
  ["ERP", "Internal operating core for quotation, procurement, delivery, and finance."],
  ["Support", "Follow-up, warranty, renewals, and post-delivery coordination."],
];

export default function PortalPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Customer Access
            </AnimatedContent>
            <SplitText
              as="h1"
              text="Controlled access for customer continuity."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                The customer access model is simple: continue RFQs, quotations,
                documents, subscriptions, and support without restarting the relationship.
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Request a Quote
              </Link>
              <Link
              href="/contact"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Contact HACIEN
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Access Boundary
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                Private customer access is invitation-based.
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Public visitors can submit RFQs, track references, send clarifications, and contact HACIEN.
                Protected records are shared only through controlled access.
              </p>
              <div className="mt-6 rounded border border-amber-200 bg-amber-50 p-3 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                Controlled access
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <ControlledAccessPreview
        eyebrow="Controlled Access"
        title="A bounded view of customer continuity."
        description="This page explains the customer experience boundary without implying that protected accounts, records, invoice downloads, subscriptions, or support tickets are publicly available."
        statusNote="Customers should use RFQ, tracking, clarification, contact, and support channels unless HACIEN grants private access."
        dashboardTitle="Customer access overview"
        modules={previewModules}
      />

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Portal Overview</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A self-service layer for procurement continuity.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Controlled customer access should help customers understand status, retrieve documents,
              request support, manage renewals, and continue procurement conversations.
            </p>
          </AnimatedContent>
          <div className="grid gap-5 md:grid-cols-2">
            {portalModules.map(([title, status, text], index) => (
              <AnimatedContent key={title} delay={index * 50}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">{status}</div>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Connected Relationship</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Website to customer access to operations to support.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300">
              The customer should experience one relationship, even when work moves between inquiry, review, fulfillment, documents, and support.
            </p>
          </AnimatedContent>
          <div className="progress-line mt-12 grid gap-4">
            {ecosystem.map(([title, text], index) => (
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

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Available now
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Need procurement support before portal launch?
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                  Use the RFQ cart or contact HACIEN. Current requests move through direct review and formal quotation follow-up.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/quote"
                  className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/contact"
                  className="interactive-link focus-ring rounded border border-white/25 bg-white/8 px-6 py-3 text-center text-sm font-bold text-white"
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
