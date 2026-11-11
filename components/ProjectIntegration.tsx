import Link from "next/link";
import { projectIntegration } from "@/data/buyerCopy";

export function ProjectIntegration({ compact = false }: { compact?: boolean }) {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.08em] text-grey-700">{projectIntegration.eyebrow}</div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{projectIntegration.title}</h2>
          <p className="mt-4 text-base leading-7 text-grey-700">{projectIntegration.intro}</p>
        </div>
        <ol className="mt-8 grid gap-4 md:grid-cols-2">
          {projectIntegration.phases.map((phase, index) => (
            <li key={phase.step} className="rounded border border-grey-200 bg-grey-50 p-5">
              <div className="text-sm font-bold text-blue">{String(index + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 text-lg font-bold text-ink">{phase.step}</h3>
              {compact ? null : <p className="mt-2 text-sm leading-6 text-grey-700">{phase.detail}</p>}
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link
            href="/quote"
            className="inline-flex min-h-11 items-center justify-center rounded bg-blue px-6 py-3 text-sm font-medium text-white hover:bg-blue-dark"
          >
            Request a project quotation
          </Link>
        </div>
      </div>
    </section>
  );
}
