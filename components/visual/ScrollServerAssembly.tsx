"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

function AssemblyParts() {
  const groupRef = useRef<Group>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollProgress(Math.min(1, window.scrollY / maxScroll));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
  });

  const spread = scrollProgress * 1.4;

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.8, 0.18, 2.1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.5} roughness={0.36} />
      </mesh>
      <mesh position={[-1.1 - spread, 0.28 + spread * 0.45, -0.45]}>
        <boxGeometry args={[0.84, 0.14, 0.84]} />
        <meshStandardMaterial color="#1457d9" emissive="#0f46b4" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0.25, 0.3 + spread * 0.7, -0.52 - spread * 0.2]}>
        <boxGeometry args={[1.5, 0.12, 0.18]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.16} />
      </mesh>
      <mesh position={[0.25, 0.52 + spread * 0.85, -0.1 - spread * 0.28]}>
        <boxGeometry args={[1.5, 0.12, 0.18]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.16} />
      </mesh>
      <mesh position={[1.2 + spread, 0.26 + spread * 0.38, 0.45]}>
        <boxGeometry args={[0.78, 0.24, 0.64]} />
        <meshStandardMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, -0.2 - spread * 0.35, 1]}>
        <boxGeometry args={[3.4, 0.08, 0.18]} />
        <meshStandardMaterial color="#64748b" metalness={0.4} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function ScrollServerAssembly() {
  return (
    <div className="min-h-[420px] overflow-hidden rounded-lg border border-slate-800 bg-[#071426]">
      <Canvas camera={{ position: [0, 3.2, 5.4], fov: 42 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 5, 4]} intensity={1.4} />
        <Float speed={1.2} rotationIntensity={0.24} floatIntensity={0.32}>
          <AssemblyParts />
        </Float>
        <Environment preset="city" />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  );
}
