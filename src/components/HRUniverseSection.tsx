"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text3D, Float, Center } from "@react-three/drei";
import { useTheme } from "next-themes";

const HR_WORDS = [
  "Leadership", "Talent", "Culture", "Strategy",
  "Recruitment", "Performance", "Engagement",
  "Mentorship", "Diversity"
];

// Deterministic pseudo-random generator
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

function HRUniverse3DBackground() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  // Dynamic colors for the text based on theme
  const wordColor = isLight ? "#0055A5" : "#93c5fd"; // Walton Blue or Bright Blue
  const hrColor = isLight ? "#E31837" : "#c4b5fd"; // Walton Red or Bright Purple
  const aiColor = isLight ? "#000000" : "#67e8f9"; // Black or Bright Cyan
  const techColor = isLight ? "#0055A5" : "#a5b4fc"; // Walton Blue or Bright Indigo

  const wordsWithPos = useMemo(() => {
    return HR_WORDS.map((word, i) => {
      // Distribute in a 3D sphere with slightly wider radius
      const r = 10 + pseudoRandom(i) * 5;
      const theta = pseudoRandom(i + 10) * 2 * Math.PI;
      const phi = Math.acos(2 * pseudoRandom(i + 20) - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      return { word, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  return (
    <div className="absolute inset-0 z-0 cursor-move pointer-events-auto">
      {/* Deep Space CSS Background behind canvas - adapts to light/dark */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] ${isLight ? 'bg-blue-200/40' : 'bg-indigo-600/20'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] ${isLight ? 'bg-red-200/40' : 'bg-purple-600/20'}`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] ${isLight ? 'bg-blue-100/50' : 'bg-blue-900/10'}`} />
      </div>

      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} className="absolute inset-0 z-10">
        <ambientLight intensity={isLight ? 1 : 0.5} />
        <directionalLight position={[5, 10, 5]} intensity={isLight ? 1.5 : 1} />
        
        {/* Full 360 interactive rotation */}
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
        
        {/* Only show stars in dark mode, or make them black/faint in light mode */}
        {!isLight && <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />}
        
        <group>
          {wordsWithPos.map((item, i) => (
            <Float key={`word-${i}`} speed={2} rotationIntensity={1} floatIntensity={2}>
              <Center position={item.position}>
                <Text3D
                  font="https://unpkg.com/three@0.150.0/examples/fonts/helvetiker_bold.typeface.json"
                  size={0.35}
                  height={0.1}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.015}
                  bevelSize={0.015}
                  bevelOffset={0}
                  bevelSegments={5}
                >
                  {item.word}
                  <meshStandardMaterial 
                    color={wordColor} 
                    roughness={0.2} 
                    metalness={isLight ? 0.3 : 0.8} 
                    emissive={isLight ? "#000000" : wordColor}
                    emissiveIntensity={isLight ? 0 : 0.15}
                  />
                </Text3D>
              </Center>
            </Float>
          ))}
          
          {/* Extruded 3D Logos */}
          <Float speed={3} rotationIntensity={2} floatIntensity={2} position={[8, 5, -5]}>
            <Center>
              <Text3D
                font="https://unpkg.com/three@0.150.0/examples/fonts/helvetiker_bold.typeface.json"
                size={0.8}
                height={0.25}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.03}
                bevelSize={0.02}
              >
                HR
                <meshStandardMaterial 
                  color={hrColor} 
                  roughness={0.1} 
                  metalness={isLight ? 0.4 : 0.9} 
                  emissive={isLight ? "#000000" : hrColor}
                  emissiveIntensity={isLight ? 0 : 0.15}
                />
              </Text3D>
            </Center>
          </Float>

          <Float speed={2} rotationIntensity={3} floatIntensity={2} position={[-8, -4, -3]}>
            <Center>
              <Text3D
                font="https://unpkg.com/three@0.150.0/examples/fonts/helvetiker_bold.typeface.json"
                size={0.7}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.03}
                bevelSize={0.02}
              >
                AI
                <meshStandardMaterial 
                  color={aiColor} 
                  roughness={0.1} 
                  metalness={isLight ? 0.3 : 0.8} 
                  emissive={isLight ? "#000000" : aiColor}
                  emissiveIntensity={isLight ? 0 : 0.15}
                />
              </Text3D>
            </Center>
          </Float>

          <Float speed={2.5} rotationIntensity={1.5} floatIntensity={3} position={[0, 7, -8]}>
            <Center>
              <Text3D
                font="https://unpkg.com/three@0.150.0/examples/fonts/helvetiker_bold.typeface.json"
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.03}
                bevelSize={0.02}
              >
                TECH
                <meshStandardMaterial 
                  color={techColor} 
                  roughness={0.1} 
                  metalness={isLight ? 0.4 : 0.8} 
                  emissive={isLight ? "#000000" : techColor}
                  emissiveIntensity={isLight ? 0 : 0.15}
                />
              </Text3D>
            </Center>
          </Float>
        </group>
      </Canvas>
    </div>
  );
}

export default function HRUniverseSection() {
  const [isMounted, setIsMounted] = useState(false);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"]);
  const faceX = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);
  const faceY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);
  const eyeX = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);
  const eyeY = useTransform(mouseYSpring, [-0.5, 0.5], [-6, 6]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[600px] w-full bg-[var(--background)]" />;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      className="relative w-full h-[600px] md:h-[800px] bg-[var(--background)] overflow-hidden flex items-center justify-center border-y border-black/5 dark:border-white/10 perspective-[2000px] transition-colors duration-500"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* 360 Movable 3D Universe Background */}
      <HRUniverse3DBackground />



      {/* Central Focal Point (3D Interactive) */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 w-full h-full pointer-events-none">

        {/* The 3D Object reacting to Mouse */}
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center mb-12 pointer-events-auto"
        >
          {/* Avatar Face Core (Highly Detailed SVG matching 3D Image) */}
          <div className="absolute w-40 h-40 md:w-60 md:h-60 z-10 flex flex-col items-center justify-center">
            <motion.div
              style={{ x: faceX, y: faceY }}
              className="relative w-full h-full drop-shadow-[0_20px_40px_rgba(99,102,241,0.6)]"
            >
              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
                <defs>
                  <radialGradient id="skin" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffedd5" />
                    <stop offset="60%" stopColor="#fdba74" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </radialGradient>
                  <linearGradient id="hair" x1="0" y1="0" x2="0" y2="400">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="30%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                  <linearGradient id="mask" x1="0" y1="200" x2="0" y2="400">
                    <stop offset="0%" stopColor="#374151" />
                    <stop offset="50%" stopColor="#111827" />
                    <stop offset="100%" stopColor="#030712" />
                  </linearGradient>
                  <radialGradient id="iris" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="70%" stopColor="#1e40af" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </radialGradient>
                </defs>

                {/* Back Hair */}
                <path d="M70 180 C 20 60, 380 60, 330 180 Z" fill="#020617" />

                {/* Headband for Headphones */}
                <path d="M50 200 C 30 20, 370 20, 350 200" fill="none" stroke="#111827" strokeWidth="25" strokeLinecap="round" />
                <path d="M60 200 C 40 40, 360 40, 340 200" fill="none" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" />

                {/* Face/Skin Base */}
                <path d="M100 150 Q 100 340, 200 370 Q 300 340, 300 150 Z" fill="url(#skin)" />

                {/* Eyebrows */}
                <path d="M120 160 Q 150 145, 175 160" fill="none" stroke="#0f172a" strokeWidth="12" strokeLinecap="round" />
                <path d="M280 160 Q 250 145, 225 160" fill="none" stroke="#0f172a" strokeWidth="12" strokeLinecap="round" />

                {/* Earcups (Headphones) */}
                <rect x="30" y="160" width="40" height="120" rx="20" fill="#1f2937" />
                <rect x="330" y="160" width="40" height="120" rx="20" fill="#1f2937" />
                <rect x="25" y="180" width="50" height="80" rx="15" fill="#111827" />
                <rect x="325" y="180" width="50" height="80" rx="15" fill="#111827" />

                {/* Neon Rings */}
                <rect x="35" y="170" width="10" height="100" rx="5" fill="#38bdf8" />
                <rect x="355" y="170" width="10" height="100" rx="5" fill="#38bdf8" />
                {/* Glowing Effect for Rings */}
                <rect x="35" y="170" width="10" height="100" rx="5" fill="transparent" stroke="#38bdf8" strokeWidth="8" className="opacity-70 blur-[6px]" />
                <rect x="355" y="170" width="10" height="100" rx="5" fill="transparent" stroke="#38bdf8" strokeWidth="8" className="opacity-70 blur-[6px]" />

                {/* Eyes Background (Whites) */}
                <path d="M110 190 C 130 160, 170 160, 185 190 C 170 215, 130 215, 110 190 Z" fill="white" />
                <path d="M290 190 C 270 160, 230 160, 215 190 C 230 215, 270 215, 290 190 Z" fill="white" />

                {/* Eyelashes/Upper Eyelid */}
                <path d="M105 190 C 130 155, 175 155, 190 190" fill="none" stroke="#0f172a" strokeWidth="10" strokeLinecap="round" />
                <path d="M295 190 C 270 155, 225 155, 210 190" fill="none" stroke="#0f172a" strokeWidth="10" strokeLinecap="round" />

                {/* Moving Eyes Group */}
                <motion.g style={{ x: eyeX, y: eyeY }}>
                  {/* Left Pupil */}
                  <circle cx="150" cy="190" r="15" fill="url(#iris)" />
                  <circle cx="150" cy="190" r="7" fill="#020617" />
                  <circle cx="145" cy="182" r="5" fill="white" />
                  <circle cx="158" cy="196" r="2" fill="white" />

                  {/* Right Pupil */}
                  <circle cx="250" cy="190" r="15" fill="url(#iris)" />
                  <circle cx="250" cy="190" r="7" fill="#020617" />
                  <circle cx="245" cy="182" r="5" fill="white" />
                  <circle cx="258" cy="196" r="2" fill="white" />
                </motion.g>

                {/* Mask (Black fabric covering lower half) */}
                <path d="M90 235 Q 200 210, 310 235 L 280 340 Q 200 395, 120 340 Z" fill="url(#mask)" />
                {/* Mask Top Edge Highlight */}
                <path d="M90 235 Q 200 215, 310 235" fill="none" stroke="#4b5563" strokeWidth="4" strokeLinecap="round" />
                {/* </ > Logo on Mask */}
                <text x="200" y="320" fill="white" fontSize="28" fontFamily="monospace" fontWeight="bold" textAnchor="middle">&lt;/&gt;</text>

                {/* Glasses Frames (Retro Square) */}
                <rect x="95" y="165" width="70" height="50" rx="10" fill="rgba(255,255,255,0.05)" stroke="#111827" strokeWidth="8" strokeLinejoin="round" />
                <rect x="235" y="165" width="70" height="50" rx="10" fill="rgba(255,255,255,0.05)" stroke="#111827" strokeWidth="8" strokeLinejoin="round" />
                {/* Bridge */}
                <path d="M165 185 Q 200 175, 235 185" fill="none" stroke="#111827" strokeWidth="8" />
                {/* Arms */}
                <path d="M70 180 L 95 180" stroke="#111827" strokeWidth="10" strokeLinecap="round" />
                <path d="M330 180 L 305 180" stroke="#111827" strokeWidth="10" strokeLinecap="round" />

                {/* Sweeping Front Hair / Bangs */}
                <path d="M50 160 C 50 40, 150 20, 200 60 C 250 20, 350 40, 350 160 C 310 100, 260 90, 200 130 C 140 90, 90 100, 50 160 Z" fill="url(#hair)" />
                <path d="M30 200 Q 80 80, 180 140 Q 110 110, 30 200 Z" fill="url(#hair)" />
                <path d="M370 200 Q 320 80, 220 140 Q 290 110, 370 200 Z" fill="url(#hair)" />
                <path d="M130 140 C 180 80, 230 80, 270 140 C 230 110, 180 110, 130 140 Z" fill="#0f172a" />

              </svg>
            </motion.div>
          </div>

          {/* 3D Orbiting Rings */}
          <motion.div
            animate={{ rotateZ: 360, rotateX: [60, 120, 60] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-4 border border-indigo-400/80 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          />
          <motion.div
            animate={{ rotateZ: -360, rotateY: [60, 120, 60] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-0 border-2 border-purple-400/80 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          />
          <motion.div
            animate={{ rotateZ: 360, rotateX: [-60, -120, -60], rotateY: [-60, -120, -60] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute inset-8 border border-sky-400/80 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]"
          />
        </motion.div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Human</span> Universe
        </h2>
        <p className="text-indigo-200/80 max-w-xl text-sm md:text-base leading-relaxed">
          Where talent meets opportunity. Navigating the infinite space of human potential, strategy, and organizational growth.
        </p>
      </div>

    </section>
  );
}
