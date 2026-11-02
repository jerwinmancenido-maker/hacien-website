import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";
import { companyContact } from "@/data/companyContact";

export const metadata: Metadata = {
  title: "Company Profile",
  description:
    "HACIEN company profile with supported company identity facts, RFQ intake, and professional procurement coordination.",
};

const profileItems = [
  ["What HACIEN does", "Solutions consulting, RFQ review, technology requirement coordination, procurement support, and customer-success oriented follow-through."],
  ["How HACIEN works", "Every request is reviewed before quotation, delivery, warranty, payment, or tax commitments are made."],
  ["Published company facts", "HACIEN INFORMATION TECHNOLOGY SOLUTIONS publishes company information with clear public limits."],
  ["Commercial commitments", "Pricing, delivery, warranty, payment, and tax terms are confirmed only through request-specific formal documents or written business communication."],
  ["Why this matters", "Customers and suppliers should know which information is public, which commitments are formal, and how to begin safely."],
];

const verification = [
  ["Company name", "Published"],
  ["Business communication", "Review path"],
  ["Formal documents", "Upon approved request"],
  ["Office location", "Published"],
  ["Public contact", "Form-based inquiry path"],
  ["Public RFQ", "Review intake available"],
];

export default function CompanyProfilePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-12">
        <div className="absolute inset-0 hq-grid opacity-80" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Company Profile
            </AnimatedContent>
            <h1 className="mt-5 max-w-5xl text-3xl font-bold tracking-tight sm:text-5xl">
              HACIEN publishes only the company facts it can support.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-grey-300">
              HACIEN INFORMATION TECHNOLOGY SOLUTIONS publishes supported company identity facts and keeps commercial commitments inside formal review, quotation, and written communication.
            </p>
          </div>
          <BorderGlow tone="dark" className="rounded-lg bg-white/[0.07] p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Verification Snapshot</div>
            <div className="mt-6 grid gap-3">
              {verification.map(([field, status]) => (
                <div key={field} className="flex items-center justify-between gap-4 rounded border border-white/12 bg-white/[0.06] px-4 py-3">
                  <span className="text-sm font-semibold text-slate-200">{field}</span>
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
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Public Profile</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Useful information with clear public boundaries.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {profileItems.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 70}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-2">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Contact Details</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Public business contact.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
              Customers, suppliers, partners, and organization buyers may use these public paths to begin clear communication with HACIEN.
            </p>
          </AnimatedContent>
          <AnimatedContent delay={100}>
            <div className="grid gap-5 text-sm leading-7 text-slate-700">
              <div>
                <div className="font-bold text-slate-950">Inquiry routing</div>
                <p className="mt-1">{companyContact.contactInstruction}</p>
              </div>
              <div>
                <div className="font-bold text-slate-950">{companyContact.addressLabel}</div>
                <address className="mt-2 not-italic text-slate-700">
                  {companyContact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Next public action</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Send a requirement for review.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              The RFQ channel is the safest way to start: describe the requirement, attach supporting files, receive a reference number, and continue through review.
            </p>
          </div>
          <Link href="/quote" className="button-glow rounded bg-[#2563EB] px-5 py-3 text-center text-sm font-bold text-white">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
