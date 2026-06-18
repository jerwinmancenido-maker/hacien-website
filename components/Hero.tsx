import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-80 mesh" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-5 inline-flex w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#1457d9]">
            IT infrastructure and procurement solutions
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Technology sourcing and systems integration for Philippine organizations.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-650">
            HACIEN helps government buyers, corporate teams, distributors, and project-based
            businesses source, specify, and implement reliable IT solutions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="rounded bg-[#1457d9] px-5 py-3 text-center text-sm font-bold text-white shadow-xl shadow-blue-700/20 hover:bg-[#0f46b4]">
              Request a Quote
            </Link>
            <Link href="/government-procurement" className="rounded border border-slate-300 bg-white px-5 py-3 text-center text-sm font-bold text-slate-900 hover:border-[#1457d9]">
              Government Procurement Capability
            </Link>
          </div>
        </div>

        <div className="surface lift relative min-h-[420px] overflow-hidden rounded-lg p-6">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-blue-100" />
          <div className="relative grid gap-4">
            {[
              ["Procurement", "RFQ-ready sourcing, supplier coordination, and quote preparation"],
              ["Infrastructure", "Endpoints, networks, servers, storage, and site deployment"],
              ["Integration", "Project support for IT rollouts, upgrades, and business systems"],
              ["ERP Roadmap", "Future HACIEN ERP platform for IT trading and project operations"],
            ].map(([title, text], index) => (
              <div key={title} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded bg-slate-950 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-bold text-slate-950">{title}</div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
