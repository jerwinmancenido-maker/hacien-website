import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { StaggerContainer } from "@/components/motion";
import { getSolution, solutions } from "@/data/solutions";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  return {
    title: solution ? `${solution.title} | HACIEN Solutions` : "Solution",
    description: solution?.summary ?? "Explore HACIEN IT infrastructure, procurement, and systems integration solutions.",
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading eyebrow="HACIEN Solution" as="h1" title={solution.title} description={solution.detail} />
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="button-glow rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white">
                Submit RFQ
              </Link>
              <Link href="/products" className="interactive-link rounded border border-slate-300 px-5 py-3 text-center text-sm font-bold text-slate-900">
                Browse catalog
              </Link>
            </div>
          </div>
          <div className="surface overflow-hidden rounded-lg p-6">
            <div className="animated-grid rounded-lg p-6">
              <div className="grid h-16 w-16 place-items-center rounded bg-[#071426] text-sm font-bold text-white">
                {solution.icon}
              </div>
              <h2 className="mt-8 text-2xl font-bold text-slate-950">What this supports</h2>
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
      </section>

      <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow="Workflow" title={`${solution.shortTitle} workflow`} />
          <div className="progress-line mt-8 grid gap-4 md:grid-cols-4 md:[&::before]:hidden">
            {solution.workflow.map((step, index) => (
              <div key={step} className="relative rounded border border-slate-200 bg-white p-5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#1457d9] text-sm font-bold text-white">{index + 1}</div>
                <div className="mt-4 font-bold text-slate-950">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand title={`Need help with ${solution.shortTitle.toLowerCase()} requirements?`} />
    </>
  );
}
