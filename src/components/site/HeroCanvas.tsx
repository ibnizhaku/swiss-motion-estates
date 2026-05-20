import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef, Suspense } from "react";
import type { Group } from "three";

function ArchWireframe() {
  const ref = useRef<Group>(null);
  useFrame(({ mouse, clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y += (mouse.x * 0.4 - ref.current.rotation.y) * 0.02;
    ref.current.rotation.x += (-mouse.y * 0.2 - ref.current.rotation.x) * 0.02;
    ref.current.position.y = Math.sin(t * 0.5) * 0.1;
  });

  // Stacked architectural blocks rendered as wireframes
  const blocks = [
    { y: -1.2, s: [2.6, 0.45, 2.6] },
    { y: -0.5, s: [2.2, 0.45, 2.2] },
    { y: 0.2, s: [1.8, 0.45, 1.8] },
    { y: 0.9, s: [1.3, 0.45, 1.3] },
    { y: 1.55, s: [0.7, 0.4, 0.7] },
  ] as const;

  return (
    <group ref={ref}>
      {blocks.map((b, i) => (
        <mesh key={i} position={[0, b.y, 0]}>
          <boxGeometry args={b.s as any} />
          <meshBasicMaterial color="#1a1a1a" wireframe transparent opacity={0.55} />
        </mesh>
      ))}
      {/* ground grid */}
      <gridHelper args={[10, 20, "#1a1a1a", "#cfcfcd"]} position={[0, -1.5, 0]} />
    </group>
  );
}

export function HeroCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [3.5, 1.8, 5.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <Float floatIntensity={0.6} rotationIntensity={0.2} speed={1.2}>
            <ArchWireframe />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
