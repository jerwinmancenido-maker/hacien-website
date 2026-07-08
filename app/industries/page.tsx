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

export const metadata: Metadata = {
  title: "Industries Served | HACIEN",
  description:
    "Explore how HACIEN supports business, education, healthcare, construction, enterprise, and organization buyers with RFQ-first technology support.",
};

const industries = [
  ["Business", "Workstations, software, network upgrades, peripherals, power protection, and recurring office technology procurement."],
  ["Organizations", "Specification review, approved equivalent matching, quotation support, documentation-aware review, and delivery coordination."],
  ["Education", "Classroom devices, WiFi, printing, security systems, productivity licenses, and institutional purchasing support."],
  ["Healthcare", "Reliable endpoint, network, storage, power, security, and support materials for operational environments."],
  ["Construction", "Project office equipment, site connectivity, CCTV, access control, consumables, and deployment materials."],
  ["Enterprise", "Multi-supplier coordination for infrastructure refreshes, device rollouts, renewals, documentation, and closeout records."],
];

const signals = [
  "Procurement requirements vary by industry.",
  "Technical specifications need working details.",
  "Supplier availability changes per project.",
  "Documentation and delivery expectations matter.",
  "Support should continue after closeout.",
];

export default function IndustriesPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-12">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Industries
            </AnimatedContent>
            <SplitText
              as="h1"
              text="Procurement support shaped around each buyer's operating reality."
              className="mt-5 max-w-5xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                HACIEN supports organizations whose technology needs depend on specifications,
                supplier timing, warranty terms, delivery coordination, and procurement documentation.
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/solutions"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Explore Solutions
              </Link>
              <Link
                href="/quote"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Start RFQ
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Buyer Context
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                Industry details change how products should be specified, reviewed, and delivered.
              </h2>
              <div className="mt-8 grid gap-3">
                {signals.map((signal, index) => (
                  <div key={signal} className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{signal}</span>
                  </div>
                ))}
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Who HACIEN Supports</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Built for buyers who need organized RFQs, not generic catalog browsing.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {industries.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 65}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Industry-specific review
                </div>
                <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
                  Have a requirement with site, compliance, or delivery constraints?
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                  Send the requirement details, and HACIEN will help shape the RFQ path.
                </p>
              </div>
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]"
              >
                Submit RFQ
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
