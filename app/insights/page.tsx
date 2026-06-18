import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedSection, StaggerContainer } from "@/components/motion";
import { insights } from "@/data/insights";

export const metadata: Metadata = {
  title: "Insights | IT Procurement Resources",
  description:
    "Practical guides, checklists, and procurement resources from HACIEN — covering IT procurement, government purchasing, technology sourcing, and product selection.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Insights"
            as="h1"
            title="IT procurement resources for Philippine organizations."
            description="Practical guides, checklists, and sourcing insights — written for buyers, not marketers. No generic SEO content, just useful procurement knowledge."
          />

          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                className="lift group block rounded-lg border border-slate-200 bg-white p-6 hover:border-[#1457d9]/40"
              >
                <div className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">
                  {insight.category}
                </div>
                <h2 className="text-base font-bold text-slate-950 group-hover:text-[#1457d9] leading-snug">
                  {insight.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3">{insight.summary}</p>
                <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                  <span>{insight.publishedAt}</span>
                  <span>·</span>
                  <span>{insight.readingTime}</span>
                </div>
                <div className="mt-4 text-xs font-semibold text-[#1457d9] group-hover:underline">
                  Read article →
                </div>
              </Link>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <AnimatedSection className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold text-slate-950">Browse by topic</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {["Procurement Basics", "Government Procurement", "Technology Sourcing"].map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700"
              >
                {cat}
              </span>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                className="interactive-link text-sm font-medium text-slate-700 hover:text-[#1457d9]"
              >
                → {insight.title}
              </Link>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <CTABand title="Have a procurement requirement ready to source?" />
    </>
  );
}
