"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Windows() {
  const positions: [number, number, number][] = [
    [-0.62, 0.35, 0.951],
    [0.62, 0.35, 0.951],
    [-0.62, -0.15, 0.951],
    [0.62, -0.15, 0.951],
  ];
  return (
    <>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <planeGeometry args={[0.32, 0.32]} />
          <meshStandardMaterial
            color="#D9A441"
            emissive="#D9A441"
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

function House() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.22;
    }
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* base / ground floor */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1.1, 2]} />
        <meshStandardMaterial color="#F7F4EC" roughness={0.85} />
      </mesh>

      {/* upper floor, slightly inset */}
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.9, 1.6]} />
        <meshStandardMaterial color="#F3ECDC" roughness={0.85} />
      </mesh>

      {/* roof */}
      <mesh position={[0, 1.72, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.35, 0.75, 4]} />
        <meshStandardMaterial color="#C0603B" roughness={0.6} />
      </mesh>

      {/* door */}
      <mesh position={[0, -0.28, 1.001]}>
        <planeGeometry args={[0.36, 0.55]} />
        <meshStandardMaterial color="#1A2E27" roughness={0.9} />
      </mesh>

      {/* windows, glowing */}
      <Windows />

      {/* terrace slab */}
      <mesh position={[0, -0.58, 0.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[2.2, 1.1, 0.06]} />
        <meshStandardMaterial color="#2F6E52" roughness={0.9} />
      </mesh>

      {/* palm accent */}
      <mesh position={[1.5, -0.2, 1.2]}>
        <cylinderGeometry args={[0.05, 0.07, 1, 6]} />
        <meshStandardMaterial color="#9C4A2C" />
      </mesh>
      <mesh position={[1.5, 0.4, 1.2]}>
        <icosahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial color="#2F6E52" roughness={0.7} />
      </mesh>
    </group>
  );
}

export default function House3D() {
  return (
    <div className="h-[380px] w-full sm:h-[460px] lg:h-[560px]" aria-hidden="true">
      <Canvas
        shadows
        camera={{ position: [4.2, 2.4, 4.6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.65} />
        <directionalLight
          position={[5, 6, 3]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <Suspense fallback={null}>
          <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.5}>
            <House />
          </Float>
          <Environment preset="city" />
        </Suspense>
        <ContactShadows
          position={[0, -0.85, 0]}
          opacity={0.45}
          scale={6}
          blur={2.6}
          far={2}
        />
      </Canvas>
    </div>
  );
}
