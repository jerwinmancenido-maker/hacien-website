import Link from "next/link";
import { FadeIn, SlideUp, StaggerContainer } from "@/components/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#071426] text-white">
      <div className="absolute inset-0 opacity-80 hq-grid" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-18 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="mb-6 inline-flex w-fit rounded border border-blue-300/30 bg-white/8 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
              Public Headquarters · Verified company facts
            </div>
          </FadeIn>
          <SlideUp delay={80}>
            <h1 className="max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              HACIEN Headquarters for technology requirements.
            </h1>
          </SlideUp>
          <SlideUp delay={170}>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-200">
              A calm entry point for RFQs, solutions consulting, technology sourcing, procurement coordination, and future customer visibility. HACIEN publishes verified DTI and BIR registration facts while keeping tax-readiness, permit, bank, and payment claims pending.
            </p>
          </SlideUp>
          <SlideUp delay={260}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="button-glow rounded bg-white px-5 py-3 text-center text-sm font-bold text-[#071426] shadow-xl shadow-blue-950/30">
                Submit an RFQ
              </Link>
              <Link href="/trust-center" className="interactive-link rounded border border-white/25 bg-white/8 px-5 py-3 text-center text-sm font-bold text-white backdrop-blur hover:border-blue-200">
                View trust status
              </Link>
            </div>
          </SlideUp>
          <StaggerContainer className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["DTI identity", "Verified"],
              ["BIR registration", "Verified facts"],
              ["RFQ path", "Available"],
            ].map(([label, value]) => (
              <div key={label} className="rounded border border-white/12 bg-white/[0.07] p-4 backdrop-blur">
                <div className="text-xs font-bold uppercase tracking-[0.14em] text-blue-200">{label}</div>
                <div className="mt-2 text-sm font-bold text-white">{value}</div>
              </div>
            ))}
          </StaggerContainer>
        </div>

        <SlideUp delay={220} className="h-full">
          <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-white/15 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
            <div className="absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-transparent via-violet-300/50 to-transparent" />
            <div className="relative grid h-full grid-cols-2 gap-4">
              {[
                ["RFQ Desk", "Need, timeline, location"],
                ["Solutions Room", "Requirement and option review"],
                ["Trust Center", "Verified and pending status"],
                ["Support Desk", "Clear follow-up path"],
                ["Portal Roadmap", "Planned customer visibility"],
                ["Company Foundation", "Evidence before claims"],
              ].map(([title, text], index) => (
                <div key={title} className="rounded-lg border border-white/14 bg-white/10 p-5 backdrop-blur transition-transform duration-200 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded bg-white text-sm font-bold text-[#071426]">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white">{title}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
