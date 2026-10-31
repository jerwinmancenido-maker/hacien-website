import Link from "next/link";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  SplitText,
  SpotlightCard,
} from "@/app/components/reactbits";
import { getIndustriesContent } from "@/lib/cms/content";
import { getCmsMetadata } from "@/lib/cms/seo";

export const metadata = getCmsMetadata("industries");

export default function IndustriesPage() {
  const content = getIndustriesContent();

  return (
    <>
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-12">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">
              {content.hero.eyebrow}
            </AnimatedContent>
            <SplitText
              as="h1"
              text={content.hero.title}
              className="mt-5 max-w-5xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {content.hero.description}
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={content.hero.primaryAction.href}
                className="button-glow focus-ring rounded bg-[#2563EB] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                {content.hero.primaryAction.label}
              </Link>
              {content.hero.secondaryAction ? (
                <Link
                  href={content.hero.secondaryAction.href}
                  className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
                >
                  {content.hero.secondaryAction.label}
                </Link>
              ) : null}
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">
                {content.buyerContext.eyebrow}
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                {content.buyerContext.title}
              </h2>
              <div className="mt-8 grid gap-3">
                {content.buyerContext.signals.map((signal, index) => (
                  <div key={signal} className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded bg-[#0A0A0A] text-xs font-bold text-white">
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
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">{content.supportedIndustries.eyebrow}</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {content.supportedIndustries.title}
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.supportedIndustries.cards.map((item, index) => (
              <AnimatedContent key={item.title} delay={index * 65}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#0A0A0A] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  {content.cta.eyebrow}
                </div>
                <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
                  {content.cta.title}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-grey-400">
                  {content.cta.description}
                </p>
              </div>
              <Link
                href={content.cta.action.href}
                className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#0A0A0A]"
              >
                {content.cta.action.label}
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
