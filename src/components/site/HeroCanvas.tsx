import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

function Orb({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.25;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.15;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.4}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}

function GlassShape({
  position,
  rotationSpeed = 0.2,
  geometry = "torus",
}: {
  position: [number, number, number];
  rotationSpeed?: number;
  geometry?: "torus" | "ico" | "box";
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * rotationSpeed;
    ref.current.rotation.y = t * rotationSpeed * 0.8;
  });
  return (
    <mesh ref={ref} position={position}>
      {geometry === "torus" && <torusKnotGeometry args={[0.55, 0.18, 220, 32]} />}
      {geometry === "ico" && <icosahedronGeometry args={[0.8, 0]} />}
      {geometry === "box" && <boxGeometry args={[1, 1, 1]} />}
      <MeshTransmissionMaterial
        transmission={1}
        thickness={0.6}
        roughness={0.05}
        ior={1.4}
        chromaticAberration={0.25}
        anisotropy={0.4}
        distortion={0.3}
        distortionScale={0.4}
        temporalDistortion={0.1}
        color="#cdd5ff"
      />
    </mesh>
  );
}

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#a8c0ff"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });
  useFrame(({ mouse }) => {
    target.current.x += (mouse.x * 0.6 - target.current.x) * 0.04;
    target.current.y += (mouse.y * 0.3 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = 1 + target.current.y;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#05060f"]} />
      <fog attach="fog" args={["#05060f", 8, 22]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#9a8cff" />
      <pointLight position={[-4, -2, 3]} intensity={20} color="#4f8cff" distance={12} />
      <pointLight position={[3, 3, -3]} intensity={18} color="#ff5cf2" distance={14} />

      <Suspense fallback={null}>
        <Environment preset="night" />

        <Float floatIntensity={1.2} rotationIntensity={0.4} speed={1.1}>
          <GlassShape position={[0, 0.3, 0]} geometry="torus" rotationSpeed={0.18} />
        </Float>

        <Float floatIntensity={1.6} rotationIntensity={0.6} speed={0.9}>
          <GlassShape position={[2.6, -0.4, -1.5]} geometry="ico" rotationSpeed={0.12} />
        </Float>

        <Float floatIntensity={1.4} rotationIntensity={0.3} speed={1.3}>
          <Orb position={[-2.8, 0.8, -1]} color="#7c5cff" scale={0.45} speed={0.9} />
        </Float>
        <Float floatIntensity={1.1} rotationIntensity={0.2} speed={1.4}>
          <Orb position={[2.2, 1.4, -3]} color="#5ce7ff" scale={0.22} speed={1.2} />
        </Float>
        <Float floatIntensity={1.0} rotationIntensity={0.2} speed={1.0}>
          <Orb position={[-3.2, -1.2, -2]} color="#ff5cf2" scale={0.16} speed={1.1} />
        </Float>

        <Particles count={500} />
      </Suspense>

      <CameraRig />

      <EffectComposer multisampling={0}>
        <Bloom intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
        <DepthOfField focusDistance={0.012} focalLength={0.04} bokehScale={4} />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0008, 0.0012] as any}
          radialModulation={false}
          modulationOffset={0}
        />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </>
  );
}

export function HeroCanvas({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 1, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
