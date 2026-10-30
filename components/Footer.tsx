import Image from "next/image";
import Link from "next/link";
import { companyContact } from "@/data/companyContact";
import { getNavigationContent } from "@/lib/cms/content";

export function Footer() {
  const navigationContent = getNavigationContent();

  return (
    <footer className="border-t border-slate-200 bg-[#071426] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.05fr_1.6fr] lg:items-start">
          <div>
            <Image
              src="/brand/hacien-wordmark-light.png"
              alt="HACIEN Information Technology Solutions"
              width={280}
              height={88}
              className="h-auto w-[230px] object-contain sm:w-[280px]"
            />
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300">
              {navigationContent.footer.statement}
            </p>
          </div>

          <div className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-300 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Contact</div>
              <p className="mt-2 font-semibold leading-6 text-white">{companyContact.contactInstruction}</p>
            </div>
            <address className="not-italic leading-6">
              <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                {companyContact.addressLabel}
              </span>
              <span>{companyContact.addressLines.join(", ")}</span>
            </address>
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {navigationContent.footer.groups.map((group) => (
            <div key={group.title}>
              <div className="text-sm font-semibold text-slate-100">{group.title}</div>
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                {group.links.map((link) => (
                  <Link key={`${group.title}-${link.href}`} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        <span>© {new Date().getFullYear()} HACIEN Information Technology Solutions. All rights reserved.</span>
      </div>
    </footer>
  );
}
