import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search",
  description: "Search HACIEN headquarters pages, RFQ paths, support, Trust Center, solutions, products, and insights.",
};

const searchable = [
  { title: "Headquarters", href: "/", group: "Company", text: "Public headquarters, RFQ path, trust status, and solutions consulting overview." },
  { title: "Solutions", href: "/solutions", group: "Solutions", text: "Infrastructure, integration, licensing, delivery, and support capability paths." },
  { title: "Products", href: "/products", group: "RFQ", text: "Representative product sourcing categories for quotation review." },
  { title: "Industries", href: "/industries", group: "Solutions", text: "Buyer contexts for business, government, education, healthcare, construction, and enterprise." },
  { title: "Insights", href: "/insights", group: "Resources", text: "Educational content and procurement thinking." },
  { title: "Trust Center", href: "/trust-center", group: "Trust", text: "Company identity, verification boundaries, formal payment handling, privacy, and support expectations." },
  { title: "Support", href: "/support", group: "Support", text: "RFQ follow-up, delivery, warranty questions, policy routing, and supplier inquiries." },
  { title: "Submit RFQ", href: "/quote", group: "RFQ", text: "Request quotation review without online payment or checkout." },
  { title: "About HACIEN", href: "/about", group: "Company", text: "Procurement-first story, workflow, and operating philosophy." },
  { title: "Company Profile", href: "/about/company-profile", group: "Company", text: "Supported company profile, public identity facts, and RFQ engagement path." },
  { title: "Operating Platform", href: "/erp-platform", group: "Company", text: "How HACIEN keeps inquiry, quotation, sourcing, delivery, support, and follow-through connected." },
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q || "").trim().toLowerCase();
  const results = query
    ? searchable.filter((item) => `${item.title} ${item.group} ${item.text}`.toLowerCase().includes(query))
    : searchable;
  const groupedResults = results.reduce<Record<string, typeof searchable>>((groups, item) => {
    groups[item.group] = groups[item.group] || [];
    groups[item.group].push(item);
    return groups;
  }, {});

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Headquarters Search</div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Find the right HACIEN room.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          Search is scoped to public headquarters pages. It does not search private customer, supplier, payment, or ERP records.
        </p>

        <form className="surface mt-8 rounded-lg p-4" action="/search" role="search">
          <label htmlFor="hq-search" className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
            Search public headquarters
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="hq-search"
              name="q"
              defaultValue={params.q || ""}
              placeholder="Search RFQ, support, Trust Center, solutions..."
              className="focus-ring min-h-12 flex-1 rounded border border-slate-300 px-4 text-sm"
            />
            <button className="button-glow focus-ring rounded bg-[#1457d9] px-5 py-3 text-sm font-bold text-white" type="submit">
              Search
            </button>
          </div>
        </form>

        <div className="mt-8 text-sm font-semibold text-slate-500">
          {query ? `${results.length} result${results.length === 1 ? "" : "s"} for "${params.q}"` : "Suggested headquarters paths"}
        </div>

        <div className="mt-5 grid gap-6">
          {results.length ? (
            Object.entries(groupedResults).map(([group, items]) => (
              <section key={group} aria-labelledby={`search-group-${group.toLowerCase().replace(/\s+/g, "-")}`}>
                <h2 id={`search-group-${group.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  {group}
                </h2>
                <div className="mt-3 grid gap-3">
                  {items.map((item) => (
                    <Link key={item.href} href={item.href} className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#1457d9] hover:shadow-md focus-ring">
                      <div className="text-xl font-bold text-slate-950 group-hover:text-[#1457d9]">{item.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-950">No matching headquarters page</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Try a simpler term like RFQ, Trust Center, support, solutions, products, or company profile.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link href="/support" className="button-glow focus-ring inline-flex rounded bg-[#071426] px-5 py-3 text-sm font-bold text-white">
                  Ask support
                </Link>
                <Link href="/search" className="interactive-link focus-ring inline-flex rounded border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">
                  Clear search
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
