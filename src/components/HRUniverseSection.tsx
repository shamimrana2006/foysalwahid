"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Text3D, Float, Center } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";
import { SVGLoader } from "three-stdlib";

const HR_WORDS = [
  "Leadership", "Talent", "Culture", "Strategy",
  "Recruitment", "Performance", "Engagement",
  "Mentorship", "Diversity", "Inclusion",
  "Development", "Rewards", "Analytics",
  "Wellness", "Agile", "Impact", "Growth"
];

// Filled SVG icons from FontAwesome
const SVG_LOGOS = [
  // User
  '<svg viewBox="0 0 448 512"><path fill="#fff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>',
  // Heart
  '<svg viewBox="0 0 512 512"><path fill="#fff" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/></svg>',
  // Briefcase
  '<svg viewBox="0 0 512 512"><path fill="#fff" d="M320 336c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16V208H64V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V208H384V336zM176 160h160c8.8 0 16-7.2 16-16V96c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM512 112c0-26.5-21.5-48-48-48H416V48c0-26.5-21.5-48-48-48H144C117.5 0 96 21.5 96 48V64H48C21.5 64 0 85.5 0 112v48c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V112z"/></svg>',
  // Target
  '<svg viewBox="0 0 512 512"><path fill="#fff" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-416a160 160 0 1 1 0 320 160 160 0 1 1 0-320zm0 256a96 96 0 1 0 0-192 96 96 0 1 0 0 192z"/></svg>',
  // Star
  '<svg viewBox="0 0 576 512"><path fill="#fff" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>',
  // Cog
  '<svg viewBox="0 0 512 512"><path fill="#fff" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/></svg>',
  // Lightbulb
  '<svg viewBox="0 0 384 512"><path fill="#fff" d="M272 384c9.6-31.9 29.5-59.1 49.2-86.2l0 0c5.2-7.1 10.4-14.2 15.4-21.4c19.8-28.5 31.4-63 31.4-100.3C368 78.8 289.2 0 192 0S16 78.8 16 176c0 37.3 11.6 71.9 31.4 100.3c5 7.2 10.2 14.3 15.4 21.4l0 0c19.8 27.1 39.7 54.4 49.2 86.2H272zM192 512c44.2 0 80-35.8 80-80V416H112v16c0 44.2 35.8 80 80 80zM112 176c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16s7.2-16 16-16H96c8.8 0 16 7.2 16 16zm80-16c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16s-16 7.2-16 16v48c0 8.8 7.2 16 16 16zM320 176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H336c-8.8 0-16-7.2-16-16z"/></svg>'
];

// Deterministic pseudo-random generator
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

function ExtrudedSVGLogo({ svgString, color, isLight }: { svgString: string; color: string; isLight: boolean }) {
  const geometry = useMemo(() => {
    const loader = new SVGLoader();
    const svgData = loader.parse(svgString);
    const shapes: THREE.Shape[] = [];
    svgData.paths.forEach((path) => {
      // @ts-expect-error - Some versions of @types/three might not define the isCCW argument
      shapes.push(...path.toShapes(true));
    });
    const geom = new THREE.ExtrudeGeometry(shapes, {
      depth: 60, // Extrusion depth for the SVG
      bevelEnabled: true,
      bevelThickness: 5,
      bevelSize: 2,
      bevelSegments: 3,
      curveSegments: 12,
    });
    geom.center();
    // SVGLoader outputs in SVG coordinate space (large values). Scale it down.
    geom.scale(0.003, -0.003, 0.003);
    return geom;
  }, [svgString]);

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={0.5}
        metalness={0.2}
        emissive={isLight ? "#000000" : color}
        emissiveIntensity={isLight ? 0 : 0.2}
      />
    </mesh>
  );
}

function HRUniverse3DBackground() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  // Dynamic colors for the text based on theme
  const wordColor = isLight ? "#0055A5" : "#3b82f6"; // Walton Blue or Saturated Neon Blue
  const hrColor = isLight ? "#E31837" : "#ec4899"; // Walton Red or Neon Pink
  const aiColor = isLight ? "#000000" : "#06b6d4"; // Black or Saturated Cyan
  const techColor = isLight ? "#0055A5" : "#8b5cf6"; // Walton Blue or Neon Purple

  const wordsWithPos = useMemo(() => {
    return HR_WORDS.map((word, i) => {
      // Distribute words in a wider 3D sphere
      const r = 12 + pseudoRandom(i) * 6;
      const theta = pseudoRandom(i + 10) * 2 * Math.PI;
      const phi = Math.acos(2 * pseudoRandom(i + 20) - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      return { word, position: [x, y, z] as [number, number, number] };
    });
  }, []);

  const logosWithPos = useMemo(() => {
    return SVG_LOGOS.map((svgString, i) => {
      // Distribute logos in an inner sphere
      const r = 7 + pseudoRandom(i + 50) * 4;
      const theta = pseudoRandom(i + 60) * 2 * Math.PI;
      const phi = Math.acos(2 * pseudoRandom(i + 70) - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      // Cycle through brand colors for the logos
      const colors = [hrColor, aiColor, techColor, wordColor];
      const color = colors[i % colors.length];

      return { svgString, color, position: [x, y, z] as [number, number, number] };
    });
  }, [hrColor, aiColor, techColor, wordColor]);

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
                    roughness={0.5}
                    metalness={0.2}
                    emissive={isLight ? "#000000" : wordColor}
                    emissiveIntensity={isLight ? 0 : 0.2}
                  />
                </Text3D>
              </Center>
            </Float>
          ))}

          {/* Extruded 3D Logos (SVG Paths) */}
          {logosWithPos.map((item, i) => (
            <Float key={`logo-${i}`} speed={2 + (i % 2)} rotationIntensity={2} floatIntensity={2} position={item.position}>
              <Center>
                <ExtrudedSVGLogo svgString={item.svgString} color={item.color} isLight={isLight} />
              </Center>
            </Float>
          ))}
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["35deg", "-35deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-35deg", "35deg"]);
  const faceX = useTransform(mouseXSpring, [-0.5, 0.5], [-40, 40]);
  const faceY = useTransform(mouseYSpring, [-0.5, 0.5], [-40, 40]);
  const eyeX = useTransform(mouseXSpring, [-0.5, 0.5], [-25, 25]);
  const eyeY = useTransform(mouseYSpring, [-0.5, 0.5], [-20, 20]);

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
      className="relative w-full h-[600px] md:h-[800px] bg-[var(--background)] overflow-hidden flex items-center justify-center perspective-[2000px] transition-colors duration-500"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Fade to blend with previous section */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-[var(--background)] to-transparent z-30 pointer-events-none transition-colors duration-500" />

      {/* Bottom Fade to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 bg-gradient-to-t from-[var(--background)] to-transparent z-30 pointer-events-none transition-colors duration-500" />

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
          Architect of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Culture</span>
        </h2>
        <p className="text-indigo-200/90 max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
          "Empowering people, transforming retail. Driving nationwide business growth through visionary HR leadership, high-performing teams, and a resilient workplace culture."
        </p>
      </div>

    </section>
  );
}
