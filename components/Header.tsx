"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/technology", label: "Technology" },
  { href: "/platform", label: "Platform" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "Company" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function updateScrolled() {
      setScrolled(window.scrollY > 8);
    }

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const activeNavIndex = Math.max(navItems.findIndex((item) => isActive(item.href)), 0);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-slate-200/70 bg-white/82 backdrop-blur-2xl transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-slate-950/8" : "shadow-sm shadow-slate-950/3"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 lg:px-8 ${scrolled ? "py-2" : "py-3"}`}>
        <Link href="/" className="group flex shrink-0 items-center gap-3 rounded-full pr-3 transition hover:bg-slate-50/70">
          <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm shadow-slate-950/5 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#1457d9]/35 group-hover:shadow-lg group-hover:shadow-blue-900/10">
            <span className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 via-white to-blue-100/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <Image
              src="/brand/hacien-mark.png"
              alt="HACIEN logo"
              width={42}
              height={42}
              priority
              className="relative h-9 w-9 object-contain"
            />
          </span>
          <span>
            <span className="block text-sm font-bold tracking-wide text-slate-950 transition-colors group-hover:text-[#1457d9]">HACIEN</span>
            <span className="hidden text-xs text-slate-500 sm:block">Information Technology Solutions</span>
          </span>
        </Link>

        <nav className="glass-control relative hidden w-[540px] grid-cols-6 overflow-hidden rounded-full p-1 text-center text-sm font-semibold text-slate-700 lg:grid">
          <span
            className="pointer-events-none absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[calc((100%-0.5rem)/6)] rounded-full border border-white/80 bg-white/95 shadow-md shadow-slate-950/10 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${activeNavIndex * 100}%)` }}
            aria-hidden="true"
          />
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative z-10 rounded-full px-3.5 py-2 transition-all duration-200 ${
                isActive(item.href)
                  ? "text-[#071426]"
                  : "text-slate-600 hover:-translate-y-0.5 hover:bg-white/45 hover:text-[#071426]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link
            href="/access"
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
              pathname === "/access"
                ? "glass-control border-[#1457d9]/50 text-[#1457d9]"
                : "glass-control text-slate-900 hover:border-[#1457d9]/50 hover:text-[#1457d9] hover:shadow-lg hover:shadow-blue-950/10"
            }`}
          >
            Access HACIEN
          </Link>
          <Link
            href="/quote"
            className="button-glow rounded-full bg-[#1457d9] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0f46b4] hover:shadow-xl hover:shadow-blue-700/25"
          >
            Request Quote
          </Link>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-950/5 transition-all hover:-translate-y-0.5 hover:border-[#1457d9] hover:shadow-lg hover:shadow-blue-950/10 lg:hidden"
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
                className={`rounded-xl px-3 py-3 transition ${
                  isActive(item.href) ? "bg-blue-50 text-[#1457d9]" : "hover:bg-slate-50 hover:text-[#071426]"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-slate-100 pt-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Access
            </div>
            <Link
              href="/access"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 hover:bg-slate-50 hover:text-[#071426]"
            >
              Access HACIEN
            </Link>
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="button-glow mt-1 rounded-full bg-[#1457d9] px-4 py-3 text-center font-bold text-white"
            >
              Request Quote
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
