import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, Label, Panel, Stage } from "./shared";

const nodes = [
  ["Metro Manila", 840, 400],
  ["Cebu", 1040, 590],
  ["Davao", 1180, 760],
] as const;

export function LogisticsMap() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const route = interpolate(frame, [0.7 * fps, 4.8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Stage>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0 }}>
        <path d="M780 370 C900 430 950 530 1040 590 C1120 650 1140 700 1180 760" fill="none" stroke="rgba(56,189,248,0.22)" strokeWidth="18" />
        <path
          d="M780 370 C900 430 950 530 1040 590 C1120 650 1140 700 1180 760"
          fill="none"
          stroke={colors.cyan}
          strokeWidth="7"
          strokeDasharray={`${route * 760} 760`}
          strokeLinecap="round"
        />
        {nodes.map(([label, x, y], index) => (
          <g key={label}>
            <circle cx={x} cy={y} r={22 + index * 4} fill={index === 0 ? colors.amber : colors.blue} opacity="0.9" />
            <text x={x + 36} y={y + 8} fill="#f8fafc" fontSize="28" fontWeight="800">
              {label}
            </text>
          </g>
        ))}
      </svg>
      <Panel style={{ position: "absolute", right: 120, top: 150, width: 520, padding: 32 }}>
        <div style={{ color: colors.amber, fontSize: 20, fontWeight: 900 }}>Logistics planning preview</div>
        <div style={{ marginTop: 24, fontSize: 34, fontWeight: 900 }}>Routes are planning context, not delivery commitments.</div>
      </Panel>
      <Label eyebrow="Logistics Map" title="Regional handoffs need visible assumptions." />
    </Stage>
  );
}
