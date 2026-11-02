import Link from "next/link";
import {
  EnterpriseMediaImage,
  enterpriseHeroSizes,
  enterpriseImages,
} from "@/components/EnterpriseImagery";
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
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white">
      <div className="cinematic-photo absolute inset-0 opacity-[0.82]">
        <EnterpriseMediaImage image={image} priority sizes={enterpriseHeroSizes} />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(105deg, rgba(5, 16, 28, 0.98), rgba(8, 45, 62, 0.74) 50%, rgba(132, 91, 44, 0.2))",
          }}
        />
      </div>
      <div className="cinematic-aurora pointer-events-none absolute inset-0" />
      <div className="cinematic-lines pointer-events-none absolute inset-0 opacity-25" />
      <div className="cinematic-sweep pointer-events-none absolute inset-y-0 left-0 w-[72%] opacity-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      <div className="relative mx-auto grid min-h-[400px] max-w-7xl items-center gap-5 px-4 py-7 sm:min-h-[500px] sm:gap-8 sm:px-6 sm:py-9 lg:min-h-[540px] lg:grid-cols-[1fr_0.88fr] lg:px-8 lg:py-12">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="mb-3 inline-flex w-fit rounded border border-blue-300/30 bg-white/8 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur sm:mb-5">
              {eyebrow}
            </div>
          </FadeIn>
          <SlideUp delay={80}>
            <h1 className="font-display max-w-4xl text-3xl tracking-tight sm:text-5xl">
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
              <Link href={primaryAction.href} className="rounded bg-blue px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-dark sm:px-6 sm:py-3">
                {primaryAction.label}
              </Link>
              {secondaryAction ? (
                <Link href={secondaryAction.href} className="interactive-link rounded border border-white/25 bg-transparent px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-white/5 sm:px-6 sm:py-3">
                  {secondaryAction.label}
                </Link>
              ) : null}
            </div>
          </SlideUp>
        </div>

        {highlights.length > 0 ? (
        <SlideUp delay={220} className="h-full">
          {/* Darker glass so grey-300 body copy stays AA over bright hero photos (e.g. products laptop). */}
          <div className="relative overflow-hidden rounded-lg border border-white/15 bg-[#05101C]/90 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white/6 via-[#05101C]/35 to-black/50" />
            <StaggerContainer className="relative grid gap-2 sm:grid-cols-2 sm:gap-3">
              {highlights.map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-lg border border-white/12 bg-black/65 p-3 backdrop-blur-md transition-transform duration-200 hover:-translate-y-1 ${index > 1 ? "hidden sm:block" : ""}`}
                >
                  <div className="text-xs font-bold text-grey-300">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mt-2 text-sm font-bold text-white">{item.label}</div>
                  <p className="mt-2 text-xs leading-5 text-grey-300 sm:text-sm sm:leading-6">{item.text}</p>
                </div>
              ))}
            </StaggerContainer>
          </div>
        </SlideUp>
        ) : null}
      </div>
    </section>
  );
}
