"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { getNavigationContent } from "@/lib/cms/content";

const navigationContent = getNavigationContent();
const navItems = navigationContent.header.primaryItems;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const menuId = useId();

  useEffect(() => {
    function updateScrolled() {
      setScrolled(window.scrollY > 8);
    }

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        wasOpenRef.current = false;
        menuButtonRef.current?.focus();
      }
      return;
    }

    wasOpenRef.current = true;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b border-grey-200 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_2px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 sm:px-5 lg:gap-4 lg:px-8 ${
          scrolled ? "py-1.5" : "py-2"
        }`}
      >
        {/*
          Wordmark 28px tall (within 24–32). BrandLogo adds clear space X = 0.286×CH.
          Width at 28px tall ≈ 142px (≥ 96px minimum). Never retype HACIEN in a font.
          F18: keep wordmark on phone and tablet (not icon-only).
        */}
        <Link
          href="/"
          className="group inline-flex min-h-11 min-w-11 shrink-0 items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          aria-label="HACIEN home"
        >
          <BrandLogo variant="wordmark" height={28} priority />
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-grey-600 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex items-center gap-2 rounded px-3 py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue ${
                  active ? "bg-blue-tint font-semibold text-ink" : "hover:bg-grey-100 hover:text-ink"
                }`}
              >
                {active ? <span className="pixel-marker !mr-0" aria-hidden="true" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          <Link
            href={navigationContent.header.quoteAction.href}
            className="rounded bg-blue px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
          >
            {navigationContent.header.quoteAction.label}
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          className="grid h-11 w-11 place-items-center rounded border border-grey-200 bg-white text-ink transition-colors hover:bg-grey-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <span className="sr-only">Menu</span>
          <span className="grid gap-1.5" aria-hidden="true">
            <span className="block h-0.5 w-4 bg-current" />
            <span className="block h-0.5 w-4 bg-current" />
          </span>
        </button>
      </div>

      {open ? (
        <div id={menuId} className="motion-slide-up border-t border-grey-200 bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 pb-3">
            <div className="text-xs font-semibold uppercase tracking-[0.08em] text-grey-600">Menu</div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-grey-200 bg-white text-ink transition-colors hover:bg-grey-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
              aria-label="Close navigation"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ×
              </span>
            </button>
          </div>
          <nav className="mx-auto grid max-w-7xl gap-1 text-sm font-medium text-grey-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`inline-flex min-h-11 items-center gap-2 rounded px-3 py-3 transition-colors ${
                  isActive(item.href) ? "bg-blue-tint font-semibold text-ink" : "hover:bg-grey-100 hover:text-ink"
                }`}
              >
                {isActive(item.href) ? <span className="pixel-marker !mr-0" aria-hidden="true" /> : null}
                {item.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-grey-200 pt-4">
              <Link
                href={navigationContent.header.quoteAction.href}
                onClick={closeMenu}
                className="inline-flex min-h-11 w-full items-center justify-center rounded bg-blue px-4 py-3 text-center font-medium text-white hover:bg-blue-dark"
              >
                {navigationContent.header.quoteAction.label}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
