import Image from "next/image";
import Link from "next/link";
import { companyContact } from "@/data/companyContact";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#071426] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-white/10 pb-8 lg:grid-cols-[1.05fr_1.6fr] lg:items-start">
          <div>
            <Image
              src="/brand/hacien-wordmark-light.png"
              alt="HACIEN Information Technology Solutions"
              width={4096}
              height={1289}
              className="h-auto w-[230px] object-contain sm:w-[280px]"
            />
            <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300">
              Enterprise technology with operational clarity.
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
          <div>
            <div className="text-sm font-semibold text-slate-100">Company</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <Link href="/about">About</Link>
              <Link href="/about/company-profile">Company Profile</Link>
              <Link href="/trust-center">Trust & Compliance</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-100">Explore</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <Link href="/solutions">Solutions</Link>
              <Link href="/technology">Technology</Link>
              <Link href="/platform">Platform</Link>
              <Link href="/insights">Insights</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-100">Start</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <Link href="/quote">Request Quote</Link>
              <Link href="/products">Technology RFQ Builder</Link>
              <Link href="/support">Support</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-100">Access</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <Link href="/access">Access HACIEN</Link>
              <Link href="/customer-workspace">Customer Workspace</Link>
              <Link href="/search">Search</Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-slate-100">Legal</div>
            <div className="mt-4 grid gap-3 text-sm text-slate-300">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/legal">Legal</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-slate-400">
        <span>© 2026 HACIEN Information Technology Solutions. All rights reserved.</span>
      </div>
    </footer>
  );
}
