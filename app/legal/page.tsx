import type { Metadata } from "next";
import Link from "next/link";
import { DocumentClause, DocumentIntro, DocumentPageShell, DocumentSection } from "@/components/DocumentLayout";
import type { CmsDocumentBullet, CmsDocumentRecord } from "@/lib/cms/documents";
import { getCmsDocumentRecord } from "@/lib/cms/documents";
import { companyContact } from "@/data/companyContact";

const legalDocument = getCmsDocumentRecord("legal");

export const metadata: Metadata = {
  title: legalDocument.title,
  description: legalDocument.description,
};

function bulletText(bullet: CmsDocumentBullet) {
  return typeof bullet === "string" ? bullet : bullet.text;
}

function renderDocumentSections(document: CmsDocumentRecord) {
  return document.sections.map((section, sectionIndex) => (
    <DocumentSection key={section.title} title={section.title} index={sectionIndex}>
      <div className="grid gap-3">
        {section.clauses.map((clause) => (
          <DocumentClause key={clause.heading} title={clause.heading}>
            {clause.status ? (
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]">{clause.status}</div>
            ) : null}
            {clause.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {clause.bullets ? (
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {clause.bullets.map((bullet) => (
                  <li key={bulletText(bullet)}>{bulletText(bullet)}</li>
                ))}
              </ul>
            ) : null}
          </DocumentClause>
        ))}
      </div>
    </DocumentSection>
  ));
}

export default function LegalPage() {
  return (
    <DocumentPageShell
      eyebrow={legalDocument.eyebrow}
      title={legalDocument.title}
      description={legalDocument.description}
      meta={[
        { label: "Version", value: legalDocument.version },
        { label: "Effective", value: legalDocument.effectiveDate },
        { label: "Updated", value: legalDocument.updatedAt },
      ]}
    >
      <DocumentIntro>
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div>
            {legalDocument.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div>
            <div className="font-bold text-slate-950">Registered office for formal notices</div>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Published office location and approved business communication path.
            </p>
            <address className="mt-2 not-italic">
              {companyContact.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-4 font-bold text-slate-950">Public business contact</div>
            <p className="mt-1 text-sm">{companyContact.contactInstruction}</p>
            <Link href="/contact" className="mt-3 inline-flex font-semibold text-[#2563EB]">
              Use Contact Form
            </Link>
          </div>
        </div>
      </DocumentIntro>

      {renderDocumentSections(legalDocument)}

      <div className="flex flex-col gap-3 rounded border border-slate-200 bg-white/88 p-4 text-xs leading-6 text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>{legalDocument.finalNote}</p>
        <div className="flex gap-3 font-bold text-[#2563EB]">
          {legalDocument.relatedLinks?.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </DocumentPageShell>
  );
}
