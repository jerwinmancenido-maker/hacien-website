import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search",
  description: "Search HACIEN public pages, RFQ paths, support, trust, solutions, technology, platform, and insights.",
};

const searchable = [
  { title: "Home", href: "/", group: "Company", text: "Enterprise technology with operational clarity." },
  { title: "Solutions", href: "/solutions", group: "Solutions", text: "Infrastructure, workplace, cybersecurity, cloud, procurement, and managed services." },
  { title: "Technology", href: "/technology", group: "Technology", text: "Enterprise computing, networking, cybersecurity, cloud, software, storage, power, cabling, and services." },
  { title: "Representative Categories", href: "/products", group: "Technology", text: "Representative technology categories for quotation review." },
  { title: "Platform", href: "/platform", group: "Platform", text: "HACIEN Workspace, Timeline, Guardian, Customer Workspace, and relationship continuity." },
  { title: "Insights", href: "/insights", group: "Knowledge", text: "Enterprise technology, government procurement, digital transformation, cybersecurity, cloud, and best practices." },
  { title: "Trust & Compliance", href: "/trust-center", group: "Company", text: "Company identity, verification boundaries, privacy, security, and support expectations." },
  { title: "Support", href: "/support", group: "Support", text: "RFQ follow-up, delivery, warranty questions, policy routing, and supplier inquiries." },
  { title: "Request Quote", href: "/quote", group: "RFQ", text: "Request formal quotation review through HACIEN's universal intake path." },
  { title: "Access HACIEN", href: "/access", group: "Access", text: "Open Workspace, learn about Customer Workspace, or contact HACIEN support." },
  { title: "Customer Workspace", href: "/customer-workspace", group: "Access", text: "Future customer continuity for tracking, documents, quotations, support, and relationship history." },
  { title: "About HACIEN", href: "/about", group: "Company", text: "Company story, operating philosophy, and professional profile." },
  { title: "Company Profile", href: "/about/company-profile", group: "Company", text: "Supported company profile, public identity facts, and RFQ engagement path." },
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
        <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">HACIEN Search</div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Find the right HACIEN path.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          Search is scoped to public HACIEN pages. It does not search private customer, supplier, payment, or Workspace records.
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
            placeholder="Search RFQ, Technology, Platform, trust, support..."
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
                Try a simpler term like RFQ, Technology, Platform, trust, support, or company profile.
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
