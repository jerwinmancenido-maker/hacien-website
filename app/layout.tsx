import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteCartProvider } from "@/components/QuoteCartProvider";

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
    "government procurement support",
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
    name: "HACIEN INFORMATION TECHNOLOGY SOLUTIONS",
    alternateName: "HACIEN",
    url: "https://haciensolutions.com",
    email: "sales@haciensolutions.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Unit D, 6th Floor, Suntree Tower, 13 Meralco Avenue, Ortigas Center",
      addressLocality: "Pasig City",
      addressRegion: "Metro Manila",
      addressCountry: "PH",
    },
    areaServed: "Philippines",
    description:
      "Philippine IT infrastructure provider, government procurement support partner, systems integrator, and technology solutions provider.",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <QuoteCartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </QuoteCartProvider>
      </body>
    </html>
  );
}
