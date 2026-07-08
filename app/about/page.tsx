import Link from "next/link";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  SpotlightCard,
} from "@/app/components/reactbits";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { CompanyCredentials } from "@/components/TrustConfidence";
import { getAboutContent } from "@/lib/cms/content";
import { getCmsMetadata } from "@/lib/cms/seo";

export const metadata = getCmsMetadata("about");

export default function AboutPage() {
  const content = getAboutContent();

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

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">{content.story.eyebrow}</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {content.story.title}
            </h2>
          </AnimatedContent>
          <div className="space-y-4 sm:space-y-6">
            {content.story.paragraphs.map((paragraph, index) => (
            <BlurReveal key={paragraph} delay={index * 120}>
              <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                {paragraph}
              </p>
            </BlurReveal>
            ))}
            <div className="grid gap-3 sm:grid-cols-2">
              {content.story.signals.map((signal, index) => (
                <AnimatedContent key={signal} delay={index * 70}>
                  <SpotlightCard className={`rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4 ${index > 1 ? "hidden sm:block" : ""}`}>
                    <div className="text-sm font-bold text-slate-900">{signal}</div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CompanyCredentials />

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <AnimatedContent>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">{content.workingStandard.eyebrow}</div>
              <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {content.workingStandard.title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                {content.workingStandard.description}
              </p>
            </AnimatedContent>
            <div className="grid gap-2 md:grid-cols-2 md:gap-3">
              {content.workingStandard.cards.map((item, index) => (
                <AnimatedContent key={item.title} delay={Math.min(index * 45, 320)}>
                  <BorderGlow className={`h-full rounded-lg bg-white p-3 shadow-sm sm:p-4 ${index > 4 ? "hidden md:block" : ""}`}>
                    <div className="text-xs font-bold text-[#1457d9]">{String(index + 1).padStart(2, "0")}</div>
                    <h3 className="mt-2 text-sm font-bold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{item.text}</p>
                  </BorderGlow>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[linear-gradient(135deg,#071426_0%,#0b3142_58%,#123730_100%)] p-5 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  {content.cta.eyebrow}
                </div>
                <h2 className="mt-3 max-w-3xl text-xl font-bold tracking-tight sm:mt-4 sm:text-3xl">
                  {content.cta.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:mt-4">
                  {content.cta.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={content.cta.action.href}
                  className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]"
                >
                  {content.cta.action.label}
                </Link>
              </div>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
