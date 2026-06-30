import Link from "next/link";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { FadeIn, SlideUp, StaggerContainer } from "@/components/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#071426] text-white">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(7, 20, 38, 0.95), rgba(7, 20, 38, 0.64), rgba(7, 20, 38, 0.18)), url(${enterpriseImages.dataCenter})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(42,120,255,0.28),transparent_32%)]" />
      <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-4 py-18 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="mb-6 inline-flex w-fit rounded border border-blue-300/30 bg-white/8 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur">
              Enterprise technology
            </div>
          </FadeIn>
          <SlideUp delay={80}>
            <h1 className="max-w-5xl text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              Enterprise technology with operational clarity.
            </h1>
          </SlideUp>
          <SlideUp delay={170}>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-200">
              HACIEN helps organizations plan, source, deploy, and support infrastructure, software, cybersecurity, cloud, and managed services through one connected relationship.
            </p>
          </SlideUp>
          <SlideUp delay={260}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="button-glow rounded-full bg-white px-6 py-3 text-center text-sm font-bold text-[#071426] shadow-xl shadow-blue-950/30">
                Request Quote
              </Link>
              <Link href="/technology" className="interactive-link glass-control-dark rounded-full px-6 py-3 text-center text-sm font-bold text-white hover:border-blue-200">
                Explore Technology
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
          <div className="relative min-h-[520px] overflow-hidden rounded-lg border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-blue-500/10" />
            <div className="relative grid h-full grid-cols-2 gap-3">
              {[
              ["Enterprise Computing", "Workstations, servers, storage"],
              ["Networking", "Reliable organizational connectivity"],
              ["Cybersecurity", "Protected operating environments"],
              ["Cloud & Software", "Licensing and productivity platforms"],
              ["Government Support", "Documentation-aware sourcing"],
              ["HACIEN Platform", "Workspace, Timeline, Guardian"],
              ].map(([title, text], index) => (
                <div key={title} className="rounded-lg border border-white/12 bg-white/10 p-5 backdrop-blur transition-transform duration-200 hover:-translate-y-1">
                  <div className="text-xs font-bold text-blue-200">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mt-8 font-bold text-white">{title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
