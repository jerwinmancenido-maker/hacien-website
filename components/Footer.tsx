import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#071426] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.25fr_0.85fr_0.9fr_0.9fr_1fr_0.85fr] lg:px-8">
        <div>
          <div className="inline-flex rounded bg-white px-3 py-2">
            <Image
              src="/brand/hacien-wordmark.png"
              alt="HACIEN Information Technology Solutions"
              width={300}
              height={93}
              className="h-auto w-[220px] object-contain sm:w-[260px]"
            />
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            Enterprise technology with operational clarity. HACIEN helps organizations move from requirement to review, quotation, delivery, and relationship continuity.
          </p>
          <p className="mt-4 max-w-md rounded border border-white/10 bg-white/[0.05] p-3 text-xs leading-5 text-slate-300">
            Registered company identity and professional inquiry intake are supported. Verification documents may be made available upon request to qualified customers, suppliers, partners, and procurement entities.
          </p>
        </div>
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
          <div className="text-sm font-semibold text-slate-100">Solutions</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/solutions">Solutions</Link>
            <Link href="/government-procurement">Government Procurement</Link>
            <Link href="/insights">Insights</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Technology</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/technology">Technology Domains</Link>
            <Link href="/products">Representative Categories</Link>
            <Link href="/platform">Platform</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Access</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/access">Access HACIEN</Link>
            <Link href="/customer-workspace">Customer Workspace</Link>
            <Link href="/support">Support</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Start</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/quote">Request Quote</Link>
            <Link href="/search">Search</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        <span>© 2026 HACIEN Information Technology Solutions. All rights reserved.</span>
      </div>
    </footer>
  );
}
