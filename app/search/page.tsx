import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedContent, SpotlightCard } from "@/app/components/reactbits";
import { PremiumPageHero } from "@/components/PremiumPageHero";
import { buildSearchIndex, searchCatalog } from "@/lib/search-index";

export const metadata: Metadata = {
  title: "Search",
  description: "Search HACIEN products, categories, solutions, and insights.",
};

const suggestedSearches = ["laptop", "cctv", "ups", "RFQ", "network", "procurement"];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = (params.q || "").trim();
  const index = buildSearchIndex();
  const results = query ? searchCatalog(query, index) : index.slice(0, 12);
  const groupedResults = results.reduce<Record<string, typeof results>>((groups, item) => {
    groups[item.group] = groups[item.group] || [];
    groups[item.group].push(item);
    return groups;
  }, {});

  return (
    <>
      <PremiumPageHero
        eyebrow="HACIEN Search"
        title="Find the right path without guessing."
        description="Search public HACIEN catalog pages for products, categories, solutions, and insights. Private Workspace records are never included."
        image="documentation"
        primaryAction={{ href: "/quote", label: "Request a Quote" }}
        highlights={[
          { label: "Products", text: "Match product names and requirement profiles." },
          { label: "Categories", text: "Locate technology areas for RFQ building." },
          { label: "Solutions", text: "Find capability pages by area." },
          { label: "Insights", text: "Open guides and procurement articles." },
        ]}
      />

      <section className="py-12 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form className="glass-control rounded p-4 sm:p-5" action="/search" role="search">
            <label htmlFor="hq-search" className="text-xs font-bold uppercase tracking-[0.16em] text-grey-600">
              Search public headquarters
            </label>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                id="hq-search"
                name="q"
                defaultValue={params.q || ""}
                placeholder="Search products, solutions, insights..."
                className="focus-ring min-h-14 flex-1 rounded-full border border-white/60 bg-white/80 px-5 text-sm text-slate-950 shadow-inner shadow-slate-950/5 outline-none placeholder:text-grey-600"
              />
              <button className="button-glow focus-ring rounded bg-[#2563EB] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-black/10 cursor-pointer" type="submit">
                Search
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {suggestedSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-[#2563EB]/40 hover:text-[#2563EB] cursor-pointer"
                >
                  {term}
                </Link>
              ))}
            </div>
          </form>

          <AnimatedContent className="mt-10">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-grey-600">
                  {query ? "Search Results" : "Suggested Paths"}
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                  {query ? `${results.length} result${results.length === 1 ? "" : "s"} for "${params.q}"` : "Start with catalog highlights."}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-6 text-slate-600">
                Search covers products, categories, solutions, and insights. Customer, supplier, payment, and internal Workspace records remain private.
              </p>
            </div>
          </AnimatedContent>

          <div className="mt-8 grid gap-8">
            {results.length ? (
              Object.entries(groupedResults).map(([group, items]) => {
                const gridCols =
                  items.length % 3 === 0
                    ? "md:grid-cols-3"
                    : items.length % 2 === 0
                      ? "md:grid-cols-2"
                      : "md:grid-cols-3";
                return (
                  <section key={group} aria-labelledby={`search-group-${group.toLowerCase().replace(/\s+/g, "-")}`}>
                    <h3 id={`search-group-${group.toLowerCase().replace(/\s+/g, "-")}`} className="text-lg font-bold text-slate-950 sm:text-xl">
                      {group}
                    </h3>
                    <div className={`mt-4 grid gap-4 ${gridCols}`}>
                      {items.map((item, index) => (
                        <AnimatedContent key={item.href} delay={index * 45}>
                          <Link href={item.href} className="group block h-full focus-ring cursor-pointer">
                            <SpotlightCard className="h-full rounded border border-slate-200 bg-white p-6 shadow-sm transition group-hover:-translate-y-1 group-hover:border-[#2563EB]/35 group-hover:shadow-xl group-hover:shadow-slate-950/10">
                              <div className="flex items-center justify-between gap-4">
                                <span className="rounded-full border border-grey-200 bg-grey-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-grey-700">
                                  {item.group}
                                </span>
                                <span aria-hidden="true" className="text-lg text-grey-200 transition group-hover:translate-x-1 group-hover:text-[#2563EB]">
                                  →
                                </span>
                              </div>
                              <div className="mt-5 text-xl font-bold text-slate-950 group-hover:text-[#2563EB]">{item.title}</div>
                              <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
                            </SpotlightCard>
                          </Link>
                        </AnimatedContent>
                      ))}
                    </div>
                  </section>
                );
              })
            ) : (
              <div className="rounded border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-950 sm:text-3xl">No matching catalog items</h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                  Try a simpler term like laptop, CCTV, UPS, network, or procurement.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href="/support" className="button-glow focus-ring inline-flex rounded bg-[#0A0A0A] px-5 py-3 text-sm font-bold text-white cursor-pointer">
                    Ask support
                  </Link>
                  <Link href="/search" className="interactive-link focus-ring inline-flex rounded border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 cursor-pointer">
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
