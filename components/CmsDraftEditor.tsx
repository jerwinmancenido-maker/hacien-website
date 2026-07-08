"use client";

import { useMemo, useState } from "react";
import type { CmsDraftFields, CmsDraftRecord, CmsDraftStatus, EditableCmsDraftKey } from "@/lib/cms/drafts";

type EditorOption = {
  key: EditableCmsDraftKey;
  label: string;
  publishRisk: string;
  riskLevel: number;
  requiredFields: string[];
  seedFields: CmsDraftFields;
};

type SaveState =
  | { status: "idle"; message: string }
  | { status: "saving"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function CmsDraftEditor({ options, initialDrafts }: { options: EditorOption[]; initialDrafts: CmsDraftRecord[] }) {
  const [selectedKey, setSelectedKey] = useState<EditableCmsDraftKey>(options[0]?.key ?? "faq");
  const selectedOption = useMemo(() => options.find((option) => option.key === selectedKey) ?? options[0], [options, selectedKey]);
  const [fields, setFields] = useState<CmsDraftFields>(selectedOption?.seedFields ?? {});
  const [drafts, setDrafts] = useState(initialDrafts);
  const [saveState, setSaveState] = useState<SaveState>({ status: "idle", message: "Drafts are local only and do not publish website content." });

  function selectKey(key: EditableCmsDraftKey) {
    const option = options.find((item) => item.key === key);
    setSelectedKey(key);
    setFields(option?.seedFields ?? {});
    setSaveState({ status: "idle", message: "Drafts are local only and do not publish website content." });
  }

  function updateField(fieldName: string, value: string) {
    setFields((currentFields) => ({ ...currentFields, [fieldName]: value }));
  }

  async function saveDraft(status: CmsDraftStatus) {
    setSaveState({ status: "saving", message: "Saving local draft..." });

    const response = await fetch("/api/local-cms/drafts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ contentKey: selectedKey, fields, status }),
    });
    const payload = (await response.json()) as { ok: boolean; errors?: string[]; drafts?: CmsDraftRecord[] };

    if (!payload.ok) {
      setSaveState({ status: "error", message: payload.errors?.join(" ") ?? "Draft validation failed." });
      return;
    }

    setDrafts(payload.drafts ?? []);
    setSaveState({ status: "success", message: "Local draft saved. It has not changed live website content." });
  }

  if (!selectedOption) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-800">No editable CMS draft areas are configured.</div>;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="rounded-xl border border-slate-200 bg-white/86 p-4 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Editable draft areas</div>
        <div className="mt-4 grid gap-2">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => selectKey(option.key)}
              className={`rounded-lg border px-3 py-3 text-left transition ${
                option.key === selectedKey ? "border-[#1457d9] bg-blue-50 text-slate-950" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <div className="font-bold">{option.label}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">
                {option.publishRisk} risk · level {option.riskLevel}
              </div>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#1457d9]">Local draft editor</div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{selectedOption.label}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Save local drafts for review. This does not write live CMS modules, publish website pages, or touch databases.
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-800">
            Draft only
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          {selectedOption.requiredFields.map((fieldName) => (
            <label key={fieldName} className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{fieldName}</span>
              <textarea
                value={String(fields[fieldName] ?? "")}
                onChange={(event) => updateField(fieldName, event.target.value)}
                rows={fieldName === "description" || fieldName === "alt" ? 4 : 2}
                className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#1457d9] focus:ring-2 focus:ring-blue-100"
              />
            </label>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Preview</div>
          <div className="mt-3 grid gap-2">
            {selectedOption.requiredFields.map((fieldName) => (
              <div key={fieldName}>
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{fieldName}</div>
                <div className="mt-1 text-sm leading-6 text-slate-700">{String(fields[fieldName] ?? "") || "Empty"}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => void saveDraft("draft")}
            className="rounded-lg bg-[#071426] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#10213c]"
          >
            Save Local Draft
          </button>
          <button
            type="button"
            onClick={() => void saveDraft("needs-review")}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-400"
          >
            Mark Needs Review
          </button>
          <div
            className={`text-sm ${
              saveState.status === "error" ? "font-bold text-red-700" : saveState.status === "success" ? "font-bold text-emerald-700" : "text-slate-500"
            }`}
          >
            {saveState.message}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-bold text-slate-950">Saved local drafts</h2>
          <div className="mt-3 grid gap-3">
            {drafts.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">No local drafts saved yet.</div>
            ) : (
              drafts.map((draft) => (
                <div key={draft.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-bold text-slate-950">{draft.contentKey}</div>
                    <div className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
                      {draft.status}
                    </div>
                  </div>
                  <div className="mt-2 font-mono text-xs text-slate-500">{draft.id}</div>
                  <div className="mt-1 text-xs text-slate-500">{draft.updatedAt}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
