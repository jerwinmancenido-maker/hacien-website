import type { Metadata } from "next";
import { validateCmsContent } from "@/lib/cms/content";

export type CmsSeoKey = "homepage" | "about" | "solutions" | "industries" | "faq" | "help";

export type CmsSeoRecord = {
  key: CmsSeoKey;
  route: string;
  title: string;
  description: string;
};

const cmsSeoRecords: Record<CmsSeoKey, CmsSeoRecord> = {
  homepage: {
    key: "homepage",
    route: "/",
    title: "Technology Procurement Clarified Before Quoting",
    description:
      "HACIEN helps organizations turn IT requirements, BOQs, supplier quotes, and rough ideas into usable RFQ conversations.",
  },
  about: {
    key: "about",
    route: "/about",
    title: "About HACIEN | IT Procurement & Technology Solutions",
    description:
      "HACIEN Information Technology Solutions helps Philippine organizations prepare technology requirements, review supplier inputs, and move RFQs into formal business communication.",
  },
  solutions: {
    key: "solutions",
    route: "/solutions",
    title: "IT Solutions and Systems Integration Philippines",
    description:
      "HACIEN provides IT infrastructure, systems integration, networking, cybersecurity, servers, storage, cloud, software licensing, managed IT, and project delivery support in the Philippines.",
  },
  industries: {
    key: "industries",
    route: "/industries",
    title: "Industries Served",
    description:
      "Explore how HACIEN supports business, education, healthcare, construction, enterprise, and organization buyers with RFQ-first technology support.",
  },
  faq: {
    key: "faq",
    route: "/faq",
    title: "FAQ",
    description: "Search HACIEN RFQ, payment, document, support, and tracking questions with evidence-safe answers.",
  },
  help: {
    key: "help",
    route: "/help",
    title: "Help Center",
    description: "HACIEN help center for RFQ preparation, request tracking, and prototype document parsing.",
  },
};

export function getCmsSeoRecords() {
  return Object.values(cmsSeoRecords);
}

export function getCmsSeoRecord(key: CmsSeoKey) {
  return cmsSeoRecords[key];
}

export function getCmsMetadata(key: CmsSeoKey): Metadata {
  const record = getCmsSeoRecord(key);
  return {
    title: record.title,
    description: record.description,
  };
}

export function validateCmsSeoRecords(records: CmsSeoRecord[] = getCmsSeoRecords()) {
  const invalidRecords = records.filter((record) => !record.key || !record.route || !record.title || !record.description);
  const duplicateKeys = records
    .map((record) => record.key)
    .filter((key, index, allKeys) => allKeys.indexOf(key) !== index);
  const duplicateRoutes = records
    .map((record) => record.route)
    .filter((route, index, allRoutes) => allRoutes.indexOf(route) !== index);
  const blockedClaimRecords = records.filter((record) => !validateCmsContent(record).ok);

  return {
    ok:
      invalidRecords.length === 0 &&
      duplicateKeys.length === 0 &&
      duplicateRoutes.length === 0 &&
      blockedClaimRecords.length === 0,
    invalidRecords,
    duplicateKeys,
    duplicateRoutes,
    blockedClaimRecords,
  };
}
