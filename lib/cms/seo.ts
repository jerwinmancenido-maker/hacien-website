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
    title: "What we supply",
    description:
      "IT & Office Technology. Tools, Hardware Materials & General Merchandise (excluding products requiring special regulatory licenses such as FDA or DOH-LTO).",
  },
  about: {
    key: "about",
    route: "/about",
    title: "About",
    description:
      "Founded in 2026 (DTI registered June 2026) in Ortigas Center, Pasig City to provide fast, quotation-driven, BIR-registered and PhilGEPS-registered multi-category procurement for Philippine businesses and government agencies.",
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
      "Explore how HACIEN supports government, corporate & commercial, education, healthcare, and construction buyers with RFQ-first procurement.",
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
