"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { getNavigationContent } from "@/lib/cms/content";
import { VA_BTN_PRIMARY_44, VA_FOCUS_ON_CANVAS, VA_WRAP } from "@/lib/variant-a";

const navigationContent = getNavigationContent();
const navItems = navigationContent.header.primaryItems;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const menuId = useId();

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

  // Staff contact cards (/c/:id) are standalone one-screen pages.
  if (pathname?.startsWith("/c/")) return null;

  return (
    <header className="sticky top-0 z-50 bg-[#0B0C10]">
      <div className={`${VA_WRAP} flex items-center justify-between gap-2 py-[14px] sm:gap-4`}>
        {/*
          White wordmark-only variant at 28px tall, full contrast, never dimmed.
          BrandLogo adds clear space X = 0.286×CH.
          G09: -ml-[7px] offsets BrandLogo internal clear space so visual letter 'H' aligns with container edge at 1440.
        */}
        <Link
          href="/"
          className={`-ml-[7px] inline-flex min-h-11 min-w-11 shrink-0 items-center rounded-full ${VA_FOCUS_ON_CANVAS}`}
          aria-label="HACIEN home"
        >
          {/* Below sm the wordmark steps down to 22px so logo + quote pill + menu button fit a 360px viewport. */}
          <span className="sm:hidden">
            <BrandLogo variant="wordmark-white" height={22} priority />
          </span>
          <span className="hidden sm:inline-flex">
            <BrandLogo variant="wordmark-white" height={28} priority />
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center rounded-full px-3 py-2.5 text-[14.5px] transition-colors hover:bg-[#15171D] hover:text-[#F4F6FA] ${VA_FOCUS_ON_CANVAS} ${
                  active ? "font-semibold text-[#F4F6FA]" : "font-medium text-[#C3C8D2]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <Link
            href={navigationContent.header.quoteAction.href}
            className={`${VA_BTN_PRIMARY_44} max-sm:px-3.5 max-sm:text-[12.5px]`}
          >
            {navigationContent.header.quoteAction.label}
          </Link>

          <button
            ref={menuButtonRef}
            className={`grid h-11 w-11 place-items-center rounded-full bg-[#1E2129] text-[#F4F6FA] transition-colors hover:bg-[#2A2E38] ${VA_FOCUS_ON_CANVAS} lg:hidden`}
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
      </div>

      {open ? (
        <div id={menuId} className="motion-slide-up bg-[#0B0C10] px-6 py-4 lg:hidden">
          <div className="mx-auto flex w-full max-w-[1180px] items-center justify-end pb-3">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1E2129] text-[#F4F6FA] transition-colors hover:bg-[#2A2E38] ${VA_FOCUS_ON_CANVAS}`}
              aria-label="Close navigation"
            >
              <span aria-hidden="true" className="text-xl leading-none">
                ×
              </span>
            </button>
          </div>
          <nav className="mx-auto grid w-full max-w-[1180px] gap-1" aria-label="Menu">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full px-3 py-3 text-[14.5px] transition-colors hover:bg-[#15171D] hover:text-[#F4F6FA] ${VA_FOCUS_ON_CANVAS} ${
                    active ? "bg-[#15171D] font-semibold text-[#F4F6FA]" : "font-medium text-[#C3C8D2]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-3 pt-4 shadow-[0_-1px_0_#15171D]">
              <Link
                href={navigationContent.header.quoteAction.href}
                onClick={closeMenu}
                className={`${VA_BTN_PRIMARY_44} w-full`}
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
