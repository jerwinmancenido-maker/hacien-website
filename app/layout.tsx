import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieNotice } from "@/components/CookieNotice";
import { isValidGaId } from "@/lib/ga4";
import { GlobalCinematicBackdrop } from "@/components/GlobalCinematicBackdrop";
import { QuoteCartProvider } from "@/components/QuoteCartProvider";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { companyContact, founderLine } from "@/data/companyContact";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

export const revalidate = 300;

export const metadata: Metadata = {
  metadataBase: new URL("https://haciensolutions.com"),
  title: {
    default: "HACIEN Information Technology Solutions",
    template: "%s | HACIEN",
  },
  description: founderLine,
  applicationName: "HACIEN Information Technology Solutions",
  keywords: [
    "HACIEN",
    "IT equipment",
    "licensed software",
    "tools and hardware materials",
    "general procurement",
    "Philippines",
  ],
  icons: {
    icon: [
      { url: "/brand/favicon.ico" },
      { url: "/brand/icon.svg", type: "image/svg+xml" },
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    title: "HACIEN Information Technology Solutions",
    description:
      founderLine,
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
      founderLine,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const rawGaId = process.env.NEXT_PUBLIC_HACIEN_GA4_ID?.trim();
  const gaId = isValidGaId(rawGaId) ? rawGaId : undefined;
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
      addressRegion: "Metro Manila",
      postalCode: "1605",
      addressCountry: "PH",
    },
    areaServed: "Philippines",
    description: founderLine,
  };

  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {gaId ? (
          <>
            <script
              id="google-consent-default"
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied'
});
gtag('config', '${gaId}', {
  'allow_google_signals': false,
  'allow_ad_personalization_signals': false
});`,
              }}
            />
            <CookieNotice gaId={gaId} />
          </>
        ) : null}
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
