/**
 * Determines responsive grid column classes for search result groups.
 * - 1 result: full width (1 col)
 * - 2 results: 2 cols
 * - 3 results: 3 cols
 * - 4 results: 2 cols (2x2)
 * - 5 results: 6 cols (Row 1: 3 cards span 2; Row 2: 2 cards span 3)
 * - 7 results: 12 cols (Row 1: 3 cards span 4; Row 2: 4 cards span 3)
 * - Multiples of 3: 3 cols
 * - Multiples of 2: 2 cols
 * - Fallback: 3 cols
 */
export function getSearchGridCols(count: number): string {
  if (count <= 1) return "md:grid-cols-1";
  if (count === 2 || count === 4) return "md:grid-cols-2";
  if (count === 5) return "md:grid-cols-6";
  if (count === 7) return "md:grid-cols-12";
  if (count % 3 === 0) return "md:grid-cols-3";
  if (count % 2 === 0) return "md:grid-cols-2";
  return "md:grid-cols-3";
}

/**
 * Determines per-card column span classes for search result groups with 5 or 7 cards,
 * ensuring no card is left as an orphan in the last row.
 * Mobile (< md) remains 1 column.
 */
export function getSearchCardSpan(count: number, index: number): string {
  if (count === 5) {
    return index < 3 ? "md:col-span-2" : "md:col-span-3";
  }
  if (count === 7) {
    return index < 3 ? "md:col-span-4" : "md:col-span-3";
  }
  return "";
}
