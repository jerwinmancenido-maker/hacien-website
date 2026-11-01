import Link from "next/link";
import {
  AnimatedContent,
  BorderGlow,
  GradientBackground,
  SpotlightCard,
} from "@/app/components/reactbits";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { solutions } from "@/data/solutions";
import { getSolutionsContent } from "@/lib/cms/content";
import { getCmsMetadata } from "@/lib/cms/seo";

export const metadata = getCmsMetadata("solutions");

const solutionImages: Record<string, keyof typeof enterpriseImages> = {
  "it-infrastructure": "dataCenter",
  "hardware-software-procurement": "workstation",
  "systems-integration": "commandCenter",
  "managed-it-support": "office",
  "network-connectivity": "network",
  "servers-storage": "storage",
  "cloud-productivity": "cloud",
  cybersecurity: "cybersecurity",
  "security-surveillance": "cabling",
  "software-licensing": "silicon",
  "general-merchandise-procurement": "documentation",
  "project-delivery-support": "workspace",
};

export default function SolutionsPage() {
  const content = getSolutionsContent();

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

      <section className="glass-section px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">{content.meaning.eyebrow}</div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {content.meaning.title}
            </h2>
          </AnimatedContent>
          <div className="grid gap-5">
            {content.meaning.cards.map((item, index) => (
              <AnimatedContent key={item.title} delay={index * 80}>
                <SpotlightCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-transparent px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">{content.activeAreas.eyebrow}</div>
            <h2 className="mt-4 max-w-3xl text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              {content.activeAreas.title}
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {content.activeAreas.description}
            </p>
          </AnimatedContent>
          <div className="grid gap-3 md:grid-cols-2">
            {solutions.map((solution, index) => (
              <AnimatedContent key={solution.slug} delay={Math.min(index * 45, 320)}>
                <Link href={`/solutions/${solution.slug}`} className="group block h-full">
                  <SpotlightCard className="h-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                    <div className="flex gap-3">
                      <div
                        className="h-16 w-20 shrink-0 rounded bg-slate-950"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(7, 20, 38, 0.04), rgba(7, 20, 38, 0.72)), url(${enterpriseImages[solutionImages[solution.slug] || "network"]})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">{solution.category}</div>
                        <h3 className="mt-1 text-base font-bold text-slate-950 group-hover:text-[#2563EB]">
                          {solution.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-600">{solution.summary}</p>
                        <div className="mt-3 text-sm font-bold text-[#2563EB]">View capability</div>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
            <AnimatedContent delay={320} className="md:col-span-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-base font-bold text-slate-950">{content.activeAreas.fallback.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {content.activeAreas.fallback.text}
                </p>
                <Link href={content.activeAreas.fallback.action.href} className="mt-3 inline-flex text-sm font-bold text-[#2563EB]">
                  {content.activeAreas.fallback.action.label}
                </Link>
              </div>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section className="bg-transparent px-4 py-12 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-ink p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
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
