import type { Metadata } from "next";
import { validateCmsContent } from "@/lib/cms/content";
import { buildPageMetadata } from "@/lib/seo/site-metadata";

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
    title: "IT Supplier in Pasig",
    description:
      "HACIEN is an IT supplier in Ortigas, Pasig for computers, networks, servers, CCTV, UPS, and licensed software. Quotations for Philippine businesses and government agencies. Excludes products that need an FDA or DOH-LTO license.",
  },
  about: {
    key: "about",
    route: "/about",
    title: "About",
    description:
      "HACIEN Information Technology Solutions in Ortigas Center, Pasig City: what the company supplies, how quotations work, and which registration papers are available on private request.",
  },
  solutions: {
    key: "solutions",
    route: "/solutions",
    title: "IT Solutions and Systems Integration Philippines",
    description:
      "IT integration and supply in the Philippines: site survey, bill of quantities, installation, and quotation-ready infrastructure, network, security, and software work.",
  },
  industries: {
    key: "industries",
    route: "/industries",
    title: "Government, Schools, and Business IT",
    description:
      "How a PhilGEPS IT supplier in Pasig supports government agencies, schools, private offices, healthcare operations, and contractors. Requirements differ by buyer.",
  },
  faq: {
    key: "faq",
    route: "/faq",
    title: "IT Procurement Questions",
    description:
      "Answers on RFQs, computer and network specifications, UPS sizing, CCTV requests, PhilGEPS buyers, payment terms, and how to track a HACIEN quotation.",
  },
  help: {
    key: "help",
    route: "/help",
    title: "Help Center",
    description: "Prepare an IT quotation request: what to attach, what the website will not confirm, and where to track a reference.",
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
  return buildPageMetadata({
    title: record.title,
    description: record.description,
    path: record.route,
  });
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
