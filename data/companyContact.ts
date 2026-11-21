/** Confirmed company facts (Jerwin, Nov 2, 2026). Wording is exact. No registration numbers. */

export const registeredCompanyName = "HACIEN INFORMATION TECHNOLOGY SOLUTIONS";

export const founderLine =
  "Based in Ortigas Center, Pasig City, HACIEN provides quotation-driven, multi-category procurement for Philippine businesses and government agencies.";

export const supplyItems = [
  {
    title: "IT & Office Technology",
    text: "Laptops, desktops, workstations, monitors, printers/scanners, UPS & power protection, enterprise networking & Wi-Fi, CCTV & security systems, structured cabling, and licensed software.",
  },
  {
    title: "Tools, Hardware Materials & General Merchandise",
    text: "Power and hand tools, hardware and maintenance materials, training/workshop equipment, office supplies, and custom-sourced commercial items (excluding products requiring special regulatory licenses such as FDA or DOH-LTO).",
  },
] as const;

export const supplyException =
  "(excluding products requiring special regulatory licenses such as FDA or DOH-LTO)";

export const supplyLead =
  "IT & Office Technology. Tools, Hardware Materials & General Merchandise.";

/** One brand in the carried list. `logo` is a file under public/brand/logos/;
 *  brands without one render as a styled wordmark (`display`/`sub`/`color`/
 *  `spacing` follow the approved brands mock). */
export type CarriedBrand = {
  name: string;
  logo?: string;
  display?: string;
  sub?: string;
  color?: string;
  spacing?: string;
};

export type BrandCategory = {
  name: string;
  description: string;
  brands: readonly CarriedBrand[];
};

/** The full list of brands HACIEN carries — ONE source of truth for the
 *  homepage section, the /brands page, and the AI chat knowledge.
 *  Canonical names per the approved brands plan/mock (REQ-WEB-BRANDS-001):
 *  Cisco Meraki and HPE Aruba Networking count as brands distinct from
 *  Cisco and Hewlett Packard Enterprise. 77 category tiles, 72 unique. */
export const brandCategories: readonly BrandCategory[] = [
  {
    name: "Laptops, Desktops & Mobile",
    description: "Business notebooks, desktops, tablets and phones.",
    brands: [
      { name: "Dell", logo: "dell.svg" },
      { name: "HP", logo: "hp.svg" },
      { name: "Lenovo", logo: "lenovo.svg" },
      { name: "Apple", logo: "apple.svg" },
      { name: "Asus", logo: "asus.svg" },
      { name: "Acer", logo: "acer.svg" },
      { name: "Microsoft", color: "#5B5FC7" },
      { name: "Samsung", display: "SAMSUNG", color: "#1428A0", spacing: "0.18em" },
      { name: "Huawei", display: "HUAWEI", color: "#CF0A2C" },
      { name: "Xiaomi", color: "#FF6900" },
      { name: "Oppo", display: "OPPO", color: "#00693C", spacing: "0.14em" },
      { name: "Nokia", display: "NOKIA", color: "#005AFF", spacing: "0.14em" },
    ],
  },
  {
    name: "Printing, Displays & Collaboration",
    description: "Printers, scanners, monitors, POS and meeting rooms.",
    brands: [
      { name: "Canon", logo: "canon.svg" },
      { name: "Epson", logo: "epson.svg" },
      { name: "Brother", display: "brother" },
      { name: "Fujifilm", display: "FUJIFILM", color: "#111111" },
      { name: "HP", logo: "hp.svg" },
      { name: "Kodak Alaris", color: "#E31837" },
      { name: "Honeywell", color: "#EE3124" },
      { name: "Zebra", display: "ZEBRA", color: "#111111" },
      { name: "Toshiba", display: "TOSHIBA", color: "#FF0000", spacing: "0.1em" },
      { name: "LG", color: "#A50034" },
      { name: "Samsung", display: "SAMSUNG", color: "#1428A0", spacing: "0.18em" },
      { name: "TCL", color: "#E60012" },
      { name: "Panasonic", color: "#004B8D" },
      { name: "Zoom", display: "zoom", color: "#2D8CFF" },
      { name: "Avaya", display: "AVAYA", color: "#CC0000", spacing: "0.1em" },
    ],
  },
  {
    name: "Servers & Storage",
    description: "Compute, GPU, hyperconverged and enterprise storage.",
    brands: [
      { name: "Dell", logo: "dell.svg" },
      { name: "Hewlett Packard Enterprise", display: "Hewlett Packard", sub: "ENTERPRISE", color: "#01A982" },
      { name: "Lenovo", logo: "lenovo.svg" },
      { name: "NVIDIA", color: "#76B900" },
      { name: "IBM", color: "#0530AD", spacing: "0.22em" },
      { name: "Hitachi", display: "HITACHI", color: "#111111", spacing: "0.08em" },
      { name: "NetApp", color: "#0067C5" },
      { name: "Nutanix", display: "NUTANIX", color: "#02468F" },
      { name: "Synology", color: "#111111" },
      { name: "QNAP", color: "#001489" },
      { name: "Seagate", display: "SEAGATE", color: "#00693C" },
      { name: "VAST Data", display: "VAST", sub: "DATA", color: "#111111" },
    ],
  },
  {
    name: "Networking & Power",
    description: "Switching, wireless, cabling and UPS.",
    brands: [
      { name: "Cisco", logo: "cisco.svg" },
      { name: "Cisco Meraki", color: "#67A644" },
      { name: "Juniper Networks", display: "JUNIPER", sub: "NETWORKS", color: "#111111" },
      { name: "HPE Aruba Networking", display: "HPE Aruba", sub: "NETWORKING", color: "#FF8300" },
      { name: "Arista", display: "ARISTA", color: "#C8102E", spacing: "0.1em" },
      { name: "Allied Telesis", color: "#C8102E" },
      { name: "D-Link", color: "#00629B" },
      { name: "Riverbed", display: "riverbed", color: "#E87722" },
      { name: "Panduit", display: "PANDUIT", color: "#111111", spacing: "0.05em" },
      { name: "APC", logo: "apc.svg" },
      { name: "Eaton", display: "EATON", color: "#005EB8", spacing: "0.08em" },
      { name: "Vertiv", display: "VERTIV", color: "#111111" },
      { name: "Ubiquiti", logo: "ubiquiti.svg" },
      { name: "TP-Link", logo: "tplink.svg" },
      { name: "MikroTik", logo: "mikrotik.svg" },
      { name: "CyberPower" },
    ],
  },
  {
    name: "Security & Data Protection",
    description: "Firewalls, endpoint, surveillance and backup.",
    brands: [
      { name: "Fortinet", display: "FORTINET", color: "#EE3124", spacing: "0.06em" },
      { name: "Kaspersky", display: "kaspersky", color: "#006D5C" },
      { name: "Tenable", display: "tenable", color: "#00A5B5" },
      { name: "Akamai", color: "#ED1C24" },
      { name: "Dahua", logo: "dahua.svg" },
      { name: "Hikvision", logo: "hikvision.svg" },
      { name: "Veeam", display: "VEEAM", color: "#00B336" },
      { name: "Rubrik", display: "rubrik", color: "#0B7285" },
      { name: "Cohesity", display: "COHESITY", color: "#111111" },
      { name: "Commvault", display: "COMMVAULT", color: "#E31837" },
    ],
  },
  {
    name: "Software & Cloud",
    description: "Productivity, enterprise and cloud platforms.",
    brands: [
      { name: "Microsoft", color: "#5B5FC7" },
      { name: "Google Cloud", color: "#4285F4" },
      { name: "Amazon Web Services", display: "aws", color: "#232F3E" },
      { name: "Alibaba Cloud", color: "#FF6A00" },
      { name: "Oracle", display: "ORACLE", color: "#C74634", spacing: "0.16em" },
      { name: "SAP", color: "#0A6ED1" },
      { name: "Red Hat", color: "#EE0000" },
      { name: "VMware", sub: "BY BROADCOM", color: "#607078" },
      { name: "Adobe", color: "#EB1000" },
      { name: "Autodesk", display: "AUTODESK", color: "#0696D7" },
      { name: "Docusign", display: "docusign", color: "#4C00FF" },
      { name: "OpenText", display: "opentext", color: "#111111" },
    ],
  },
];

/** Unique carried brand names, in first-appearance order across the
 *  categories (cross-category repeats count once). */
export const carriedBrands: readonly string[] = [
  ...new Set(brandCategories.flatMap((category) => category.brands.map((brand) => brand.name))),
];

/** The 24 brands featured in the homepage section grid, in mock order. */
export const featuredBrandNames = [
  "Dell",
  "HP",
  "Lenovo",
  "Apple",
  "Asus",
  "Acer",
  "Microsoft",
  "Samsung",
  "Cisco",
  "Canon",
  "Epson",
  "APC",
  "Fortinet",
  "Hikvision",
  "Dahua",
  "Huawei",
  "NVIDIA",
  "IBM",
  "Oracle",
  "Adobe",
  "VMware",
  "LG",
  "Panasonic",
  "Synology",
] as const;

/** Short form for prose contexts (about/contact lines) — a 72-name comma
 *  list is never rendered as a paragraph. */
export const brandsSummaryLine = "more than 70 leading brands";

export const brandPhrases = [
  "leading industrial tool and hardware brands upon client specification",
  "sourced via authorized Philippine distributors",
] as const;

export const brandsLine = [...carriedBrands, ...brandPhrases].join(", ");

export const deliveryLine =
  "Nationwide across the Philippines. Direct dispatch in Metro Manila (NCR) and nearby provinces, and insured land/air/sea cargo forwarding to Luzon, Visayas, and Mindanao. Delivery fee quoted per order.";

export const deliveryClauses = [
  "Nationwide across the Philippines.",
  "Direct dispatch in Metro Manila (NCR) and nearby provinces.",
  "Insured land/air/sea cargo forwarding to Luzon, Visayas, and Mindanao.",
  "Delivery fee quoted per order.",
] as const;

export const showroomNote = "Walk-in visits and pick-ups are by prior appointment.";
export const appointmentNote = showroomNote;

export const replyTime =
  "Within 1 business day (Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays).";

export const registrationPapersNote =
  "Registration papers are not published online. They are provided on private request for accreditation.";

/** Status only. No registration numbers or tax/registration details. */
export const registrationStatuses = [
  { label: "DTI Registered Sole Proprietorship", status: "" },
  {
    label:
      "BIR Registered Taxpayer",
    status: "",
  },
  { label: "Pasig City Mayor's / Business Permit", status: "" },
  { label: "PhilGEPS Registered Supplier", status: "" },
] as const;

/**
 * STUB — REQ-WEB-RESTYLE-001, brief §7 placeholder.
 *
 * This is the structured brands list shape REQ-WEB-BRANDS-001 (Stream D)
 * builds in this file: one entry per unique brand (name + category or
 * categories + logo file where one is held). Until that build lands, this
 * stub carries ONLY the homepage mock v5 featured 24, in mock order, so the
 * restyled home page can render its brands section against the real shape.
 * REQ-WEB-BRANDS-001 replaces this list wholesale with the full 72-brand
 * list; the home section component consumes `brandsList` unchanged.
 */
export type CarriedBrandEntry = {
  name: string;
  categories: readonly string[];
  /** Public path of the held logo SVG, where one is held. */
  logo?: string;
  /** Styled-wordmark tile data for brands without a held logo (mock v5 treatment). */
  wordmark?: {
    text: string;
    color?: string;
    letterSpacing?: string;
    small?: string;
  };
  /** Homepage featured grid (mock v5), in list order. */
  featured?: boolean;
};

export const brandsList: readonly CarriedBrandEntry[] = [
  { name: "Dell", categories: ["Laptops, Desktops & Mobile", "Servers & Storage"], logo: "/brand/logos/dell.svg", featured: true },
  { name: "HP", categories: ["Laptops, Desktops & Mobile", "Printing, Displays & Collaboration"], logo: "/brand/logos/hp.svg", featured: true },
  { name: "Lenovo", categories: ["Laptops, Desktops & Mobile", "Servers & Storage"], logo: "/brand/logos/lenovo.svg", featured: true },
  { name: "Apple", categories: ["Laptops, Desktops & Mobile"], logo: "/brand/logos/apple.svg", featured: true },
  { name: "Asus", categories: ["Laptops, Desktops & Mobile"], logo: "/brand/logos/asus.svg", featured: true },
  { name: "Acer", categories: ["Laptops, Desktops & Mobile"], logo: "/brand/logos/acer.svg", featured: true },
  { name: "Microsoft", categories: ["Laptops, Desktops & Mobile", "Software & Cloud"], wordmark: { text: "Microsoft", color: "#5B5FC7" }, featured: true },
  { name: "Samsung", categories: ["Laptops, Desktops & Mobile", "Printing, Displays & Collaboration"], wordmark: { text: "SAMSUNG", color: "#1428A0", letterSpacing: "0.18em" }, featured: true },
  { name: "Cisco", categories: ["Networking & Power"], logo: "/brand/logos/cisco.svg", featured: true },
  { name: "Canon", categories: ["Printing, Displays & Collaboration"], logo: "/brand/logos/canon.svg", featured: true },
  { name: "Epson", categories: ["Printing, Displays & Collaboration"], logo: "/brand/logos/epson.svg", featured: true },
  { name: "APC", categories: ["Networking & Power"], logo: "/brand/logos/apc.svg", featured: true },
  { name: "Fortinet", categories: ["Security & Data Protection"], wordmark: { text: "FORTINET", color: "#EE3124", letterSpacing: "0.06em" }, featured: true },
  { name: "Hikvision", categories: ["Security & Data Protection"], logo: "/brand/logos/hikvision.svg", featured: true },
  { name: "Dahua", categories: ["Security & Data Protection"], logo: "/brand/logos/dahua.svg", featured: true },
  { name: "Huawei", categories: ["Laptops, Desktops & Mobile"], wordmark: { text: "HUAWEI", color: "#CF0A2C" }, featured: true },
  { name: "NVIDIA", categories: ["Servers & Storage"], wordmark: { text: "NVIDIA", color: "#76B900" }, featured: true },
  { name: "IBM", categories: ["Servers & Storage"], wordmark: { text: "IBM", color: "#0530AD", letterSpacing: "0.22em" }, featured: true },
  { name: "Oracle", categories: ["Software & Cloud"], wordmark: { text: "ORACLE", color: "#C74634", letterSpacing: "0.16em" }, featured: true },
  { name: "Adobe", categories: ["Software & Cloud"], wordmark: { text: "Adobe", color: "#EB1000" }, featured: true },
  { name: "VMware", categories: ["Software & Cloud"], wordmark: { text: "VMware", color: "#607078", small: "BY BROADCOM" }, featured: true },
  { name: "LG", categories: ["Printing, Displays & Collaboration"], wordmark: { text: "LG", color: "#A50034" }, featured: true },
  { name: "Panasonic", categories: ["Printing, Displays & Collaboration"], wordmark: { text: "Panasonic", color: "#004B8D" }, featured: true },
  { name: "Synology", categories: ["Servers & Storage"], wordmark: { text: "Synology" }, featured: true },
];

export const insightAuthor = "HACIEN Team";

export const companyContact = {
  legalName: "HACIEN Information Technology Solutions",
  email: "info@haciensolutions.com",
  contactInstruction:
    "Use the chat so HACIEN can route the inquiry to the right team.",
  addressLabel: "Office address",
  addressLines: [
    "Unit D, 6th Floor, Suntree Tower",
    "13 Meralco Avenue, Ortigas Center",
    "Brgy. San Antonio, Pasig City",
    "Metro Manila 1605, Philippines",
  ],
  addressOneLine:
    "Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, Brgy. San Antonio, Pasig City, Metro Manila 1605, Philippines",
  appointmentNote,
  showroomNote,
  replyTime,
};
