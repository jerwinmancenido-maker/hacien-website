import type { Metadata } from "next";
import Link from "next/link";
import { EnterprisePhotoPanel } from "@/components/EnterpriseImagery";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "HACIEN Platform | Operating Model",
  description:
    "HACIEN operates through its own enterprise operating platform supporting Workspace, Timeline, Guardian, Customer Workspace, and relationship continuity.",
};

const platformLayers = [
  ["Workspace", "The secure internal operating workspace HACIEN uses to review requests, manage work, and keep operations moving."],
  ["Timeline", "The relationship memory that records meaningful customer milestones without exposing internal operational noise."],
  ["Guardian", "The guidance layer that helps prevent missed follow-ups, incomplete records, and avoidable operational mistakes."],
  ["Customer Workspace", "The future customer continuity layer for request tracking, quotations, documents, support, and relationship history."],
  ["Relationship Continuity", "The principle that every inquiry, quote, delivery, document, and support interaction belongs to one relationship."],
];

const operatingPrinciples = [
  ["Evidence before automation", "The platform supports disciplined operations without pretending unverified facts are complete."],
  ["Internal first", "HACIEN proves the platform through its own operations before future commercial availability."],
  ["Customer-safe clarity", "Customers should see meaningful progress, not internal approvals, supplier negotiations, or audit detail."],
  ["One connected company", "Website, Gateway, Workspace, Timeline, and Customer Workspace should feel like one continuous experience."],
];

export default function PlatformPage() {
  return (
    <>
      <section className="bg-[#071426] px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Platform</div>
            <h1 className="mt-5 max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              The operating platform behind HACIEN.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              HACIEN operates through its own enterprise platform for request intake, relationship memory,
              operational guidance, and customer continuity. Future commercial availability will be announced
              only when the platform has matured through real operations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/access" className="button-glow rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]">
                Access HACIEN
              </Link>
              <Link href="/quote" className="interactive-link rounded-full border border-white/25 px-6 py-3 text-center text-sm font-bold text-white">
                Request Quote
              </Link>
            </div>
          </div>
          <EnterprisePhotoPanel
            image="network"
            eyebrow="Connected Operations"
            title="HACIEN is operated through the same platform discipline it is building."
            caption="Workspace, Timeline, Guardian, and Customer Workspace exist to keep work connected, clear, and relationship-centered."
          />
        </div>
      </section>

      <AnimatedSection className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Operating Layers"
            title="One company, connected through one operating model."
            description="Platform does not market an ERP. It explains how HACIEN keeps customer relationships, internal operations, and future continuity connected."
          />
          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {platformLayers.map(([title, text]) => (
              <AnimatedCard key={title} className="h-full rounded-lg border border-slate-200 bg-slate-50 p-7">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">HACIEN Platform</div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Platform Discipline</div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
              Built through operational reality, not claims.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              HACIEN’s platform vision is intentionally grounded. It powers the company today and may become commercially available after it proves itself through real customer work.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {operatingPrinciples.map(([title, text]) => (
              <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
