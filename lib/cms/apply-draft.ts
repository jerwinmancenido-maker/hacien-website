import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CmsDocumentSection } from "@/lib/cms/documents";
import { getCmsDocumentRecords } from "@/lib/cms/documents";
import type {
  CmsDocumentSection as CmsDraftDocumentSection,
  CmsDraftLink,
  CmsDraftNavigationGroup,
  CmsDraftRecord,
} from "@/lib/cms/drafts";
import { validateCmsDraft } from "@/lib/cms/drafts";
import { getCmsMediaRecords } from "@/lib/cms/media";
import { getNavigationContent } from "@/lib/cms/content";
import { getCmsSeoRecords } from "@/lib/cms/seo";

export type CmsDraftApplyTarget =
  | "seo.metadata"
  | "media.photos"
  | "navigation.header"
  | "navigation.footer"
  | "legal"
  | "privacy"
  | "terms"
  | "trust-center";

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

const documentApplyTargets = new Set<string>(["trust-center"]);
const codePublishedLegalPages = new Set<string>(["legal", "privacy", "terms"]);
const pageHeroApplyTargets = new Set<string>(["homepage", "about", "solutions.index", "industries", "faq", "help"]);

const supportedApplyTargets = new Set<string>([
  "seo.metadata",
  "media.photos",
  "navigation.header",
  "navigation.footer",
  ...documentApplyTargets,
  ...pageHeroApplyTargets,
]);

const pageHeroApplyConstNames: Record<string, string> = {
  homepage: "homepageContent",
  about: "aboutContent",
  "solutions.index": "solutionsContent",
  industries: "industriesContent",
  faq: "faqContent",
  help: "helpContent",
};

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

function getDraftDocumentSections(draft: CmsDraftRecord): CmsDraftDocumentSection[] {
  const value = draft.fields.sections;
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((section) => {
      if (!section || typeof section !== "object" || !("heading" in section) || !("body" in section)) {
        return null;
      }

      return {
        heading: String(section.heading ?? "").trim(),
        body: String(section.body ?? "").trim(),
      };
    })
    .filter((section): section is CmsDraftDocumentSection => Boolean(section));
}

function quoted(value: string) {
  return JSON.stringify(value);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findRecordBlock(source: string, recordKey: string, anchorText?: string) {
  const anchorIndex = anchorText ? source.indexOf(anchorText) : 0;
  if (anchorIndex === -1) {
    return null;
  }

  const escapedRecordKey = escapeRegExp(recordKey);
  const startPattern = new RegExp(`\\n\\s{2}(?:${escapedRecordKey}|["']${escapedRecordKey}["']):\\s*{`);
  const searchableSource = source.slice(anchorIndex);
  const match = searchableSource.match(startPattern);
  if (!match || match.index == null) {
    return null;
  }

  const start = anchorIndex + match.index;
  const openBrace = source.indexOf("{", start);
  if (openBrace === -1) {
    return null;
  }

  let depth = 0;
  let inString: string | null = null;
  let escape = false;

  for (let index = openBrace; index < source.length; index += 1) {
    const char = source[index];

    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (char === "\\") {
        escape = true;
        continue;
      }
      if (char === inString) {
        inString = null;
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      inString = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        const end = source[index + 1] === "," ? index + 2 : index + 1;
        return {
          start,
          end,
          text: source.slice(start, end),
        };
      }
    }
  }

  return null;
}

function findConstObjectBlock(source: string, constName: string) {
  const startPattern = new RegExp(`(?:^|\\n)const\\s+${escapeRegExp(constName)}(?::[^=]+)?=\\s*{`);
  const match = source.match(startPattern);
  if (!match || match.index == null) {
    return null;
  }

  const start = match.index;
  const openBrace = source.indexOf("{", start);
  if (openBrace === -1) {
    return null;
  }

  let depth = 0;
  let inString: string | null = null;
  let escape = false;

  for (let index = openBrace; index < source.length; index += 1) {
    const char = source[index];

    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (char === "\\") {
        escape = true;
        continue;
      }
      if (char === inString) {
        inString = null;
      }
      continue;
    }

    if (char === "\"" || char === "'" || char === "`") {
      inString = char;
      continue;
    }

    if (char === "{") {
      depth += 1;
    } else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        const end = source[index + 1] === ";" ? index + 2 : index + 1;
        return {
          start,
          end,
          text: source.slice(start, end),
        };
      }
    }
  }

  return null;
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

function setBlockProperty(blockText: string, propertyName: string, value: string) {
  const propertyPattern = new RegExp(`(\\n\\s+${propertyName}:\\s*)(?:\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*')\\s*,?`);
  const nextLine = `$1${quoted(value)},`;

  if (propertyPattern.test(blockText)) {
    return blockText.replace(propertyPattern, nextLine);
  }

  return blockText;
}

function updateHeroFields(recordText: string, title: string, description: string) {
  const heroBlock = findRecordBlock(recordText, "hero");
  if (!heroBlock) {
    throw new Error("Could not locate hero block in CMS content record.");
  }

  let nextHeroBlock = setBlockProperty(heroBlock.text, "title", title);
  nextHeroBlock = setBlockProperty(nextHeroBlock, "description", description);

  return `${recordText.slice(0, heroBlock.start)}${nextHeroBlock}${recordText.slice(heroBlock.end)}`;
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
  const primaryItems = links.slice(0, -1);
  const quoteAction = links[links.length - 1];

  return `\n  header: {\n    primaryItems: [\n${primaryItems.map((link) => `      ${renderLink(link)},`).join("\n")}\n    ],\n    quoteAction: ${renderLink(quoteAction)},\n  },`;
}

function renderFooterNavigationBlock(statement: string, groups: CmsDraftNavigationGroup[]) {
  return `\n  footer: {\n    statement: ${quoted(statement)},\n    groups: [\n${groups
    .map(
      (group) =>
        `      {\n        title: ${quoted(group.title)},\n        links: [\n${group.links.map((link) => `          ${renderLink(link)},`).join("\n")}\n        ],\n      },`,
    )
    .join("\n")}\n    ],\n  },`;
}

function renderDocumentSections(sections: CmsDraftDocumentSection[]): CmsDocumentSection[] {
  return sections.map((section) => ({
    title: section.heading,
    clauses: [
      {
        heading: section.heading,
        paragraphs: [section.body],
      },
    ],
  }));
}

function renderDocumentSectionBlock(sections: CmsDocumentSection[]) {
  const renderedSections = sections.map((section) => {
    const renderedClauses = section.clauses.map((clause) => {
      const paragraphs = (clause.paragraphs ?? []).map((paragraph) => quoted(paragraph)).join(", ");
      return [
        "          {",
        `            heading: ${quoted(clause.heading)},`,
        `            paragraphs: [${paragraphs}],`,
        "          },",
      ].join("\n");
    });

    return [
      "      {",
      `        title: ${quoted(section.title)},`,
      "        clauses: [",
      renderedClauses.join("\n"),
      "        ],",
      "      },",
    ].join("\n");
  });

  return ["[", renderedSections.join("\n"), "    ]"].join("\n");
}

function renderDocumentRecordBlock(recordKey: string, record: Record<string, unknown>) {
  const sections = Array.isArray(record.sections) ? (record.sections as CmsDocumentSection[]) : [];
  const introParagraphs = Array.isArray(record.introParagraphs) ? (record.introParagraphs as string[]) : [];

  return [
    `\n  ${recordKey}: {`,
    `    key: ${quoted(recordKey)},`,
    `    eyebrow: ${quoted(String(record.eyebrow ?? ""))},`,
    `    title: ${quoted(String(record.title ?? ""))},`,
    `    description: ${quoted(String(record.description ?? ""))},`,
    `    summary: ${quoted(String(record.summary ?? ""))},`,
    `    version: ${quoted(String(record.version ?? "draft"))},`,
    `    effectiveDate: ${quoted(String(record.effectiveDate ?? ""))},`,
    `    updatedAt: ${quoted(String(record.updatedAt ?? ""))},`,
    `    introParagraphs: [${introParagraphs.map((paragraph) => quoted(paragraph)).join(", ")}],`,
    `    sections: ${renderDocumentSectionBlock(sections)},`,
    `    finalNote: ${quoted(String(record.finalNote ?? ""))},`,
    "  },",
  ].join("\n");
}
export function validateCmsDraftApplyPlan(draft: CmsDraftRecord, mode: "dry-run" | "apply" = "dry-run"): CmsDraftApplyPlan {
  const draftValidation = validateCmsDraft(draft);
  const errors = [...draftValidation.errors];

  if (draft.status !== "ready") {
    errors.push("Only drafts marked ready can be applied to repo-backed CMS content.");
  }

  if (codePublishedLegalPages.has(draft.contentKey)) {
    errors.push(
      "This page is published from app/policies/_lib/content.ts. CMS apply does not change the live legal page.",
    );
    return {
      applySupported: false,
      contentKey: draft.contentKey,
      draftId: draft.id,
      errors,
      mode,
      summary: "Live legal pages are published from code, not from a CMS apply.",
    };
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
    const expectedLinkCount = getNavigationContent().header.primaryItems.length + 1;
    if (links.length !== expectedLinkCount) {
      errors.push(
        `Header navigation apply requires ${expectedLinkCount} links: the current primary links and a quote action.`,
      );
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

    if (typeof draft.fields.statement !== "string") {
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

  if (documentApplyTargets.has(draft.contentKey)) {
    const record = getCmsDocumentRecords().find((item) => item.key === draft.contentKey);
    const sections = getDraftDocumentSections(draft);
    const title = getStringField(draft, "title");
    const summary = getStringField(draft, "summary");
    const effectiveDate = getStringField(draft, "effectiveDate");

    if (!record) {
      errors.push(`No existing CMS document record found for ${draft.contentKey}.`);
    }
    if (!title) {
      errors.push("Document title is required.");
    }
    if (!summary) {
      errors.push("Document summary is required.");
    }
    if (!effectiveDate) {
      errors.push("Document effectiveDate is required.");
    }
    if (sections.length === 0) {
      errors.push("Document apply requires at least one section.");
    }
    sections.forEach((section, index) => {
      if (!section.heading) {
        errors.push(`Document section ${index + 1} heading is required.`);
      }
      if (!section.body) {
        errors.push(`Document section ${index + 1} body is required.`);
      }
    });

    return {
      applySupported: errors.length === 0,
      contentKey: draft.contentKey,
      draftId: draft.id,
      errors,
      filePath: "lib/cms/documents.ts",
      mode,
      nextRecord: {
        eyebrow: record?.eyebrow ?? title,
        title,
        description: summary,
        summary,
        version: record?.version ?? "draft",
        effectiveDate,
        updatedAt: effectiveDate,
        introParagraphs: [summary],
        sections: renderDocumentSections(sections),
        finalNote: getStringField(draft, "reviewNotes"),
      },
      recordKey: draft.contentKey,
      summary: record ? `Update CMS document content for ${draft.contentKey}.` : "CMS document draft is not ready to apply.",
    };
  }

  if (pageHeroApplyTargets.has(draft.contentKey)) {
    const title = getStringField(draft, "title");
    const description = getStringField(draft, "description");
    const constName = pageHeroApplyConstNames[draft.contentKey];

    if (!title) {
      errors.push("Page hero title is required.");
    }
    if (!description) {
      errors.push("Page hero description is required.");
    }
    if (!constName) {
      errors.push(`No CMS content constant mapping exists for ${draft.contentKey}.`);
    }

    return {
      applySupported: errors.length === 0,
      contentKey: draft.contentKey,
      draftId: draft.id,
      errors,
      filePath: "lib/cms/content.ts",
      mode,
      nextRecord: {
        title,
        description,
        sections: getDraftDocumentSections(draft),
      },
      recordKey: constName,
      summary: constName ? `Update CMS hero content for ${draft.contentKey}.` : "CMS page draft is not ready to apply.",
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

  if (pageHeroApplyTargets.has(plan.contentKey)) {
    const block = findConstObjectBlock(source, plan.recordKey);
    if (!block) {
      throw new Error(`Could not locate content constant ${plan.recordKey} in ${plan.filePath}.`);
    }

    const nextBlock = updateHeroFields(
      block.text,
      String(plan.nextRecord.title ?? ""),
      String(plan.nextRecord.description ?? ""),
    );

    return `${source.slice(0, block.start)}${nextBlock}${source.slice(block.end)}`;
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
  } else if (documentApplyTargets.has(plan.contentKey)) {
    nextBlock = renderDocumentRecordBlock(plan.recordKey, plan.nextRecord);
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
