import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Customer Workspace",
  description:
    "HACIEN Customer Workspace direction for future RFQ tracking, quotation visibility, documents, support, and account continuity.",
  robots: {
    index: false,
    follow: false,
  },
};

// One workspace door: /portal permanently sends visitors to
// /customer-workspace, which carries the Customer Workspace page.
export default function PortalPage() {
  redirect("/customer-workspace");
}
