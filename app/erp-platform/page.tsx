import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";

export default function ErpPlatformPage() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="surface overflow-hidden rounded-lg">
          <div className="mesh px-6 py-16 sm:px-10">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-[#1457d9]">
                Coming Soon
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                HACIEN ERP Platform for IT trading and project operations.
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-700">
                HACIEN ERP is being built for IT integrators, distributors, trading companies,
                and project-based businesses that manage opportunities, canvassing, quotation,
                procurement, inventory, billing, and collection workflows.
              </p>
              <Link href="/contact" className="mt-8 inline-flex rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white">
                Ask about the roadmap
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <SectionHeading eyebrow="Future Capabilities" title="Designed around real quote-to-cash workflows." />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {["CRM and opportunities", "BOQ and supplier canvassing", "Quotation to PO to billing"].map((item) => (
              <div key={item} className="rounded border border-slate-200 bg-white p-6 font-bold text-slate-950">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
