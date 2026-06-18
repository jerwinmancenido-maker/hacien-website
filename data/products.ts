export type ProductCategory = {
  slug: string;
  name: string;
  summary: string;
  accent: string;
};

export type Product = {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  specs: string[];
  procurementNotes: string;
  estimatedPrice: number;
  unit: string;
  availability: "For quotation" | "Fast moving" | "Project order";
  featured?: boolean;
};

export const categories: ProductCategory[] = [
  { slug: "computers-laptops", name: "Computers & Laptops", summary: "Business desktops, notebooks, workstations, and endpoint packages.", accent: "#1457d9" },
  { slug: "servers-storage", name: "Servers & Storage", summary: "Entry to midrange servers, NAS, backup, and storage expansion.", accent: "#0f766e" },
  { slug: "network-equipment", name: "Network Equipment", summary: "Switching, routing, access points, firewalls, and structured connectivity.", accent: "#5b4bff" },
  { slug: "printers-peripherals", name: "Printers & Peripherals", summary: "Printers, scanners, monitors, UPS, and office IT devices.", accent: "#b45309" },
  { slug: "licensed-software", name: "Licensed Software", summary: "Productivity, endpoint security, operating systems, and business apps.", accent: "#2563eb" },
  { slug: "security-surveillance", name: "Security & Surveillance", summary: "CCTV, access control, monitoring, and security infrastructure.", accent: "#be123c" },
  { slug: "accessories-consumables", name: "Accessories & Consumables", summary: "Cables, printer supplies, storage media, and deployment essentials.", accent: "#475569" },
];

export const products: Product[] = [
  {
    id: "HAC-LTP-001",
    slug: "business-laptop-i5-16gb",
    categorySlug: "computers-laptops",
    name: "Business Laptop Package - Core i5 / 16GB",
    shortDescription: "Reliable productivity laptop package for office, field, and government users.",
    specs: ["Intel Core i5 class processor", "16GB memory", "512GB SSD", "Windows-ready deployment"],
    procurementNotes: "Brand and exact model subject to availability and approved equivalent specifications.",
    estimatedPrice: 48500,
    unit: "unit",
    availability: "For quotation",
    featured: true,
  },
  {
    id: "HAC-DESK-002",
    slug: "office-desktop-monitor-bundle",
    categorySlug: "computers-laptops",
    name: "Office Desktop & Monitor Bundle",
    shortDescription: "Desktop endpoint bundle for administrative, finance, and operations teams.",
    specs: ["Business desktop", "23.8 inch monitor", "Keyboard and mouse", "Optional UPS bundle"],
    procurementNotes: "Can be matched to approved specifications for RFQ and bidding documents.",
    estimatedPrice: 36500,
    unit: "set",
    availability: "Fast moving",
  },
  {
    id: "HAC-SRV-001",
    slug: "entry-server-storage-kit",
    categorySlug: "servers-storage",
    name: "Entry Server & Storage Kit",
    shortDescription: "Server platform for small business workloads, files, and application hosting.",
    specs: ["Tower or rack server option", "ECC memory option", "RAID-ready storage", "Warranty options"],
    procurementNotes: "Sizing requires workload, user count, retention, and redundancy requirements.",
    estimatedPrice: 185000,
    unit: "project",
    availability: "Project order",
    featured: true,
  },
  {
    id: "HAC-NET-001",
    slug: "managed-switch-24-port",
    categorySlug: "network-equipment",
    name: "24-Port Managed Switch",
    shortDescription: "Managed switching for structured network upgrades and branch deployments.",
    specs: ["24 Gigabit ports", "VLAN support", "Rackmount-ready", "Optional PoE variant"],
    procurementNotes: "PoE budget, uplink, and management requirements are confirmed before quotation.",
    estimatedPrice: 28500,
    unit: "unit",
    availability: "For quotation",
    featured: true,
  },
  {
    id: "HAC-NET-002",
    slug: "wifi-access-point-kit",
    categorySlug: "network-equipment",
    name: "Business WiFi Access Point Kit",
    shortDescription: "Wireless coverage package for offices, classrooms, and small facilities.",
    specs: ["WiFi 6 class option", "Ceiling/wall mount", "Controller-ready", "Survey support available"],
    procurementNotes: "Final access point count depends on floor area, wall density, and user load.",
    estimatedPrice: 14500,
    unit: "unit",
    availability: "Fast moving",
  },
  {
    id: "HAC-PRN-001",
    slug: "workgroup-printer-package",
    categorySlug: "printers-peripherals",
    name: "Workgroup Printer Package",
    shortDescription: "Shared printing package for departments and admin offices.",
    specs: ["Laser or ink tank options", "Network-ready", "Duplex options", "Consumables planning"],
    procurementNotes: "Monthly print volume and consumable availability should be verified.",
    estimatedPrice: 22500,
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-SW-001",
    slug: "productivity-license-package",
    categorySlug: "licensed-software",
    name: "Productivity License Package",
    shortDescription: "Licensed productivity suite sourcing for business and government users.",
    specs: ["User-based licensing", "Annual or monthly options", "Admin setup guidance", "Renewal tracking"],
    procurementNotes: "Licensing terms depend on vendor program, user count, and organization type.",
    estimatedPrice: 7200,
    unit: "user/year",
    availability: "For quotation",
  },
  {
    id: "HAC-SEC-001",
    slug: "cctv-starter-system",
    categorySlug: "security-surveillance",
    name: "CCTV Starter System",
    shortDescription: "Camera, recording, and storage package for small sites and offices.",
    specs: ["4 to 8 camera packages", "NVR/DVR options", "Storage sizing", "Installation support"],
    procurementNotes: "Site layout, cable routing, and retention days determine final bill of materials.",
    estimatedPrice: 65000,
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
    estimatedPrice: 8500,
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
