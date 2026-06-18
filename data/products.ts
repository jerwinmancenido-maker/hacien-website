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
  availability: "For quotation" | "Fast moving" | "Project order";
  featured?: boolean;
};

export const categories: ProductCategory[] = [
  {
    slug: "computers-laptops",
    name: "Computers & Laptops",
    summary: "Business desktops, notebooks, workstations, and endpoint packages.",
    heroCopy: "Source business-grade computers and laptops for office, field, and institutional deployments.",
    accent: "#1457d9",
    seoTitle: "Computers & Laptops | HACIEN Products",
    seoDescription: "HACIEN sources business desktops, notebooks, and workstations for Philippine organizations. RFQ-ready procurement with approved equivalent matching.",
  },
  {
    slug: "servers-storage",
    name: "Servers & Storage",
    summary: "Entry to midrange servers, NAS, backup, and storage expansion.",
    heroCopy: "Right-sized server and NAS storage procurement for your workload and budget.",
    accent: "#0f766e",
    seoTitle: "Servers & Storage | HACIEN Products",
    seoDescription: "HACIEN sources servers, NAS appliances, and backup storage for Philippine organizations. Workload sizing and warranty planning included.",
  },
  {
    slug: "network-equipment",
    name: "Network Equipment",
    summary: "Switching, routing, access points, firewalls, and structured connectivity.",
    heroCopy: "Network infrastructure procurement — from access layer switches to firewall appliances.",
    accent: "#5b4bff",
    seoTitle: "Network Equipment | HACIEN Products",
    seoDescription: "HACIEN sources managed switches, wireless access points, firewalls, and network infrastructure for Philippine organizations.",
  },
  {
    slug: "printers-peripherals",
    name: "Printers & Peripherals",
    summary: "Printers, scanners, monitors, UPS, and office IT devices.",
    heroCopy: "Office peripherals and printing solutions sourced for business and institutional buyers.",
    accent: "#b45309",
    seoTitle: "Printers & Peripherals | HACIEN Products",
    seoDescription: "HACIEN sources printers, scanners, monitors, UPS units, and office peripherals for Philippine organizations.",
  },
  {
    slug: "licensed-software",
    name: "Licensed Software",
    summary: "Productivity, endpoint security, operating systems, and business apps.",
    heroCopy: "Software licensing sourced through appropriate vendor channels for your organization.",
    accent: "#2563eb",
    seoTitle: "Licensed Software | HACIEN Products",
    seoDescription: "HACIEN sources productivity software, endpoint security, and operating system licenses for Philippine organizations.",
  },
  {
    slug: "security-surveillance",
    name: "Security & Surveillance",
    summary: "CCTV, access control, monitoring, and security infrastructure.",
    heroCopy: "Site security technology procurement — cameras, access control, and monitoring systems.",
    accent: "#be123c",
    seoTitle: "Security & Surveillance | HACIEN Products",
    seoDescription: "HACIEN sources CCTV systems, access control, NVR/DVR equipment, and site security technology for Philippine organizations.",
  },
  {
    slug: "accessories-consumables",
    name: "Accessories & Consumables",
    summary: "Cables, printer supplies, storage media, and deployment essentials.",
    heroCopy: "Deployment accessories and consumables — everything needed alongside your primary IT equipment.",
    accent: "#475569",
    seoTitle: "Accessories & Consumables | HACIEN Products",
    seoDescription: "HACIEN sources cables, printer supplies, storage media, and deployment accessories for Philippine organizations.",
  },
  {
    slug: "power-ups",
    name: "Power & UPS",
    summary: "UPS units, voltage regulators, PDUs, and power protection equipment.",
    heroCopy: "Power protection and UPS sourcing for offices, server rooms, and critical equipment.",
    accent: "#ca8a04",
    seoTitle: "Power & UPS | HACIEN Products",
    seoDescription: "HACIEN sources UPS units, voltage regulators, and power distribution equipment for Philippine organizations.",
  },
  {
    slug: "general-merchandise",
    name: "General Merchandise",
    summary: "Non-IT goods, office supplies, and general items for institutional procurement packages.",
    heroCopy: "General merchandise procurement for organizations with mixed IT and non-IT requirements.",
    accent: "#64748b",
    seoTitle: "General Merchandise | HACIEN Products",
    seoDescription: "HACIEN sources general merchandise and office supplies for Philippine organizations with mixed procurement requirements.",
  },
];

export const products: Product[] = [
  {
    id: "HAC-LTP-001",
    slug: "business-laptop-i5-16gb",
    categorySlug: "computers-laptops",
    name: "Dell Latitude Business Laptop Class",
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
    name: "HP ProDesk / Business Desktop Bundle",
    shortDescription: "Business desktop and monitor package for administrative, finance, and operations teams.",
    specs: ["Business desktop class", "23.8 inch monitor target", "Keyboard and mouse", "Optional UPS bundle"],
    procurementNotes: "Can be matched to approved specifications for RFQ and bidding documents.",
    unit: "set",
    availability: "Fast moving",
  },
  {
    id: "HAC-SRV-001",
    slug: "entry-server-storage-kit",
    categorySlug: "servers-storage",
    name: "Synology NAS / Entry Server Storage Kit",
    shortDescription: "Server and NAS sourcing for file services, backup, and small application workloads.",
    specs: ["Tower, rack, or NAS option", "ECC memory option where applicable", "RAID-ready storage", "Warranty options"],
    procurementNotes: "Sizing requires workload, user count, retention, and redundancy requirements.",
    unit: "project",
    availability: "Project order",
    featured: true,
  },
  {
    id: "HAC-NET-001",
    slug: "managed-switch-24-port",
    categorySlug: "network-equipment",
    name: "Cisco-Class 24-Port Managed Switch",
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
    availability: "Fast moving",
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
    name: "Microsoft 365 License Package",
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
    name: "Fortinet Firewall / CCTV Security Package",
    shortDescription: "Firewall, camera, recording, and storage package planning for small sites and offices.",
    specs: ["4 to 8 camera packages", "NVR/DVR options", "Storage sizing", "Installation support"],
    procurementNotes: "Site layout, cable routing, and retention days determine final bill of materials.",
    unit: "project",
    availability: "Project order",
  },
  {
    id: "HAC-ACC-001",
    slug: "deployment-accessory-kit",
    categorySlug: "accessories-consumables",
    name: "Deployment Accessory Kit",
    shortDescription: "Cables, adapters, labels, and consumables for IT rollout projects.",
    specs: ["Network patch cords", "Adapters", "Labels and cable ties", "Printer and storage consumables"],
    procurementNotes: "Usually bundled with endpoint, network, or site deployment projects.",
    unit: "lot",
    availability: "Fast moving",
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
