import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { companyContact } from "@/data/companyContact";
import { getNavigationContent } from "@/lib/cms/content";

export function Footer() {
  const navigationContent = getNavigationContent();

  return (
    <footer className="relative z-10 border-t border-grey-200 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.05fr_1.6fr] lg:items-start">
          <div>
            {/*
              Full white lockup on ink. Width ≥ 200px (handoff min).
              230px on narrow viewports, 280px from sm up — both above the 200px floor.
              BrandLogo adds clear space X = 0.286×CH. Never retype HACIEN — SVG only.
            */}
            <BrandLogo variant="full-white" width={280} />
            <p className="mt-4 max-w-lg text-sm leading-6 text-grey-400">
              {navigationContent.footer.statement}
            </p>
          </div>

          <div className="grid gap-4 rounded border border-white/10 bg-white/[0.04] p-5 text-sm text-grey-400 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.08em] text-grey-400">Contact</div>
              <p className="mt-2 font-medium leading-6 text-white">{companyContact.contactInstruction}</p>
            </div>
            <address className="not-italic leading-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-grey-400">
                {companyContact.addressLabel}
              </span>
              <span>{companyContact.addressLines.join(", ")}</span>
            </address>
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {navigationContent.footer.groups.map((group) => (
            <div key={group.title}>
              <div className="text-sm font-medium text-white">{group.title}</div>
              <div className="mt-4 grid gap-3 text-sm text-grey-400">
                {group.links.map((link) => (
                  <Link key={`${group.title}-${link.href}`} href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-grey-400">
        <span>© {new Date().getFullYear()} HACIEN Information Technology Solutions. All rights reserved.</span>
      </div>
    </footer>
  );
}
