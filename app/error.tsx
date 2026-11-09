"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import {
  ERROR_RETRY_BUTTON_LABEL,
  ERROR_RETRY_HELPER_RELOAD,
  ERROR_RETRY_HELPER_RESET,
  ERROR_RETRY_STORAGE_KEY,
  decideErrorRetry,
  readErrorRetryRecord,
  type ErrorRetryAction,
} from "@/lib/error-retry";

function subscribeErrorRetry() {
  return () => {};
}

function readErrorRetryAction(path: string): ErrorRetryAction {
  try {
    return decideErrorRetry(
      readErrorRetryRecord(window.sessionStorage.getItem(ERROR_RETRY_STORAGE_KEY)),
      path,
      Date.now(),
    );
  } catch {
    return "reset";
  }
}

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname() || "/";
  const action = useSyncExternalStore(
    subscribeErrorRetry,
    () => readErrorRetryAction(pathname),
    () => "reset" satisfies ErrorRetryAction,
  );

  function onRetry() {
    if (action === "reload") {
      try {
        window.sessionStorage.removeItem(ERROR_RETRY_STORAGE_KEY);
      } catch {
        // Storage can be blocked. The reload still runs.
      }
      window.location.reload();
      return;
    }
    try {
      window.sessionStorage.setItem(
        ERROR_RETRY_STORAGE_KEY,
        JSON.stringify({ path: pathname, at: Date.now() }),
      );
    } catch {
      // Without a record the next visit resets again.
    }
    reset();
  }

  const helper = action === "reload" ? ERROR_RETRY_HELPER_RELOAD : ERROR_RETRY_HELPER_RESET;

  return (
    <section className="motion-slide-up flex min-h-[65vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="surface mx-auto max-w-lg rounded p-8 text-center sm:p-12">
        <div className="mx-auto flex flex-col items-center gap-4">
          <BrandLogo variant="icon" height={56} />
          <span className="inline-flex items-center rounded bg-grey-100 px-3.5 py-1 text-xs font-semibold text-ink ring-1 ring-inset ring-grey-200">
            System Alert
          </span>
        </div>
        <h1 className="font-display mt-6 text-2xl tracking-tight text-ink sm:text-3xl">Something went wrong</h1>
        <p className="mt-4 text-sm leading-6 text-grey-600">
          An unexpected error occurred while loading this page. Please try again or return to the home page.
        </p>
        <p id="error-retry-help" className="mt-4 text-sm leading-6 text-grey-600">
          {helper}
        </p>
        <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onRetry}
            aria-describedby="error-retry-help"
            className="focus-ring min-h-11 cursor-pointer rounded bg-blue px-6 py-3 text-sm font-medium text-white transition duration-200 hover:bg-blue-dark"
          >
            {ERROR_RETRY_BUTTON_LABEL}
          </button>
          <Link
            href="/"
            className="focus-ring flex min-h-11 items-center justify-center rounded border border-grey-200 px-6 py-3 text-center text-sm font-medium text-ink transition duration-200 hover:border-blue"
          >
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
