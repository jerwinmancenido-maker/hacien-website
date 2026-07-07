import type { Metadata } from "next";
import Link from "next/link";
import { AiDocumentParser } from "@/components/AiDocumentParser";
import { PremiumPageHero } from "@/components/PremiumPageHero";

export const metadata: Metadata = {
  title: "Help Center | HACIEN",
  description: "HACIEN help center for RFQ preparation, request tracking, and prototype document parsing.",
};

const helpTiles = [
  ["Prepare an RFQ", "Attach requirements, BOQs, supplier quotes, images, spreadsheets, or plain descriptions.", "/quote"],
  ["Track a request", "Use your Gateway reference to inspect the current public tracking response.", "/track/sample-reference"],
  ["Read FAQ", "Search evidence-safe answers about intake, documents, payments, warranty context, and support.", "/faq"],
  ["Contact HACIEN", "Send a support or follow-up message with request context.", "/contact"],
];

export default function HelpPage() {
  return (
    <>
      <PremiumPageHero
        eyebrow="Help Center"
        title="Prepare better request context."
        description="Use these tools to organize RFQ details and understand what the public website can and cannot confirm."
        image="workspace"
        primaryAction={{ href: "/quote", label: "Start an RFQ" }}
        secondaryAction={{ href: "/faq", label: "Search FAQ" }}
        highlights={[
          { label: "Attachments", text: "BOQ, PDF, images, and spreadsheet context can support review." },
          { label: "Tracking", text: "Gateway references help with follow-up." },
          { label: "Prototype tools", text: "Parser output is review-only." },
          { label: "Bounded claims", text: "Official documents are not issued here." },
        ]}
      />
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {helpTiles.map(([title, text, href]) => (
              <Link key={title} href={href} className="lift rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-base font-bold text-slate-950">{title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </Link>
            ))}
          </div>
          <AiDocumentParser />
        </div>
      </section>
    </>
  );
}
