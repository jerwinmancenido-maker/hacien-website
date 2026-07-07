import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, SpotlightCard } from "@/app/components/reactbits";
import { PremiumPageHero } from "@/components/PremiumPageHero";

export const metadata: Metadata = {
  title: "Search",
  description: "Search HACIEN public pages, RFQ paths, support, trust, solutions, technology, platform, and insights.",
};

const searchable = [
  { title: "Home", href: "/", group: "Company", text: "Technology sourcing that stays clear from request to handover." },
  { title: "Solutions", href: "/solutions", group: "Solutions", text: "Infrastructure, workplace, cybersecurity, cloud, procurement, and managed services." },
  { title: "Technology", href: "/technology", group: "Technology", text: "Enterprise computing, networking, cybersecurity, cloud, software, storage, power, cabling, and services." },
  { title: "Technology RFQ Builder", href: "/products", group: "Technology", text: "Build one RFQ package from multiple technology requirements." },
  { title: "Platform", href: "/platform", group: "Platform", text: "HACIEN Workspace, Timeline, Guardian, Customer Workspace, and relationship continuity." },
  { title: "Insights", href: "/insights", group: "Knowledge", text: "Enterprise technology, institutional procurement, digital transformation, cybersecurity, cloud, and best practices." },
  { title: "Trust & Compliance", href: "/trust-center", group: "Company", text: "Company identity, verification boundaries, privacy, security, and support expectations." },
  { title: "Support", href: "/support", group: "Support", text: "RFQ follow-up, delivery, warranty questions, policy routing, and supplier inquiries." },
  { title: "Request Quote", href: "/quote", group: "RFQ", text: "Request formal quotation review through HACIEN's universal intake path." },
  { title: "Access HACIEN", href: "/access", group: "Access", text: "Open Workspace, learn about Customer Workspace, or contact HACIEN support." },
  { title: "Customer Workspace", href: "/customer-workspace", group: "Access", text: "Future customer continuity for tracking, documents, quotations, support, and relationship history." },
  { title: "About HACIEN", href: "/about", group: "Company", text: "Company story, operating philosophy, and professional profile." },
  { title: "Company Profile", href: "/about/company-profile", group: "Company", text: "Supported company profile, public identity facts, and RFQ engagement path." },
];

const suggestedSearches = ["RFQ", "Technology", "Platform", "Support", "Trust", "Company"];

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
    <>
      <PremiumPageHero
        eyebrow="HACIEN Search"
        title="Find the right path without guessing."
        description="Search public HACIEN pages for RFQ, technology, platform, company, support, trust, and knowledge paths. Private Workspace records are never included."
        image="documentation"
        primaryAction={{ href: "/quote", label: "Request Quote" }}
        secondaryAction={{ href: "/access", label: "Access HACIEN" }}
        highlights={[
          { label: "Public Only", text: "Search covers public headquarters pages." },
          { label: "RFQ Paths", text: "Find quote, support, and intake routes." },
          { label: "Technology", text: "Locate domains and requirement builders." },
          { label: "Trust", text: "Open company, legal, and compliance pages." },
        ]}
      />

      <section className="px-4 py-18 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <form className="glass-control rounded-2xl p-4 sm:p-5" action="/search" role="search">
            <label htmlFor="hq-search" className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">
              Search public headquarters
            </label>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                id="hq-search"
                name="q"
                defaultValue={params.q || ""}
                placeholder="Search RFQ, technology, platform, trust, support..."
                className="focus-ring min-h-14 flex-1 rounded-full border border-white/60 bg-white/80 px-5 text-sm text-slate-950 shadow-inner shadow-slate-950/5 outline-none placeholder:text-slate-400"
              />
              <button className="button-glow focus-ring rounded-full bg-[#1457d9] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/15" type="submit">
                Search
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestedSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-[#1457d9]/40 hover:text-[#1457d9]"
                >
                  {term}
                </Link>
              ))}
            </div>
          </form>

          <AnimatedContent className="mt-10">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">
                  {query ? "Search Results" : "Suggested Paths"}
                </div>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                  {query ? `${results.length} result${results.length === 1 ? "" : "s"} for "${params.q}"` : "Start with the most common paths."}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-600">
                Search is scoped to public pages. Customer, supplier, payment, and internal Workspace records remain private.
              </p>
            </div>
          </AnimatedContent>

          <div className="mt-8 grid gap-8">
            {results.length ? (
              Object.entries(groupedResults).map(([group, items]) => (
                <section key={group} aria-labelledby={`search-group-${group.toLowerCase().replace(/\s+/g, "-")}`}>
                  <h2 id={`search-group-${group.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    {group}
                  </h2>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {items.map((item, index) => (
                      <AnimatedContent key={item.href} delay={index * 45}>
                        <Link href={item.href} className="group block h-full focus-ring">
                          <SpotlightCard className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition group-hover:-translate-y-1 group-hover:border-[#1457d9]/35 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                            <div className="flex items-center justify-between gap-4">
                              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#1457d9]">
                                {item.group}
                              </span>
                              <span aria-hidden="true" className="text-lg text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#1457d9]">
                                →
                              </span>
                            </div>
                            <div className="mt-5 text-xl font-bold text-slate-950 group-hover:text-[#1457d9]">{item.title}</div>
                            <p className="mt-3 text-sm leading-6 text-slate-600">{item.text}</p>
                          </SpotlightCard>
                        </Link>
                      </AnimatedContent>
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950">No matching headquarters page</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Try a simpler term like RFQ, Technology, Platform, trust, support, or company profile.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/support" className="button-glow focus-ring inline-flex rounded-full bg-[#071426] px-5 py-3 text-sm font-bold text-white">
                    Ask support
                  </Link>
                  <Link href="/search" className="interactive-link focus-ring inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700">
                    Clear search
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
