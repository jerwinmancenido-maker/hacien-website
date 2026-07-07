import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, Label, Panel, Stage } from "./shared";

const parts = [
  ["CPU Board", -360, -150, 0],
  ["Memory Channel", -120, -250, 8],
  ["Storage Bay", 160, -190, 16],
  ["Power Unit", 360, 0, 24],
  ["Cooling Path", 120, 210, 32],
  ["Chassis Frame", -260, 180, 40],
] as const;

export function ExplodedHardware() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0.5 * fps, 4.2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Stage>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", perspective: 1200 }}>
        {parts.map(([label, x, y, delay]) => {
          const local = interpolate(frame - delay, [0, 90], [0, progress], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <Panel
              key={label}
              style={{
                position: "absolute",
                width: 320,
                height: 128,
                padding: 24,
                transform: `translate3d(${x * local}px, ${y * local}px, ${120 * local}px) rotateX(${18 * local}deg) rotateY(${-22 * local}deg)`,
              }}
            >
              <div style={{ color: colors.cyan, fontSize: 18, fontWeight: 800 }}>{label}</div>
              <div style={{ marginTop: 18, height: 12, borderRadius: 99, background: "rgba(56,189,248,0.55)" }} />
              <div style={{ marginTop: 14, height: 12, width: "68%", borderRadius: 99, background: "rgba(245,158,11,0.45)" }} />
            </Panel>
          );
        })}
      </div>
      <Label eyebrow="Hardware Review" title="Assemblies separated into reviewable sourcing context." />
    </Stage>
  );
}
