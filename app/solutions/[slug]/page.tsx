import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { EnterprisePhotoPanel } from "@/components/EnterpriseImagery";
import { StaggerContainer } from "@/components/motion";
import { getSolution, solutions } from "@/data/solutions";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  return buildPageMetadata({
    title: solution ? solution.seoTitle : "Solution",
    description: solution?.seoDescription ?? "Explore HACIEN IT infrastructure, procurement, and systems integration solutions.",
    path: `/solutions/${slug}`,
  });
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const related = solutions.filter((s) => solution.relatedSlugs.includes(s.slug));

  return (
    <>
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Solutions", href: "/solutions" }, { label: solution.title }]} />
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading eyebrow={solution.category} as="h1" title={solution.title} description={solution.heroCopy} />
              <div className="mt-6 space-y-6">
                {solution.sections.map((section) => (
                  <div key={section.heading}>
                    <h2 className="text-base font-bold text-slate-950">{section.heading}</h2>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{section.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href={solution.ctaUrl} className="button-glow rounded bg-[#2563EB] px-5 py-3 text-center text-sm font-bold text-white">
                  {solution.ctaLabel}
                </Link>
                <Link href="/products" className="interactive-link rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-900">
                  Browse catalog
                </Link>
              </div>
            </div>
            <div className="surface overflow-hidden rounded-lg p-6">
              <div className="animated-grid rounded-lg p-6">
                <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">What this supports</h2>
                <StaggerContainer className="mt-5 grid gap-3">
                  {solution.outcomes.map((item) => (
                    <div key={item} className="rounded border border-white/70 bg-white/90 p-4 text-sm font-semibold text-slate-800">
                      {item}
                    </div>
                  ))}
                </StaggerContainer>
              </div>
            </div>
          </div>
          {["it-infrastructure", "servers-storage"].includes(solution.slug) ? (
            <EnterprisePhotoPanel
              className="mt-10"
              image={solution.slug === "servers-storage" ? "storage" : "dataCenter"}
              eyebrow="Infrastructure Review"
              title="Infrastructure decisions need real operating details."
              caption="HACIEN uses this page to frame requirement review, supplier inputs, and quotation preparation. Final configuration, availability, delivery, and terms remain subject to formal RFQ review."
            />
          ) : null}
        </div>
      </section>

      <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Process" title={`${solution.shortTitle} review sequence`} />
          <div className="progress-line mt-8 grid gap-4 md:grid-cols-4 md:[&::before]:hidden">
            {solution.workflow.map((step, index) => (
              <div key={step} className="relative rounded border border-slate-200 bg-white p-5">
                <div className="grid h-10 w-10 place-items-center rounded bg-[#0A0A0A] text-sm font-bold text-white">{index + 1}</div>
                <div className="mt-4 font-bold text-slate-950">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">Related solutions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="lift group block rounded-lg border border-slate-200 bg-white p-5 hover:border-[#2563EB]/40"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-grey-600">{s.category}</div>
                  <div className="mt-2 font-bold text-slate-950 group-hover:text-[#2563EB]">{s.title}</div>
                  <p className="mt-1 text-sm text-slate-500">{s.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand title={`Need help with ${solution.shortTitle.toLowerCase()} requirements?`} />
    </>
  );
}
