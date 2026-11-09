/**
 * Industry and ordering copy for public pages. General procurement practice
 * plus the services this site already offers. No client names, counts, or
 * authorization claims.
 */

export type BuyerBrief = {
  title: string;
  paragraphs: string[];
  points: string[];
};

export const industryBriefs: BuyerBrief[] = [
  {
    title: "Government offices, LGUs, and state schools",
    paragraphs: [
      "HACIEN is a PhilGEPS-registered supplier. National agencies, local governments, state universities and colleges, and government-owned corporations can send a purchase request the same way a private office does: through the quotation chat, with the technical specifications attached.",
      "The modes buyers already use — shopping, small value procurement, and public bidding — need the same discipline on the quotation. Each line needs a description a receiving clerk can match, a quantity, and a unit. When the request asks for a conforme, HACIEN signs it only for the items the quotation covers. Sales invoices, delivery receipts with an itemized packing list, and collection receipts are part of how those orders are closed, as the industry cards on this page already state.",
      "Registration numbers are not printed here. DTI, BIR, Mayor's permit, and PhilGEPS papers are provided on private request when an accreditation packet needs them.",
    ],
    points: [
      "Attach the technical specifications or the terms of reference. A one-line item name is rarely enough for a conforme.",
      "Name the delivery site, the receiving hours, and who signs the delivery receipt.",
      "Say if installation, testing, and turnover are inside the same award or only supply.",
      "Do not send tax identification numbers or permit numbers in the public chat. Ask for an accreditation packet instead.",
    ],
  },
  {
    title: "Private companies and smaller offices",
    paragraphs: [
      "A private office rarely needs a bidding form. It does need the same facts: how many people, what they do at the desk, and when the floor must be usable. HACIEN quotes computers, the network, the printer, and the UPS as one package when you send them together.",
      "Smaller offices often start with a standard laptop, one managed switch, a Wi-Fi 6 access point, and a line-interactive UPS at the desk. Growing offices add a NAS, a firewall, and a second monitor for finance. The quotation can phase that so you are not buying a data room on the first request.",
    ],
    points: [
      "A floor plan or a phone photo of the rooms is enough to start a network request.",
      "Say which brands you already own if you want the new units to match.",
      "Ask for approved equivalents where a brand is hard to find. HACIEN will not swap one in silently.",
    ],
  },
  {
    title: "Larger offices and multi-site operations",
    paragraphs: [
      "A larger office is a repeat of the same seat many times, plus a closet that has to survive a floor full of people. Standardize the endpoint, then specify the closet separately: switch PoE budget, firewall, UPS, and where the files live.",
      "Multi-site work is a schedule, not only a parts list. HACIEN can sequence delivery so a branch does not receive cameras before the switch that powers them. Each site keeps its own quantities. A single national total hides a short shipment.",
    ],
    points: [
      "Split the bill of quantities by site.",
      "Name the image or the software edition once, and the seat count per site.",
      "Put cutover windows in the request if the old network has to stay up during installation.",
    ],
  },
  {
    title: "Schools, universities, and training centers",
    paragraphs: [
      "A laboratory is a count of identical computers, a teacher station, a switch that can feed the room, and power that does not drop the class when the utility blinks. Faculty laptops are a second line, with a different specification.",
      "Workshop and technical programs also buy tools and hardware materials. Those lines can sit on the same request as the computers. Goods that need an FDA or DOH-LTO license are outside what HACIEN supplies.",
    ],
    points: [
      "State students per room and whether the room is air-conditioned.",
      "Say if the laboratory must join a domain or only reach the internet.",
      "Separate classroom displays and printers from the student seats so the quantities stay honest.",
    ],
  },
  {
    title: "Healthcare operations",
    paragraphs: [
      "Clinics and hospitals still buy ordinary IT for admin, records, and the network that carries them. HACIEN quotes endpoints, network equipment, storage, power protection, and physical security for those operational rooms.",
      "This site does not claim a medical-device registration, and it does not supply products that need an FDA or DOH-LTO license. Clinical equipment that falls under those rules belongs with a supplier who holds them.",
    ],
    points: [
      "Name the room: admissions, records, nurse station, or a back office.",
      "Say whether the PC must stay up on a UPS through a short outage.",
      "Keep medical devices off the IT list unless you have already confirmed they are ordinary computing equipment.",
    ],
  },
  {
    title: "Contractors, facilities, and industrial sites",
    paragraphs: [
      "Site teams buy CCTV, cabling, tools, and the occasional batch of computers for the project office. The IT and the tools can share one quotation. The specification still has to say which is which.",
      "A temporary site office has different power and weather constraints from a finished floor in Ortigas. Say if the equipment will sit in a container, a guard house, or a finished room. Outdoor cameras and UPS runtime depend on that answer.",
    ],
    points: [
      "Send the tool list with sizes and quantities, not only a brand slogan.",
      "Mark cameras that must survive rain, and the days of recording you need.",
      "Name the project office address separately from the company head office.",
    ],
  },
];

export const quoteGuide = {
  title: "What to send with a quotation request",
  intro:
    "You do not need a finished bid document. A list, a photo of a whiteboard, a spreadsheet, or a purchase request is enough to start. HACIEN replies within 1 business day, Monday to Friday, 9:00 AM – 6:00 PM PHT, excluding holidays. The formal quotation names the model, the commercial terms, and the delivery fee after suppliers confirm them.",
  checklist: [
    "Who is buying: company or agency name, site, and a person who can answer questions.",
    "What you need, with quantities. A category name alone ('laptops', 'CCTV') is only a start.",
    "The specifications you already have, or the work the equipment must do.",
    "Brands you want kept, and lines where an approved equivalent is allowed.",
    "Delivery address, target date if you have one, and whether someone must install.",
    "For government buyers: the technical specifications, and whether you need a conforme.",
    "Anything HACIEN should not assume: existing cable, existing racks, or a software license you already own.",
  ],
  note: "The website does not take payment. Terms, including any deposit, are written in the quotation and confirmed before an order is placed.",
};

export const projectIntegration = {
  eyebrow: "Services",
  title: "Project-driven IT integration",
  intro:
    "Some requests are a box. Others are a floor, a laboratory, or a building. For those, HACIEN can carry the work from a site survey through supply, installation, testing, and turnover. Each step is quoted. A page on this website is not a notice to proceed.",
  phases: [
    {
      step: "Site survey",
      detail:
        "Walk the rooms or work from plans and photos. Count seats, doors, camera views, closet space, and where power actually is. The survey is what keeps the bill of quantities from being a guess.",
    },
    {
      step: "Bill of quantities",
      detail:
        "Turn the survey into lines a buyer can compare: equipment, cable, accessories, and labor, with quantities and the specification each line must meet. Equivalents are marked, not hidden.",
    },
    {
      step: "Supply",
      detail:
        "Supply is ordered against the accepted quotation, so the model and the timing are the ones the quotation confirmed.",
    },
    {
      step: "Installation",
      detail:
        "Mount, pull or dress cable, rack equipment, and place endpoints in the sequence the site can accept. Work outside the quotation, such as civil works or building electrical, stays out unless a line adds it.",
    },
    {
      step: "Testing",
      detail:
        "Check what was installed against the bill of quantities: ports, power-on, camera views, and the labels a technician will need later. Results are written down, not waved through.",
    },
    {
      step: "Turnover",
      detail:
        "Hand over the devices, the as-built list or marked plan, serial numbers, and the warranty papers the manufacturers issued. The buyer signs for what was received.",
    },
    {
      step: "After-sales",
      detail:
        "Questions about a delivered item, a missing accessory, or a warranty claim stay on the same request. HACIEN coordinates with the distributor under the warranty terms the quotation stated. A new need is a new quotation.",
    },
  ],
};
