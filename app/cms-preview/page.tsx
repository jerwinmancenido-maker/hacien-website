import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLocalCmsAccessEnabled } from "@/lib/cms/local-access";
import { getCmsPreviewData } from "@/lib/cms/preview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CMS Preview | HACIEN",
  description: "Read-only local preview of HACIEN repo-backed CMS ownership, content, media, and SEO records.",
  robots: {
    index: false,
    follow: false,
  },
};

const ownerTone = {
  cms: "border-emerald-200 bg-emerald-50 text-emerald-800",
  config: "border-sky-200 bg-sky-50 text-sky-800",
  code: "border-slate-200 bg-slate-50 text-slate-700",
  erp: "border-amber-200 bg-amber-50 text-amber-800",
  blocked: "border-red-200 bg-red-50 text-red-800",
};

const readinessTone = {
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800",
  "needs-model": "border-amber-200 bg-amber-50 text-amber-800",
  blocked: "border-red-200 bg-red-50 text-red-800",
  "future-db": "border-indigo-200 bg-indigo-50 text-indigo-800",
};

function Pill({ children, className }: { children: ReactNode; className: string }) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${className}`}>
      {children}
    </span>
  );
}

export default function CmsPreviewPage() {
  if (!isLocalCmsAccessEnabled()) {
    notFound();
  }

  const data = getCmsPreviewData();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef7f8_48%,#f8fafc_100%)] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-xl border border-slate-200 bg-white/82 p-5 shadow-sm backdrop-blur md:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#1457d9]">Local CMS Preview</div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                HACIEN repo-backed CMS inspection.
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                This page is read-only. It exposes the current CMS registry, published content, media source records,
                and SEO metadata for inspection before any dashboard, database, edit, or publish workflow exists.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
              No edit, no publish, no database writes
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {[
            ["Inventory", data.summary.inventoryRecords],
            ["Content", data.summary.publishedContent],
            ["Media", data.summary.mediaRecords],
            ["SEO", data.summary.seoRecords],
            ["Editable Now", data.summary.editableNow],
            ["Blocked/ERP", data.summary.blockedOrErpOwned],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white/82 p-4 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{label}</div>
              <div className="mt-2 text-2xl font-bold text-slate-950">{value}</div>
            </div>
          ))}
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white/86 p-4 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight">CMS Ownership Inventory</h2>
              <p className="mt-1 text-sm text-slate-600">Every public data area must have an owner and readiness state.</p>
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="border-b border-slate-200 px-3 py-3">Key</th>
                  <th className="border-b border-slate-200 px-3 py-3">Owner</th>
                  <th className="border-b border-slate-200 px-3 py-3">Editable</th>
                  <th className="border-b border-slate-200 px-3 py-3">Readiness</th>
                  <th className="border-b border-slate-200 px-3 py-3">Risk</th>
                  <th className="border-b border-slate-200 px-3 py-3">Source</th>
                </tr>
              </thead>
              <tbody>
                {data.inventory.map((item) => (
                  <tr key={item.key} className="align-top">
                    <td className="border-b border-slate-100 px-3 py-3">
                      <div className="font-bold text-slate-950">{item.label}</div>
                      <div className="mt-1 font-mono text-xs text-slate-500">{item.key}</div>
                      {item.route ? <div className="mt-1 text-xs text-slate-500">{item.route}</div> : null}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <Pill className={ownerTone[item.ownerType]}>{item.ownerType}</Pill>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <span className={item.editableNow ? "font-bold text-emerald-700" : "font-bold text-slate-500"}>
                        {item.editableNow ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <Pill className={readinessTone[item.cmsReadiness]}>{item.cmsReadiness}</Pill>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <div className="font-bold text-slate-900">{item.publishRisk}</div>
                      <div className="text-xs text-slate-500">Level {item.riskLevel}</div>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <div className="max-w-sm font-mono text-xs leading-5 text-slate-600">{item.sourceFile}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white/86 p-4 shadow-sm backdrop-blur">
            <h2 className="text-xl font-bold tracking-tight">Published CMS Content</h2>
            <div className="mt-4 grid gap-3">
              {data.content.map((entry) => (
                <div key={entry.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-bold text-slate-950">{entry.hero.title}</div>
                    <Pill className="border-emerald-200 bg-emerald-50 text-emerald-800">{entry.status}</Pill>
                  </div>
                  <div className="mt-2 font-mono text-xs text-slate-500">{entry.slug}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{entry.hero.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/86 p-4 shadow-sm backdrop-blur">
            <h2 className="text-xl font-bold tracking-tight">Blocked and ERP-Owned Boundaries</h2>
            <div className="mt-4 grid gap-3">
              {data.blockedOrErpOwned.map((item) => (
                <div key={item.key} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-bold text-slate-950">{item.label}</div>
                    <Pill className={ownerTone[item.ownerType]}>{item.ownerType}</Pill>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.notes ?? item.validationRequirements.join(", ")}</p>
                  <div className="mt-2 font-mono text-xs text-slate-500">{item.currentSource}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white/86 p-4 shadow-sm backdrop-blur">
            <h2 className="text-xl font-bold tracking-tight">Media Source Registry</h2>
            <div className="mt-4 grid gap-3">
              {data.media.map((record) => (
                <div key={record.key} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="font-bold text-slate-950">{record.key}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{record.alt}</p>
                  <div className="mt-2 text-xs text-slate-500">{record.sourceNote}</div>
                  <div className="mt-1 break-all font-mono text-xs text-slate-500">{record.sourceUrl}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/86 p-4 shadow-sm backdrop-blur">
            <h2 className="text-xl font-bold tracking-tight">SEO Metadata Registry</h2>
            <div className="mt-4 grid gap-3">
              {data.seo.map((record) => (
                <div key={record.key} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="font-mono text-xs text-slate-500">{record.route}</div>
                  <div className="mt-2 font-bold text-slate-950">{record.title}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{record.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
