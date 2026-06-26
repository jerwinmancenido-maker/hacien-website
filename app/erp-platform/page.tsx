import Link from "next/link";
import type { Metadata } from "next";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  Marquee,
  SplitText,
  SpotlightCard,
} from "@/app/components/reactbits";
import { OurCommitment } from "@/components/TrustConfidence";

export const metadata: Metadata = {
  title: "HACIEN ERP | Procurement-First ERP for IT Integrators & Project-Based Businesses",
  description:
    "HACIEN ERP is a procurement-first ERP platform in development for IT integrators, government suppliers, trading companies, and project-based businesses in the Philippines, connecting CRM, supplier canvassing, quotation, purchasing, inventory, accounting, delivery, compliance, and AI roadmap workflows.",
};

const painPoints = [
  ["Spreadsheet-heavy operations", "Teams track leads, supplier quotes, purchase plans, delivery notes, and billing status in disconnected files."],
  ["Disconnected RFQs", "Requirements often move from email to chat to spreadsheet before anyone has a single source of truth."],
  ["Manual supplier follow-ups", "Availability, warranty, lead time, and price changes are chased manually across multiple supplier conversations."],
  ["Approval bottlenecks", "Quote approvals, purchase decisions, and project handovers slow down when context is scattered."],
  ["Inventory and delivery gaps", "Receiving, stock allocation, delivery, serial numbers, and acceptance records need to connect to the original requirement."],
  ["Generic ERP limitations", "Traditional ERPs often start from accounting, retail, or manufacturing assumptions instead of IT procurement reality."],
];

const procurementFlow = [
  "Lead",
  "Opportunity",
  "Requirements",
  "BOQ",
  "Supplier Canvassing",
  "Technical Validation",
  "Quotation",
  "Approval",
  "Purchase Plan",
  "Purchase Order",
  "Receiving",
  "Inventory",
  "Delivery",
  "Sales Invoice",
  "Official Receipt",
  "Project Completion",
  "Customer Support",
];

const moduleGroups = [
  {
    title: "Customer & Revenue",
    description: "Manage demand from first inquiry through opportunity, quote, sale, customer account, and future portal engagement.",
    items: ["CRM", "Opportunities", "Sales", "Customer Portal", "Marketplace"],
  },
  {
    title: "Procurement & Supply",
    description: "Turn requirements into supplier-ready canvass activities, purchase plans, purchase orders, and supplier records.",
    items: ["Supplier Management", "Supplier Canvassing", "Procurement", "Purchasing", "Purchase Orders"],
  },
  {
    title: "Inventory & Fulfillment",
    description: "Connect receiving, stock movement, warehouse activity, delivery, project fulfillment, and handover documentation.",
    items: ["Inventory", "Warehouse", "Receiving", "Delivery", "Projects"],
  },
  {
    title: "Finance & Accounting",
    description: "Let operational transactions drive invoices, collections, payables, ledgers, reports, and financial control.",
    items: ["Invoicing", "Accounts Receivable", "Accounts Payable", "Accounting", "Reporting"],
  },
  {
    title: "Governance & Platform",
    description: "Support administration, permissions, dashboards, auditability, notifications, automation, and AI-ready workflows.",
    items: ["Administration", "Dashboards", "Audit Trail", "Notifications", "Workflow Automation", "AI Assistant (Roadmap)"],
  },
];

const financeCapabilities = [
  "General Ledger",
  "Chart of Accounts",
  "Accounts Receivable",
  "Accounts Payable",
  "Journal Entries",
  "Bank Reconciliation",
  "Cash Management",
  "Financial Statements",
  "Trial Balance",
  "Income Statement",
  "Balance Sheet",
  "Cash Flow",
  "Cost Centers",
  "Multi-company readiness",
  "Multi-branch readiness",
  "Budgeting (Roadmap)",
  "Multi-currency (Roadmap)",
];

const complianceItems = [
  "BIR-ready architecture",
  "CAS-readiness direction",
  "VAT support",
  "EWT/CWT",
  "Official Receipts",
  "Sales Invoices",
  "Sequential numbering",
  "Audit trail",
  "Computerized books readiness",
  "BIR Forms roadmap",
  "ORUS readiness",
  "Philippine accounting practices",
];

const isoItems = [
  "Document control",
  "Approval workflows",
  "SOP management",
  "Audit support",
  "Non-conformance tracking (Roadmap)",
  "Corrective and preventive actions (Roadmap)",
  "Risk registers (Roadmap)",
  "Continuous improvement",
];

const securityItems = [
  "Multi-tenant architecture",
  "Role-based permissions",
  "Audit trails",
  "Activity logs",
  "Approval workflows",
  "Soft deletes",
  "Data integrity",
  "Backups",
  "API security",
  "Future SSO",
  "Future MFA",
];

const aiRoadmap = [
  "Procurement assistant",
  "Quotation recommendations",
  "Supplier recommendations",
  "Margin optimization",
  "Demand forecasting",
  "Project risk detection",
  "Document summarization",
  "Executive insights",
  "Natural language ERP search",
];

const ecosystemFlow = [
  "Website",
  "Customer Portal",
  "Marketplace",
  "Supplier APIs",
  "HACIEN ERP",
  "Accounting",
  "Project Delivery",
  "After-sales Support",
  "AI Services",
];

const roadmap = [
  {
    title: "Available",
    description: "Public positioning and RFQ-aware website workflows are available today. ERP production capability should be verified before any public availability claim.",
    items: ["Public website", "RFQ cart", "Product and solution catalog", "Government procurement content", "ERP roadmap visibility"],
  },
  {
    title: "In Development",
    description: "Core procurement and operations modules are planned around the practical quote-to-cash workflow used by IT trading and project teams.",
    items: ["CRM and opportunities", "Supplier canvassing", "Quotation workflow", "Purchasing and procurement", "Inventory and delivery", "Billing and collections", "Dashboards"],
  },
  {
    title: "Future Vision",
    description: "Long-term roadmap items extend HACIEN ERP into a broader connected procurement ecosystem.",
    items: ["Customer Portal", "Marketplace", "Supplier APIs", "AI procurement assistant", "Advanced compliance reports", "ISO-ready quality modules", "SSO and MFA"],
  },
];

const differentiators = [
  ["Procurement-first design", "Built around requirements, canvassing, quotation, purchase planning, delivery, and support."],
  ["Built for IT integrators", "Designed for businesses that manage products, services, projects, suppliers, and customer commitments together."],
  ["Philippine compliance focus", "Designed with Philippine accounting and documentation requirements in mind without overstating certification status."],
  ["ERP + ecosystem", "Connects the future ERP with website, portal, marketplace, supplier API, and AI-assisted workflows."],
  ["Supplier canvassing", "Treats supplier coordination as a first-class operational process, not a note field."],
  ["Government procurement support", "Supports specification review, equivalent matching, quotation support, and documentation-aware work."],
  ["AI-ready architecture", "Prepared for future recommendations, summaries, search, forecasting, and workflow assistance."],
  ["Modern UI", "A React-based experience intended to be fast, clear, and usable for daily operations."],
  ["API-first direction", "Long-term direction includes cleaner integrations across suppliers, customers, and internal workflows."],
];

const trustArchitecture = [
  ["Procurement-first matters", "The platform direction begins with requirements, supplier canvassing, quotation, purchasing, receiving, delivery, billing, and support instead of treating procurement as an accounting note."],
  ["Operational events drive accounting", "Invoices, receipts, payables, ledgers, and reports should connect back to the originating opportunity, purchase plan, delivery, and customer commitment."],
  ["BIR-ready architectural direction", "The roadmap considers audit trails, sequential documents, official receipt and sales invoice workflows, computerized books readiness, and Philippine accounting practices."],
  ["CAS-readiness roadmap", "CAS-readiness is treated as a design direction and preparation path, not a claim of BIR approval or active certification."],
  ["ISO-oriented discipline", "Document control, approvals, SOPs, audit support, and continuous improvement are planned as operating disciplines for more controlled workflows."],
  ["Audit trail philosophy", "Important actions should leave a clear history so teams can understand who changed what, when, and why."],
  ["Role-based security", "Permissions, approval control, activity logs, backups, future MFA, and future SSO are part of the governance direction."],
  ["Future AI governance", "AI is framed as assistive search, summaries, recommendations, forecasting, and risk support, not a replacement for human accountability."],
];

function StatusPill({ children, tone = "blue" }: { children: string; tone?: "blue" | "slate" | "emerald" }) {
  const toneClass =
    tone === "emerald"
      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
      : tone === "slate"
        ? "border-slate-200 bg-slate-50 text-slate-700"
        : "border-blue-200 bg-blue-50 text-[#1457d9]";

  return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${toneClass}`}>{children}</span>;
}

function SectionIntro({
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  inverse?: boolean;
}) {
  return (
    <AnimatedContent>
      <div className={`text-xs font-bold uppercase tracking-[0.18em] ${inverse ? "text-blue-300" : "text-[#1457d9]"}`}>
        {eyebrow}
      </div>
      <h2 className={`mt-4 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl ${inverse ? "text-white" : "text-slate-950"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 max-w-3xl text-base leading-7 ${inverse ? "text-slate-300" : "text-slate-600"}`}>
          {description}
        </p>
      ) : null}
    </AnimatedContent>
  );
}

export default function ErpPlatformPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <AnimatedContent>
              <div className="mb-5 flex flex-wrap gap-2">
                <StatusPill>In Development</StatusPill>
                <StatusPill tone="slate">Roadmap-aware</StatusPill>
              </div>
            </AnimatedContent>
            <SplitText
              as="h1"
              text="HACIEN ERP is the operating system for procurement-driven technology businesses."
              className="max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={140}>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                A procurement-first ERP platform in development for IT integrators, government suppliers,
                ICT contractors, trading companies, managed service providers, and project-based businesses
                that need one connected workflow from requirement to support.
              </p>
            </BlurReveal>
            <AnimatedContent delay={240} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Ask about the roadmap
              </Link>
              <a href="#procurement-workflow" className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900">
                Explore procurement workflow
              </a>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={120} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Operational Core</div>
              <div className="mt-5 grid gap-3">
                {["CRM", "Supplier Canvass", "Quotation", "Purchasing", "Inventory", "Accounting", "Delivery", "Support"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 p-3">
                    <span className="grid h-8 w-8 place-items-center rounded bg-[#071426] text-xs font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Why HACIEN ERP Exists"
            title="IT procurement businesses need more than an accounting screen with inventory attached."
            description="Technology projects begin with customer requirements, supplier constraints, technical validation, formal quotations, approvals, purchasing, receiving, delivery, and support. HACIEN ERP is being shaped around that real operating sequence."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {painPoints.map(([title, text], index) => (
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

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="ERP Trust Architecture"
            title="Credibility comes from connecting operations, finance, governance, and compliance direction."
            description="HACIEN ERP should make procurement work traceable and accountable while remaining careful about what is available today versus what is planned."
            inverse
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {trustArchitecture.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 45}>
                <SpotlightCard
                  className="h-full rounded-lg border border-white/12 bg-white/[0.06] p-5"
                  spotlightColor="rgba(96, 165, 250, 0.14)"
                >
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section id="procurement-workflow" className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Procurement-First Philosophy"
            title="Accounting is integrated into operations, not isolated from them."
            description="The workflow starts with customer demand and moves through supplier canvassing, technical validation, quotation, purchasing, receiving, delivery, invoicing, official receipts, project completion, and support."
          />
          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {procurementFlow.map((step, index) => (
              <AnimatedContent key={step} delay={Math.min(index * 28, 340)} distance={12}>
                <div className="h-full rounded border border-slate-200 bg-white p-4">
                  <div className="text-xs font-bold text-[#1457d9]">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mt-2 text-sm font-bold text-slate-950">{step}</div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Core Modules"
            title="A connected module map for revenue, procurement, fulfillment, finance, and governance."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {moduleGroups.map((group, index) => (
              <AnimatedContent key={group.title} delay={index * 70}>
                <BorderGlow className="h-full rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">{group.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{group.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </BorderGlow>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionIntro
            eyebrow="Accounting & Finance"
            title="Financial control should be driven by the operating workflow."
            description="HACIEN ERP is planned so invoices, official receipts, payables, ledger activity, and reports can be connected back to the originating opportunity, purchase plan, delivery, and customer commitment."
            inverse
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {financeCapabilities.map((item, index) => (
              <AnimatedContent key={item} delay={Math.min(index * 35, 300)}>
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
          <SectionIntro
            eyebrow="Philippine Compliance"
            title="Designed with Philippine compliance requirements in mind."
            description="The compliance direction is intentionally stated with care. The roadmap focuses on BIR-ready architecture, CAS-readiness direction, auditability, tax workflow support, and Philippine accounting practices without overstating formal approval status."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {complianceItems.map((item, index) => (
              <AnimatedContent key={item} delay={index * 35}>
                <SpotlightCard className="h-full rounded-lg border border-blue-100 bg-blue-50/60 p-4">
                  <div className="text-sm font-bold text-slate-950">{item}</div>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionIntro
            eyebrow="ISO-Ready Operations"
            title="Operational discipline for documentation, approvals, audit support, and continuous improvement."
            description="Advanced quality management capabilities should be treated as roadmap items unless verified in the ERP implementation. The positioning should show direction without overclaiming maturity."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {isoItems.map((item, index) => (
              <AnimatedContent key={item} delay={index * 45}>
                <div className="rounded border border-slate-200 bg-white p-4 text-sm font-bold text-slate-800">{item}</div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Security & Governance"
            title="Built around permissions, auditability, approval control, and data integrity."
            description="The ERP direction favors clear ownership, activity history, approval discipline, secure APIs, backups, and future identity controls such as SSO and MFA."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {securityItems.map((item, index) => (
              <AnimatedContent key={item} delay={index * 35}>
                <div className="h-full rounded-lg border border-slate-200 bg-white p-4 text-sm font-bold text-slate-800 shadow-sm">
                  {item}
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b1220] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="AI Roadmap"
            title="AI is a roadmap layer for better procurement judgment, not a replacement for accountability."
            description="All AI capabilities listed here are future vision items unless verified in implementation. The goal is to assist users with search, summaries, recommendations, forecasting, risk signals, and executive insight."
            inverse
          />
          <Marquee className="mt-10" items={aiRoadmap.map((item) => `${item} (Roadmap)`)} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {aiRoadmap.slice(0, 6).map((item, index) => (
              <AnimatedContent key={item} delay={index * 60}>
                <SpotlightCard
                  className="h-full rounded-lg border border-white/12 bg-white/[0.06] p-5"
                  spotlightColor="rgba(96, 165, 250, 0.14)"
                >
                  <StatusPill>Roadmap</StatusPill>
                  <div className="mt-4 text-base font-bold">{item}</div>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="HACIEN Ecosystem"
            title="HACIEN ERP is the operational core of a connected procurement ecosystem."
            description="The long-term vision connects customer-facing demand, marketplace activity, supplier data, internal operations, accounting, project delivery, after-sales support, and future AI services."
          />
          <div className="mt-10 grid gap-3 md:grid-cols-3 lg:grid-cols-9">
            {ecosystemFlow.map((step, index) => (
              <AnimatedContent key={step} delay={index * 40}>
                <div className={`h-full rounded border p-4 text-center text-xs font-bold ${step === "HACIEN ERP" ? "border-[#1457d9] bg-[#1457d9] text-white shadow-lg shadow-blue-700/20" : "border-slate-200 bg-white text-slate-800"}`}>
                  <div className="text-[10px] opacity-70">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mt-2">{step}</div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Product Roadmap"
            title="Clear status labels keep the product vision credible."
            description="If a feature is not verified as implemented, it should remain under In Development or Future Vision. This protects buyer trust and avoids overstating readiness."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {roadmap.map((group, index) => (
              <AnimatedContent key={group.title} delay={index * 90}>
                <BorderGlow className="h-full rounded-lg bg-white p-6 shadow-sm">
                  <StatusPill tone={group.title === "Available" ? "emerald" : group.title === "In Development" ? "blue" : "slate"}>
                    {group.title}
                  </StatusPill>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{group.description}</p>
                  <ul className="mt-5 grid gap-3">
                    {group.items.map((item) => (
                      <li key={item} className="rounded border border-slate-200 bg-slate-50 p-3 text-sm font-bold text-slate-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </BorderGlow>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Why HACIEN ERP Is Different"
            title="Purpose-built for procurement, project delivery, finance, governance, and ecosystem growth."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {differentiators.map(([title, text], index) => (
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

      <OurCommitment />

      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.34]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Closing Vision</div>
                <h2 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl">
                  HACIEN ERP is being built to connect customers, suppliers, procurement teams, finance, projects, and support into one operating core.
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                  The ambition is practical: fewer disconnected files, clearer accountability, stronger audit trails,
                  better procurement visibility, and a platform foundation ready for portal, marketplace, supplier API,
                  and AI-assisted workflows.
                </p>
              </div>
              <Link
                href="/contact"
                className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold"
                style={{ color: "#071426" }}
              >
                Ask about the roadmap
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
