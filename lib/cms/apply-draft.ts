import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CmsDraftRecord } from "@/lib/cms/drafts";
import { validateCmsDraft } from "@/lib/cms/drafts";
import { getCmsMediaRecords } from "@/lib/cms/media";
import { getCmsSeoRecords } from "@/lib/cms/seo";

export type CmsDraftApplyTarget = "seo.metadata" | "media.photos";

export type CmsDraftApplyPlan = {
  applySupported: boolean;
  contentKey: string;
  draftId: string;
  errors: string[];
  filePath?: string;
  mode: "dry-run" | "apply";
  nextRecord?: Record<string, string>;
  recordKey?: string;
  summary: string;
};

const supportedApplyTargets = new Set<string>(["seo.metadata", "media.photos"]);

function getStringField(draft: CmsDraftRecord, fieldName: string) {
  const value = draft.fields[fieldName];
  return typeof value === "string" ? value.trim() : "";
}

function quoted(value: string) {
  return JSON.stringify(value);
}

function findRecordBlock(source: string, recordKey: string) {
  const startPattern = new RegExp(`\\n\\s{2}${recordKey}:\\s*{`);
  const match = source.match(startPattern);
  if (!match || match.index == null) {
    return null;
  }

  const start = match.index;
  const endMarker = "\n  },";
  const end = source.indexOf(endMarker, start);
  if (end === -1) {
    return null;
  }

  return {
    start,
    end: end + endMarker.length,
    text: source.slice(start, end + endMarker.length),
  };
}

function setRecordProperty(recordText: string, propertyName: string, value: string) {
  const propertyPattern = new RegExp(`(\\n\\s{4}${propertyName}:\\s*)(?:\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*')\\s*,?`);
  const nextLine = `$1${quoted(value)},`;

  if (propertyPattern.test(recordText)) {
    return recordText.replace(propertyPattern, nextLine);
  }

  const spreadLinePattern = /\n\s{4}\.\.\.[^,\n]+,\n/;
  if (spreadLinePattern.test(recordText)) {
    return recordText.replace(spreadLinePattern, (line) => `${line}    ${propertyName}: ${quoted(value)},\n`);
  }

  return recordText.replace(/\n\s{2}},$/, `\n    ${propertyName}: ${quoted(value)},\n  },`);
}

export function validateCmsDraftApplyPlan(draft: CmsDraftRecord, mode: "dry-run" | "apply" = "dry-run"): CmsDraftApplyPlan {
  const draftValidation = validateCmsDraft(draft);
  const errors = [...draftValidation.errors];

  if (draft.status !== "ready") {
    errors.push("Only drafts marked ready can be applied to repo-backed CMS content.");
  }

  if (!supportedApplyTargets.has(draft.contentKey)) {
    errors.push(`Draft contentKey ${draft.contentKey} is not supported by the apply script yet.`);
  }

  if (draft.contentKey === "seo.metadata") {
    const route = getStringField(draft, "route");
    const record = getCmsSeoRecords().find((item) => item.route === route);

    if (!record) {
      errors.push(`No existing SEO record found for route ${route || "(empty)"}.`);
    }

    return {
      applySupported: errors.length === 0,
      contentKey: draft.contentKey,
      draftId: draft.id,
      errors,
      filePath: "lib/cms/seo.ts",
      mode,
      nextRecord: {
        route,
        title: getStringField(draft, "title"),
        description: getStringField(draft, "description"),
      },
      recordKey: record?.key,
      summary: record ? `Update SEO metadata for ${record.route}.` : "SEO metadata draft is not ready to apply.",
    };
  }

  if (draft.contentKey === "media.photos") {
    const key = getStringField(draft, "key");
    const record = getCmsMediaRecords().find((item) => item.key === key);

    if (!record) {
      errors.push(`No existing media record found for key ${key || "(empty)"}.`);
    }

    return {
      applySupported: errors.length === 0,
      contentKey: draft.contentKey,
      draftId: draft.id,
      errors,
      filePath: "lib/cms/media.ts",
      mode,
      nextRecord: {
        key,
        alt: getStringField(draft, "alt"),
        sourceUrl: getStringField(draft, "sourceUrl"),
        sourceNote: getStringField(draft, "sourceNote"),
      },
      recordKey: record?.key,
      summary: record ? `Update media metadata for ${record.key}.` : "Media draft is not ready to apply.",
    };
  }

  return {
    applySupported: false,
    contentKey: draft.contentKey,
    draftId: draft.id,
    errors,
    mode,
    summary: "Draft is not supported by the apply script yet.",
  };
}

export function applyCmsDraftToSource(source: string, plan: CmsDraftApplyPlan) {
  if (!plan.applySupported || !plan.recordKey || !plan.nextRecord) {
    throw new Error(`Cannot apply CMS draft: ${plan.errors.join(" ") || "missing apply plan metadata"}`);
  }

  const block = findRecordBlock(source, plan.recordKey);
  if (!block) {
    throw new Error(`Could not locate record ${plan.recordKey} in ${plan.filePath}.`);
  }

  let nextBlock = block.text;

  if (plan.contentKey === "seo.metadata") {
    nextBlock = setRecordProperty(nextBlock, "title", plan.nextRecord.title);
    nextBlock = setRecordProperty(nextBlock, "description", plan.nextRecord.description);
  } else if (plan.contentKey === "media.photos") {
    nextBlock = setRecordProperty(nextBlock, "alt", plan.nextRecord.alt);
    nextBlock = setRecordProperty(nextBlock, "sourceUrl", plan.nextRecord.sourceUrl);
    nextBlock = setRecordProperty(nextBlock, "sourceNote", plan.nextRecord.sourceNote);
  }

  return `${source.slice(0, block.start)}${nextBlock}${source.slice(block.end)}`;
}

export async function applyCmsDraftToRepo(draft: CmsDraftRecord, rootDirectory = process.cwd(), mode: "dry-run" | "apply" = "dry-run") {
  const plan = validateCmsDraftApplyPlan(draft, mode);
  if (!plan.applySupported || !plan.filePath) {
    return { plan, changed: false, source: null as string | null };
  }

  const absolutePath = path.join(rootDirectory, plan.filePath);
  const source = await readFile(absolutePath, "utf8");
  const nextSource = applyCmsDraftToSource(source, plan);

  if (mode === "apply" && nextSource !== source) {
    await writeFile(absolutePath, nextSource, "utf8");
  }

  return { plan, changed: nextSource !== source, source: nextSource };
}
