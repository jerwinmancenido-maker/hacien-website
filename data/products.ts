export type ProductCategory = {
  slug: string;
  name: string;
  summary: string;
  heroCopy: string;
  accent: string;
  seoTitle: string;
  seoDescription: string;
};

export type Product = {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  specs: string[];
  procurementNotes: string;
  unit: string;
  availability: "For quotation";
  featured?: boolean;
};

export const categories: ProductCategory[] = [
  {
    slug: "computers-laptops",
    name: "Computers & Laptops",
    summary: "Business desktops, notebooks, workstations, and endpoint packages.",
    heroCopy: "Prepare an RFQ for business-grade computers and laptops for office, field, and institutional deployments.",
    accent: "#1457d9",
    seoTitle: "Computers & Laptops | HACIEN Technology",
    seoDescription: "HACIEN reviews RFQ requests for business desktops, notebooks, and workstations for Philippine organizations.",
  },
  {
    slug: "servers-storage",
    name: "Servers & Storage",
    summary: "Entry to midrange servers, NAS, backup, and storage expansion.",
    heroCopy: "Review server and NAS storage requirements for workload, budget, and quotation context.",
    accent: "#0f766e",
    seoTitle: "Servers & Storage | HACIEN Technology",
    seoDescription: "HACIEN reviews RFQ requests for servers, NAS appliances, and backup storage for Philippine organizations.",
  },
  {
    slug: "network-equipment",
    name: "Network Equipment",
    summary: "Switching, routing, access points, firewalls, and structured connectivity.",
    heroCopy: "Network infrastructure RFQ review, from access layer switches to firewall appliances.",
    accent: "#5b4bff",
    seoTitle: "Network Equipment | HACIEN Technology",
    seoDescription: "HACIEN reviews RFQ requests for managed switches, wireless access points, firewalls, and network infrastructure.",
  },
  {
    slug: "printers-peripherals",
    name: "Printers & Peripherals",
    summary: "Printers, scanners, monitors, UPS, and office IT devices.",
    heroCopy: "Office peripherals and printing solutions sourced for business and institutional buyers.",
    accent: "#b45309",
    seoTitle: "Printers & Peripherals | HACIEN Technology",
    seoDescription: "HACIEN reviews RFQ requests for printers, scanners, monitors, UPS units, and office peripherals.",
  },
  {
    slug: "licensed-software",
    name: "Licensed Software",
    summary: "Productivity, endpoint security, operating systems, and business apps.",
    heroCopy: "Software licensing requests reviewed against vendor channel and organization requirements.",
    accent: "#2563eb",
    seoTitle: "Licensed Software | HACIEN Technology",
    seoDescription: "HACIEN reviews RFQ requests for productivity software, endpoint security, and operating system licenses.",
  },
  {
    slug: "security-surveillance",
    name: "Security & Surveillance",
    summary: "CCTV, access control, monitoring, and security infrastructure.",
    heroCopy: "Site security technology RFQ review: cameras, access control, and monitoring systems.",
    accent: "#be123c",
    seoTitle: "Security & Surveillance | HACIEN Technology",
    seoDescription: "HACIEN reviews RFQ requests for CCTV systems, access control, NVR/DVR equipment, and site security technology.",
  },
  {
    slug: "accessories-consumables",
    name: "Accessories & Consumables",
    summary: "Cables, printer supplies, storage media, and deployment essentials.",
    heroCopy: "Deployment accessories and consumables reviewed alongside the primary IT requirement.",
    accent: "#475569",
    seoTitle: "Accessories & Consumables | HACIEN Technology",
    seoDescription: "HACIEN reviews RFQ requests for cables, printer supplies, storage media, and deployment accessories.",
  },
  {
    slug: "power-ups",
    name: "Power & UPS",
    summary: "UPS units, voltage regulators, PDUs, and power protection equipment.",
    heroCopy: "Power protection and UPS requirements reviewed for offices, server rooms, and critical equipment.",
    accent: "#ca8a04",
    seoTitle: "Power & UPS | HACIEN Technology",
    seoDescription: "HACIEN reviews RFQ requests for UPS units, voltage regulators, and power distribution equipment.",
  },
  {
    slug: "general-merchandise",
    name: "General Merchandise",
    summary: "Non-IT goods, office supplies, and general items for institutional procurement packages.",
    heroCopy: "General merchandise RFQ review for organizations with mixed IT and non-IT requirements.",
    accent: "#64748b",
    seoTitle: "General Merchandise | HACIEN Technology",
    seoDescription: "HACIEN reviews RFQ requests for general merchandise and office supplies with mixed procurement requirements.",
  },
];

export const products: Product[] = [
  {
    id: "HAC-LTP-001",
    slug: "business-laptop-i5-16gb",
    categorySlug: "computers-laptops",
    name: "Business Laptop Class",
    shortDescription: "Business notebook sourcing for office, field, and government end-user computing requirements.",
    specs: ["Intel Core i5 class processor", "16GB memory target", "512GB SSD target", "Windows-ready deployment"],
    procurementNotes: "Brand and exact model subject to availability and approved equivalent specifications.",
    unit: "unit",
    availability: "For quotation",
    featured: true,
  },
  {
    id: "HAC-DESK-002",
    slug: "office-desktop-monitor-bundle",
    categorySlug: "computers-laptops",
    name: "Business Desktop and Monitor Bundle",
    shortDescription: "Business desktop and monitor package for administrative, finance, and operations teams.",
    specs: ["Business desktop class", "23.8 inch monitor target", "Keyboard and mouse", "Optional UPS bundle"],
    procurementNotes: "Can be matched to approved specifications for RFQ and bidding documents.",
    unit: "set",
    availability: "For quotation",
  },
  {
    id: "HAC-SRV-001",
    slug: "entry-server-storage-kit",
    categorySlug: "servers-storage",
    name: "NAS / Entry Server Storage Kit",
    shortDescription: "Server and NAS sourcing for file services, backup, and small application workloads.",
    specs: ["Tower, rack, or NAS option", "ECC memory option where applicable", "RAID-ready storage", "Warranty options"],
    procurementNotes: "Sizing requires workload, user count, retention, and redundancy requirements.",
    unit: "project",
    availability: "For quotation",
    featured: true,
  },
  {
    id: "HAC-NET-001",
    slug: "managed-switch-24-port",
    categorySlug: "network-equipment",
    name: "24-Port Managed Switch Class",
    shortDescription: "Managed switching options for structured network upgrades and branch deployments.",
    specs: ["24 Gigabit ports target", "VLAN support", "Rackmount-ready", "Optional PoE variant"],
    procurementNotes: "PoE budget, uplink, and management requirements are confirmed before quotation.",
    unit: "unit",
    availability: "For quotation",
    featured: true,
  },
  {
    id: "HAC-NET-002",
    slug: "wifi-access-point-kit",
    categorySlug: "network-equipment",
    name: "Business WiFi Access Point Kit",
    shortDescription: "Wireless access point sourcing for offices, classrooms, and small facilities.",
    specs: ["WiFi 6 class option", "Ceiling/wall mount", "Controller-ready", "Survey support available"],
    procurementNotes: "Final access point count depends on floor area, wall density, and user load.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-PRN-001",
    slug: "workgroup-printer-package",
    categorySlug: "printers-peripherals",
    name: "Workgroup Printer / Scanner Package",
    shortDescription: "Shared printer and scanning package for departments and admin offices.",
    specs: ["Laser or ink tank options", "Network-ready", "Duplex options", "Consumables planning"],
    procurementNotes: "Monthly print volume and consumable availability should be verified.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-SW-001",
    slug: "productivity-license-package",
    categorySlug: "licensed-software",
    name: "Productivity License Package",
    shortDescription: "Productivity and collaboration license sourcing for business and government users.",
    specs: ["User-based licensing", "Annual or monthly options", "Admin setup guidance", "Renewal tracking"],
    procurementNotes: "Licensing terms depend on vendor program, user count, and organization type.",
    unit: "user/year",
    availability: "For quotation",
  },
  {
    id: "HAC-SEC-001",
    slug: "cctv-starter-system",
    categorySlug: "security-surveillance",
    name: "Firewall / CCTV Security Package",
    shortDescription: "Firewall, camera, recording, and storage package planning for small sites and offices.",
    specs: ["4 to 8 camera packages", "NVR/DVR options", "Storage sizing", "Installation support"],
    procurementNotes: "Site layout, cable routing, and retention days determine final bill of materials.",
    unit: "project",
    availability: "For quotation",
  },
  {
    id: "HAC-ACC-001",
    slug: "deployment-accessory-kit",
    categorySlug: "accessories-consumables",
    name: "Deployment Accessory Kit",
    shortDescription: "Cables, adapters, labels, and consumables for IT rollout projects.",
    specs: ["Network patch cords", "Adapters", "Labels and cable ties", "Printer and storage consumables"],
    procurementNotes: "May be bundled with endpoint, network, or site deployment requests after review.",
    unit: "lot",
    availability: "For quotation",
  },
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}
