"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, Sphere, Stars } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

function GlobeScene() {
  const groupRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1.5, 48, 48]}>
        <meshStandardMaterial color="#1457d9" roughness={0.58} metalness={0.16} emissive="#082f49" emissiveIntensity={0.18} />
      </Sphere>
      {[
        [[-0.56, 0.28, 1.42], [0.35, -0.28, 1.46], "#38bdf8"],
        [[-0.56, 0.28, 1.42], [0.62, -0.66, 1.18], "#f59e0b"],
      ].map(([start, end, color], index) => (
        <Line key={index} points={[start as [number, number, number], end as [number, number, number]]} color={color as string} lineWidth={2} />
      ))}
      {[
        [-0.56, 0.28, 1.52, "#f59e0b"],
        [0.35, -0.28, 1.56, "#38bdf8"],
        [0.62, -0.66, 1.28, "#38bdf8"],
      ].map(([x, y, z, color], index) => (
        <mesh key={index} position={[x as number, y as number, z as number]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={color as string} emissive={color as string} emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export function DeliveryGlobe() {
  return (
    <div className="min-h-[380px] overflow-hidden rounded-lg border border-white/15 bg-[#071426]">
      <Canvas camera={{ position: [0, 0, 4.8], fov: 44 }}>
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 4, 3]} intensity={1.3} />
        <Stars radius={14} depth={24} count={600} factor={2.4} fade speed={0.3} />
        <GlobeScene />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
