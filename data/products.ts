import { brandCategoryAccent } from "@/lib/brand-colors";

export type ProductCategory = {
  slug: string;
  name: string;
  summary: string;
  heroCopy: string;
  /** Brand token only (ink). Blue is reserved for CTAs, links, and focus rings. */
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
  sku?: string;
  erpPublicationId?: string;
  isErpPublished?: boolean;
  manualPaymentEnabled?: boolean;
  sandboxPaymentEnabled?: boolean;
  purchaseMode: "rfq" | "checkout" | "hybrid";
  priceCents?: number;
  currency: "PHP";
  fulfillmentType: "manual" | "digital" | "license" | "shipment" | "service";
  inventoryPolicy: "not_tracked" | "track_stock" | "preorder" | "rfq_required";
  image?: string;
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
    summary:
      "Business desktops, notebooks, and workstations for offices, classrooms, and service counters. Processor class, memory, storage, and the monitor are set for the seat, then confirmed as an exact model in the quotation.",
    heroCopy:
      "Business computers and laptops for Philippine offices, schools, and agencies. Set the processor, memory, storage, and display before you ask HACIEN in Pasig for a quotation. The brand and model are confirmed when a distributor confirms them.",
    accent: brandCategoryAccent,
    seoTitle: "Computers and Laptops for Philippine Offices",
    seoDescription:
      "Specification guide for business desktops, laptops, and workstations supplied to Philippine offices, schools, and government agencies from Pasig.",
  },
  {
    slug: "servers-storage",
    name: "Servers & Storage",
    summary:
      "Tower and rack servers, NAS appliances, and backup storage sized to users, applications, and how long you must restore a file. Disk layout and warranty options are lines in the quotation, not assumptions.",
    heroCopy:
      "Servers, NAS appliances, and backup storage for offices and campuses in the Philippines. Describe the workload and the retention. HACIEN quotes the chassis, the disks, and the support option after that, from its Pasig office.",
    accent: brandCategoryAccent,
    seoTitle: "Servers and NAS Storage for Philippine Sites",
    seoDescription:
      "How to specify servers, NAS, RAID, and backup retention when buying IT storage for a Philippine office, school, or agency.",
  },
  {
    slug: "network-equipment",
    name: "Network Equipment",
    summary:
      "Managed switches, Wi-Fi access points, firewalls, and structured cabling for floors, campuses, and branches. PoE budget, VLANs, and the Wi-Fi standard belong in the request.",
    heroCopy:
      "Switches, Wi-Fi, firewalls, and cabling for Philippine offices, schools, and agencies. This page explains managed and unmanaged switching, PoE, and Wi-Fi 6 so the RFQ is specific before HACIEN quotes it.",
    accent: brandCategoryAccent,
    seoTitle: "Network Switches and Wi-Fi Philippines",
    seoDescription:
      "Buyer notes on managed switches, PoE, Wi-Fi 6, firewalls, and structured cabling for offices and campuses in the Philippines.",
  },
  {
    slug: "printers-peripherals",
    name: "Printers & Peripherals",
    summary:
      "Shared printers, scanners, and monitors for departments that already know their monthly pages and paper size. Laser and ink tank solve different volumes. The quotation names the model.",
    heroCopy:
      "Printers, scanners, and monitors for Philippine offices and schools. Match laser or ink tank to the monthly volume, then request a quotation. Consumable yield is confirmed with the exact model, not guessed here.",
    accent: brandCategoryAccent,
    seoTitle: "Office Printers and Monitors Philippines",
    seoDescription:
      "How Philippine offices and schools specify shared printers, scanners, and monitors, including volume, paper size, and network connection.",
  },
  {
    slug: "licensed-software",
    name: "Licensed Software",
    summary:
      "Operating systems, productivity suites, and endpoint protection quoted per user or per device. The license type follows the product and the kind of organization buying it.",
    heroCopy:
      "Licensed software for Philippine companies, schools, and agencies: operating systems, productivity suites, and endpoint protection. Counts, term, and edition are confirmed in the quotation. This page does not publish a price list.",
    accent: brandCategoryAccent,
    seoTitle: "Business Software Licenses Philippines",
    seoDescription:
      "How to request operating system, productivity, and endpoint-security licenses for a Philippine office, school, or government buyer.",
  },
  {
    slug: "security-surveillance",
    name: "Security & Surveillance",
    summary:
      "CCTV cameras, NVR or DVR recorders, retention disks, and door access control. Resolution, channel count, and days of recording decide the package more than a brand slogan.",
    heroCopy:
      "CCTV, recorders, and access control for Philippine sites. Resolution, NVR channels, and retention days are the specs that change the quotation. HACIEN in Pasig prices the package only after those facts are in the request.",
    accent: brandCategoryAccent,
    seoTitle: "CCTV and Access Control Philippines",
    seoDescription:
      "Specification notes for IP cameras, NVR channels, recording retention, and door access control on Philippine office, school, and agency sites.",
  },
  {
    slug: "accessories-consumables",
    name: "Accessories & Consumables",
    summary:
      "Patch cords, display cables, adapters, labels, and printer supplies that let a larger order work on delivery day. Length, port, and printer model need to be explicit.",
    heroCopy:
      "Cables, adapters, labels, and printer supplies for IT rollouts in the Philippines. Quote them with the computers or switches they belong to so the counts match. HACIEN confirms the exact part in the quotation.",
    accent: brandCategoryAccent,
    seoTitle: "IT Cables and Deployment Supplies",
    seoDescription:
      "Patch cords, display cables, adapters, and printer consumables to include in an IT request for a Philippine office or school.",
  },
  {
    slug: "power-ups",
    name: "Power & UPS",
    summary:
      "UPS units and voltage regulators sized in watts and minutes, not by the largest number on the box. Line-interactive and online topologies protect different kinds of equipment.",
    heroCopy:
      "UPS and voltage regulation for desks, closets, and small server rooms in the Philippines. Size from watts and the minutes you need. HACIEN confirms the model, the VA rating, and the published runtime in the quotation.",
    accent: brandCategoryAccent,
    seoTitle: "UPS Sizing for Philippine Offices",
    seoDescription:
      "VA and watt sizing, line-interactive versus online UPS, and what to put in a power-protection request for a Philippine office or server closet.",
  },
  {
    slug: "general-merchandise",
    name: "General Merchandise",
    summary:
      "Office supplies, tools, and other non-IT goods quoted with or without the IT. Goods that need an FDA or DOH-LTO license are outside this list.",
    heroCopy:
      "Office supplies, tools, and hardware materials for buyers who want them on the same quotation as their IT. Describe each line. HACIEN does not supply goods that need an FDA or DOH-LTO license.",
    accent: brandCategoryAccent,
    seoTitle: "Office Supplies with IT Procurement",
    seoDescription:
      "Mixed IT and general-merchandise requests for Philippine offices, schools, and agencies, excluding goods that need an FDA or DOH-LTO license.",
  },
];

const rawProducts: RawProduct[] = [
  {
    id: "HAC-LTP-001",
    slug: "business-laptop-16gb",
    categorySlug: "computers-laptops",
    name: "Business Laptop Class",
    shortDescription: "Business notebook sourcing for office, field, and institutional end-user computing requirements.",
    longDescription:
      "A business notebook requirement profile for teams that need reliable office, field, or institutional computing without locking the RFQ to a single brand before availability is reviewed.",
    specs: ["Business processor class", "16GB memory target", "512GB SSD target", "Office deployment"],
    technicalSpecs: [
      { label: "Processor class", value: "Business processor class or approved equivalent" },
      { label: "Memory target", value: "16GB RAM baseline" },
      { label: "Storage target", value: "512GB SSD baseline" },
      { label: "Deployment context", value: "Office, field, or institution endpoint" },
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
    slug: "dell-lenovo-rack-server-options",
    categorySlug: "servers-storage",
    name: "Dell and Lenovo Rack Server Options",
    shortDescription: "Rack server sourcing for virtualization, local applications, file services, and branch workloads.",
    longDescription:
      "A rack server requirement profile for organizations that need a physical compute node sized around processor class, memory, storage redundancy, warranty coverage, and deployment environment.",
    specs: ["1U or 2U rack server class", "Server processor class options", "RAID controller options", "On-site warranty options"],
    technicalSpecs: [
      { label: "Server class", value: "Dell, Lenovo, or equivalent" },
      { label: "Processor target", value: "Single or dual socket server processor class options" },
      { label: "Memory range", value: "32GB to 128GB+ depending on workload" },
      { label: "Storage and warranty", value: "RAID-ready storage with warranty terms confirmed by RFQ" },
    ],
    procurementNotes: "Final sizing depends on workload, virtualization plan, rack space, redundancy, and support requirements.",
    unit: "unit",
    availability: "For quotation",
  },
  {
    id: "HAC-SRV-003",
    slug: "nas-backup-appliance",
    categorySlug: "servers-storage",
    name: "NAS Backup Appliance",
    shortDescription: "NAS appliance sourcing for shared storage, backup targets, and small-office continuity planning.",
    longDescription:
      "A NAS backup appliance requirement profile for organizations planning shared storage, backup retention, user access, and drive expansion without committing to a final drive set before review.",
    specs: ["4-bay to 8-bay NAS class", "Drive capacity planning", "RAID and snapshot options", "Network backup use case"],
    technicalSpecs: [
      { label: "Appliance class", value: "NAS, or approved equivalent" },
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
    slug: "cisco-firewall-options",
    categorySlug: "network-equipment",
    name: "Cisco Firewall Options",
    shortDescription: "Firewall appliance sourcing for secure internet edge, VPN, and branch protection requirements.",
    longDescription:
      "A firewall requirement profile for organizations reviewing perimeter protection, VPN, routing, content security, and subscription coverage before formal quotation.",
    specs: ["Cisco or equivalent firewall", "VPN support", "Security subscription options", "Throughput reviewed by site size"],
    technicalSpecs: [
      { label: "Appliance class", value: "Cisco, or equivalent firewall" },
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
    slug: "epson-brother-canon-mfp-options",
    categorySlug: "printers-peripherals",
    name: "Epson, Brother, and Canon MFP Options",
    shortDescription: "Multifunction printer sourcing for admin offices, schools, and departments with recurring print needs.",
    longDescription:
      "A multifunction printer requirement profile for buyers comparing ink tank, laser, scanner, and network-ready options around monthly volume and consumables planning.",
    specs: ["Print, scan, and copy functions", "Ink tank or laser class options", "A4 office document workflows", "Network model options"],
    technicalSpecs: [
      { label: "Device class", value: "Epson, Brother, Canon, or equivalent MFP" },
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
    shortDescription: "Productivity and collaboration license sourcing for business and institutional users.",
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
    name: "Endpoint Security License Options",
    shortDescription: "Endpoint security license sourcing for desktops, laptops, and mixed user/device environments.",
    longDescription:
      "An endpoint security license requirement profile for organizations comparing device coverage, term length, admin console needs, and renewal timing before quotation.",
    specs: ["Endpoint protection license class", "Device or user coverage", "Annual term options", "Admin console options"],
    technicalSpecs: [
      { label: "Security class", value: "Endpoint security, or approved equivalent" },
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
    name: "CCTV Starter System",
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
      { label: "Camera class", value: "Hikvision, Dahua, Ubiquiti, or approved equivalent IP cameras" },
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
    slug: "apc-cyberpower-eaton-power-protection",
    categorySlug: "power-ups",
    name: "APC, CyberPower, and Eaton UPS",
    shortDescription: "UPS sourcing for workstations, network closets, and small server rooms that need runtime planning.",
    longDescription:
      "A UPS requirement profile for protecting endpoints, switches, firewalls, NAS units, or server room equipment where load and runtime must be sized before quotation.",
    specs: ["Line-interactive or online UPS class", "Load and runtime sizing", "Tower or rackmount options", "Battery replacement planning"],
    technicalSpecs: [
      { label: "UPS class", value: "APC, CyberPower, Eaton, or equivalent" },
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
