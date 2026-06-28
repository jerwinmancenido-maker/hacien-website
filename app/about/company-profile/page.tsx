import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";

export const metadata: Metadata = {
  title: "Company Profile",
  description:
    "Truth-safe HACIEN company profile with verified DTI business name registration and pending tax, permit, bank, signatory, and payment verification.",
};

const profileItems = [
  ["What HACIEN does", "Solutions consulting, RFQ review, technology sourcing coordination, procurement support, and customer-success oriented follow-through."],
  ["What HACIEN is preparing", "A verified operating foundation for public documents, supplier accreditation, Trust Center policies, ERP records, and future customer portal visibility."],
  ["What is verified", "DTI business name registration for HACIEN INFORMATION TECHNOLOGY SOLUTIONS, Business Name No. 8278010, National scope, valid June 17, 2026 to June 17, 2031."],
  ["What is not published yet", "BIR, TIN, RDO, LGU permit, bank, payment instruction, signatory, tax profile, certification, and accreditation claims."],
  ["Why this matters", "Customers and suppliers should not need to guess which claims are verified and which are still being prepared."],
];

const verification = [
  ["DTI business name", "Verified"],
  ["Business Name No.", "8278010"],
  ["Validity", "Jun 17 2026 - Jun 17 2031"],
  ["Tax identity", "Not published"],
  ["Office location", "Lease evidence verified"],
  ["Bank/payment", "Not published"],
  ["Public RFQ", "Available"],
];

export default function CompanyProfilePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute inset-0 hq-grid opacity-80" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
              Company Profile
            </AnimatedContent>
            <h1 className="mt-5 max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl">
              HACIEN has verified its DTI business name registration.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              HACIEN INFORMATION TECHNOLOGY SOLUTIONS is registered with DTI as a business name. Tax, permit, bank, payment, and signatory details remain unpublished until separately verified.
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

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Public Profile</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Useful information without unsupported claims.
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

      <section className="bg-slate-50 px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Next public action</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Send a requirement for review.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">
              The RFQ channel is the safest current way to engage HACIEN while remaining tax, payment, supplier, and policy verification continues.
            </p>
          </div>
          <Link href="/quote" className="button-glow rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white">
            Submit RFQ
          </Link>
        </div>
      </section>
    </>
  );
}
