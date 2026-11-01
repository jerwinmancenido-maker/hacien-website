import type { Metadata } from "next";
import Link from "next/link";
import { DocumentPageShell } from "@/components/DocumentLayout";
import { birBadgeAlt, birBadgeLabel } from "@/components/Footer";

const registrationSentence = "HACIEN Information Technology Solutions is registered with the Bureau of Internal Revenue.";

export const metadata: Metadata = {
  title: "Government Compliance",
  description: registrationSentence,
};

const linkClass = "font-semibold text-blue hover:text-blue-dark";

export default function CompliancePage() {
  return (
    <DocumentPageShell eyebrow="" title="Government Compliance" description={registrationSentence} meta={[]} plain>
      {/* Official BIR seal at readable size. Scale only; the file is served unaltered. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- BIR RMC No. 38-2026 requires the seal unaltered; next/image recompresses it */}
      <img
        src="/brand/bir-registration-badge.png"
        alt={birBadgeAlt()}
        width={1626}
        height={582}
        className="block h-auto w-full max-w-[1626px]"
        decoding="async"
      />
      <p>{birBadgeLabel()}</p>
      <p>Scan the QR code on the badge to verify our registration with the BIR.</p>
      <ul className="list-disc space-y-2 pl-5">
        <li>DTI registered</li>
        <li>BIR registered (Non-VAT)</li>
        <li>Pasig City Mayor&apos;s Permit</li>
        <li>PhilGEPS registered</li>
      </ul>
      <p>
        Copies of our registration documents are provided on quotation or accreditation.{" "}
        <Link href="/legal" className={linkClass}>
          Legal
        </Link>
      </p>
    </DocumentPageShell>
  );
}
