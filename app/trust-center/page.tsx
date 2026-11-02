import type { Metadata } from "next";
import Link from "next/link";
import { DocumentClause, DocumentIntro, DocumentPageShell, DocumentSection } from "@/components/DocumentLayout";
import type { CmsDocumentBullet, CmsDocumentRecord } from "@/lib/cms/documents";
import { getCmsDocumentRecord } from "@/lib/cms/documents";

const trustcenterDocument = getCmsDocumentRecord("trust-center");

export const metadata: Metadata = {
  title: trustcenterDocument.title,
  description: trustcenterDocument.description,
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
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-grey-600">{clause.status}</div>
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

export default function TrustCenterPage() {
  return (
    <DocumentPageShell
      eyebrow={trustcenterDocument.eyebrow}
      title={trustcenterDocument.title}
      description={trustcenterDocument.description}
      meta={[
        { label: "Version", value: trustcenterDocument.version },
        { label: "Effective", value: trustcenterDocument.effectiveDate },
        { label: "Updated", value: trustcenterDocument.updatedAt },
      ]}
    >
      <DocumentIntro>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            {trustcenterDocument.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote" className="button-glow rounded bg-[#0A0A0A] px-5 py-3 text-center text-sm font-bold text-white">
                Request a Quote
              </Link>
              <Link href="/support" className="interactive-link rounded border border-slate-300 bg-white/80 px-5 py-3 text-center text-sm font-bold text-slate-900">
                Contact support
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50/80 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-grey-600">Current public status</div>
            <div className="mt-4 grid gap-2">
              {[
                ["Company information", "Bounded"],
                ["Business communication", "Review path"],
                ["Formal documents", "Upon approved request"],
                ["Payment details", "Not published"],
                ["RFQ intake", "Review path available"],
              ].map(([label, status]) => (
                <div key={label} className="flex items-center justify-between gap-4 rounded border border-slate-200 bg-white/80 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-700">{label}</span>
                  <span className="text-right text-xs font-bold uppercase tracking-[0.12em] text-grey-600">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DocumentIntro>

      {renderDocumentSections(trustcenterDocument)}

    </DocumentPageShell>
  );
}
