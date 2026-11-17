/**
 * Staff contact cards served at /c/:id (the link printed as a QR code on
 * HACIEN calling cards). One record per card ID — add a staff member by
 * adding an entry here; the page and its vCard download pick it up.
 *
 * Social links are optional on purpose: a button renders only when a URL
 * is recorded here, and URLs are added only once confirmed. Never guess
 * or invent a profile URL.
 */

export type StaffCard = {
  id: string;
  fullName: string;
  givenName: string;
  familyName: string;
  middleName?: string;
  title: string;
  organization: string;
  /** Short status line shown under the organization name. */
  statusLine: string;
  mobileDisplay: string;
  /** International format without spaces, for tel:/sms:/viber: links. */
  mobileIntl: string;
  emails: { label: string; address: string }[];
  website: string;
  address: {
    street: string;
    city: string;
    postcode: string;
    country: string;
    oneLine: string;
  };
  mapsUrl: string;
  socials?: {
    facebook?: string;
    linkedin?: string;
    tiktok?: string;
  };
};

export const staffCards: Record<string, StaffCard> = {
  "2611001": {
    id: "2611001",
    fullName: "Jerwin P. Mancenido",
    givenName: "Jerwin",
    familyName: "Mancenido",
    middleName: "P.",
    title: "General Manager",
    organization: "HACIEN Information Technology Solutions",
    statusLine: "PhilGEPS-registered supplier",
    mobileDisplay: "+63 968 117 1158",
    mobileIntl: "+639681171158",
    emails: [
      { label: "Email Jerwin", address: "jerwin@haciensolutions.com" },
      { label: "Email Sales", address: "sales@haciensolutions.com" },
    ],
    website: "https://haciensolutions.com",
    address: {
      street: "Unit D, 6th Floor, Suntree Tower, 13 Meralco Ave., Ortigas Center",
      city: "Pasig City",
      postcode: "1605",
      country: "Philippines",
      oneLine:
        "Unit D, 6th Floor, Suntree Tower, 13 Meralco Ave., Ortigas Center, Pasig City 1605",
    },
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Suntree+Tower%2C+13+Meralco+Ave.%2C+Ortigas+Center%2C+Pasig+City",
    // No social URLs recorded: none are confirmed in this repo, so the
    // Facebook / LinkedIn / TikTok buttons stay hidden for this card.
  },
};

export function getStaffCard(id: string): StaffCard | null {
  return staffCards[id] ?? null;
}

export function staffCardVcfFilename(card: StaffCard): string {
  const slug = card.fullName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${slug}.vcf`;
}
