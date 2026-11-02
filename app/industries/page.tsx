import Link from "next/link";
import {
  AnimatedContent,
  BorderGlow,
  GradientBackground,
  SpotlightCard,
} from "@/app/components/reactbits";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { getIndustriesContent } from "@/lib/cms/content";
import { getCmsMetadata } from "@/lib/cms/seo";

export const metadata = getCmsMetadata("industries");

export default function IndustriesPage() {
  const content = getIndustriesContent();

  return (
    <>
      <PremiumPageHero
        eyebrow={content.hero.eyebrow}
        title={content.hero.title}
        description={content.hero.description}
        image={content.hero.image}
        primaryAction={content.hero.primaryAction}
        secondaryAction={content.hero.secondaryAction}
        highlights={content.hero.highlights}
      />

      <section className="glass-section py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:px-8">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">
              {content.buyerContext.eyebrow}
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {content.buyerContext.title}
            </h2>
          </AnimatedContent>
          <div className="grid gap-3">
            {content.buyerContext.signals.map((signal, index) => (
              <div key={signal} className="flex items-center gap-3 rounded border border-slate-200 bg-white p-4 shadow-sm">
                <span className="grid h-7 w-7 place-items-center rounded bg-[#0A0A0A] text-xs font-bold text-white shrink-0">
                  {index + 1}
                </span>
                <span className="text-sm font-bold text-slate-800">{signal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">{content.supportedIndustries.eyebrow}</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {content.supportedIndustries.title}
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {content.supportedIndustries.cards.map((item, index) => (
              <AnimatedContent key={item.title} delay={index * 65}>
                <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950 sm:text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-14">
        <AnimatedContent className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#0A0A0A] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-400">
                  {content.cta.eyebrow}
                </div>
                <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight sm:text-3xl">
                  {content.cta.title}
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-grey-300">
                  {content.cta.description}
                </p>
              </div>
              <Link
                href={content.cta.action.href}
                className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#0A0A0A] cursor-pointer"
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
