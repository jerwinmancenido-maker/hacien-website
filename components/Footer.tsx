import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#071426] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.25fr_0.85fr_0.9fr_0.9fr_1fr_0.85fr] lg:px-8">
        <div>
          <div className="text-lg font-bold">HACIEN Information Technology Solutions</div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            Procurement-first IT sourcing, solutions consulting, and customer-success oriented technology coordination for Philippine organizations.
          </p>
          <p className="mt-4 max-w-md rounded border border-white/10 bg-white/[0.05] p-3 text-xs leading-5 text-slate-300">
            Company verification is in progress. HACIEN does not publish registration, address, bank, or permit claims until verified.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Company</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/about">About</Link>
            <Link href="/about/company-profile">Company Profile</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/support">Support</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Solutions</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/solutions">Solutions</Link>
            <Link href="/government-procurement">Government Procurement</Link>
            <Link href="/erp-platform">ERP Platform</Link>
            <Link href="/industries">Industries</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Products</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/products">Product Categories</Link>
            <Link href="/quote">Request Quote</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Customer</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/quote">Submit RFQ</Link>
            <Link href="/portal">
              Customer Portal <span className="text-xs text-blue-200">(Coming Soon)</span>
            </Link>
            <Link href="/trust-center">Trust Center</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Resources</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/insights">Insights</Link>
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
