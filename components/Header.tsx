"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuoteCart } from "@/components/QuoteCartProvider";

const navItems = [
  { href: "/", label: "Headquarters" },
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/industries", label: "Industries" },
  { href: "/trust-center", label: "Trust Center" },
  { href: "/insights", label: "Insights" },
];

const companyItems = [
  { href: "/about", label: "About HACIEN" },
  { href: "/about/company-profile", label: "Company Profile" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
  { href: "/search", label: "Search" },
];

const futureCompanyItems = ["Careers", "Partner Area"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const { totalQuantity } = useQuoteCart();
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 shadow-sm shadow-slate-950/5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-[#071426] text-sm font-bold text-white">
            H
          </span>
          <span>
            <span className="block text-sm font-bold tracking-wide text-slate-950">HACIEN</span>
            <span className="block text-xs text-slate-500">Information Technology Solutions</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`interactive-link border-b-2 py-1 ${
                isActive(item.href) ? "border-[#1457d9] text-[#1457d9]" : "border-transparent hover:text-[#1457d9]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setCompanyOpen((value) => !value)}
              className={`interactive-link border-b-2 py-1 text-sm font-medium ${
                pathname.startsWith("/about") || pathname === "/contact"
                  ? "border-[#1457d9] text-[#1457d9]"
                  : "border-transparent hover:text-[#1457d9]"
              }`}
              aria-expanded={companyOpen}
              aria-haspopup="menu"
            >
              Company
            </button>
            {companyOpen ? (
              <div className="absolute right-0 top-9 w-72 rounded-lg border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/12">
                <div className="grid gap-1">
                  {companyItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setCompanyOpen(false)}
                      className="rounded px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#1457d9]"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="mt-2 border-t border-slate-100 pt-2">
                    {futureCompanyItems.map((item) => (
                      <div key={item} className="rounded px-3 py-2 text-sm font-semibold text-slate-400">
                        {item} <span className="text-xs">(Future)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:flex">
          <Link
            href="/login"
            className={`interactive-link rounded border px-4 py-2 text-sm font-semibold ${
              pathname === "/login"
                ? "border-[#1457d9] text-[#1457d9]"
                : "border-slate-300 text-slate-900 hover:border-[#1457d9] hover:text-[#1457d9]"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/quote"
            className="button-glow rounded bg-[#1457d9] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 hover:bg-[#0f46b4]"
          >
            Request Quote{totalQuantity ? ` (${totalQuantity})` : ""}
          </Link>
        </div>

        <button
          className="interactive-link rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="motion-slide-up border-t border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-950/5 xl:hidden">
          <nav className="mx-auto grid max-w-7xl gap-3 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={isActive(item.href) ? "font-bold text-[#1457d9]" : ""}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-slate-100 pt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Company
            </div>
            {companyItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-slate-100 pt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Customer
            </div>
            <Link href="/login" onClick={() => setOpen(false)} className={pathname === "/login" ? "font-bold text-[#1457d9]" : ""}>
              Sign In
            </Link>
            <Link href="/quote" onClick={() => setOpen(false)} className="font-semibold text-[#1457d9]">
              Request Quote{totalQuantity ? ` (${totalQuantity})` : ""}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
