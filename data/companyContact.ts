/** Confirmed company facts (Jerwin, Nov 2, 2026). Wording is exact. No registration numbers. */

export const registeredCompanyName = "HACIEN INFORMATION TECHNOLOGY SOLUTIONS";

export const founderLine =
  "Founded in 2026 (DTI registered June 2026) in Ortigas Center, Pasig City to provide fast, quotation-driven, BIR-registered and PhilGEPS-registered multi-category procurement for Philippine businesses and government agencies.";

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
  "Registration papers are provided on request for quotation or accreditation.";

/** Status only. Never a registration number. */
export const registrationStatuses = [
  { label: "DTI Registered Sole Proprietorship (National Scope)", status: "" },
  {
    label:
      "BIR Registered Taxpayer (RDO 043 - Pasig City, Non-VAT — issues official BIR Sales Invoices, Delivery Receipts, and Collection Receipts)",
    status: "",
  },
  { label: "Pasig City Mayor's / Business Permit Accredited", status: "" },
  { label: "PhilGEPS Registered Supplier (Red Registration Approved)", status: "" },
] as const;

export const insightAuthor = "HACIEN Team";

export const companyContact = {
  legalName: "HACIEN Information Technology Solutions",
  email: "info@haciensolutions.com",
  contactInstruction:
    "Use the RFQ, support, or contact form so HACIEN can route the inquiry to the right team.",
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
