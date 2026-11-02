import Link from "next/link";
import {
  AnimatedContent,
  BorderGlow,
  GradientBackground,
  SpotlightCard,
} from "@/app/components/reactbits";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { CompanyCredentials } from "@/components/TrustConfidence";
import {
  brandsLine,
  deliveryClauses,
  showroomNote,
  supplyException,
  supplyItems,
} from "@/data/companyContact";
import { getAboutContent } from "@/lib/cms/content";
import { getCmsMetadata } from "@/lib/cms/seo";

const factCards = [
  ...supplyItems.map((item) => ({ title: item.title, text: item.text })),
  { title: "Brands", text: brandsLine },
  ...deliveryClauses.map((text) => ({ title: text, text: "" })),
  { title: showroomNote, text: "" },
  { title: supplyException, text: "" },
];

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
        highlights={[]}
      />

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2">
          {factCards.map((card, index) => (
            <AnimatedContent key={`${card.title}-${index}`} delay={index * 40}>
              <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="text-sm font-bold text-slate-950">{card.title}</h2>
                {card.text ? <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p> : null}
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <CompanyCredentials />

      <section className="px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-ink p-5 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-400">
                  {content.cta.eyebrow}
                </div>
                <h2 className="mt-3 max-w-3xl text-xl font-bold tracking-tight sm:mt-4 sm:text-3xl">
                  {content.cta.title}
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-grey-300 sm:mt-4">
                  {content.cta.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href={content.cta.action.href}
                  className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#0A0A0A]"
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
