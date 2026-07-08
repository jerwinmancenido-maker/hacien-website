import type { Metadata } from "next";
import Link from "next/link";
import {
  DocumentClause,
  DocumentIntro,
  DocumentPageShell,
  DocumentSection,
} from "@/components/DocumentLayout";

export const metadata: Metadata = {
  title: "Trust & Compliance",
  description:
    "HACIEN Trust Center for company identity, RFQ terms, support expectations, privacy, security, and commercial verification boundaries.",
};

const policyGroups = [
  ["Company identity", "Bounded facts", "HACIEN publishes only company information that is suitable for public review."],
  ["RFQ and quotation", "Review first", "An RFQ starts a review. Commercial terms belong in a request-specific written response."],
  ["Payment and billing", "Not published", "The public website does not publish bank details, payment instructions, default payment terms, or billing treatment."],
  ["Warranty and returns", "Request-specific", "Warranty, replacement, return, and refund handling must be checked against supplier, vendor, manufacturer, or formal HACIEN evidence."],
  ["Delivery and acceptance", "Confirmed per request", "Delivery charges, receiver rules, and site requirements are confirmed in formal documents or written business communication."],
  ["Support", "Inquiry path", "Support requests are routed through the appropriate inquiry, RFQ, or follow-up path."],
  ["Privacy", "Policy available", "Public forms collect voluntarily submitted inquiry and RFQ details. Supplier sharing may occur only when needed for review."],
  ["Security", "Bounded statements", "Security statements stay tied to implemented controls and verified operating evidence."],
];

const documentRules = [
  "Public company facts should be supported by evidence before they appear on customer-facing pages.",
  "Customer-facing policies should show owner, version, effective date, review date, and status when published.",
  "ERP documents should reference the policy version that applied when issued.",
  "Commercial commitments should be made through formal quotations, orders, and written business communication.",
];

export default function TrustCenterPage() {
  return (
    <DocumentPageShell
      eyebrow="Trust Center"
      title="Clear boundaries make better business conversations."
      description="HACIEN keeps public claims narrow, routes requests through review, and separates website information from formal commercial documents."
      meta={[
        { label: "RFQ intake", value: "Available" },
        { label: "Payment details", value: "Not public" },
        { label: "Formal terms", value: "Document-led" },
      ]}
    >
      <DocumentIntro>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p>
              Public pages should help a buyer start a serious conversation without implying
              instant pricing, stock, payment, warranty, or tax commitments.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="button-glow rounded bg-[#071426] px-5 py-3 text-center text-sm font-bold text-white">
                Submit RFQ
              </Link>
              <Link href="/support" className="interactive-link rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900">
                Contact support
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Current public status</div>
            <div className="mt-4 grid gap-2">
              {[
                ["Company information", "Bounded"],
                ["Business communication", "Review path"],
                ["Formal documents", "Upon approved request"],
                ["Payment details", "Not published"],
                ["RFQ intake", "Review path available"],
              ].map(([label, status]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 rounded border border-slate-200 bg-white/80 px-4 py-3"
                >
                  <span className="text-sm font-semibold text-slate-700">{label}</span>
                  <span className="text-right text-xs font-bold uppercase tracking-[0.12em] text-[#1457d9]">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DocumentIntro>

      <DocumentSection title="Public boundaries" index={0}>
        <p>
          These categories define what the website can say publicly and what must wait for
          request-specific review.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {policyGroups.map(([title, status, text], index) => (
            <DocumentClause key={title} title={`${index + 1}. ${title}`}>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#1457d9]">
                {status}
              </div>
              <p>{text}</p>
            </DocumentClause>
          ))}
        </div>
      </DocumentSection>

      <DocumentSection title="Document rules" index={1}>
        <p>Financial, legal, and commercial commitments should remain clear, versioned, and reviewable.</p>
        <div className="grid gap-3">
          {documentRules.map((rule, index) => (
            <DocumentClause key={rule} title={`${index + 1}. Rule`}>
              <p>{rule}</p>
            </DocumentClause>
          ))}
        </div>
      </DocumentSection>
    </DocumentPageShell>
  );
}
