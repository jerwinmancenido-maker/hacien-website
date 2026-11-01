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
  dataCenter: {
    source: "/images/data-center.jpg",
    sourceUrl: "https://www.pexels.com/photo/server-racks-on-data-center-5480781/",
    sourceNote: "Brett Sayles, Pexels",
  },
  storage: {
    source: "/images/storage.jpg",
    sourceUrl: "https://www.pexels.com/photo/cables-connected-on-server-2881229/",
    sourceNote: "Brett Sayles, Pexels",
  },
  network: {
    source: "/images/network.jpg",
    sourceUrl: "https://www.pexels.com/photo/patch-cables-plugged-in-patch-panel-4682187/",
    sourceNote: "Brett Sayles, Pexels",
  },
  cabling: {
    source: "/images/cabling.jpg",
    sourceUrl: "https://www.pexels.com/photo/electronics-engineer-fixing-cables-on-server-442150/",
    sourceNote: "Field Engineer, Pexels",
  },
  commandCenter: {
    source: "/images/command-center.jpg",
    sourceUrl: "https://www.pexels.com/photo/it-technician-working-in-data-center-server-room-37605911/",
    sourceNote: "panumas nikhomkhai, Pexels",
  },
  cybersecurity: {
    source: "/images/cybersecurity.jpg",
    sourceUrl: "https://www.pexels.com/photo/surveillance-camera-mounted-on-the-wall-10902545/",
    sourceNote: "Possessed Photography, Pexels",
  },
  modernOffice: {
    source: "/images/modern-office.jpg",
    sourceUrl: "https://www.pexels.com/photo/empty-modern-interior-of-an-office-12526862/",
    sourceNote: "Bohdan K., Pexels",
  },
  workspace: {
    source: "/images/workspace.jpg",
    sourceUrl: "https://www.pexels.com/photo/black-laptop-computer-beside-white-steno-notebook-2034373/",
    sourceNote: "Romka, Pexels",
  },
  documentation: {
    source: "/images/documentation.jpg",
    sourceUrl: "https://www.pexels.com/photo/close-up-of-a-person-signing-a-document-7821913/",
    sourceNote: "RDNE Stock project, Pexels",
  },
  workstation: {
    source: "/images/workstation.jpg",
    sourceUrl: "https://www.pexels.com/photo/a-macbook-pro-laptop-on-white-table-8004044/",
    sourceNote: "Darina Belonogova, Pexels",
  },
} as const;

const usageNote =
  "Environmental website imagery only; not product, stock, warranty, or delivery evidence.";

export const cmsMediaRecords: Record<CmsMediaKey, CmsMediaRecord> = {
  dataCenter: {
    key: "dataCenter",
    ...sourcePhotos.dataCenter,
    alt: "Server racks in a data center aisle with blue lighting.",
    usage: usageNote,
  },
  silicon: {
    key: "silicon",
    ...sourcePhotos.workspace,
    alt: "Laptop beside a notebook and pencil on a dark desk.",
    usage: usageNote,
  },
  office: {
    key: "office",
    ...sourcePhotos.modernOffice,
    alt: "Empty modern open-plan office with desks and chairs.",
    usage: usageNote,
  },
  workstation: {
    key: "workstation",
    ...sourcePhotos.workstation,
    alt: "Open laptop keyboard and trackpad on a white desk.",
    usage: usageNote,
  },
  network: {
    key: "network",
    ...sourcePhotos.network,
    alt: "Colored patch cables plugged into a network patch panel.",
    usage: usageNote,
  },
  commandCenter: {
    key: "commandCenter",
    ...sourcePhotos.commandCenter,
    alt: "Technician working at a laptop among server racks.",
    usage: usageNote,
  },
  cybersecurity: {
    key: "cybersecurity",
    ...sourcePhotos.cybersecurity,
    alt: "Surveillance camera mounted on an exterior wall.",
    usage: usageNote,
  },
  cloud: {
    key: "cloud",
    ...sourcePhotos.workspace,
    alt: "Laptop beside a notebook and pencil on a dark desk.",
    usage: usageNote,
  },
  cabling: {
    key: "cabling",
    ...sourcePhotos.cabling,
    alt: "Person arranging network cables in a server rack.",
    usage: usageNote,
  },
  storage: {
    key: "storage",
    ...sourcePhotos.storage,
    alt: "Network cables connected to ports on server equipment.",
    usage: usageNote,
  },
  documentation: {
    key: "documentation",
    ...sourcePhotos.documentation,
    alt: "Close-up of a hand signing a printed document.",
    usage: usageNote,
  },
  knowledge: {
    key: "knowledge",
    ...sourcePhotos.workspace,
    alt: "Laptop beside a notebook and pencil on a dark desk.",
    usage: usageNote,
  },
  strategy: {
    key: "strategy",
    ...sourcePhotos.modernOffice,
    alt: "Empty modern open-plan office with desks and chairs.",
    usage: usageNote,
  },
  workspace: {
    key: "workspace",
    ...sourcePhotos.workspace,
    alt: "Laptop beside a notebook and pencil on a dark desk.",
    usage: usageNote,
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
