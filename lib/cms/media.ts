export type CmsMediaKey =
  | "dataCenter"
  | "silicon"
  | "office"
  | "workstation"
  | "network"
  | "commandCenter"
  | "cybersecurity"
  | "cloud"
  | "cabling"
  | "storage"
  | "documentation"
  | "knowledge"
  | "strategy"
  | "workspace";

export type CmsMediaRecord = {
  key: CmsMediaKey;
  source: string;
  alt: string;
  sourceUrl: string;
  sourceNote: string;
  usage: string;
};

const sourcePhotos = {
  serverRack: {
    source:
      "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
    sourceUrl: "https://unsplash.com/photos/2JJ3wBHu4_0",
    sourceNote: "Kevin Ache, Unsplash",
  },
  officeDesk: {
    source:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
    sourceUrl: "https://unsplash.com/photos/VWcPlbHglYc",
    sourceNote: "Alesia Kazantceva, Unsplash",
  },
  workstation: {
    source:
      "https://images.unsplash.com/photo-1722159475028-d38e511f7853?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
    sourceUrl: "https://unsplash.com/photos/GLhDVcndCLg",
    sourceNote: "Huy Phan, Unsplash",
  },
  modernOffice: {
    source:
      "https://images.unsplash.com/photo-1746021535490-cd4d7fe7ab2a?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
    sourceUrl: "https://unsplash.com/photos/K9DZz7B8sCU",
    sourceNote: "Deliberate Directions, Unsplash",
  },
  documents: {
    source:
      "https://images.unsplash.com/photo-1706508156658-f246b0c8753c?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800",
    sourceUrl: "https://unsplash.com/photos/xzmuvPQt6KM",
    sourceNote: "Jakub Zerdzicki, Unsplash",
  },
} as const;

export const cmsMediaRecords: Record<CmsMediaKey, CmsMediaRecord> = {
  dataCenter: {
    key: "dataCenter",
    ...sourcePhotos.serverRack,
    alt: "Server rack environment used as abstract infrastructure imagery.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  silicon: {
    key: "silicon",
    ...sourcePhotos.officeDesk,
    alt: "Office workspace used as abstract technology planning imagery.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  office: {
    key: "office",
    ...sourcePhotos.modernOffice,
    alt: "Modern office environment used for business technology context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  workstation: {
    key: "workstation",
    ...sourcePhotos.workstation,
    alt: "Workstation environment used for workplace technology context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  network: {
    key: "network",
    ...sourcePhotos.modernOffice,
    alt: "Office environment used for network and operations context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  commandCenter: {
    key: "commandCenter",
    ...sourcePhotos.modernOffice,
    alt: "Business technology environment used for command-center style website visuals.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  cybersecurity: {
    key: "cybersecurity",
    ...sourcePhotos.officeDesk,
    alt: "Workspace imagery used for cybersecurity and review context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  cloud: {
    key: "cloud",
    ...sourcePhotos.officeDesk,
    alt: "Workspace imagery used for cloud and productivity context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  cabling: {
    key: "cabling",
    ...sourcePhotos.documents,
    alt: "Document review imagery used for project scope and implementation context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  storage: {
    key: "storage",
    ...sourcePhotos.serverRack,
    alt: "Server rack environment used for storage and infrastructure context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  documentation: {
    key: "documentation",
    ...sourcePhotos.documents,
    alt: "Documents used for RFQ preparation and review context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  knowledge: {
    key: "knowledge",
    ...sourcePhotos.officeDesk,
    alt: "Workspace imagery used for help and knowledge center context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  strategy: {
    key: "strategy",
    ...sourcePhotos.modernOffice,
    alt: "Office environment used for planning and industry context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
  workspace: {
    key: "workspace",
    ...sourcePhotos.officeDesk,
    alt: "Workspace imagery used for company and request preparation context.",
    usage: "Environmental website imagery only; not product, stock, warranty, or delivery evidence.",
  },
};

export function getCmsMediaRecords() {
  return Object.values(cmsMediaRecords);
}

export function getCmsMediaRecord(key: CmsMediaKey) {
  return cmsMediaRecords[key];
}

export function getCmsMediaSourceMap() {
  return Object.fromEntries(getCmsMediaRecords().map((record) => [record.key, record.source])) as Record<
    CmsMediaKey,
    string
  >;
}

export function validateCmsMediaRecords(records: CmsMediaRecord[] = getCmsMediaRecords()) {
  const invalidRecords = records.filter(
    (record) =>
      !record.key ||
      !record.source ||
      !record.alt ||
      !record.sourceUrl ||
      !record.sourceNote ||
      !record.usage,
  );
  const duplicateKeys = records
    .map((record) => record.key)
    .filter((key, index, allKeys) => allKeys.indexOf(key) !== index);

  return {
    ok: invalidRecords.length === 0 && duplicateKeys.length === 0,
    invalidRecords,
    duplicateKeys,
  };
}
