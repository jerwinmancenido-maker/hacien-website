import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, BorderGlow, SpotlightCard } from "@/app/components/reactbits";
import {
  companyContact,
  founderLine,
  registeredCompanyName,
  registrationPapersNote,
  registrationStatuses,
  supplyException,
  supplyItems,
} from "@/data/companyContact";

export const metadata: Metadata = {
  title: "Company Profile",
  description: founderLine,
};

const verification = registrationStatuses.map((item) => [item.label, item.status] as const);

export default function CompanyProfilePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-12">
        <div className="absolute inset-0 hq-grid opacity-80" />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-grey-400">
              Company Profile
            </AnimatedContent>
            <h1 className="mt-5 max-w-5xl text-3xl font-bold tracking-tight sm:text-5xl">
              {registeredCompanyName}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-grey-300">{founderLine}</p>
          </div>
          <BorderGlow tone="dark" className="rounded-lg bg-white/[0.07] p-6">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-400">Verification Snapshot</div>
            <div className="mt-6 grid gap-3">
              {verification.map(([field, status]) => (
                <div key={field} className="flex items-center justify-between gap-4 rounded border border-white/12 bg-white/[0.06] px-4 py-3">
                  <span className="text-sm font-semibold text-slate-200">{field}</span>
                  {status ? <span className="text-right text-sm font-semibold text-white">{status}</span> : null}
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-grey-300">{registrationPapersNote}</p>
            <Link href="/compliance" className="mt-4 inline-flex text-sm font-bold text-blue hover:underline">
              See Government Compliance
            </Link>
          </BorderGlow>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">What HACIEN supplies</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              What HACIEN supplies
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{supplyException}</p>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {supplyItems.map((item, index) => (
              <AnimatedContent key={item.title} delay={index * 70}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-2">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Contact Details</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Office address</h2>
          </AnimatedContent>
          <AnimatedContent delay={100}>
            <div className="grid gap-5 text-sm leading-7 text-slate-700">
              <div>
                <div className="font-bold text-slate-950">Appointments</div>
                <p className="mt-1">{companyContact.showroomNote}</p>
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
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Next public action</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Request a quotation.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{companyContact.replyTime}</p>
          </div>
          <Link href="/quote" className="button-glow rounded bg-[#2563EB] px-5 py-3 text-center text-sm font-bold text-white">
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
