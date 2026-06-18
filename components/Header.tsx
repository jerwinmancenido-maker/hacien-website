"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useQuoteCart } from "@/components/QuoteCartProvider";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/solutions", label: "Solutions" },
  { href: "/products", label: "Products" },
  { href: "/government-procurement", label: "Government" },
  { href: "/insights", label: "Insights" },
  { href: "/erp-platform", label: "ERP Platform" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { totalQuantity } = useQuoteCart();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 shadow-sm shadow-slate-950/5 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded bg-[#071426] text-sm font-bold text-white">
            H
          </span>
          <span>
            <span className="block text-sm font-bold tracking-wide text-slate-950">HACIEN</span>
            <span className="block text-xs text-slate-500">Information Technology Solutions</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`interactive-link border-b-2 py-1 ${
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? "border-[#1457d9] text-[#1457d9]"
                  : "border-transparent hover:text-[#1457d9]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/quote"
            className={`interactive-link rounded border px-4 py-2 text-sm font-semibold ${
              pathname === "/quote"
                ? "border-[#1457d9] text-[#1457d9]"
                : "border-slate-300 text-slate-900 hover:border-[#1457d9] hover:text-[#1457d9]"
            }`}
          >
            RFQ Cart ({totalQuantity})
          </Link>
          <Link
            href="/contact"
            className="button-glow rounded bg-[#1457d9] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 hover:bg-[#0f46b4]"
          >
            Request a Quote
          </Link>
        </div>

        <button
          className="interactive-link rounded border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="motion-slide-up border-t border-slate-200 bg-white px-4 py-4 shadow-lg shadow-slate-950/5 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-3 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={pathname === item.href ? "font-bold text-[#1457d9]" : ""}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/quote" onClick={() => setOpen(false)} className="font-semibold text-[#1457d9]">
              RFQ Cart ({totalQuantity})
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
