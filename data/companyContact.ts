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

/** Brands HACIEN carries, in Jerwin's order and spelling. */
export const carriedBrands = [
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "Apple",
  "Cisco",
  "Ubiquiti",
  "TP-Link",
  "MikroTik",
  "Hikvision",
  "Dahua",
  "APC",
  "CyberPower",
  "Eaton",
  "Epson",
  "Brother",
  "Canon",
  "Microsoft",
] as const;

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
