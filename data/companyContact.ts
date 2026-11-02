/** Confirmed company facts (Jerwin, Nov 2, 2026). Wording is exact. No registration numbers. */

export const registeredCompanyName = "HACIEN INFORMATION TECHNOLOGY SOLUTIONS";

export const founderLine =
  "Founded in 2026 in Pasig City to give Philippine businesses and government offices a clear, dependable quotation-to-delivery channel for IT equipment, tools, hardware materials and general procurement.";

export const supplyItems = [
  {
    title: "IT hardware, networking and peripherals",
    text: "computers, laptops, servers, NAS/storage, switches, routers, firewalls, CCTV/security, printers, scanners, monitors, UPS/AVR",
  },
  {
    title: "Licensed software",
    text: "operating systems, office productivity, security, business licences",
  },
  {
    title: "Tools and hardware materials",
    text: "hand and power tools, electrical and facility hardware materials, technical/training supplies, workshop equipment",
  },
  {
    title: "Office and general merchandise",
    text: "office equipment, institutional supplies, and other commercial items sourced per order",
  },
] as const;

export const supplyException =
  "Except products that need a special regulatory license (for example an FDA or DOH License to Operate).";

export const supplyLead =
  "IT hardware, networking and peripherals. Licensed software. Tools and hardware materials. Office and general merchandise.";

export const brandsLine =
  "Major IT brands, sourced per order through Philippine distributors, plus approved equivalents to your specifications.";

export const deliveryLine =
  "Nationwide across the Philippines. Metro Manila direct/courier delivery; provincial shipping via partner couriers/cargo. Delivery fee quoted per order. No walk-in store pickup.";

export const deliveryClauses = [
  "Nationwide across the Philippines.",
  "Metro Manila direct/courier delivery; provincial shipping via partner couriers/cargo.",
  "Delivery fee quoted per order.",
  "No walk-in store pickup.",
] as const;

export const showroomNote = "We work per order; no walk-in showroom.";

export const replyTime =
  "We acknowledge website inquiries within 1 business day (Monday to Friday, excluding holidays). Formal quotations follow once supplier stock and pricing are confirmed.";

export const registrationPapersNote =
  "Registration papers are provided on request for quotation or accreditation.";

/** Status only. Never a registration number. */
export const registrationStatuses = [
  { label: "DTI (sole proprietorship)", status: "" },
  { label: "BIR registered, Non-VAT", status: "" },
  { label: "Pasig City Mayor's/Business Permit", status: "" },
  { label: "PhilGEPS registered", status: "" },
] as const;

export const insightAuthor = "HACIEN Team";

export const companyContact = {
  legalName: "HACIEN Information Technology Solutions",
  email: "",
  contactInstruction:
    "Use the RFQ, support, or contact form so HACIEN can route the inquiry to the right team.",
  addressLabel: "Office address",
  addressLines: [
    "Unit D, 6th Floor, Suntree Tower",
    "13 Meralco Avenue, Ortigas Center",
    "San Antonio, City of Pasig, Metro Manila",
    "Philippines 1605",
  ],
  addressOneLine:
    "Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio, City of Pasig, Metro Manila, Philippines 1605",
  showroomNote,
  replyTime,
};
