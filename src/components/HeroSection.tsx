"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Box, MeshDistortMaterial, Float, Stars, Text3D, Center } from "@react-three/drei";
import Image from "next/image";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";

// Custom Stars that respond to light/dark mode
function ThemeStars() {
  const { resolvedTheme } = useTheme();
  const starColor = resolvedTheme === "light" ? "#000000" : "#ffffff";
  const ref = useRef<THREE.Points>(null);

  const sphere = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const r = 50 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[sphere, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color={starColor} sizeAttenuation={true} transparent opacity={0.6} />
    </points>
  );
}

// The original floating background spheres
function AnimatedShapes() {
  const { resolvedTheme } = useTheme();
  const lightIntensity = resolvedTheme === "light" ? 0.8 : 1.5;

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={lightIntensity} />

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[0.8, 64, 64]} position={[-2.5, 0.5, -1]}>
          <MeshDistortMaterial
            color="#0055A5" /* Walton Blue */
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.4}
            metalness={0.1}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={3}>
        <Sphere args={[0.6, 64, 64]} position={[-3, -1, -2]}>
          <MeshDistortMaterial
            color="#E31837" /* Walton Red */
            attach="material"
            distort={0.5}
            speed={3}
            roughness={0.4}
            metalness={0.1}
          />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.4, 64, 64]} position={[-3.5, -1.5, -3]}>
          <MeshDistortMaterial
            color="#0055A5"
            attach="material"
            distort={0.3}
            speed={2.5}
            roughness={0.4}
            metalness={0.1}
          />
        </Sphere>
      </Float>

      <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1.5}>
        <Sphere args={[0.3, 64, 64]} position={[-4, 1.5, -4]}>
          <MeshDistortMaterial
            color="#E31837"
            attach="material"
            distort={0.6}
            speed={3.5}
            roughness={0.4}
            metalness={0.1}
          />
        </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={2.5}>
        <Sphere args={[0.5, 64, 64]} position={[-2, 2.5, -2]}>
          <MeshDistortMaterial
            color="#ffffff"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.5}
          />
        </Sphere>
      </Float>

      <ThemeStars />
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

  const { resolvedTheme } = useTheme();
  const pointColor = resolvedTheme === "light" ? "#0055A5" : "#ffffff";
  const lineOpacity = resolvedTheme === "light" ? 0.4 : 0.25;

  return (
    <group ref={groupRef}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={pointColor} transparent opacity={0.8} />
        </mesh>
      ))}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#0055A5" transparent opacity={lineOpacity} />
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
  const { resolvedTheme } = useTheme();
  const ringColor = resolvedTheme === "light" ? "#0055A5" : "#ffffff";
  const textColor = resolvedTheme === "light" ? "#000000" : "#ffffff";

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
          <meshStandardMaterial color={ringColor} opacity={0.5} transparent />
        </mesh>
      </Float>

      <Float speed={1} rotationIntensity={0} floatIntensity={2}>
        <mesh ref={ring4Ref} position={[0, 0, -2]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[3.2, 0.03, 16, 100]} />
          <meshStandardMaterial color={ringColor} wireframe opacity={0.3} transparent />
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
            <meshStandardMaterial color={textColor} metalness={0.8} roughness={0.2} />
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

// Typing animation component for the Title
const designations = [
  "Foysal Wahid",
  "Senior HR Leader",
  "HR Business Partner",
];

function TypeWriter() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const i = loopNum % designations.length;
  const isName = i === 0;

  useEffect(() => {
    const handleType = () => {
      const fullText = designations[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 80);

      if (!isDeleting && text === fullText) {
        // Pause for 1 second before deleting
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, i, loopNum, typingSpeed]);

  let renderText;
  if (isName && text.includes(" ")) {
    const parts = text.split(" ");
    renderText = (
      <>
        <span className="text-[var(--text-primary)]">{parts[0]} </span>
        <span className="text-[var(--walton-blue)]">{parts.slice(1).join(" ")}</span>
      </>
    );
  } else if (isName) {
    renderText = <span className="text-[var(--text-primary)]">{text}</span>;
  } else {
    renderText = <span className="text-gradient-primary">{text}</span>;
  }

  return (
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 whitespace-nowrap overflow-visible">
      {renderText}
      <span className="animate-pulse ml-1 inline-block text-[var(--walton-red)]">|</span>
    </h1>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center pt-20 pb-10 overflow-hidden">

      {/* 3D Canvas Background (Restored) */}
      <div className="absolute inset-0 z-0 opacity-80 dark:opacity-40">
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
            MEET THE EXPERT
          </h2>

          <TypeWriter />
          <p className="text-lg text-[var(--text-muted)] max-w-xl leading-relaxed mb-10">
            Head of HRM at Walton Plaza. Driving business growth through practical and people-centric HR solutions across a nationwide retail network.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
            <motion.a
              href="#contact"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="px-8 py-4 bg-[var(--walton-blue)] hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(0,85,165,0.4)] hover:shadow-[0_0_30px_rgba(0,85,165,0.6)] w-full sm:w-auto text-center"
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="#experience"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/20 text-[var(--text-primary)] backdrop-blur-md border border-[var(--text-primary)]/20 rounded-full font-semibold transition-all w-full sm:w-auto text-center"
            >
              View Experience
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
            <motion.a
              href="https://www.linkedin.com/in/foysalwahid/"
              target="_blank"
              rel="noreferrer"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="group p-3 bg-[var(--text-primary)]/5 hover:bg-[#0077b5] text-[var(--text-primary)] hover:text-white rounded-full transition-all duration-300 border border-[var(--glass-border)] shadow-lg hover:shadow-[#0077b5]/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </motion.a>
            <motion.a
              href="https://www.facebook.com/profile.php?id=100000233034396"
              target="_blank"
              rel="noreferrer"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="group p-3 bg-[var(--text-primary)]/5 hover:bg-[#1877F2] text-[var(--text-primary)] hover:text-white rounded-full transition-all duration-300 border border-[var(--glass-border)] shadow-lg hover:shadow-[#1877F2]/50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </motion.a>
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
