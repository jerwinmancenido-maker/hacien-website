import { companyContact, founderLine } from "@/data/companyContact";

/**
 * Structured-data builders (R5-FIX-9, n-15). One place composes every
 * JSON-LD block the site serves, from the same verified company data the
 * pages themselves render - no invented offers, prices, or ratings.
 */

export const SITE_URL = "https://haciensolutions.com";

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress:
    "Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, Brgy. San Antonio",
  addressLocality: "Pasig City",
  addressRegion: "Metro Manila",
  postalCode: "1605",
  addressCountry: "PH",
} as const;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HACIEN Information Technology Solutions",
    alternateName: "HACIEN",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/icon-512.png`,
    ...(companyContact.email ? { email: companyContact.email } : {}),
    address: postalAddress,
    areaServed: "Philippines",
    description: founderLine,
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "HACIEN Information Technology Solutions",
    alternateName: "HACIEN",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/icon-512.png`,
    ...(companyContact.email ? { email: companyContact.email } : {}),
    address: postalAddress,
    areaServed: "Philippines",
    description: founderLine,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

export type Crumb = { label: string; href?: string };

/** Mirrors components/Breadcrumb: an implicit Home crumb, then the page
 *  trail. The current page (no href) is named without a URL. */
export function breadcrumbJsonLd(items: Crumb[]) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}

export type ListEntry = { name: string; href?: string };

/** An index page listing, composed from the same array the page renders.
 *  Entries without their own page (e.g. brand names) are named, not linked. */
export function itemListJsonLd(items: ListEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      ...(entry.href ? { item: `${SITE_URL}${entry.href}` } : {}),
    })),
  };
}
