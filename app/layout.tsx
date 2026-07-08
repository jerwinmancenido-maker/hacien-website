import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GlobalCinematicBackdrop } from "@/components/GlobalCinematicBackdrop";
import { QuoteCartProvider } from "@/components/QuoteCartProvider";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { companyContact } from "@/data/companyContact";

export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL("https://haciensolutions.com"),
  title: {
    default: "HACIEN Information Technology Solutions",
    template: "%s | HACIEN",
  },
  description:
    "IT infrastructure, procurement, systems integration, and project-based technology solutions for Philippine organizations.",
  applicationName: "HACIEN Information Technology Solutions",
  keywords: [
    "HACIEN",
    "IT infrastructure Philippines",
    "IT procurement Philippines",
    "systems integrator Philippines",
    "institutional procurement support",
    "technology solutions provider",
  ],
  openGraph: {
    title: "HACIEN Information Technology Solutions",
    description:
      "IT infrastructure, procurement, systems integration, and project-based technology solutions for Philippine organizations.",
    url: "https://haciensolutions.com",
    siteName: "HACIEN Information Technology Solutions",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "HACIEN Information Technology Solutions",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HACIEN Information Technology Solutions",
    description:
      "IT infrastructure, procurement, systems integration, and project-based technology solutions for Philippine organizations.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HACIEN",
    alternateName: "HACIEN",
    url: "https://haciensolutions.com",
    ...(companyContact.email ? { email: companyContact.email } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center, San Antonio",
      addressLocality: "City of Pasig",
      addressRegion: "NCR",
      postalCode: "1605",
      addressCountry: "PH",
    },
    areaServed: "Philippines",
    description:
      "HACIEN is a procurement-first technology solutions headquarters for RFQ review, solutions consulting, sourcing coordination, and customer success.",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LenisProvider>
          <QuoteCartProvider>
            <GlobalCinematicBackdrop />
            <Header />
            <main>{children}</main>
            <Footer />
          </QuoteCartProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
