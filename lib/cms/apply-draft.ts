import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CmsDraftLink, CmsDraftNavigationGroup, CmsDraftRecord } from "@/lib/cms/drafts";
import { validateCmsDraft } from "@/lib/cms/drafts";
import { getCmsMediaRecords } from "@/lib/cms/media";
import { getCmsSeoRecords } from "@/lib/cms/seo";

export type CmsDraftApplyTarget = "seo.metadata" | "media.photos" | "navigation.header" | "navigation.footer";

export type CmsDraftApplyPlan = {
  applySupported: boolean;
  contentKey: string;
  draftId: string;
  errors: string[];
  filePath?: string;
  mode: "dry-run" | "apply";
  nextRecord?: Record<string, unknown>;
  recordKey?: string;
  summary: string;
};

const supportedApplyTargets = new Set<string>(["seo.metadata", "media.photos", "navigation.header", "navigation.footer"]);

function getStringField(draft: CmsDraftRecord, fieldName: string) {
  const value = draft.fields[fieldName];
  return typeof value === "string" ? value.trim() : "";
}

function getDraftLinks(draft: CmsDraftRecord): CmsDraftLink[] {
  const value = draft.fields.links;
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((link) => {
      if (!link || typeof link !== "object" || !("label" in link) || !("href" in link)) {
        return null;
      }

      return {
        label: String(link.label ?? "").trim(),
        href: String(link.href ?? "").trim(),
      };
    })
    .filter((link): link is CmsDraftLink => Boolean(link));
}

function getDraftNavigationGroups(draft: CmsDraftRecord): CmsDraftNavigationGroup[] {
  const value = draft.fields.groups;
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((group) => {
      if (!group || typeof group !== "object" || !("title" in group) || !("links" in group) || !Array.isArray(group.links)) {
        return null;
      }

      return {
        title: String(group.title ?? "").trim(),
        links: group.links
          .map((link) => {
            if (!link || typeof link !== "object" || !("label" in link) || !("href" in link)) {
              return null;
            }

            return {
              label: String(link.label ?? "").trim(),
              href: String(link.href ?? "").trim(),
            };
          })
          .filter((link): link is CmsDraftLink => Boolean(link)),
      };
    })
    .filter((group): group is CmsDraftNavigationGroup => Boolean(group));
}

function quoted(value: string) {
  return JSON.stringify(value);
}

function findRecordBlock(source: string, recordKey: string, anchorText?: string) {
  const anchorIndex = anchorText ? source.indexOf(anchorText) : 0;
  if (anchorIndex === -1) {
    return null;
  }

  const startPattern = new RegExp(`\\n\\s{2}${recordKey}:\\s*{`);
  const searchableSource = source.slice(anchorIndex);
  const match = searchableSource.match(startPattern);
  if (!match || match.index == null) {
    return null;
  }

  const start = anchorIndex + match.index;
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

function validateNavigationLinks(links: CmsDraftLink[]) {
  const errors: string[] = [];

  links.forEach((link, index) => {
    if (!link.label) {
      errors.push(`Navigation link ${index + 1} label is required.`);
    }
    if (!link.href) {
      errors.push(`Navigation link ${index + 1} href is required.`);
    } else if (!link.href.startsWith("/")) {
      errors.push(`Navigation link ${index + 1} must use an internal href that starts with /.`);
    } else if (link.href.includes("/government-procurement")) {
      errors.push(`Navigation link ${index + 1} uses a blocked public route.`);
    }
  });

  return errors;
}

function validateNavigationGroups(groups: CmsDraftNavigationGroup[]) {
  const errors: string[] = [];

  if (groups.length === 0) {
    errors.push("Footer navigation apply requires at least one grouped footer column.");
  }

  groups.forEach((group, groupIndex) => {
    if (!group.title) {
      errors.push(`Footer navigation group ${groupIndex + 1} title is required.`);
    }
    if (group.links.length === 0) {
      errors.push(`Footer navigation group ${groupIndex + 1} must include at least one link.`);
    }
    errors.push(
      ...validateNavigationLinks(group.links).map((error) => `Footer navigation group ${groupIndex + 1}: ${error}`),
    );
  });

  return errors;
}

function renderLink(link: CmsDraftLink) {
  return `{ href: ${quoted(link.href)}, label: ${quoted(link.label)} }`;
}

function renderHeaderNavigationBlock(links: CmsDraftLink[]) {
  const primaryItems = links.slice(0, 6);
  const accessAction = links[6];
  const quoteAction = links[7];

  return `\n  header: {\n    primaryItems: [\n${primaryItems.map((link) => `      ${renderLink(link)},`).join("\n")}\n    ],\n    accessAction: ${renderLink(accessAction)},\n    quoteAction: ${renderLink(quoteAction)},\n  },`;
}

function renderFooterNavigationBlock(statement: string, groups: CmsDraftNavigationGroup[]) {
  return `\n  footer: {\n    statement: ${quoted(statement)},\n    groups: [\n${groups
    .map(
      (group) =>
        `      {\n        title: ${quoted(group.title)},\n        links: [\n${group.links.map((link) => `          ${renderLink(link)},`).join("\n")}\n        ],\n      },`,
    )
    .join("\n")}\n    ],\n  },`;
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

  if (draft.contentKey === "navigation.header") {
    const links = getDraftLinks(draft);
    if (links.length !== 8) {
      errors.push("Header navigation apply requires exactly 8 links: 6 primary links, access action, and quote action.");
    }
    errors.push(...validateNavigationLinks(links));

    return {
      applySupported: errors.length === 0,
      contentKey: draft.contentKey,
      draftId: draft.id,
      errors,
      filePath: "lib/cms/content.ts",
      mode,
      nextRecord: {
        links,
      },
      recordKey: "header",
      summary: "Update header navigation links.",
    };
  }

  if (draft.contentKey === "navigation.footer") {
    const statement = getStringField(draft, "statement");
    const groups = getDraftNavigationGroups(draft);

    if (!statement) {
      errors.push("Footer navigation statement is required.");
    }
    errors.push(...validateNavigationGroups(groups));

    return {
      applySupported: errors.length === 0,
      contentKey: draft.contentKey,
      draftId: draft.id,
      errors,
      filePath: "lib/cms/content.ts",
      mode,
      nextRecord: {
        statement,
        groups,
      },
      recordKey: "footer",
      summary: "Update grouped footer navigation.",
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

  const block = findRecordBlock(
    source,
    plan.recordKey,
    plan.contentKey === "navigation.header" || plan.contentKey === "navigation.footer" ? "const navigationContent" : undefined,
  );
  if (!block) {
    throw new Error(`Could not locate record ${plan.recordKey} in ${plan.filePath}.`);
  }

  let nextBlock = block.text;

  if (plan.contentKey === "seo.metadata") {
    nextBlock = setRecordProperty(nextBlock, "title", String(plan.nextRecord.title ?? ""));
    nextBlock = setRecordProperty(nextBlock, "description", String(plan.nextRecord.description ?? ""));
  } else if (plan.contentKey === "media.photos") {
    nextBlock = setRecordProperty(nextBlock, "alt", String(plan.nextRecord.alt ?? ""));
    nextBlock = setRecordProperty(nextBlock, "sourceUrl", String(plan.nextRecord.sourceUrl ?? ""));
    nextBlock = setRecordProperty(nextBlock, "sourceNote", String(plan.nextRecord.sourceNote ?? ""));
  } else if (plan.contentKey === "navigation.header") {
    const links = plan.nextRecord.links;
    if (!Array.isArray(links)) {
      throw new Error("Header navigation apply plan is missing links.");
    }
    nextBlock = renderHeaderNavigationBlock(links as CmsDraftLink[]);
  } else if (plan.contentKey === "navigation.footer") {
    const statement = String(plan.nextRecord.statement ?? "");
    const groups = plan.nextRecord.groups;
    if (!Array.isArray(groups)) {
      throw new Error("Footer navigation apply plan is missing groups.");
    }
    nextBlock = renderFooterNavigationBlock(statement, groups as CmsDraftNavigationGroup[]);
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
