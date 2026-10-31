/**
 * HACIEN logo lockups from brand kit v1.1.
 * Always use these SVG files — never retype "HACIEN" in a font.
 *
 * Clear space X = 2 × blue square = 0.286 × cap height on every side
 * (measured from letter/tagline edges; SVG already includes 8u pad).
 *
 * Minimum widths: full 200px · wordmark 96px · icon 16px.
 *
 * SVGs are rendered with a plain <img> (unoptimized). next/image's optimizer
 * rasterizes SVGs and can wash out white lockups on dark backgrounds.
 */

type LogoVariant = "wordmark" | "full" | "full-white" | "mono" | "icon" | "icon-dark";

type BrandLogoProps = {
  variant: LogoVariant;
  /** Rendered height in px for wordmark/icon; ignored when width is set for full lockups. */
  height?: number;
  /** Rendered width in px — required path for full lockups (min 200). */
  width?: number;
  className?: string;
  priority?: boolean;
};

const VIEWBOX = {
  wordmark: { w: 819, h: 161 },
  full: { w: 819, h: 220.6 },
  "full-white": { w: 819, h: 220.6 },
  mono: { w: 819, h: 220.6 },
  icon: { w: 240, h: 240 },
  "icon-dark": { w: 240, h: 240 },
} as const;

const SRC: Record<LogoVariant, string> = {
  wordmark: "/brand/logo-wordmark.svg",
  full: "/brand/logo-full.svg",
  "full-white": "/brand/logo-full-white.svg",
  mono: "/brand/logo-mono-black.svg",
  icon: "/brand/icon.svg",
  "icon-dark": "/brand/icon-dark.svg",
};

const MIN_WIDTH: Record<LogoVariant, number> = {
  wordmark: 96,
  full: 200,
  "full-white": 200,
  mono: 200,
  icon: 16,
  "icon-dark": 16,
};

/** Cap height as a fraction of the SVG viewBox height (CH=140; wordmark vb h=161, full vb h=220.6). */
const CH_FRACTION: Record<LogoVariant, number> = {
  wordmark: 140 / 161,
  full: 140 / 220.6,
  "full-white": 140 / 220.6,
  mono: 140 / 220.6,
  // Icon tile is its own frame — no extra clear space.
  icon: 0,
  "icon-dark": 0,
};

const ALT: Record<LogoVariant, string> = {
  wordmark: "HACIEN",
  full: "HACIEN Information Technology Solutions",
  "full-white": "HACIEN Information Technology Solutions",
  mono: "HACIEN Information Technology Solutions",
  icon: "HACIEN",
  "icon-dark": "HACIEN",
};

function resolveSize(variant: LogoVariant, height?: number, width?: number) {
  const vb = VIEWBOX[variant];
  let w: number;
  let h: number;

  if (width != null) {
    w = width;
    h = width * (vb.h / vb.w);
  } else if (height != null) {
    h = height;
    w = height * (vb.w / vb.h);
  } else if (variant === "wordmark") {
    h = 28;
    w = h * (vb.w / vb.h);
  } else if (variant.startsWith("icon")) {
    w = 32;
    h = 32;
  } else {
    w = 200;
    h = w * (vb.h / vb.w);
  }

  const minW = MIN_WIDTH[variant];
  if (w < minW) {
    const scale = minW / w;
    w = minW;
    h = h * scale;
  }

  return { width: Math.round(w * 100) / 100, height: Math.round(h * 100) / 100 };
}

/** Clear-space padding in CSS px beyond the SVG's built-in 8u pad. */
function clearSpacePadding(variant: LogoVariant, renderedHeight: number) {
  const chFraction = CH_FRACTION[variant];
  if (chFraction <= 0) {
    return 0;
  }
  const vb = VIEWBOX[variant];
  const ch = renderedHeight * chFraction;
  const x = 0.286 * ch; // 2 × blue square
  const svgPad = renderedHeight * (8 / vb.h);
  return Math.max(0, x - svgPad);
}

export function BrandLogo({
  variant,
  height,
  width,
  className = "",
  priority = false,
}: BrandLogoProps) {
  const size = resolveSize(variant, height, width);
  const pad = clearSpacePadding(variant, size.height);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ padding: pad > 0 ? pad : undefined }}
      data-brand-logo={variant}
      data-brand-clear-space={pad > 0 ? pad.toFixed(2) : "tile"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- brand SVGs must stay vector; next/image rasterizes and washes white lockups */}
      <img
        src={SRC[variant]}
        alt={ALT[variant]}
        width={Math.ceil(size.width)}
        height={Math.ceil(size.height)}
        className="block"
        style={{ width: size.width, height: size.height }}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
    </span>
  );
}
