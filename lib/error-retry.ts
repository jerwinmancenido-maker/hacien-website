/** Root error page retry.
 *
 *  The first tap reopens the segment with Next.js reset(). If this
 *  same path is showing the error again within the window, the next
 *  tap reloads the document. A missing or unreadable record stays on
 *  reset — the page does not reload without evidence the error came back.
 */

export const ERROR_RETRY_STORAGE_KEY = "hacien-error-retry";
export const ERROR_RETRY_WINDOW_MS = 15_000;

export const ERROR_RETRY_BUTTON_LABEL = "Try again";
export const ERROR_RETRY_HELPER_RESET =
  "This reopens the page. If the error comes back, tap Try again once more to reload it.";
export const ERROR_RETRY_HELPER_RELOAD = "This reloads the page.";

export type ErrorRetryAction = "reset" | "reload";

export type ErrorRetryRecord = {
  path: string;
  at: number;
};

export function readErrorRetryRecord(raw: string | null): ErrorRetryRecord | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (!data || typeof data !== "object" || Array.isArray(data)) return null;
    const path = (data as { path?: unknown }).path;
    const at = (data as { at?: unknown }).at;
    if (typeof path !== "string" || path.length === 0) return null;
    if (typeof at !== "number" || !Number.isFinite(at)) return null;
    return { path, at };
  } catch {
    return null;
  }
}

export function decideErrorRetry(
  record: ErrorRetryRecord | null,
  path: string,
  now: number,
): ErrorRetryAction {
  if (!record || record.path !== path) return "reset";
  if (now < record.at || now - record.at >= ERROR_RETRY_WINDOW_MS) return "reset";
  return "reload";
}
