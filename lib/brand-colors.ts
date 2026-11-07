/**
 * HACIEN brand color tokens (style guide v1).
 * Mirrors `HACIEN-style-guide.md` and CSS variables in `app/globals.css`.
 * Prefer these (or Tailwind token classes) over ad-hoc hex values.
 *
 * Blue (`--blue`) is reserved for CTAs, links, and focus rings only.
 */
export const brandColors = {
  ink: "var(--ink)",
  white: "var(--white)",
  grey50: "var(--grey-50)",
  grey100: "var(--grey-100)",
  grey200: "var(--grey-200)",
  /** Secondary text on dark / translucent-dark surfaces (hero glass cards, ink panels). */
  grey300: "var(--grey-300)",
  grey400: "var(--grey-400)",
  /** Secondary text on light surfaces only — never on ink/hero glass. */
  grey600: "var(--grey-600)",
  grey700: "var(--grey-700)",
  blue: "var(--blue)",
  blueDark: "var(--blue-dark)",
  blueTint: "var(--blue-tint)",
} as const;

/** Allowed product-category accent values — ink/greys only (no decorative accents). */
export const brandCategoryAccent = brandColors.ink;
