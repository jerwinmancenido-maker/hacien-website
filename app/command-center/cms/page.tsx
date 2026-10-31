import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CmsDraftEditor } from "@/components/CmsDraftEditor";
import { getCmsDraftEditorOptions } from "@/lib/cms/drafts";
import { listCmsDrafts } from "@/lib/cms/draft-storage";
import { isLocalCmsAccessEnabled } from "@/lib/cms/local-access";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Command Center CMS Drafts",
  description: "Local-only HACIEN CMS draft editor for safe website content review.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CommandCenterCmsPage() {
  if (!isLocalCmsAccessEnabled()) {
    notFound();
  }

  const options = getCmsDraftEditorOptions();
  const drafts = await listCmsDrafts();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#edf7fb_52%,#f8fafc_100%)] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-5 rounded border border-slate-200 bg-white/86 p-5 shadow-sm backdrop-blur md:p-7">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB]">Local Command Center</div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">CMS draft editor.</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                This is a local-only draft surface for safe website content. Drafts save to local JSON files and do not publish,
                deploy, migrate, or update live CMS modules.
              </p>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-800">
              No publish, no database writes
            </div>
          </div>
        </section>

        <CmsDraftEditor options={options} initialDrafts={drafts} />
      </div>
    </main>
  );
}
