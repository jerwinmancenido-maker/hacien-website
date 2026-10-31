import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // SVG isn't reliably rendered by Satori — use the committed icon PNG.
  // Never retype the HACIEN wordmark in a font; the icon lockup is the brand mark.
  const iconData = await readFile(join(process.cwd(), "public/brand/icon-512.png"));
  const iconSrc = `data:image/png;base64,${iconData.toString("base64")}`;

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
          fontFamily: "Arial",
          borderBottom: "8px solid #2563EB",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={iconSrc} width={96} height={96} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#404040",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Information Technology Solutions
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 10, height: 10, background: "#2563EB" }} />
            <div
              style={{
                fontSize: 18,
                color: "#404040",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Philippine IT Solutions
            </div>
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.1, maxWidth: 920, color: "#0A0A0A" }}>
            Information Technology Solutions
          </div>
          <div style={{ marginTop: 24, fontSize: 24, color: "#525252", maxWidth: 860 }}>
            IT infrastructure, procurement support, systems integration, and technology sourcing for Philippine
            organizations.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
