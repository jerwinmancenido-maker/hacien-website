import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { DocumentIntro, DocumentPageShell, DocumentSection } from "@/components/DocumentLayout";
import { policyFooterLinks } from "@/app/policies/_lib/links";

export const LEGAL_PUBLISH_DATE = "November 2, 2026";

export type ListItem = {
  text: string;
  bullets?: string[];
};

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: ListItem[] }
  | { kind: "ol"; items: ListItem[] }
  | { kind: "table"; headers: string[]; rows: string[][] }
  | { kind: "pairs"; rows: [string, string][] };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

export type LegalPageModel = {
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  versionLine: string;
  historyLink: boolean;
  showContents: boolean;
  meta: { label: string; value: string }[];
  intro: LegalBlock[];
  sections: LegalSection[];
};

const linkClass = "font-semibold text-blue hover:text-blue-dark";

export function sectionSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const requiredAnchors: Record<string, string> = {
  "6. Delivery and acceptance": "6-delivery-and-acceptance",
  "11. Cancellations, changes and returns": "11-cancellations-changes-and-returns",
  "14. Responsibility for loss (liability)": "14-responsibility-for-loss-liability",
};

for (const [title, id] of Object.entries(requiredAnchors)) {
  if (sectionSlug(title) !== id) {
    throw new Error(`Legal heading slug mismatch for "${title}"`);
  }
}

function renderLink(label: string, href: string, key: string) {
  if (href.startsWith("/")) {
    return (
      <Link key={key} href={href} className={linkClass}>
        {label}
      </Link>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a key={key} href={href} className={linkClass}>
        {label}
      </a>
    );
  }
  return (
    <a key={key} href={href} className={linkClass}>
      {label}
    </a>
  );
}

const INLINE =
  /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)\s]+)\))|(https?:\/\/[^\s<>)\]]+)|([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;

export function parseInline(input: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let index = 0;
  for (const match of input.matchAll(INLINE)) {
    const start = match.index ?? 0;
    if (start > last) nodes.push(input.slice(last, start));
    const key = `${start}-${index}`;
    if (match[2] != null) {
      nodes.push(
        <strong key={key} className="font-semibold text-ink">
          {match[2]}
        </strong>,
      );
    } else if (match[4] != null && match[5] != null) {
      nodes.push(renderLink(match[4], match[5], key));
    } else if (match[6] != null) {
      let url = match[6];
      let trailing = "";
      while (/[.,]$/.test(url)) {
        trailing = url.slice(-1) + trailing;
        url = url.slice(0, -1);
      }
      nodes.push(renderLink(url, url, key));
      if (trailing) nodes.push(trailing);
    } else if (match[7] != null) {
      nodes.push(renderLink(match[7], `mailto:${match[7]}`, key));
    }
    last = start + match[0].length;
    index += 1;
  }
  if (last < input.length) nodes.push(input.slice(last));
  return nodes;
}

function Rich({ text }: { text: string }) {
  return <>{parseInline(text)}</>;
}

function Items({ items, ordered }: { items: ListItem[]; ordered: boolean }) {
  const ListTag = ordered ? "ol" : "ul";
  const listClass = ordered ? "list-decimal space-y-3 pl-5" : "list-disc space-y-2 pl-5";
  return (
    <ListTag className={listClass}>
      {items.map((item) => (
        <li key={item.text}>
          <Rich text={item.text} />
          {item.bullets?.length ? (
            <ul className="mt-2 list-disc space-y-2 pl-5">
              {item.bullets.map((bullet) => (
                <li key={bullet}>
                  <Rich text={bullet} />
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ListTag>
  );
}

function BlockView({ block }: { block: LegalBlock }) {
  if (block.kind === "p") {
    return (
      <p>
        <Rich text={block.text} />
      </p>
    );
  }
  if (block.kind === "ul" || block.kind === "ol") {
    return <Items items={block.items} ordered={block.kind === "ol"} />;
  }
  if (block.kind === "pairs") {
    return (
      <div className="min-w-0 overflow-x-auto">
        <table className="w-full table-auto border-collapse text-left max-sm:table-fixed">
          <tbody>
            {block.rows.map(([label, value]) => (
              <tr key={label} className="border-b border-grey-200 align-top">
                <th scope="row" className="w-36 py-3 pr-4 align-top font-semibold break-words text-ink sm:w-56">
                  <Rich text={label} />
                </th>
                <td className="py-3 align-top break-words">
                  <Rich text={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <>
      <div className="grid gap-4 sm:hidden">
        {block.rows.map((row) => (
          <div key={row.join(" | ")} className="border-b border-grey-200 pb-4">
            {row.map((cell, cellIndex) => (
              <p key={`${cell}-${cellIndex}`} className="mt-2 first:mt-0">
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-grey-600">
                  {block.headers[cellIndex]}
                </span>
                <Rich text={cell} />
              </p>
            ))}
          </div>
        ))}
      </div>
      <div className="hidden min-w-0 overflow-x-auto sm:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-grey-200">
              {block.headers.map((header) => (
                <th key={header} className="py-2 pr-4 align-top font-semibold text-ink">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join(" | ")} className="border-b border-grey-200 align-top">
                {row.map((cell, cellIndex) => (
                  <td key={`${cell}-${cellIndex}`} className="py-3 pr-4 align-top">
                    <Rich text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="grid min-w-0 gap-3">
      {blocks.map((block, index) => (
        <BlockView key={block.kind === "p" ? block.text : `${block.kind}-${index}`} block={block} />
      ))}
    </div>
  );
}

function sectionPlainText(section: LegalSection) {
  return [section.title, ...section.blocks.map(blockPlainText)].join("\n");
}

function blockPlainText(block: LegalBlock) {
  if (block.kind === "p") return block.text;
  if (block.kind === "ul" || block.kind === "ol") {
    return block.items.map((item) => [item.text, ...(item.bullets ?? [])].join("\n")).join("\n");
  }
  if (block.kind === "pairs") return block.rows.map((row) => row.join(" ")).join("\n");
  return [block.headers.join(" "), ...block.rows.map((row) => row.join(" "))].join("\n");
}

export function legalPagePlainText(page: LegalPageModel) {
  return [
    page.title,
    page.versionLine,
    page.description,
    ...page.intro.map(blockPlainText),
    ...page.sections.map(sectionPlainText),
  ].join("\n");
}

export function legalMetadata(page: LegalPageModel): Metadata {
  return {
    title: page.title.includes("HACIEN") ? { absolute: page.title } : page.title,
    description: page.description,
  };
}

export function LegalDocument({ page }: { page: LegalPageModel }) {
  const numberedAt = page.sections.findIndex((section) => /^\d+\.\s/.test(section.title));
  const leading = numberedAt === -1 ? page.sections : page.sections.slice(0, numberedAt);
  const numbered = numberedAt === -1 ? [] : page.sections.slice(numberedAt);

  return (
    <DocumentPageShell
      eyebrow={page.eyebrow}
      title={page.title}
      description={page.versionLine}
      meta={page.meta}
      plain
    >
      {page.historyLink ? (
        <p>
          <Link href="/policies/history" className={linkClass}>
            Earlier versions
          </Link>
        </p>
      ) : null}
      {page.intro.length ? (
        <div className="min-w-0">
          <DocumentIntro>
            <Blocks blocks={page.intro} />
          </DocumentIntro>
        </div>
      ) : null}
      {leading.map((section, index) => (
        <div key={section.title} id={sectionSlug(section.title)} className="min-w-0 scroll-mt-28">
          <DocumentSection title={section.title} index={index}>
            <Blocks blocks={section.blocks} />
          </DocumentSection>
        </div>
      ))}
      {page.showContents && numbered.length ? (
        <DocumentSection title="On this page" index={leading.length}>
          <ol className="list-decimal space-y-2 pl-5">
            {numbered.map((section) => (
              <li key={section.title}>
                <Link href={`#${sectionSlug(section.title)}`} className={linkClass}>
                  {section.title.replace(/^\d+\.\s+/, "")}
                </Link>
              </li>
            ))}
          </ol>
        </DocumentSection>
      ) : null}
      {numbered.map((section, index) => (
        <div key={section.title} id={sectionSlug(section.title)} className="min-w-0 scroll-mt-28">
          <DocumentSection title={section.title} index={leading.length + index + 1}>
            <Blocks blocks={section.blocks} />
          </DocumentSection>
        </div>
      ))}
      <nav aria-label="Policies" className="text-sm leading-6">
        {policyFooterLinks.map((link, index) => (
          <span key={link.href}>
            {index > 0 ? <span className="text-grey-400"> · </span> : null}
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </span>
        ))}
      </nav>
    </DocumentPageShell>
  );
}
