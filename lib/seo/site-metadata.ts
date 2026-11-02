import type { Metadata } from "next";

export const SITE_URL = "https://haciensolutions.com";
export const DEFAULT_OG_IMAGE = "/opengraph-image";

export function getCanonicalUrl(path: string): string {
  if (!path || path === "/" || path === "") {
    return SITE_URL;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function buildPageMetadata(params: {
  title: string | { absolute: string };
  description: string;
  path: string;
}): Metadata {
  const canonical = getCanonicalUrl(params.path);
  const rawTitle = typeof params.title === "string" ? params.title : params.title.absolute;

  return {
    title: params.title,
    description: params.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: rawTitle,
      description: params.description,
      url: canonical,
      siteName: "HACIEN Information Technology Solutions",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "HACIEN Information Technology Solutions",
        },
      ],
      locale: "en_PH",
      type: "website",
    },
  };
}
