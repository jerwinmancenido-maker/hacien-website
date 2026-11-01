import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-500">
        <li>
          <Link
            href="/"
            className="interactive-link inline-flex min-h-11 items-center hover:text-[#2563EB]"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1">
            <span aria-hidden="true" className="text-grey-200">
              /
            </span>
            {item.href ? (
              <Link
                href={item.href}
                className="interactive-link inline-flex min-h-11 items-center hover:text-[#2563EB]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="inline-flex min-h-11 items-center font-medium text-slate-700" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
