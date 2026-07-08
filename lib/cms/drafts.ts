import { findBlockedCmsClaims } from "@/lib/cms/content";
import { getFaqContent, getHelpContent } from "@/lib/cms/content";
import type { ExpectedCmsInventoryKey } from "@/lib/cms/inventory";
import { getCmsInventory } from "@/lib/cms/inventory";
import { getCmsMediaRecords } from "@/lib/cms/media";
import { getCmsSeoRecords } from "@/lib/cms/seo";

export type CmsDraftStatus = "draft" | "needs-review" | "ready";

export type CmsDocumentSection = {
  heading: string;
  body: string;
};

export type CmsDraftFieldValue = string | number | boolean | string[] | CmsDocumentSection[] | null;

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
  "faq",
  "help",
  "seo.metadata",
  "media.photos",
  "legal",
  "privacy",
  "terms",
  "trust-center",
] as const satisfies ExpectedCmsInventoryKey[];

export type EditableCmsDraftKey = (typeof editableCmsDraftKeys)[number];

export const editableCmsDocumentDraftKeys = ["legal", "privacy", "terms", "trust-center"] as const satisfies EditableCmsDraftKey[];

export type EditableCmsDocumentDraftKey = (typeof editableCmsDocumentDraftKeys)[number];

const requiredDraftFields: Record<EditableCmsDraftKey, string[]> = {
  faq: ["title", "description"],
  help: ["title", "description"],
  "seo.metadata": ["route", "title", "description"],
  "media.photos": ["key", "alt", "sourceUrl", "sourceNote"],
  legal: ["title", "summary", "effectiveDate", "sections", "reviewNotes"],
  privacy: ["title", "summary", "effectiveDate", "sections", "reviewNotes"],
  terms: ["title", "summary", "effectiveDate", "sections", "reviewNotes"],
  "trust-center": ["title", "summary", "effectiveDate", "sections", "reviewNotes"],
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

export function getEditableCmsDraftInventory() {
  const editableKeys = new Set<string>(editableCmsDraftKeys);

  return getCmsInventory().filter((item) => editableKeys.has(item.key));
}

export function getCmsDraftSeedFields(contentKey: EditableCmsDraftKey): CmsDraftFields {
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

  if (contentKey === "legal") {
    return {
      title: "Legal notice",
      summary: "Draft legal page copy for founder review before any publish step.",
      effectiveDate: new Date().toISOString().slice(0, 10),
      sections: [
        {
          heading: "Legal notice section",
          body: "Write draft legal content here. This local draft does not update the live legal page.",
        },
      ],
      reviewNotes: "Founder/legal review required before publishing.",
    };
  }

  if (contentKey === "privacy") {
    return {
      title: "Privacy policy",
      summary: "Draft privacy page copy for founder review before any publish step.",
      effectiveDate: new Date().toISOString().slice(0, 10),
      sections: [
        {
          heading: "Privacy policy section",
          body: "Write draft privacy content here. This local draft does not update the live privacy page.",
        },
      ],
      reviewNotes: "Founder/legal review required before publishing.",
    };
  }

  if (contentKey === "terms") {
    return {
      title: "Terms",
      summary: "Draft terms page copy for founder review before any publish step.",
      effectiveDate: new Date().toISOString().slice(0, 10),
      sections: [
        {
          heading: "Terms section",
          body: "Write draft terms content here. This local draft does not update the live terms page.",
        },
      ],
      reviewNotes: "Founder/legal review required before publishing.",
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
