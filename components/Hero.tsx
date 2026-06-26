import Link from "next/link";
import { CountUpMetric, FadeIn, SlideUp, StaggerContainer } from "@/components/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#071426] text-white">
      <div className="absolute inset-0 opacity-70 animated-grid" />
      <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-28">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="mb-6 inline-flex w-fit rounded-full border border-blue-300/30 bg-white/8 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
              IT procurement + infrastructure delivery
            </div>
          </FadeIn>
          <SlideUp delay={80}>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Procurement.
              <br />
              Infrastructure.
              <br />
              Delivery.
            </h1>
          </SlideUp>
          <SlideUp delay={170}>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-200">
              IT procurement, infrastructure sourcing, systems integration, and RFQ support for Philippine organizations.
              HACIEN helps businesses, institutions, and project teams source, evaluate, quote, procure,
              deliver, and support technology solutions with clearer documentation.
            </p>
          </SlideUp>
          <SlideUp delay={260}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="button-glow rounded bg-white px-5 py-3 text-center text-sm font-bold text-[#071426] shadow-xl shadow-blue-950/30">
                Submit RFQ
              </Link>
              <Link href="/solutions" className="interactive-link rounded border border-white/25 bg-white/8 px-5 py-3 text-center text-sm font-bold text-white backdrop-blur hover:border-blue-200">
                Explore solutions
              </Link>
            </div>
          </SlideUp>
          <StaggerContainer className="mt-10 grid gap-3 sm:grid-cols-3">
            <CountUpMetric value={7} label="Product categories" />
            <CountUpMetric value={6} label="RFQ workflow stages" />
            <CountUpMetric value={0} label="Unsupported claims" />
          </StaggerContainer>
        </div>

        <SlideUp delay={220} className="h-full">
          <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl shadow-black/20 backdrop-blur">
            <div className="absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />
            <div className="absolute left-1/2 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-transparent via-violet-300/50 to-transparent" />
            <div className="relative grid h-full grid-cols-2 gap-4">
              {[
                ["Requirement", "Need, timeline, location"],
                ["Specification Review", "Equivalent matching"],
                ["Supplier Canvass", "Availability and warranty"],
                ["Quotation", "Formal offer support"],
                ["Procurement", "Order coordination"],
                ["Delivery", "Handover planning"],
              ].map(([title, text], index) => (
                <div key={title} className="floating-card rounded-xl border border-white/14 bg-white/10 p-5 backdrop-blur">
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
