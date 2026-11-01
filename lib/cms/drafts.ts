import {
  findBlockedCmsClaims,
  getAboutContent,
  getFaqContent,
  getHelpContent,
  getHomepageContent,
  getIndustriesContent,
  getNavigationContent,
  getSolutionsContent,
} from "@/lib/cms/content";
import type { ExpectedCmsInventoryKey } from "@/lib/cms/inventory";
import { getCmsInventory } from "@/lib/cms/inventory";
import { getCmsMediaRecords } from "@/lib/cms/media";
import { getCmsSeoRecords } from "@/lib/cms/seo";

export type CmsDraftStatus = "draft" | "needs-review" | "ready";

export type CmsDocumentSection = {
  heading: string;
  body: string;
};

export type CmsDraftLink = {
  label: string;
  href: string;
};

export type CmsDraftNavigationGroup = {
  title: string;
  links: CmsDraftLink[];
};

export type CmsDraftFieldValue = string | number | boolean | string[] | CmsDocumentSection[] | CmsDraftLink[] | CmsDraftNavigationGroup[] | null;

export type CmsDraftFields = Record<string, CmsDraftFieldValue>;

export type CmsDraftRecord = {
  id: string;
  contentKey: ExpectedCmsInventoryKey;
  ownerType: "cms";
  riskLevel: 1 | 2 | 3 | 4 | 5;
  fields: CmsDraftFields;
  status: CmsDraftStatus;
  updatedAt: string;
};

export type CmsDraftValidationResult = {
  ok: boolean;
  errors: string[];
  blockedClaims: ReturnType<typeof findBlockedCmsClaims>;
};

export const editableCmsDraftKeys = [
  "homepage",
  "about",
  "about.company-profile",
  "access",
  "contact",
  "customer-workspace",
  "solutions.index",
  "solutions.detail",
  "technology",
  "platform",
  "industries",
  "insights.index",
  "insights.article",
  "faq",
  "help",
  "search",
  "support",
  "tracking.lookup",
  "trust-center",
  "navigation.header",
  "navigation.footer",
  "media.photos",
  "seo.metadata",
] as const satisfies ExpectedCmsInventoryKey[];

export type EditableCmsDraftKey = (typeof editableCmsDraftKeys)[number];

export const editableCmsDocumentDraftKeys = ["trust-center"] as const satisfies EditableCmsDraftKey[];

export type EditableCmsDocumentDraftKey = (typeof editableCmsDocumentDraftKeys)[number];

export const editableCmsNavigationDraftKeys = ["navigation.header", "navigation.footer"] as const satisfies EditableCmsDraftKey[];

export type EditableCmsNavigationDraftKey = (typeof editableCmsNavigationDraftKeys)[number];

export const editableCmsPageDraftKeys = [
  "homepage",
  "about",
  "about.company-profile",
  "access",
  "contact",
  "customer-workspace",
  "solutions.index",
  "solutions.detail",
  "technology",
  "platform",
  "industries",
  "insights.index",
  "insights.article",
  "search",
  "support",
  "tracking.lookup",
] as const satisfies EditableCmsDraftKey[];

export type EditableCmsPageDraftKey = (typeof editableCmsPageDraftKeys)[number];

const requiredDraftFields: Record<EditableCmsDraftKey, string[]> = {
  homepage: ["title", "description", "sections", "reviewNotes"],
  about: ["title", "description", "sections", "reviewNotes"],
  "about.company-profile": ["title", "description", "sections", "reviewNotes"],
  access: ["title", "description", "sections", "reviewNotes"],
  contact: ["title", "description", "sections", "reviewNotes"],
  "customer-workspace": ["title", "description", "sections", "reviewNotes"],
  "solutions.index": ["title", "description", "sections", "reviewNotes"],
  "solutions.detail": ["title", "description", "sections", "reviewNotes"],
  technology: ["title", "description", "sections", "reviewNotes"],
  platform: ["title", "description", "sections", "reviewNotes"],
  industries: ["title", "description", "sections", "reviewNotes"],
  "insights.index": ["title", "description", "sections", "reviewNotes"],
  "insights.article": ["title", "description", "sections", "reviewNotes"],
  faq: ["title", "description"],
  help: ["title", "description"],
  search: ["title", "description", "sections", "reviewNotes"],
  support: ["title", "description", "sections", "reviewNotes"],
  "tracking.lookup": ["title", "description", "sections", "reviewNotes"],
  "trust-center": ["title", "summary", "effectiveDate", "sections", "reviewNotes"],
  "navigation.header": ["title", "links", "reviewNotes"],
  "navigation.footer": ["title", "statement", "groups", "reviewNotes"],
  "media.photos": ["key", "alt", "sourceUrl", "sourceNote"],
  "seo.metadata": ["route", "title", "description"],
};

export function getRequiredCmsDraftFields(contentKey: EditableCmsDraftKey) {
  return requiredDraftFields[contentKey];
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function isEditableCmsDraftKey(key: string): key is EditableCmsDraftKey {
  return editableCmsDraftKeys.includes(key as EditableCmsDraftKey);
}

export function isEditableCmsDocumentDraftKey(key: string): key is EditableCmsDocumentDraftKey {
  return editableCmsDocumentDraftKeys.includes(key as EditableCmsDocumentDraftKey);
}

export function isEditableCmsNavigationDraftKey(key: string): key is EditableCmsNavigationDraftKey {
  return editableCmsNavigationDraftKeys.includes(key as EditableCmsNavigationDraftKey);
}

export function isEditableCmsPageDraftKey(key: string): key is EditableCmsPageDraftKey {
  return editableCmsPageDraftKeys.includes(key as EditableCmsPageDraftKey);
}

export function getEditableCmsDraftInventory() {
  const editableKeys = new Set<string>(editableCmsDraftKeys);

  return getCmsInventory().filter((item) => editableKeys.has(item.key));
}

function getCmsInventoryItem(contentKey: EditableCmsDraftKey) {
  return getCmsInventory().find((item) => item.key === contentKey);
}

function sectionFromContent(heading: string, body: string): CmsDocumentSection {
  return { heading, body };
}

function pageDraftSeed(contentKey: EditableCmsPageDraftKey): CmsDraftFields {
  if (contentKey === "homepage") {
    const content = getHomepageContent();

    return {
      title: content.hero.title,
      description: content.hero.description,
      sections: [
        sectionFromContent(content.rfqReadiness.title, content.rfqReadiness.description ?? ""),
        sectionFromContent(content.howItWorks.title, content.howItWorks.description ?? ""),
        sectionFromContent(content.platformPreview.title, content.platformPreview.description ?? ""),
      ],
      reviewNotes: "Review mobile density, RFQ-first copy, and blocked claims before publishing.",
    };
  }

  if (contentKey === "about") {
    const content = getAboutContent();

    return {
      title: content.hero.title,
      description: content.hero.description,
      sections: [
        sectionFromContent(content.story.title, content.story.paragraphs.join("\n\n")),
        sectionFromContent(content.workingStandard.title, content.workingStandard.description ?? ""),
        sectionFromContent(content.cta.title, content.cta.description ?? ""),
      ],
      reviewNotes: "Review company-positioning copy before publishing.",
    };
  }

  if (contentKey === "solutions.index") {
    const content = getSolutionsContent();

    return {
      title: content.hero.title,
      description: content.hero.description,
      sections: [
        sectionFromContent(content.meaning.title, content.meaning.cards.map((card) => `${card.title}: ${card.text}`).join("\n")),
        sectionFromContent(content.activeAreas.title, content.activeAreas.description ?? ""),
        sectionFromContent(content.cta.title, content.cta.description ?? ""),
      ],
      reviewNotes: "Review solution language before publishing.",
    };
  }

  if (contentKey === "industries") {
    const content = getIndustriesContent();

    return {
      title: content.hero.title,
      description: content.hero.description,
      sections: [
        sectionFromContent(content.buyerContext.title, content.buyerContext.signals.join("\n")),
        sectionFromContent(content.supportedIndustries.title, content.supportedIndustries.cards.map((card) => `${card.title}: ${card.text}`).join("\n")),
        sectionFromContent(content.cta.title, content.cta.description ?? ""),
      ],
      reviewNotes: "Review industry copy before publishing.",
    };
  }

  const item = getCmsInventoryItem(contentKey);
  const title = item?.label ?? contentKey;

  return {
    title,
    description: `Draft public copy for ${title}.`,
    sections: [
      {
        heading: `${title} section`,
        body: `Write editable ${title} content here. This local draft does not publish to the live website.`,
      },
    ],
    reviewNotes: "Review claim safety and route context before publishing.",
  };
}

function navigationDraftSeed(contentKey: EditableCmsNavigationDraftKey): CmsDraftFields {
  const navigation = getNavigationContent();
  if (contentKey === "navigation.footer") {
    return {
      title: "Footer navigation",
      statement: navigation.footer.statement,
      groups: navigation.footer.groups.map((group) => ({
        title: group.title,
        links: group.links.map((link) => ({ ...link })),
      })),
      reviewNotes: "Review route availability and sitemap consistency before publishing navigation changes.",
    };
  }

  return {
    title: "Header navigation",
    links: [...navigation.header.primaryItems, navigation.header.quoteAction],
    reviewNotes: "Review route availability and sitemap consistency before publishing navigation changes.",
  };
}

export function getCmsDraftSeedFields(contentKey: EditableCmsDraftKey): CmsDraftFields {
  if (isEditableCmsPageDraftKey(contentKey)) {
    return pageDraftSeed(contentKey);
  }

  if (isEditableCmsNavigationDraftKey(contentKey)) {
    return navigationDraftSeed(contentKey);
  }

  if (contentKey === "faq") {
    const content = getFaqContent();

    return {
      title: content.hero.title,
      description: content.hero.description,
    };
  }

  if (contentKey === "help") {
    const content = getHelpContent();

    return {
      title: content.hero.title,
      description: content.hero.description,
    };
  }

  if (contentKey === "seo.metadata") {
    const record = getCmsSeoRecords()[0];

    return {
      route: record?.route ?? "/",
      title: record?.title ?? "",
      description: record?.description ?? "",
    };
  }

  if (contentKey === "trust-center") {
    return {
      title: "Trust Center",
      summary: "Draft trust-center page copy for founder review before any publish step.",
      effectiveDate: new Date().toISOString().slice(0, 10),
      sections: [
        {
          heading: "Trust Center section",
          body: "Write draft trust-center content here. This local draft does not update the live trust-center page.",
        },
      ],
      reviewNotes: "Claim-safety review required before publishing.",
    };
  }

  const record = getCmsMediaRecords()[0];

  return {
    key: record?.key ?? "",
    alt: record?.alt ?? "",
    sourceUrl: record?.sourceUrl ?? "",
    sourceNote: record?.sourceNote ?? "",
  };
}

export function getCmsDraftEditorOptions() {
  return getEditableCmsDraftInventory().map((item) => ({
    key: item.key as EditableCmsDraftKey,
    label: item.label,
    ownerType: item.ownerType,
    publishRisk: item.publishRisk,
    riskLevel: item.riskLevel,
    requiredFields: getRequiredCmsDraftFields(item.key as EditableCmsDraftKey),
    seedFields: getCmsDraftSeedFields(item.key as EditableCmsDraftKey),
  }));
}

export function validateCmsDraft(draft: unknown): CmsDraftValidationResult {
  const errors: string[] = [];

  if (!isPlainObject(draft)) {
    return {
      ok: false,
      errors: ["Draft must be an object."],
      blockedClaims: [],
    };
  }

  const contentKey = draft.contentKey;
  const inventoryItem = typeof contentKey === "string" ? getCmsInventory().find((item) => item.key === contentKey) : undefined;

  if (typeof draft.id !== "string" || draft.id.trim().length === 0) {
    errors.push("Draft id is required.");
  }

  if (typeof contentKey !== "string" || !isEditableCmsDraftKey(contentKey)) {
    errors.push("Draft contentKey is not enabled for local CMS drafts.");
  }

  if (!inventoryItem) {
    errors.push("Draft contentKey has no CMS inventory record.");
  } else {
    if (inventoryItem.ownerType !== "cms") {
      errors.push(`Draft contentKey ${inventoryItem.key} is ${inventoryItem.ownerType}-owned and cannot be edited in CMS.`);
    }
    if (!inventoryItem.editableNow) {
      errors.push(`Draft contentKey ${inventoryItem.key} is not marked editable in the CMS inventory.`);
    }
    if (inventoryItem.publishRisk === "blocked") {
      errors.push(`Draft contentKey ${inventoryItem.key} is blocked from CMS editing.`);
    }
  }

  if (draft.ownerType !== "cms") {
    errors.push("Draft ownerType must be cms.");
  }

  if (typeof draft.riskLevel !== "number" || draft.riskLevel < 1 || draft.riskLevel > 5) {
    errors.push("Draft riskLevel must be between 1 and 5.");
  } else if (inventoryItem && draft.riskLevel !== inventoryItem.riskLevel) {
    errors.push(`Draft riskLevel must match inventory risk level ${inventoryItem.riskLevel}.`);
  }

  if (draft.status !== "draft" && draft.status !== "needs-review" && draft.status !== "ready") {
    errors.push("Draft status must be draft, needs-review, or ready.");
  }

  if (typeof draft.updatedAt !== "string" || Number.isNaN(Date.parse(draft.updatedAt))) {
    errors.push("Draft updatedAt must be an ISO date string.");
  }

  if (!isPlainObject(draft.fields)) {
    errors.push("Draft fields must be an object.");
  } else if (typeof contentKey === "string" && isEditableCmsDraftKey(contentKey)) {
    for (const fieldName of requiredDraftFields[contentKey]) {
      const value = draft.fields[fieldName];
      if (fieldName === "sections") {
        if (!Array.isArray(value) || value.length === 0) {
          errors.push(`Draft field sections must include at least one section for ${contentKey}.`);
          continue;
        }

        value.forEach((section, index) => {
          if (!isPlainObject(section)) {
            errors.push(`Draft section ${index + 1} must be an object for ${contentKey}.`);
            return;
          }
          if (typeof section.heading !== "string" || section.heading.trim().length === 0) {
            errors.push(`Draft section ${index + 1} heading is required for ${contentKey}.`);
          }
          if (typeof section.body !== "string" || section.body.trim().length === 0) {
            errors.push(`Draft section ${index + 1} body is required for ${contentKey}.`);
          }
        });
        continue;
      }

      if (fieldName === "links") {
        if (!Array.isArray(value) || value.length === 0) {
          errors.push(`Draft field links must include at least one link for ${contentKey}.`);
          continue;
        }

        value.forEach((link, index) => {
          if (!isPlainObject(link)) {
            errors.push(`Draft link ${index + 1} must be an object for ${contentKey}.`);
            return;
          }
          if (typeof link.label !== "string" || link.label.trim().length === 0) {
            errors.push(`Draft link ${index + 1} label is required for ${contentKey}.`);
          }
          if (typeof link.href !== "string" || link.href.trim().length === 0) {
            errors.push(`Draft link ${index + 1} href is required for ${contentKey}.`);
          }
        });
        continue;
      }

      if (fieldName === "groups") {
        if (!Array.isArray(value) || value.length === 0) {
          errors.push(`Draft field groups must include at least one group for ${contentKey}.`);
          continue;
        }

        value.forEach((group, groupIndex) => {
          if (!isPlainObject(group)) {
            errors.push(`Draft group ${groupIndex + 1} must be an object for ${contentKey}.`);
            return;
          }
          if (typeof group.title !== "string" || group.title.trim().length === 0) {
            errors.push(`Draft group ${groupIndex + 1} title is required for ${contentKey}.`);
          }
          if (!Array.isArray(group.links) || group.links.length === 0) {
            errors.push(`Draft group ${groupIndex + 1} must include at least one link for ${contentKey}.`);
            return;
          }

          group.links.forEach((link, linkIndex) => {
            if (!isPlainObject(link)) {
              errors.push(`Draft group ${groupIndex + 1} link ${linkIndex + 1} must be an object for ${contentKey}.`);
              return;
            }
            if (typeof link.label !== "string" || link.label.trim().length === 0) {
              errors.push(`Draft group ${groupIndex + 1} link ${linkIndex + 1} label is required for ${contentKey}.`);
            }
            if (typeof link.href !== "string" || link.href.trim().length === 0) {
              errors.push(`Draft group ${groupIndex + 1} link ${linkIndex + 1} href is required for ${contentKey}.`);
            }
          });
        });
        continue;
      }

      if (typeof value !== "string" || value.trim().length === 0) {
        errors.push(`Draft field ${fieldName} is required for ${contentKey}.`);
      }
    }
  }

  const blockedClaims = findBlockedCmsClaims(draft);
  if (blockedClaims.length > 0) {
    errors.push("Draft contains blocked public claims.");
  }

  return {
    ok: errors.length === 0,
    errors,
    blockedClaims,
  };
}

export function createCmsDraft(input: {
  id: string;
  contentKey: EditableCmsDraftKey;
  fields: CmsDraftFields;
  status?: CmsDraftStatus;
  updatedAt?: string;
}): CmsDraftRecord {
  const inventoryItem = getCmsInventory().find((item) => item.key === input.contentKey);

  if (!inventoryItem || inventoryItem.ownerType !== "cms") {
    throw new Error(`CMS draft key is not editable: ${input.contentKey}`);
  }

  const draft: CmsDraftRecord = {
    id: input.id,
    contentKey: input.contentKey,
    ownerType: "cms",
    riskLevel: inventoryItem.riskLevel,
    fields: input.fields,
    status: input.status ?? "draft",
    updatedAt: input.updatedAt ?? new Date().toISOString(),
  };
  const result = validateCmsDraft(draft);

  if (!result.ok) {
    throw new Error(`Invalid CMS draft: ${result.errors.join(" ")}`);
  }

  return draft;
}
