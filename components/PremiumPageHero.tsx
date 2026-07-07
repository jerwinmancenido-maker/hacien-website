import Link from "next/link";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { FadeIn, SlideUp, StaggerContainer } from "@/components/motion";

type HeroAction = {
  href: string;
  label: string;
};

type HeroHighlight = {
  label: string;
  text: string;
};

export function PremiumPageHero({
  eyebrow,
  title,
  description,
  image,
  primaryAction,
  secondaryAction,
  highlights,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: keyof typeof enterpriseImages;
  primaryAction: HeroAction;
  secondaryAction?: HeroAction;
  highlights: HeroHighlight[];
}) {
  return (
    <section className="relative overflow-hidden bg-[#071426] text-white">
      <div
        className="cinematic-photo absolute inset-0 opacity-82"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(7, 20, 38, 0.96), rgba(7, 20, 38, 0.68), rgba(7, 20, 38, 0.24)), url(${enterpriseImages[image]})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(42,120,255,0.26),transparent_32%)]" />
      <div className="cinematic-lines pointer-events-none absolute inset-0 opacity-25" />
      <div className="cinematic-sweep pointer-events-none absolute inset-y-0 left-0 w-[72%] opacity-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071426] to-transparent" />
      <div className="relative mx-auto grid min-h-[470px] max-w-7xl items-center gap-5 px-4 py-7 sm:min-h-[540px] sm:gap-8 sm:px-6 sm:py-10 lg:min-h-[590px] lg:grid-cols-[1fr_0.88fr] lg:px-8 lg:py-14">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="mb-3 inline-flex w-fit rounded border border-blue-300/30 bg-white/8 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur sm:mb-5">
              {eyebrow}
            </div>
          </FadeIn>
          <SlideUp delay={80}>
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
          </SlideUp>
          <SlideUp delay={170}>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:mt-5 sm:text-base sm:leading-7">
              {description}
            </p>
          </SlideUp>
          <SlideUp delay={260}>
            <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:gap-3">
              <Link href={primaryAction.href} className="button-glow rounded-full bg-white px-5 py-2.5 text-center text-sm font-bold text-[#071426] shadow-xl shadow-blue-950/30 sm:px-6 sm:py-3">
                {primaryAction.label}
              </Link>
              {secondaryAction ? (
                <Link href={secondaryAction.href} className="interactive-link glass-control-dark rounded-full px-5 py-2.5 text-center text-sm font-bold text-white hover:border-blue-200 sm:px-6 sm:py-3">
                  {secondaryAction.label}
                </Link>
              ) : null}
            </div>
          </SlideUp>
        </div>

        <SlideUp delay={220} className="h-full">
          <div className="relative overflow-hidden rounded-lg border border-white/15 bg-white/[0.08] p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-blue-500/10" />
            <StaggerContainer className="relative grid gap-3 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <div key={item.label} className="rounded-lg border border-white/12 bg-white/10 p-3 backdrop-blur transition-transform duration-200 hover:-translate-y-1">
                  <div className="text-xs font-bold text-blue-200">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mt-2 text-sm font-bold text-white">{item.label}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">{item.text}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
