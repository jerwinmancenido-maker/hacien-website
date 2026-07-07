import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CTABand } from "@/components/CTABand";
import { SectionHeading } from "@/components/SectionHeading";
import { Breadcrumb } from "@/components/Breadcrumb";
import { StaggerContainer } from "@/components/motion";
import { InteractiveServerChassisWrapper } from "@/components/visual/InteractiveServerChassisWrapper";
import { ScrollServerAssemblyWrapper } from "@/components/visual/ScrollServerAssemblyWrapper";
import { getSolution, solutions } from "@/data/solutions";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  return {
    title: solution ? solution.seoTitle : "Solution | HACIEN",
    description: solution?.seoDescription ?? "Explore HACIEN IT infrastructure, procurement, and systems integration solutions.",
  };
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const related = solutions.filter((s) => solution.relatedSlugs.includes(s.slug));

  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
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
                <Link href={solution.ctaUrl} className="button-glow rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white">
                  {solution.ctaLabel}
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
          {["it-infrastructure", "servers-storage"].includes(solution.slug) ? (
            <div className="mt-10 space-y-6 rounded-lg bg-[#071426] p-5 text-white">
              <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div className="p-3">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">3D Preview</div>
                  <h2 className="mt-3 text-2xl font-bold">Server component review model</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    A browser-rendered visual aid for discussing compute, memory, power, and chassis context.
                    Final specifications remain subject to RFQ review and verified supplier input.
                  </p>
                </div>
                <InteractiveServerChassisWrapper />
              </div>
              <div className="grid gap-6 border-t border-white/10 pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
                <ScrollServerAssemblyWrapper />
                <div className="p-3">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-300">Scroll-Bound Assembly</div>
                  <h2 className="mt-3 text-2xl font-bold">Parts separate as the page moves.</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    This visualizes how requirements can be broken into reviewable context. It is a planning aid,
                    not a final configuration, inventory, or delivery commitment.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
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

      {related.length > 0 && (
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-bold text-slate-950">Related solutions</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.slug}
                  href={`/solutions/${s.slug}`}
                  className="lift group block rounded-lg border border-slate-200 bg-white p-5 hover:border-[#1457d9]/40"
                >
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#1457d9]">{s.category}</div>
                  <div className="mt-2 font-bold text-slate-950 group-hover:text-[#1457d9]">{s.title}</div>
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
