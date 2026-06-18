import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
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
          color: "white",
          background:
            "linear-gradient(135deg, #071426 0%, #102a4c 48%, #1457d9 100%)",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 84,
              height: 84,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              background: "white",
              color: "#071426",
              fontSize: 48,
              fontWeight: 800,
            }}
          >
            H
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>HACIEN</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            Information Technology Solutions
          </div>
          <div style={{ marginTop: 24, fontSize: 26, color: "#dbeafe", maxWidth: 860 }}>
            IT infrastructure, procurement support, systems integration, and technology sourcing for Philippine organizations.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
