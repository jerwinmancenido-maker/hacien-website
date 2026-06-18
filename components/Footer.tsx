import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#071426] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="text-lg font-bold">HACIEN Information Technology Solutions</div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            IT infrastructure, procurement, systems integration, and project-based technology
            sourcing for Philippine organizations.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Company</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/about">About Us</Link>
            <Link href="/solutions">Solutions</Link>
            <Link href="/government-procurement">Government Procurement</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Catalog</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/products">Products</Link>
            <Link href="/quote">RFQ Cart</Link>
            <Link href="/erp-platform">ERP Platform</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">Contact</div>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <span>Pasig City, Philippines</span>
            <span>sales@haciensolutions.com</span>
            <Link href="/contact" className="text-white">Send inquiry</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <span>© 2026 HACIEN Information Technology Solutions. All rights reserved.</span>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white">Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
}
