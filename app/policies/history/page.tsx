import { LegalDocument, legalMetadata } from "@/app/policies/_lib/document";
import { policyHistoryPage } from "@/app/policies/_lib/content";

export const metadata = legalMetadata(policyHistoryPage);

export default function PolicyHistoryPage() {
  return <LegalDocument page={policyHistoryPage} />;
}
