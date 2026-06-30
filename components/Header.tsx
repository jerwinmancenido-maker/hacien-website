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
  { href: "/insights", label: "Insights" },
  { href: "/trust-center", label: "Trust" },
];

const companyItems = [
  { href: "/about", label: "About HACIEN" },
  { href: "/about/company-profile", label: "Company Profile" },
  { href: "/contact", label: "Contact" },
  { href: "/support", label: "Support" },
  { href: "/search", label: "Search" },
];

const erpUrl =
  process.env.NEXT_PUBLIC_ERP_URL?.trim() || "https://erp.haciensolutions.com/login";
const isErpExternal = erpUrl.startsWith("http");

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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/88 shadow-sm shadow-slate-950/4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded bg-[#071426] text-sm font-bold text-white shadow-sm shadow-slate-950/10">
            H
          </span>
          <span>
            <span className="block text-sm font-bold tracking-wide text-slate-950">HACIEN</span>
            <span className="hidden text-xs text-slate-500 sm:block">Information Technology Solutions</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-slate-200 bg-slate-50/80 p-1 text-sm font-semibold text-slate-700 shadow-inner shadow-white lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-2 transition-colors ${
                isActive(item.href)
                  ? "bg-white text-[#071426] shadow-sm shadow-slate-950/8"
                  : "text-slate-600 hover:bg-white/80 hover:text-[#071426]"
              }`}
            >
              {item.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              onClick={() => setCompanyOpen((value) => !value)}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                pathname.startsWith("/about") || pathname === "/contact"
                  ? "bg-white text-[#071426] shadow-sm shadow-slate-950/8"
                  : "text-slate-600 hover:bg-white/80 hover:text-[#071426]"
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
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link
            href={erpUrl}
            target={isErpExternal ? "_blank" : undefined}
            rel={isErpExternal ? "noopener noreferrer" : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              pathname === "/login" && !isErpExternal
                ? "border-[#1457d9] text-[#1457d9]"
                : "border-slate-300 text-slate-900 hover:border-[#1457d9] hover:text-[#1457d9]"
            }`}
          >
            Sign In
          </Link>
          <Link
            href="/quote"
            className="button-glow rounded-full bg-[#1457d9] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 hover:bg-[#0f46b4]"
          >
            Request Quote{totalQuantity ? ` (${totalQuantity})` : ""}
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-950/5 transition-colors hover:border-[#1457d9] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Menu</span>
          <span className="grid gap-1.5">
            <span className="block h-0.5 w-4 rounded-full bg-current" />
            <span className="block h-0.5 w-4 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="motion-slide-up border-t border-slate-200/80 bg-white/96 px-4 py-4 shadow-2xl shadow-slate-950/10 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2 text-sm font-semibold text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 ${
                  isActive(item.href) ? "bg-slate-50 text-[#1457d9]" : "hover:bg-slate-50 hover:text-[#071426]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-slate-100 pt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Company
            </div>
            {companyItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 hover:bg-slate-50 hover:text-[#071426]"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-slate-100 pt-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Customer
            </div>
            <Link
              href={erpUrl}
              target={isErpExternal ? "_blank" : undefined}
              rel={isErpExternal ? "noopener noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 hover:bg-slate-50 hover:text-[#071426]"
            >
              Sign In
            </Link>
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="button-glow mt-1 rounded-full bg-[#1457d9] px-4 py-3 text-center font-bold text-white"
            >
              Request Quote{totalQuantity ? ` (${totalQuantity})` : ""}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
