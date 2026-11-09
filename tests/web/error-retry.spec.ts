import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  ERROR_RETRY_BUTTON_LABEL,
  ERROR_RETRY_HELPER_RELOAD,
  ERROR_RETRY_HELPER_RESET,
  ERROR_RETRY_STORAGE_KEY,
  ERROR_RETRY_WINDOW_MS,
  decideErrorRetry,
  readErrorRetryRecord,
} from "@/lib/error-retry";

describe("decideErrorRetry", () => {
  const now = 1_700_000_000_000;

  it("resets when there is no record, another path, or the window has passed", () => {
    expect(decideErrorRetry(null, "/quote", now)).toBe("reset");
    expect(decideErrorRetry({ path: "/contact", at: now - 1000 }, "/quote", now)).toBe("reset");
    expect(
      decideErrorRetry({ path: "/quote", at: now - ERROR_RETRY_WINDOW_MS }, "/quote", now),
    ).toBe("reset");
  });

  it("reloads when the same path's error returned inside the window", () => {
    expect(decideErrorRetry({ path: "/quote", at: now - ERROR_RETRY_WINDOW_MS + 1 }, "/quote", now)).toBe(
      "reload",
    );
  });

  it("rejects a malformed record", () => {
    expect(readErrorRetryRecord(null)).toBeNull();
    expect(readErrorRetryRecord("not-json")).toBeNull();
    expect(readErrorRetryRecord("{}")).toBeNull();
    expect(readErrorRetryRecord(JSON.stringify({ path: "/quote", at: "today" }))).toBeNull();
    expect(readErrorRetryRecord(JSON.stringify({ path: "/quote", at: now }))).toEqual({
      path: "/quote",
      at: now,
    });
  });
});

describe("error page wiring", () => {
  it("uses the shared wording and tries reset before reload", () => {
    const page = readFileSync(join(process.cwd(), "app/error.tsx"), "utf8");
    expect(ERROR_RETRY_BUTTON_LABEL).toBe("Try again");
    expect(ERROR_RETRY_HELPER_RESET).toBe(
      "This reopens the page. If the error comes back, tap Try again once more to reload it.",
    );
    expect(ERROR_RETRY_HELPER_RELOAD).toBe("This reloads the page.");
    expect(ERROR_RETRY_STORAGE_KEY).toBe("hacien-error-retry");
    expect(page).toContain("ERROR_RETRY_BUTTON_LABEL");
    expect(page).toContain("ERROR_RETRY_HELPER_RESET");
    expect(page).toContain("ERROR_RETRY_HELPER_RELOAD");
    expect(page).toContain("decideErrorRetry");
    expect(page).toContain("reset()");
    expect(page).toContain("window.location.reload()");
    expect(page).not.toContain("error.message");
    expect(page).not.toContain("error.digest");
    expect(page).toContain("Something went wrong");
    expect(page).toContain("Return home");
    expect(page).toContain("System Alert");
  });
});
