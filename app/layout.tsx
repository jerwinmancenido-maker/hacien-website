import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteCartProvider } from "@/components/QuoteCartProvider";

export const metadata: Metadata = {
  title: "HACIEN Information Technology Solutions",
  description:
    "IT infrastructure, procurement, systems integration, and project-based technology solutions for Philippine organizations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <QuoteCartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </QuoteCartProvider>
      </body>
    </html>
  );
}
