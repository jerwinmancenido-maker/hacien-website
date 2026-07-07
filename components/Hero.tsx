import Image from "next/image";
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
      <div className="pointer-events-none absolute -right-[18vw] top-12 hidden h-[720px] w-[720px] opacity-[0.16] mix-blend-screen lg:block xl:-right-[10vw] xl:h-[820px] xl:w-[820px]">
        <Image
          src="/brand/hacien-mark-4k.png"
          alt=""
          fill
          priority
          sizes="820px"
          className="object-contain drop-shadow-[0_0_70px_rgba(45,212,255,0.28)]"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071426] to-transparent" />
      <div className="relative mx-auto grid min-h-[600px] max-w-7xl items-center gap-6 px-4 py-8 sm:min-h-[660px] sm:gap-8 sm:px-6 sm:py-12 lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="mb-4 inline-flex w-fit rounded border border-blue-300/30 bg-white/8 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
              Enterprise technology
            </div>
          </FadeIn>
          <SlideUp delay={80}>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
              Enterprise technology with operational clarity.
            </h1>
          </SlideUp>
          <SlideUp delay={170}>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
              HACIEN helps organizations plan, source, deploy, and support infrastructure, software, cybersecurity, cloud, and managed services through one connected relationship.
            </p>
          </SlideUp>
          <SlideUp delay={260}>
            <div className="mt-5 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:gap-3">
              <Link href="/quote" className="button-glow rounded-full bg-white px-5 py-2.5 text-center text-sm font-bold text-[#071426] shadow-xl shadow-blue-950/30 sm:px-6 sm:py-3">
                Request Quote
              </Link>
              <Link href="/technology" className="interactive-link glass-control-dark rounded-full px-5 py-2.5 text-center text-sm font-bold text-white hover:border-blue-200 sm:px-6 sm:py-3">
                Explore Technology
              </Link>
            </div>
          </SlideUp>
          <StaggerContainer className="mt-10 hidden gap-3 sm:grid sm:grid-cols-3">
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
          <div className="relative min-h-0 overflow-hidden rounded-lg border border-white/15 bg-white/[0.08] p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:min-h-[360px] sm:p-4 lg:min-h-[420px]">
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
                <div key={title} className="rounded-lg border border-white/12 bg-white/10 p-3 backdrop-blur transition-transform duration-200 hover:-translate-y-1 sm:p-4">
                  <div className="text-xs font-bold text-blue-200">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mt-2 text-sm font-bold text-white sm:mt-5 sm:text-base">{title}</div>
                  <p className="mt-2 hidden text-sm leading-6 text-slate-300 sm:block">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
