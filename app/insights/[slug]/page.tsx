import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AnimatedSection } from "@/components/motion";
import { getInsight, insights } from "@/data/insights";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  return {
    title: insight ? insight.seoTitle : "Insights",
    description:
      insight?.seoDescription ??
      "Practical IT procurement guides and resources from HACIEN.",
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const relatedInsights = insights.filter(
    (i) => insight.relatedSlugs.includes(i.slug) && i.slug !== slug
  );

  return (
    <>
      <article className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Breadcrumb
            items={[
              { label: "Insights", href: "/insights" },
              { label: insight.title },
            ]}
          />

          <div className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">
            {insight.category}
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {insight.title}
          </h1>

          <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
            <span>{insight.publishedAt}</span>
            <span>·</span>
            <span>{insight.readingTime}</span>
          </div>

          <p className="mt-6 text-base leading-7 text-slate-600">{insight.intro}</p>

          <div className="mt-10 space-y-10">
            {insight.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-bold text-slate-950">{section.heading}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{section.body}</p>
              </div>
            ))}
          </div>

          {/* Checklist */}
          <AnimatedSection className="mt-12 rounded-lg border border-blue-100 bg-blue-50/60 p-6">
            <h2 className="text-lg font-bold text-slate-950">Practical checklist</h2>
            <ul className="mt-4 space-y-3">
              {insight.checklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 shrink-0 text-[#2563EB]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </AnimatedSection>

          {/* Procurement Notes */}
          <div className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-base font-bold text-slate-950">Procurement notes</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{insight.procurementNotes}</p>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 rounded border border-amber-100 bg-amber-50/60 p-4">
            <p className="text-xs leading-6 text-amber-800">
              <strong>Disclaimer:</strong> {insight.disclaimer}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={insight.ctaUrl}
              className="button-glow rounded bg-[#2563EB] px-5 py-3 text-center text-sm font-bold text-white"
            >
              {insight.ctaLabel}
            </Link>
            <Link
              href="/insights"
              className="interactive-link rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-900"
            >
              All articles
            </Link>
          </div>
        </div>
      </article>

      {relatedInsights.length > 0 && (
        <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-slate-950">Related articles</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedInsights.map((related) => (
                <Link
                  key={related.slug}
                  href={`/insights/${related.slug}`}
                  className="lift group block rounded-lg border border-slate-200 bg-white p-5 hover:border-[#2563EB]/40"
                >
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">
                    {related.category}
                  </div>
                  <h3 className="text-sm font-bold text-slate-950 group-hover:text-[#2563EB] leading-snug">
                    {related.title}
                  </h3>
                  <div className="mt-3 text-xs font-semibold text-[#2563EB]">Read →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  );
}
