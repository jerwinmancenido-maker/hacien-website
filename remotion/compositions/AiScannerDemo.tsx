import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, Label, Panel, Stage } from "./shared";
import { remotionScenes } from "./scene-data";

export function AiScannerDemo() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scene = remotionScenes.aiScannerDemo;
  const scanY = interpolate(frame, [0, durationInFrames], [150, 790], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Stage>
      <Panel style={{ position: "absolute", right: 150, top: 130, width: 660, height: 760, padding: 42 }}>
        <div style={{ height: "100%", borderRadius: 14, background: "#f8fafc", color: "#0f172a", padding: 42, position: "relative", overflow: "hidden" }}>
          <div style={{ color: colors.blue, fontSize: 22, fontWeight: 900, letterSpacing: 3 }}>{scene.documentLabel}</div>
          {scene.fields.map((item, index) => (
            <div key={item} style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ width: 150, height: 14, borderRadius: 99, background: "#cbd5e1" }} />
              <div style={{ flex: 1, height: 14, borderRadius: 99, background: index % 2 ? "#dbeafe" : "#fde68a" }} />
              <div style={{ width: 120, fontSize: 18, fontWeight: 800 }}>{item}</div>
            </div>
          ))}
          <div style={{ position: "absolute", left: 0, right: 0, top: scanY - 24, height: 48, background: "linear-gradient(180deg, transparent, rgba(56,189,248,0.42), transparent)" }} />
        </div>
      </Panel>
      <Panel style={{ position: "absolute", left: 120, top: 180, width: 560, padding: 34 }}>
        {scene.reviewStates.map((item, index) => (
          <div key={item} style={{ marginTop: index ? 28 : 0, display: "flex", justifyContent: "space-between", fontSize: 28, fontWeight: 800 }}>
            <span>{item}</span>
            <span style={{ color: index === 2 ? colors.amber : colors.cyan }}>{index === 2 ? "Review" : "OK"}</span>
          </div>
        ))}
      </Panel>
      <Label eyebrow={scene.eyebrow} title={scene.title} style={{ maxWidth: 820 }} />
    </Stage>
  );
}
