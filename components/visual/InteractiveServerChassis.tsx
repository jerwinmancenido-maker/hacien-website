"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";

function ChassisModel({ compact = false }: { compact?: boolean }) {
  const labelClass = compact
    ? "rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-slate-950"
    : "rounded bg-white/90 px-2 py-1 text-xs font-bold text-slate-950";
  const labelPositions = compact
    ? {
        cpu: [-0.96, 0.78, -0.48] as [number, number, number],
        ram: [0.08, 0.84, 0.42] as [number, number, number],
        psu: [1.24, 0.82, 0.58] as [number, number, number],
      }
    : {
        cpu: [-1.2, 0.78, -0.48] as [number, number, number],
        ram: [0.2, 0.86, 0.42] as [number, number, number],
        psu: [1.68, 0.82, 0.58] as [number, number, number],
      };

  return (
    <group scale={compact ? 1.12 : 1.55} position={[0, -0.1, 0]}>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[4.2, 0.22, 2.4]} />
        <meshStandardMaterial color="#111827" metalness={0.58} roughness={0.28} />
      </mesh>
      {[-1.2, 1.2].map((x) => (
        <mesh key={x} position={[x, 0.28, -0.48]}>
          <boxGeometry args={[0.86, 0.2, 0.86]} />
          <meshStandardMaterial color="#1457d9" emissive="#082f49" emissiveIntensity={0.18} />
        </mesh>
      ))}
      {[-0.72, -0.36, 0, 0.36, 0.72].map((x) => (
        <mesh key={x} position={[x, 0.35, 0.42]}>
          <boxGeometry args={[0.14, 0.34, 1.2]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.14} />
        </mesh>
      ))}
      <mesh position={[1.68, 0.26, 0.58]}>
        <boxGeometry args={[0.72, 0.36, 0.72]} />
        <meshStandardMaterial color="#f59e0b" emissive="#92400e" emissiveIntensity={0.12} />
      </mesh>
      <Html position={labelPositions.cpu} center>
        <span className={labelClass}>CPU</span>
      </Html>
      <Html position={labelPositions.ram} center>
        <span className={labelClass}>RAM</span>
      </Html>
      <Html position={labelPositions.psu} center>
        <span className={labelClass}>PSU</span>
      </Html>
    </group>
  );
}

export function InteractiveServerChassis() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="min-h-[340px] overflow-hidden rounded-lg border border-slate-800 bg-[#071426] sm:min-h-[420px]">
      <Canvas
        key={compact ? "compact-chassis" : "default-chassis"}
        camera={compact ? { position: [0, 3.2, 6.4], fov: 42 } : { position: [0, 3.0, 4.4], fov: 38 }}
      >
        <ambientLight intensity={0.76} />
        <directionalLight position={[4, 5, 3]} intensity={1.45} />
        <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.22}>
          <ChassisModel compact={compact} />
        </Float>
        <OrbitControls enablePan={false} minDistance={compact ? 5.4 : 4.2} maxDistance={compact ? 7.2 : 6.2} />
      </Canvas>
    </div>
  );
}
