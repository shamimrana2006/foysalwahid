"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, MeshDistortMaterial, Float, Stars, Text3D, Center } from "@react-three/drei";
import Image from "next/image";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// The original floating background spheres
function AnimatedShapes() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1.5, 64, 64]} position={[-0.5, 0.5, 0]}>
          <MeshDistortMaterial
            color="#0055A5" /* Walton Blue */
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={3}>
        <Sphere args={[1, 64, 64]} position={[1.5, -1, -1]}>
          <MeshDistortMaterial
            color="#E31837" /* Walton Red */
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.1}
          />
        </Sphere>
      </Float>

      <Stars radius={50} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </>
  );
}

// The new interconnected Network background
function Network() {
  const groupRef = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 70; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10 - 2
        )
      );
    }
    return pts;
  }, []);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 3.5) {
          positions.push(points[i].x, points[i].y, points[i].z);
          positions.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, [points]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#0055A5" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

// The new 3D Name animation for the right side
function AnimatedName() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const ring4Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating and tilting for the whole group
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }

    // Continuous fast spinning for the rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.8;
      ring1Ref.current.rotation.y += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 1.2;
      ring2Ref.current.rotation.z += delta * 0.5;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.9;
      ring3Ref.current.rotation.z -= delta * 0.3;
    }
    if (ring4Ref.current) {
      ring4Ref.current.rotation.y -= delta * 0.7;
      ring4Ref.current.rotation.x += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#E31837" />
      <pointLight position={[5, 0, 5]} intensity={2} color="#0055A5" />

      {/* Abstract rotating rings */}
      <Float speed={2} rotationIntensity={0} floatIntensity={1}>
        <mesh ref={ring1Ref} position={[0, 0, -2]}>
          <torusGeometry args={[2.5, 0.05, 16, 100]} />
          <meshStandardMaterial color="#0055A5" wireframe opacity={0.3} transparent />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={0} floatIntensity={1.5}>
        <mesh ref={ring2Ref} position={[0, 0, -2]} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[3, 0.02, 16, 100]} />
          <meshStandardMaterial color="#E31837" opacity={0.4} transparent />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0} floatIntensity={1.2}>
        <mesh ref={ring3Ref} position={[0, 0, -2]} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[2.8, 0.015, 16, 100]} />
          <meshStandardMaterial color="#ffffff" opacity={0.5} transparent />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0} floatIntensity={2}>
        <mesh ref={ring4Ref} position={[0, 0, -2]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[3.2, 0.03, 16, 100]} />
          <meshStandardMaterial color="#3b82f6" wireframe opacity={0.2} transparent />
        </mesh>
      </Float>

      {/* 3D Extruded Name */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[0, 0.5, 0]}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            FOYSAL
            <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
          </Text3D>
        </Center>
      </Float>

      <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.8} position={[0, -0.7, 0]}>
        <Center>
          <Text3D
            font="/fonts/helvetiker_bold.typeface.json"
            size={0.6}
            height={0.15}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            WAHID
            <meshStandardMaterial color="#E31837" metalness={0.6} roughness={0.3} />
          </Text3D>
        </Center>
      </Float>
    </group>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-10 overflow-hidden">

      {/* 3D Canvas Background (Restored) */}
      <div className="absolute inset-0 z-0 opacity-50">
        <Canvas>
          <AnimatedShapes />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Side: Text and Profile */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <div className="relative w-40 h-40 md:w-56 md:h-56 mb-8 rounded-full p-2 bg-gradient-to-tr from-[var(--walton-blue)] to-[var(--walton-red)] shadow-[0_0_30px_rgba(0,85,165,0.3)]">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--background)] bg-[var(--background)]">
              <Image
                src="/profile-pic.jpg"
                alt="Foysal Wahid"
                width={224}
                height={224}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          <h2 className="text-lg md:text-xl font-semibold tracking-widest text-[var(--text-muted)] mb-3 uppercase">
            Strategic HR Leader
          </h2>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="text-[var(--text-primary)]">FOYSAL </span>
            <span className="text-gradient-primary">WAHID</span>
          </h1>
          <p className="text-lg text-[var(--text-muted)] max-w-xl leading-relaxed mb-10">
            Head of HRM at Walton Plaza. Driving business growth through practical and people-centric HR solutions across a nationwide retail network.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
            <a
              href="#contact"
              className="px-8 py-4 bg-[var(--walton-blue)] hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(0,85,165,0.4)] hover:shadow-[0_0_30px_rgba(0,85,165,0.6)] hover:-translate-y-1 w-full sm:w-auto text-center"
            >
              Get In Touch
            </a>
            <a
              href="#experience"
              className="px-8 py-4 bg-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/20 text-[var(--text-primary)] backdrop-blur-md border border-[var(--text-primary)]/20 rounded-full font-semibold transition-all hover:-translate-y-1 w-full sm:w-auto text-center"
            >
              View Experience
            </a>
          </div>
        </motion.div>

        {/* Right Side: New Name 3D Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[400px] lg:h-[600px] w-full"
          style={{
            WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 70%)",
            maskImage: "radial-gradient(circle, black 40%, transparent 70%)"
          }}
        >
          <Canvas camera={{ position: [0, 0, 7] }}>
            <Network />
            <AnimatedName />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center hidden lg:flex"
      >
        <span className="text-xs text-[var(--text-muted)] mb-2 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-[var(--walton-red)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
