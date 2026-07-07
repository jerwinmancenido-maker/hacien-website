import { Fragment } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, Label, Panel, Stage } from "./shared";
import { remotionScenes } from "./scene-data";

export function PortalAssetDashboard() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scene = remotionScenes.portalAssetDashboard;

  return (
    <Stage>
      <Panel style={{ position: "absolute", left: 760, top: 110, width: 950, padding: 34 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.8fr 0.8fr", gap: 18 }}>
          {scene.headings.map((heading) => (
            <div key={heading} style={{ color: colors.cyan, fontSize: 20, fontWeight: 900, letterSpacing: 2 }}>
              {heading}
            </div>
          ))}
          {scene.rows.map((row, index) => {
            const enter = interpolate(frame, [(0.35 + index * 0.22) * fps, (1.2 + index * 0.22) * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <Fragment key={row}>
                <div style={{ opacity: enter, fontSize: 28, fontWeight: 800, padding: 18, borderTop: "1px solid rgba(255,255,255,0.12)" }}>{row}</div>
                <div style={{ opacity: enter, fontSize: 24, padding: 18, borderTop: "1px solid rgba(255,255,255,0.12)", color: colors.amber }}>Review</div>
                <div style={{ opacity: enter, fontSize: 24, padding: 18, borderTop: "1px solid rgba(255,255,255,0.12)", color: colors.muted }}>Confirm evidence</div>
              </Fragment>
            );
          })}
        </div>
      </Panel>
      <Label eyebrow={scene.eyebrow} title={scene.title} />
    </Stage>
  );
}
