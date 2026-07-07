import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, Label, Panel, Stage, useEase } from "./shared";

export function HeroReel() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const sweep = interpolate(frame, [0, durationInFrames], [-520, 1920]);
  const enter = useEase(0.2, 1.4);

  return (
    <Stage>
      <AbsoluteFill style={{ transform: `translateX(${sweep * 0.04}px)`, opacity: 0.82 }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: 260 + index * 170,
              top: 120 + (index % 3) * 146,
              width: 96,
              height: 96,
              border: `1px solid ${index % 2 ? "rgba(56,189,248,0.5)" : "rgba(245,158,11,0.42)"}`,
              borderRadius: 16,
              transform: `translateY(${Math.sin((frame + index * 12) / 24) * 18}px) rotate(${45 + index * 8}deg)`,
            }}
          />
        ))}
      </AbsoluteFill>
      <Panel style={{ position: "absolute", right: 110, top: 130, width: 560, padding: 34, opacity: enter }}>
        <div style={{ color: colors.amber, fontSize: 18, fontWeight: 800, letterSpacing: 3 }}>RFQ-FIRST OPERATING SURFACE</div>
        {["Requirement", "Supplier Input", "Quotation Context", "Handover Record"].map((item, index) => (
          <div key={item} style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 46, height: 46, borderRadius: 999, background: colors.blue, display: "grid", placeItems: "center", fontWeight: 900 }}>
              {index + 1}
            </div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>{item}</div>
          </div>
        ))}
      </Panel>
      <div style={{ position: "absolute", left: sweep, top: 0, width: 240, height: 1080, background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.22), transparent)" }} />
      <Label eyebrow="HACIEN Cinematic System" title="Technology sourcing with traceable context." />
    </Stage>
  );
}
