import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StaggerContainer } from "@/components/motion";
import { getGovTopic, governmentTopics } from "@/data/governmentTopics";

export function generateStaticParams() {
  return governmentTopics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const data = getGovTopic(topic);
  return {
    title: data ? data.seoTitle : "Government Procurement Support | HACIEN",
    description:
      data?.seoDescription ??
      "HACIEN provides government procurement support including specification review, supplier coordination, and quotation preparation.",
  };
}

export default async function GovTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const data = getGovTopic(topic);
  if (!data) notFound();

  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Government Procurement", href: "/government-procurement" },
              { label: data.title },
            ]}
          />
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <SectionHeading
                eyebrow={data.category}
                as="h1"
                title={data.title}
                description={data.heroCopy}
              />

              <div className="mt-10 space-y-8">
                {data.sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="text-lg font-bold text-slate-950">{section.heading}</h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{section.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={data.ctaUrl}
                  className="button-glow rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white"
                >
                  {data.ctaLabel}
                </Link>
                <Link
                  href="/government-procurement"
                  className="interactive-link rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-900"
                >
                  All Government Support
                </Link>
              </div>
            </div>

            <div className="surface overflow-hidden rounded-lg p-6">
              <div className="animated-grid rounded-lg p-6">
                <h2 className="text-xl font-bold text-slate-950">Procurement checklist</h2>
                <StaggerContainer className="mt-5 grid gap-3">
                  {data.checklist.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded border border-white/70 bg-white/90 p-4 text-sm text-slate-700"
                    >
                      <span className="mt-0.5 shrink-0 text-[#1457d9]">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>

          {data.relatedInsights.length > 0 && (
            <div className="mt-16">
              <h2 className="text-xl font-bold text-slate-950">Related resources</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {data.relatedInsights.map((slug) => (
                  <Link
                    key={slug}
                    href={`/insights/${slug}`}
                    className="interactive-link lift rounded border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#1457d9] hover:text-[#1457d9]"
                  >
                    {slug
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                    →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CTABand title={`Need help with ${data.title.toLowerCase()}?`} />
    </>
  );
}
