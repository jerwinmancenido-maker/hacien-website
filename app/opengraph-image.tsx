import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/**
 * Share card uses the real full-logo PNG lockup — never retype HACIEN in a font.
 * Clear space X = 0.286 × CH; full logo minimum width = 200px (handoff v1.1).
 */
export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/brand/logo-full-600.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  // Rendered logo width (≥ 200px min). Aspect from full lockup viewBox 819 × 220.6.
  const logoWidth = 480;
  const logoHeight = Math.round(logoWidth * (220.6 / 819));
  // Cap height ≈ logoWidth × (140 / 819); clear space X = 0.286 × CH.
  const clearSpace = Math.round(0.286 * logoWidth * (140 / 819));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          color: "#0A0A0A",
          background: "#FFFFFF",
          borderBottom: "8px solid #2563EB",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: clearSpace,
            alignItems: "flex-start",
          }}
        >
          <img src={logoSrc} width={logoWidth} height={logoHeight} alt="HACIEN Information Technology Solutions" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", paddingLeft: clearSpace }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 10, height: 10, background: "#2563EB" }} />
            <div
              style={{
                fontSize: 18,
                color: "#404040",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
                fontFamily: "Arial",
              }}
            >
              Philippine IT Solutions
            </div>
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              lineHeight: 1.25,
              maxWidth: 920,
              color: "#0A0A0A",
              fontFamily: "Arial",
            }}
          >
            IT infrastructure, procurement support, systems integration, and technology sourcing for Philippine
            organizations.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
