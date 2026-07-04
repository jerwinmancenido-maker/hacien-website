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
  longDescription: string;
  specs: string[];
  technicalSpecs: {
    label: string;
    value: string;
  }[];
  procurementNotes: string;
  unit: string;
  availability: "For quotation";
  featured?: boolean;
  purchaseMode: "rfq" | "checkout" | "hybrid";
  priceCents?: number;
  currency: "PHP";
  fulfillmentType: "manual" | "digital" | "license" | "shipment" | "service";
  inventoryPolicy: "not_tracked" | "track_stock" | "preorder" | "rfq_required";
};

type RawProduct = Omit<
  Product,
  "purchaseMode" | "priceCents" | "currency" | "fulfillmentType" | "inventoryPolicy"
>;

const ecommerceDefaults: Pick<
  Product,
  "purchaseMode" | "currency" | "fulfillmentType" | "inventoryPolicy"
> = {
  purchaseMode: "rfq",
  currency: "PHP",
  fulfillmentType: "manual",
  inventoryPolicy: "rfq_required",
};

const normalizeProduct = (product: RawProduct): Product => ({
  ...product,
  ...ecommerceDefaults,
});

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

const rawProducts: RawProduct[] = [
  {
    id: "HAC-LTP-001",
    slug: "business-laptop-i5-16gb",
    categorySlug: "computers-laptops",
    name: "Business Laptop Class",
    shortDescription: "Business notebook sourcing for office, field, and government end-user computing requirements.",
    longDescription:
      "A business notebook requirement profile for teams that need reliable office, field, or institutional computing without locking the RFQ to a single brand before availability is reviewed.",
    specs: ["Intel Core i5 class processor", "16GB memory target", "512GB SSD target", "Windows-ready deployment"],
    technicalSpecs: [
      { label: "Processor class", value: "Intel Core i5 / Ryzen 5 class or approved equivalent" },
      { label: "Memory target", value: "16GB RAM baseline" },
      { label: "Storage target", value: "512GB SSD baseline" },
      { label: "Deployment context", value: "Windows-ready office, field, or institution endpoint" },
    ],
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
    longDescription:
      "A desktop-and-display package for office users who need standardized endpoint sourcing, predictable accessories, and optional power protection in one RFQ line.",
    specs: ["Business desktop class", "23.8 inch monitor target", "Keyboard and mouse", "Optional UPS bundle"],
    technicalSpecs: [
      { label: "Desktop class", value: "Business desktop or small-form-factor equivalent" },
      { label: "Display target", value: "23.8 inch monitor class" },
      { label: "Included peripherals", value: "Keyboard and mouse baseline" },
      { label: "Optional bundle", value: "UPS or AVR can be quoted with the endpoint set" },
    ],
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
    longDescription:
      "A server or NAS requirement profile for small workloads, file services, backup repositories, and storage expansion where sizing must be matched to users, retention, and redundancy.",
    specs: ["Tower, rack, or NAS option", "ECC memory option where applicable", "RAID-ready storage", "Warranty options"],
    technicalSpecs: [
      { label: "Form factor", value: "Tower, rack, or NAS appliance option" },
      { label: "Memory option", value: "ECC memory where workload and platform support it" },
      { label: "Storage design", value: "RAID-ready drive configuration" },
      { label: "Support path", value: "Warranty options reviewed before quotation" },
    ],
    procurementNotes: "Sizing requires workload, user count, retention, and redundancy requirements.",
    unit: "project",
    availability: "For quotation",
    featured: true,
  },
  {
    id: "HAC-SRV-002",
    slug: "hpe-proliant-class-rack-server-options",
    categorySlug: "servers-storage",
    name: "HPE ProLiant-class Rack Server Options",
    shortDescription: "Rack server sourcing for virtualization, local applications, file services, and branch workloads.",
    longDescription:
      "A rack server requirement profile for organizations that need a physical compute node sized around processor class, memory, storage redundancy, warranty coverage, and deployment environment.",
    specs: ["1U or 2U rack server class", "Xeon or EPYC class processor options", "RAID controller options", "On-site warranty options"],
    technicalSpecs: [
      { label: "Server class", value: "HPE ProLiant-class, Dell PowerEdge-class, Lenovo ThinkSystem-class, or equivalent" },
      { label: "Processor target", value: "Single or dual socket Xeon / EPYC class options" },
      { label: "Memory range", value: "32GB to 128GB+ depending on workload" },
      { label: "Storage and warranty", value: "RAID-ready storage with warranty terms confirmed by RFQ" },
    ],
    procurementNotes: "Final sizing depends on workload, virtualization plan, rack space, redundancy, and support requirements.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-SRV-003",
    slug: "synology-class-nas-backup-appliance",
    categorySlug: "servers-storage",
    name: "Synology-class NAS Backup Appliance",
    shortDescription: "NAS appliance sourcing for shared storage, backup targets, and small-office continuity planning.",
    longDescription:
      "A NAS backup appliance requirement profile for organizations planning shared storage, backup retention, user access, and drive expansion without committing to a final drive set before review.",
    specs: ["4-bay to 8-bay NAS class", "Drive capacity planning", "RAID and snapshot options", "Network backup use case"],
    technicalSpecs: [
      { label: "Appliance class", value: "Synology-class, QNAP-class, or approved equivalent NAS" },
      { label: "Bay count", value: "4-bay to 8-bay class options" },
      { label: "Storage planning", value: "Drive capacity, RAID level, and retention reviewed before quotation" },
      { label: "Network use", value: "Shared storage, backup target, or small-office continuity" },
    ],
    procurementNotes: "Drive class, usable capacity, retention days, and backup software expectations must be confirmed before quotation.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-NET-001",
    slug: "managed-switch-24-port",
    categorySlug: "network-equipment",
    name: "24-Port Managed Switch Class",
    shortDescription: "Managed switching options for structured network upgrades and branch deployments.",
    longDescription:
      "A managed switch requirement profile for branch, office, and structured network upgrades where VLAN support, PoE needs, uplinks, and rack conditions must be clarified.",
    specs: ["24 Gigabit ports target", "VLAN support", "Rackmount-ready", "Optional PoE variant"],
    technicalSpecs: [
      { label: "Port count", value: "24 Gigabit ports target" },
      { label: "Management", value: "Managed switch with VLAN support" },
      { label: "Mounting", value: "Rackmount-ready form factor" },
      { label: "Power option", value: "PoE variant can be reviewed when endpoints require it" },
    ],
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
    longDescription:
      "A wireless access point requirement profile for offices, classrooms, and small sites where coverage depends on layout, density, mounting, and controller expectations.",
    specs: ["WiFi 6 class option", "Ceiling/wall mount", "Controller-ready", "Survey support available"],
    technicalSpecs: [
      { label: "Wireless class", value: "WiFi 6 class option or approved equivalent" },
      { label: "Mounting", value: "Ceiling or wall mount depending on site" },
      { label: "Management", value: "Controller-ready or cloud-managed options" },
      { label: "Coverage input", value: "Floor area, wall density, and user load required for sizing" },
    ],
    procurementNotes: "Final access point count depends on floor area, wall density, and user load.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-NET-003",
    slug: "fortinet-class-firewall-options",
    categorySlug: "network-equipment",
    name: "Fortinet-class Firewall Options",
    shortDescription: "Firewall appliance sourcing for secure internet edge, VPN, and branch protection requirements.",
    longDescription:
      "A firewall requirement profile for organizations reviewing perimeter protection, VPN, routing, content security, and subscription coverage before formal quotation.",
    specs: ["Fortinet-class or equivalent firewall", "VPN support", "Security subscription options", "Throughput reviewed by site size"],
    technicalSpecs: [
      { label: "Appliance class", value: "Fortinet-class, Sophos-class, Cisco-class, or approved equivalent firewall" },
      { label: "Security use", value: "Internet edge, VPN, branch, or small data room protection" },
      { label: "Subscription review", value: "Threat, web, or support subscriptions quoted only when required" },
      { label: "Sizing basis", value: "User count, bandwidth, VPN users, and policy needs" },
    ],
    procurementNotes: "Firewall throughput, license term, support coverage, and deployment responsibility must be confirmed before quotation.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-PRN-001",
    slug: "workgroup-printer-package",
    categorySlug: "printers-peripherals",
    name: "Workgroup Printer / Scanner Package",
    shortDescription: "Shared printer and scanning package for departments and admin offices.",
    longDescription:
      "A shared print and scan requirement profile for teams that need output volume, network readiness, duplexing, and consumable availability reviewed together.",
    specs: ["Laser or ink tank options", "Network-ready", "Duplex options", "Consumables planning"],
    technicalSpecs: [
      { label: "Print technology", value: "Laser, ink tank, or approved equivalent option" },
      { label: "Connectivity", value: "Network-ready where shared use is required" },
      { label: "Duplex option", value: "Auto-duplex reviewed when document workflows require it" },
      { label: "Consumables", value: "Toner, ink, drum, and maintenance item availability reviewed" },
    ],
    procurementNotes: "Monthly print volume and consumable availability should be verified.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-PRN-002",
    slug: "epson-ecotank-class-mfp-options",
    categorySlug: "printers-peripherals",
    name: "Epson EcoTank-class MFP Options",
    shortDescription: "Multifunction printer sourcing for admin offices, schools, and departments with recurring print needs.",
    longDescription:
      "A multifunction printer requirement profile for buyers comparing ink tank, laser, scanner, and network-ready options around monthly volume and consumables planning.",
    specs: ["Print, scan, and copy functions", "Ink tank or laser class options", "A4 office document workflows", "Network model options"],
    technicalSpecs: [
      { label: "Device class", value: "Epson EcoTank-class, Canon MegaTank-class, Brother-class, or equivalent MFP" },
      { label: "Functions", value: "Print, scan, and copy baseline" },
      { label: "Paper size", value: "A4 office document workflows unless otherwise specified" },
      { label: "Connectivity", value: "USB, Ethernet, or WiFi options depending on model availability" },
    ],
    procurementNotes: "Monthly volume, color requirements, paper size, and consumable availability should be clarified before quotation.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-SW-001",
    slug: "productivity-license-package",
    categorySlug: "licensed-software",
    name: "Productivity License Package",
    shortDescription: "Productivity and collaboration license sourcing for business and government users.",
    longDescription:
      "A productivity license requirement profile for organizations reviewing user counts, license terms, admin setup, renewals, and channel availability before procurement.",
    specs: ["User-based licensing", "Annual or monthly options", "Admin setup guidance", "Renewal tracking"],
    technicalSpecs: [
      { label: "License model", value: "User-based licensing" },
      { label: "Term options", value: "Annual or monthly options depending on vendor program" },
      { label: "Administration", value: "Admin setup guidance can be included" },
      { label: "Renewal planning", value: "Renewal tracking and user count review" },
    ],
    procurementNotes: "Licensing terms depend on vendor program, user count, and organization type.",
    unit: "user/year",
    availability: "For quotation",
  },
  {
    id: "HAC-SW-002",
    slug: "endpoint-security-license-options",
    categorySlug: "licensed-software",
    name: "ESET-class Endpoint Security License Options",
    shortDescription: "Endpoint security license sourcing for desktops, laptops, and mixed user/device environments.",
    longDescription:
      "An endpoint security license requirement profile for organizations comparing device coverage, term length, admin console needs, and renewal timing before quotation.",
    specs: ["Endpoint protection license class", "Device or user coverage", "Annual term options", "Admin console options"],
    technicalSpecs: [
      { label: "Security class", value: "ESET-class, Bitdefender-class, Sophos-class, or approved equivalent endpoint security" },
      { label: "Coverage basis", value: "Device or user count depending on vendor program" },
      { label: "Term", value: "Annual or multi-year options where available" },
      { label: "Administration", value: "Cloud or local management console options reviewed before quotation" },
    ],
    procurementNotes: "Device count, renewal date, existing license status, and management console requirements must be confirmed.",
    unit: "device/year",
    availability: "For quotation",
  },
  {
    id: "HAC-SEC-001",
    slug: "cctv-starter-system",
    categorySlug: "security-surveillance",
    name: "Firewall / CCTV Security Package",
    shortDescription: "Firewall, camera, recording, and storage package planning for small sites and offices.",
    longDescription:
      "A site security requirement profile for small offices and facilities where camera count, recording retention, storage, and cable routing need to be reviewed before quotation.",
    specs: ["4 to 8 camera packages", "NVR/DVR options", "Storage sizing", "Installation support"],
    technicalSpecs: [
      { label: "Camera count", value: "4 to 8 camera package baseline" },
      { label: "Recorder", value: "NVR or DVR options depending on camera technology" },
      { label: "Storage", value: "Retention days and resolution drive storage sizing" },
      { label: "Site work", value: "Installation support and cable routing reviewed per location" },
    ],
    procurementNotes: "Site layout, cable routing, and retention days determine final bill of materials.",
    unit: "project",
    availability: "For quotation",
  },
  {
    id: "HAC-SEC-002",
    slug: "hikvision-class-ip-camera-nvr-package",
    categorySlug: "security-surveillance",
    name: "Hikvision-class IP Camera and NVR Package",
    shortDescription: "IP camera and NVR sourcing for facilities that need clearer retention, resolution, and monitoring context.",
    longDescription:
      "An IP surveillance requirement profile for sites planning network cameras, NVR recording, storage retention, and optional remote monitoring without treating any brand as guaranteed.",
    specs: ["IP camera class options", "8-channel or 16-channel NVR target", "PoE camera planning", "Retention storage sizing"],
    technicalSpecs: [
      { label: "Camera class", value: "Hikvision-class, Dahua-class, Ubiquiti-class, or approved equivalent IP cameras" },
      { label: "Recorder target", value: "8-channel or 16-channel NVR class options" },
      { label: "Power and network", value: "PoE switch or NVR PoE options reviewed against cable plan" },
      { label: "Retention", value: "Drive capacity sized by resolution, frame rate, and retention days" },
    ],
    procurementNotes: "Camera placement, privacy requirements, retention period, and installation scope must be reviewed before quotation.",
    unit: "project",
    availability: "For quotation",
  },
  {
    id: "HAC-ACC-001",
    slug: "deployment-accessory-kit",
    categorySlug: "accessories-consumables",
    name: "Deployment Accessory Kit",
    shortDescription: "Cables, adapters, labels, and consumables for IT rollout projects.",
    longDescription:
      "A deployment accessory requirement profile for rollout teams that need small but important cables, labels, adapters, storage media, and consumables consolidated with a primary RFQ.",
    specs: ["Network patch cords", "Adapters", "Labels and cable ties", "Printer and storage consumables"],
    technicalSpecs: [
      { label: "Cable items", value: "Network patch cords and common cable lengths" },
      { label: "Adapters", value: "Display, USB, network, and power adapters as needed" },
      { label: "Labeling", value: "Labels, cable ties, and deployment organization materials" },
      { label: "Consumables", value: "Printer and storage consumables where bundled with rollout scope" },
    ],
    procurementNotes: "May be bundled with endpoint, network, or site deployment requests after review.",
    unit: "lot",
    availability: "For quotation",
  },
  {
    id: "HAC-PWR-001",
    slug: "apc-smart-ups-class-power-protection",
    categorySlug: "power-ups",
    name: "APC Smart-UPS-class Power Protection",
    shortDescription: "UPS sourcing for workstations, network closets, and small server rooms that need runtime planning.",
    longDescription:
      "A UPS requirement profile for protecting endpoints, switches, firewalls, NAS units, or server room equipment where load and runtime must be sized before quotation.",
    specs: ["Line-interactive or online UPS class", "Load and runtime sizing", "Tower or rackmount options", "Battery replacement planning"],
    technicalSpecs: [
      { label: "UPS class", value: "APC Smart-UPS-class, Eaton-class, Vertiv-class, or approved equivalent" },
      { label: "Topology", value: "Line-interactive or online UPS depending on criticality" },
      { label: "Runtime basis", value: "Load wattage and target runtime reviewed before quotation" },
      { label: "Form factor", value: "Tower or rackmount options depending on location" },
    ],
    procurementNotes: "Protected load, runtime target, plug type, rack space, and battery service expectations must be confirmed.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-GEN-001",
    slug: "institutional-office-supply-lot",
    categorySlug: "general-merchandise",
    name: "Institutional Office Supply Lot",
    shortDescription: "General merchandise and office supply sourcing for mixed institutional procurement packages.",
    longDescription:
      "A general merchandise requirement profile for buyers combining office supplies, non-IT goods, or mixed lots with a broader procurement request that still needs documentation clarity.",
    specs: ["Office supply lots", "Consumable packs", "Delivery grouping", "Documentation support"],
    technicalSpecs: [
      { label: "Item class", value: "Office supplies, consumables, and mixed general merchandise" },
      { label: "Packaging", value: "Per piece, box, set, lot, or approved procurement unit" },
      { label: "Delivery grouping", value: "Can be grouped with IT procurement when operationally appropriate" },
      { label: "Documentation", value: "RFQ description and equivalent matching support where applicable" },
    ],
    procurementNotes: "Exact item list, unit of measure, quantity, delivery location, and acceptance requirements must be supplied by the buyer.",
    unit: "lot",
    availability: "For quotation",
  },
];

export const products: Product[] = rawProducts.map(normalizeProduct);

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}
