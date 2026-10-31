"use client";

import { useMemo, useState } from "react";
import type {
  CmsDocumentSection,
  CmsDraftFields,
  CmsDraftLink,
  CmsDraftNavigationGroup,
  CmsDraftRecord,
  CmsDraftStatus,
  EditableCmsDraftKey,
} from "@/lib/cms/drafts";
import { isEditableCmsDocumentDraftKey, isEditableCmsNavigationDraftKey, isEditableCmsPageDraftKey } from "@/lib/cms/drafts";

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

const fieldLabels: Record<string, string> = {
  alt: "Alt text",
  body: "Body",
  description: "Description",
  effectiveDate: "Effective date",
  key: "Media key",
  reviewNotes: "Review notes",
  route: "Route",
  sections: "Sections",
  sourceNote: "Source note",
  sourceUrl: "Source URL",
  summary: "Summary",
  title: "Title",
};

const fieldHints: Record<string, string> = {
  alt: "Describe the image plainly for accessibility.",
  body: "Use review-ready draft copy. This does not update the live page.",
  description: "Keep this concise and useful for the page or search result.",
  effectiveDate: "Record the date this draft should take effect after approval.",
  key: "Use a stable, lowercase identifier for the media record.",
  reviewNotes: "Add founder, legal, or policy review notes before any publish step.",
  route: "Use the public route this metadata belongs to, such as /about.",
  sections: "Add clear editable sections so this can be reviewed without HTML.",
  sourceNote: "Record where the image came from and why it is safe to use.",
  sourceUrl: "Paste the image source or internal asset path.",
  summary: "Give reviewers the short version before the full body.",
  title: "Write the visible title or SEO title for this draft.",
};

function fieldLabel(fieldName: string) {
  return fieldLabels[fieldName] ?? fieldName.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_.]/g, " ");
}

function fieldRows(fieldName: string) {
  if (fieldName === "body") {
    return 9;
  }
  if (fieldName === "description" || fieldName === "summary" || fieldName === "sourceNote" || fieldName === "alt") {
    return 4;
  }

  return 2;
}

function getStringField(fields: CmsDraftFields, fieldName: string) {
  const value = fields[fieldName];
  return typeof value === "string" ? value : "";
}

function getDocumentSections(fields: CmsDraftFields): CmsDocumentSection[] {
  const value = fields.sections;
  if (!Array.isArray(value)) {
    return [{ heading: "", body: "" }];
  }

  return value.map((section) => {
    if (typeof section === "object" && section && "heading" in section && "body" in section) {
      return {
        heading: String(section.heading ?? ""),
        body: String(section.body ?? ""),
      };
    }

    return { heading: "", body: "" };
  });
}

function getDraftLinks(fields: CmsDraftFields): CmsDraftLink[] {
  const value = fields.links;
  if (!Array.isArray(value)) {
    return [{ label: "", href: "" }];
  }

  return value.map((link) => {
    if (typeof link === "object" && link && "label" in link && "href" in link) {
      return {
        label: String(link.label ?? ""),
        href: String(link.href ?? ""),
      };
    }

    return { label: "", href: "" };
  });
}

function getDraftNavigationGroups(fields: CmsDraftFields): CmsDraftNavigationGroup[] {
  const value = fields.groups;
  if (!Array.isArray(value)) {
    return [{ title: "", links: [{ label: "", href: "" }] }];
  }

  return value.map((group) => {
    if (typeof group === "object" && group && "title" in group && "links" in group && Array.isArray(group.links)) {
      return {
        title: String(group.title ?? ""),
        links: group.links.map((link) => {
          if (typeof link === "object" && link && "label" in link && "href" in link) {
            return {
              label: String(link.label ?? ""),
              href: String(link.href ?? ""),
            };
          }

          return { label: "", href: "" };
        }),
      };
    }

    return { title: "", links: [{ label: "", href: "" }] };
  });
}

function getDraftTitle(draft: CmsDraftRecord) {
  const title = draft.fields.title ?? draft.fields.description ?? draft.fields.summary ?? draft.fields.key ?? draft.contentKey;
  return String(title);
}

function formatDraftDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function countDraftsByStatus(drafts: CmsDraftRecord[], status: CmsDraftStatus) {
  return drafts.filter((draft) => draft.status === status).length;
}

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

  function updateDocumentSection(index: number, fieldName: keyof CmsDocumentSection, value: string) {
    setFields((currentFields) => {
      const sections = getDocumentSections(currentFields);
      const nextSections = sections.map((section, sectionIndex) => (sectionIndex === index ? { ...section, [fieldName]: value } : section));

      return { ...currentFields, sections: nextSections };
    });
  }

  function addDocumentSection() {
    setFields((currentFields) => ({
      ...currentFields,
      sections: [...getDocumentSections(currentFields), { heading: "", body: "" }],
    }));
  }

  function updateDraftLink(index: number, fieldName: keyof CmsDraftLink, value: string) {
    setFields((currentFields) => {
      const links = getDraftLinks(currentFields);
      const nextLinks = links.map((link, linkIndex) => (linkIndex === index ? { ...link, [fieldName]: value } : link));

      return { ...currentFields, links: nextLinks };
    });
  }

  function addDraftLink() {
    setFields((currentFields) => ({
      ...currentFields,
      links: [...getDraftLinks(currentFields), { label: "", href: "" }],
    }));
  }

  function updateNavigationGroup(groupIndex: number, value: string) {
    setFields((currentFields) => {
      const groups = getDraftNavigationGroups(currentFields);
      const nextGroups = groups.map((group, index) => (index === groupIndex ? { ...group, title: value } : group));

      return { ...currentFields, groups: nextGroups };
    });
  }

  function updateNavigationGroupLink(groupIndex: number, linkIndex: number, fieldName: keyof CmsDraftLink, value: string) {
    setFields((currentFields) => {
      const groups = getDraftNavigationGroups(currentFields);
      const nextGroups = groups.map((group, index) => {
        if (index !== groupIndex) {
          return group;
        }

        return {
          ...group,
          links: group.links.map((link, currentLinkIndex) => (currentLinkIndex === linkIndex ? { ...link, [fieldName]: value } : link)),
        };
      });

      return { ...currentFields, groups: nextGroups };
    });
  }

  function addNavigationGroup() {
    setFields((currentFields) => ({
      ...currentFields,
      groups: [...getDraftNavigationGroups(currentFields), { title: "", links: [{ label: "", href: "" }] }],
    }));
  }

  function addNavigationGroupLink(groupIndex: number) {
    setFields((currentFields) => {
      const groups = getDraftNavigationGroups(currentFields);
      const nextGroups = groups.map((group, index) =>
        index === groupIndex ? { ...group, links: [...group.links, { label: "", href: "" }] } : group,
      );

      return { ...currentFields, groups: nextGroups };
    });
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

  const isDocumentDraft = isEditableCmsDocumentDraftKey(selectedKey);
  const isPageDraft = isEditableCmsPageDraftKey(selectedKey);
  const isNavigationDraft = isEditableCmsNavigationDraftKey(selectedKey);
  const isSectionDraft = isDocumentDraft || isPageDraft;
  const documentSections = getDocumentSections(fields);
  const draftLinks = getDraftLinks(fields);
  const draftNavigationGroups = getDraftNavigationGroups(fields);
  const isFooterNavigationDraft = selectedKey === "navigation.footer";
  const sectionHelpText = isDocumentDraft
    ? "Add policy sections as plain text. No HTML is required, and drafts still require review before publishing."
    : "Add website sections as plain text. No HTML is required, and drafts still require review before publishing.";
  const previewSummaryLabel = isDocumentDraft ? "Summary" : "Description";
  const previewSummaryValue = isDocumentDraft ? getStringField(fields, "summary") : getStringField(fields, "description");

  return (
    <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="rounded border border-slate-200 bg-white/86 p-4 shadow-sm">
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Editable draft areas</div>
        <div className="mt-4 grid gap-2">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => selectKey(option.key)}
              className={`rounded-lg border px-3 py-3 text-left transition ${
 option.key === selectedKey ? "border-[#2563EB] bg-blue-50 text-slate-950" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
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

      <section className="rounded border border-slate-200 bg-white/90 p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-[#2563EB]">Local draft editor</div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">{selectedOption.label}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Save local drafts for review. This does not write live CMS modules, publish website pages, or touch databases.
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-amber-800">
            Draft only
          </div>
        </div>

        {isSectionDraft ? (
          <div className="mt-5 grid gap-5">
            {selectedOption.requiredFields
              .filter((fieldName) => fieldName !== "sections" && fieldName !== "reviewNotes")
              .map((fieldName) => (
              <label key={fieldName} className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{fieldLabel(fieldName)}</span>
                <span className="text-xs leading-5 text-slate-500">{fieldHints[fieldName] ?? "Draft this field for local review."}</span>
                <textarea
                  value={getStringField(fields, fieldName)}
                  onChange={(event) => updateField(fieldName, event.target.value)}
                  rows={fieldName === "summary" ? 4 : 2}
                  className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                />
              </label>
            ))}

            <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Editable sections</div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{sectionHelpText}</p>
                </div>
                <button
                  type="button"
                  onClick={addDocumentSection}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-slate-400"
                >
                  Add Section
                </button>
              </div>

              <div className="mt-4 grid gap-4">
                {documentSections.map((section, index) => (
                  <div key={index} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">Section {index + 1}</div>
                    <label className="mt-3 grid gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Heading</span>
                      <textarea
                        value={section.heading}
                        onChange={(event) => updateDocumentSection(index, "heading", event.target.value)}
                        rows={2}
                        className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="mt-3 grid gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Body</span>
                      <textarea
                        value={section.body}
                        onChange={(event) => updateDocumentSection(index, "body", event.target.value)}
                        rows={7}
                        className="min-h-32 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Review notes</span>
              <span className="text-xs leading-5 text-slate-500">{fieldHints.reviewNotes}</span>
              <textarea
                value={getStringField(fields, "reviewNotes")}
                onChange={(event) => updateField("reviewNotes", event.target.value)}
                rows={4}
                className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>
        ) : isNavigationDraft ? (
          <div className="mt-5 grid gap-5">
            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Title</span>
              <span className="text-xs leading-5 text-slate-500">Name this navigation draft for review.</span>
              <textarea
                value={getStringField(fields, "title")}
                onChange={(event) => updateField("title", event.target.value)}
                rows={2}
                className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </label>

            {isFooterNavigationDraft ? (
              <>
                <label className="grid gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Footer statement</span>
                  <span className="text-xs leading-5 text-slate-500">Short footer positioning line shown above the footer link columns.</span>
                  <textarea
                    value={getStringField(fields, "statement")}
                    onChange={(event) => updateField("statement", event.target.value)}
                    rows={3}
                    className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                <div className="rounded border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Footer columns</div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">Preserve grouped footer columns. Each group keeps its own title and links.</p>
                    </div>
                    <button
                      type="button"
                      onClick={addNavigationGroup}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-slate-400"
                    >
                      Add Group
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4">
                    {draftNavigationGroups.map((group, groupIndex) => (
                      <div key={groupIndex} className="rounded-lg border border-slate-200 bg-white p-3">
                        <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">Group {groupIndex + 1}</div>
                        <label className="mt-3 grid gap-2">
                          <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Group title</span>
                          <textarea
                            value={group.title}
                            onChange={(event) => updateNavigationGroup(groupIndex, event.target.value)}
                            rows={2}
                            className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                          />
                        </label>
                        <div className="mt-4 grid gap-3">
                          {group.links.map((link, linkIndex) => (
                            <div key={linkIndex} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                              <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Link {linkIndex + 1}</div>
                              <label className="mt-3 grid gap-2">
                                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Label</span>
                                <textarea
                                  value={link.label}
                                  onChange={(event) => updateNavigationGroupLink(groupIndex, linkIndex, "label", event.target.value)}
                                  rows={2}
                                  className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                                />
                              </label>
                              <label className="mt-3 grid gap-2">
                                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Href</span>
                                <textarea
                                  value={link.href}
                                  onChange={(event) => updateNavigationGroupLink(groupIndex, linkIndex, "href", event.target.value)}
                                  rows={2}
                                  className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                                />
                              </label>
                            </div>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => addNavigationGroupLink(groupIndex)}
                          className="mt-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-slate-400"
                        >
                          Add Link To Group
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Navigation links</div>
                  <p className="mt-1 text-xs leading-5 text-slate-500">Edit labels and URLs locally. Route crawl is still required before publishing.</p>
                </div>
                <button
                  type="button"
                  onClick={addDraftLink}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-800 transition hover:border-slate-400"
                >
                  Add Link
                </button>
              </div>

              <div className="mt-4 grid gap-4">
                {draftLinks.map((link, index) => (
                  <div key={index} className="rounded-lg border border-slate-200 bg-white p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">Link {index + 1}</div>
                    <label className="mt-3 grid gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Label</span>
                      <textarea
                        value={link.label}
                        onChange={(event) => updateDraftLink(index, "label", event.target.value)}
                        rows={2}
                        className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                    <label className="mt-3 grid gap-2">
                      <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Href</span>
                      <textarea
                        value={link.href}
                        onChange={(event) => updateDraftLink(index, "href", event.target.value)}
                        rows={2}
                        className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
            )}

            <label className="grid gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Review notes</span>
              <span className="text-xs leading-5 text-slate-500">{fieldHints.reviewNotes}</span>
              <textarea
                value={getStringField(fields, "reviewNotes")}
                onChange={(event) => updateField("reviewNotes", event.target.value)}
                rows={4}
                className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
              />
            </label>
          </div>
        ) : (
          <div className="mt-5 grid gap-4">
            {selectedOption.requiredFields.map((fieldName) => (
              <label key={fieldName} className="grid gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{fieldLabel(fieldName)}</span>
                <span className="text-xs leading-5 text-slate-500">{fieldHints[fieldName] ?? "Draft this field for local review."}</span>
                <textarea
                  value={String(fields[fieldName] ?? "")}
                  onChange={(event) => updateField(fieldName, event.target.value)}
                  rows={fieldRows(fieldName)}
                  className="min-h-12 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm leading-6 text-slate-950 shadow-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                />
              </label>
            ))}
          </div>
        )}

        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Preview</div>
          {isSectionDraft ? (
            <div className="mt-3 grid gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-grey-700">Title</div>
                <div className="mt-1 text-sm font-bold leading-6 text-slate-800">{getStringField(fields, "title") || "Empty"}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-grey-700">{previewSummaryLabel}</div>
                <div className="mt-1 text-sm leading-6 text-slate-700">{previewSummaryValue || "Empty"}</div>
              </div>
              {documentSections.map((section, index) => (
                <div key={index} className="border-t border-slate-200 pt-3">
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-grey-700">Section {index + 1}</div>
                  <div className="mt-1 text-sm font-bold leading-6 text-slate-800">{section.heading || "Empty heading"}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-700">{section.body || "Empty body"}</div>
                </div>
              ))}
            </div>
          ) : isNavigationDraft ? (
            <div className="mt-3 grid gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.12em] text-grey-700">Title</div>
                <div className="mt-1 text-sm font-bold leading-6 text-slate-800">{getStringField(fields, "title") || "Empty"}</div>
              </div>
              {isFooterNavigationDraft ? (
                <>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.12em] text-grey-700">Footer statement</div>
                    <div className="mt-1 text-sm leading-6 text-slate-700">{getStringField(fields, "statement") || "Empty"}</div>
                  </div>
                  {draftNavigationGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="border-t border-slate-200 pt-3">
                      <div className="text-xs font-bold uppercase tracking-[0.12em] text-grey-700">Group {groupIndex + 1}</div>
                      <div className="mt-1 text-sm font-bold leading-6 text-slate-800">{group.title || "Empty group title"}</div>
                      <div className="mt-2 grid gap-2">
                        {group.links.map((link, linkIndex) => (
                          <div key={linkIndex}>
                            <div className="text-sm font-bold leading-6 text-slate-800">{link.label || "Empty label"}</div>
                            <div className="break-all text-sm leading-6 text-slate-700">{link.href || "Empty href"}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                draftLinks.map((link, index) => (
                <div key={index} className="border-t border-slate-200 pt-3">
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-grey-700">Link {index + 1}</div>
                  <div className="mt-1 text-sm font-bold leading-6 text-slate-800">{link.label || "Empty label"}</div>
                  <div className="mt-1 break-all text-sm leading-6 text-slate-700">{link.href || "Empty href"}</div>
                </div>
                ))
              )}
            </div>
          ) : (
            <div className="mt-3 grid gap-2">
              {selectedOption.requiredFields.map((fieldName) => (
                <div key={fieldName}>
                  <div className="text-xs font-bold uppercase tracking-[0.12em] text-grey-700">{fieldLabel(fieldName)}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-700">{String(fields[fieldName] ?? "") || "Empty"}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => void saveDraft("draft")}
            className="rounded-lg bg-[#0A0A0A] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#10213c]"
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
          <button
            type="button"
            onClick={() => void saveDraft("ready")}
            className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 transition hover:border-emerald-400"
          >
            Mark Ready
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Saved local drafts</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">Ready means ready for human review. It still does not publish or write to a database.</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
              <div className="rounded-lg border border-slate-200 bg-white px-2 py-2">
                <div className="text-slate-950">{countDraftsByStatus(drafts, "draft")}</div>
                Draft
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-2 py-2">
                <div className="text-amber-800">{countDraftsByStatus(drafts, "needs-review")}</div>
                Review
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-2">
                <div className="text-emerald-800">{countDraftsByStatus(drafts, "ready")}</div>
                Ready
              </div>
            </div>
          </div>
          <div className="mt-3 grid gap-3">
            {drafts.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">No local drafts saved yet.</div>
            ) : (
              drafts.map((draft) => (
                <div key={draft.id} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="font-bold text-slate-950">{getDraftTitle(draft)}</div>
                    <div className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-600">
                      {draft.status}
                    </div>
                  </div>
                  <div className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{draft.contentKey}</div>
                  <div className="mt-1 font-mono text-xs text-slate-500">{draft.id}</div>
                  <div className="mt-1 text-xs text-slate-500">{formatDraftDate(draft.updatedAt)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
