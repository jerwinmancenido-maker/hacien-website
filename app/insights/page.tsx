import type { Metadata } from "next";
import Link from "next/link";
import {
  AnimatedContent,
  BlurReveal,
  BorderGlow,
  GradientBackground,
  SplitText,
  SpotlightCard,
} from "@/app/components/reactbits";
import { insights } from "@/data/insights";

export const metadata: Metadata = {
  title: "Enterprise Technology Knowledge Center | HACIEN Insights",
  description:
    "Read HACIEN insights for enterprise technology, RFQ preparation, buyer checklists, government procurement, infrastructure, cybersecurity, cloud, and best practices.",
};

const knowledgeAreas = [
  ["Enterprise Technology", "Practical preparation for RFQs, technology domains, supplier comparison, and technical requirements."],
  ["Government Procurement", "Resources for specification review, approved equivalents, documentation, and institutional buying."],
  ["Best Practices", "Decision guidance for infrastructure, cybersecurity, cloud, digital transformation, and operational continuity."],
];

const featured = insights.slice(0, 3);
const remaining = insights.slice(3);
const categories = Array.from(new Set(insights.map((insight) => insight.category)));

export default function InsightsPage() {
  return (
    <>
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <GradientBackground />
        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <AnimatedContent className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
              Insights
            </AnimatedContent>
            <SplitText
              as="h1"
              text="Procurement knowledge for better technology buying."
              className="mt-5 max-w-5xl text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl"
            />
            <BlurReveal delay={160}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Insights teach buyers how to prepare clearer requirements, compare options,
                understand RFQs, and navigate procurement decisions with more confidence.
              </p>
            </BlurReveal>
            <AnimatedContent delay={260} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15"
              >
                Prepare an RFQ
              </Link>
              <Link
                href="/government-procurement"
                className="interactive-link focus-ring rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900"
              >
                Government Resources
              </Link>
            </AnimatedContent>
          </div>

          <AnimatedContent delay={140} direction="left">
            <BorderGlow className="rounded-lg bg-white/[0.86] p-6 shadow-2xl shadow-slate-950/10">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">
                Content Library
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-950 sm:text-2xl">
                Education that supports better technology decisions, stronger RFQs, and more confident procurement.
              </h2>
              <div className="mt-8 grid gap-3">
                {knowledgeAreas.map(([title], index) => (
                  <div key={title} className="flex items-center gap-3 rounded border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#071426] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-800">{title}</span>
                  </div>
                ))}
              </div>
            </BorderGlow>
          </AnimatedContent>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Educational Authority</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Clearer buying starts before the RFQ is submitted.
            </h2>
          </AnimatedContent>
          <div className="grid gap-5">
            {knowledgeAreas.map(([title, text], index) => (
              <AnimatedContent key={title} delay={index * 80}>
                <SpotlightCard className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                </SpotlightCard>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#071426] px-4 py-18 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Featured Guides</div>
            <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
              Start with the procurement decisions buyers ask about most.
            </h2>
          </AnimatedContent>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featured.map((insight, index) => (
              <AnimatedContent key={insight.slug} delay={index * 80}>
                <Link href={`/insights/${insight.slug}`} className="group block h-full">
                  <SpotlightCard
                    className="h-full rounded-lg border border-white/12 bg-white/[0.06] p-6"
                    spotlightColor="rgba(96, 165, 250, 0.14)"
                  >
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-blue-200">{insight.category}</div>
                    <h3 className="mt-4 text-xl font-bold text-white group-hover:text-blue-200">{insight.title}</h3>
                    <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-300">{insight.summary}</p>
                    <div className="mt-5 text-xs font-bold text-blue-200">
                      {insight.publishedAt} / {insight.readingTime}
                    </div>
                  </SpotlightCard>
                </Link>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <AnimatedContent>
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Browse the Library</div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Articles grouped by buying intent.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span key={category} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700">
                  {category}
                </span>
              ))}
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#1457d9]">
                ERP & Platform
              </span>
            </div>
          </AnimatedContent>
          <div className="grid gap-4">
            {remaining.map((insight, index) => (
              <AnimatedContent key={insight.slug} delay={index * 60}>
                <Link href={`/insights/${insight.slug}`} className="group block">
                  <BorderGlow className="rounded-lg bg-white p-5 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">{insight.category}</div>
                    <h3 className="mt-3 text-lg font-bold text-slate-950 group-hover:text-[#1457d9]">{insight.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{insight.summary}</p>
                  </BorderGlow>
                </Link>
              </AnimatedContent>
            ))}
            <AnimatedContent delay={260}>
              <Link href="/erp-platform" className="group block">
                <BorderGlow className="rounded-lg bg-white p-5 shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">Platform Direction</div>
                  <h3 className="mt-3 text-lg font-bold text-slate-950 group-hover:text-[#1457d9]">
                    HACIEN operating platform and procurement continuity
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    The operating platform page explains how HACIEN keeps inquiry, quotation, sourcing, delivery, and support connected.
                  </p>
                </BorderGlow>
              </Link>
            </AnimatedContent>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <AnimatedContent className="mx-auto max-w-7xl">
          <BorderGlow className="relative overflow-hidden rounded-lg bg-[#071426] p-8 text-white shadow-2xl shadow-slate-950/18 sm:p-10">
            <GradientBackground className="opacity-[0.36]" />
            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">
                  Ready to act
                </div>
                <h2 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                  Have a procurement requirement ready to source?
                </h2>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                  Use the guides to prepare the context, then submit the requirement for RFQ review.
                </p>
              </div>
              <Link
                href="/quote"
                className="button-glow focus-ring rounded bg-white px-6 py-3 text-center text-sm font-bold text-[#071426]"
              >
                Submit RFQ
              </Link>
            </div>
          </BorderGlow>
        </AnimatedContent>
      </section>
    </>
  );
}
