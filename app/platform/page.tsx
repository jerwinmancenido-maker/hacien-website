import type { Metadata } from "next";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { AnimatedCard, AnimatedSection, StaggerContainer } from "@/components/motion";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Platform | Operating Model",
  description:
    "HACIEN operates through its own enterprise operating platform supporting Workspace, Timeline, Guardian, Customer Workspace, and account continuity.",
};

const platformLayers = [
  ["Workspace", "The secure internal operating workspace HACIEN uses to review requests, manage work, and keep operations moving."],
  ["Timeline", "The account memory that records meaningful customer milestones without exposing internal operational noise."],
  ["Guardian", "The guidance layer that helps prevent missed follow-ups, incomplete records, and avoidable operational mistakes."],
  ["Customer Workspace", "The future customer continuity layer for request tracking, quotations, documents, support, and account history."],
  ["Account Continuity", "The principle that every inquiry, quote, delivery, document, and support interaction belongs to one account record."],
];

const operatingPrinciples = [
  ["Evidence before automation", "The platform supports disciplined operations without pretending unverified facts are complete."],
  ["Internal first", "HACIEN proves the platform through its own operations before future commercial availability."],
  ["Customer-safe clarity", "Customers should see meaningful progress, not internal approvals, supplier negotiations, or audit detail."],
  ["One connected company", "Website, Gateway, Workspace, Timeline, and Customer Workspace should feel like one continuous experience."],
];

const platformImages: Record<string, keyof typeof enterpriseImages> = {
  Workspace: "workspace",
  Timeline: "documentation",
  Guardian: "cybersecurity",
  "Customer Workspace": "office",
  "Relationship Continuity": "network",
};

export default function PlatformPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Platform"
        title="The operating platform behind HACIEN."
        description="HACIEN operates through its own enterprise platform for request intake, account memory, operational guidance, and future customer continuity."
        image="network"
        primaryAction={{ href: "/quote", label: "Request a Quote" }}
        highlights={[
          { label: "Workspace", text: "Secure internal operations for requests, reviews, and follow-up." },
          { label: "Timeline", text: "Account memory for meaningful customer milestones." },
          { label: "Guardian", text: "Operational guidance that helps prevent missed details." },
          { label: "Customer Workspace", text: "Future continuity for tracking, documents, and support." },
        ]}
      />

      <AnimatedSection className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Operating Layers"
            title="One company, connected through one operating model."
            description="Platform does not market an ERP. It explains how HACIEN keeps customer accounts, internal operations, and future continuity connected."
          />
          <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {platformLayers.map(([title, text]) => (
              <AnimatedCard key={title} className="h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                <div
                  className="h-32 bg-slate-950"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.74)), url(${enterpriseImages[platformImages[String(title)] || "network"]})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
                <div className="p-7">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-grey-600">HACIEN Platform</div>
                <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">{title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{text}</p>
                </div>
              </AnimatedCard>
            ))}
          </StaggerContainer>
        </div>
      </AnimatedSection>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Platform Discipline</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
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
