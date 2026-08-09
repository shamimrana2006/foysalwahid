"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Users, UserCheck, Briefcase, Award, TrendingUp, Target, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const HR_WORDS = [
  "Leadership", "Talent Acquisition", "Culture", "Recruitment", 
  "Employee Relations", "Onboarding", "Performance", "Strategy", 
  "Engagement", "Mentorship", "Diversity", "Inclusion"
];

const ICONS = [User, Users, UserCheck, Briefcase, Award, TrendingUp, Target, Heart];

// Deterministic pseudo-random generator
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

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

  if (!isMounted) return <div className="h-[600px] w-full bg-black" />;

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
      className="relative w-full h-[600px] md:h-[800px] bg-black overflow-hidden flex items-center justify-center border-y border-white/10 perspective-[2000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* Deep Space Background / Nebula */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[150px]" />
      </div>

      {/* Infinity Star Field */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => {
          const size = pseudoRandom(i) * 3 + 1;
          const x = pseudoRandom(i + 100) * 100;
          const y = pseudoRandom(i + 200) * 100;
          const duration = pseudoRandom(i + 300) * 20 + 10;
          const delay = pseudoRandom(i + 400) * 10;

          return (
            <motion.div
              key={`star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
                opacity: pseudoRandom(i + 450) * 0.5 + 0.1,
              }}
              animate={{
                y: ["0%", "-100%"],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
              }}
            />
          );
        })}
      </div>

      {/* Floating HR Words */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {HR_WORDS.map((word, i) => {
          const isLeft = i % 2 === 0;
          const startX = isLeft ? -20 : 120;
          const endX = isLeft ? 120 : -20;
          const startY = 10 + pseudoRandom(i + 500) * 80;
          const duration = 25 + pseudoRandom(i + 600) * 20;
          const delay = pseudoRandom(i + 700) * 15;

          return (
            <motion.div
              key={`word-${i}`}
              className="absolute text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-xl md:text-3xl lg:text-4xl whitespace-nowrap opacity-50"
              style={{ top: `${startY}%`, left: `${startX}%` }}
              animate={{
                x: [`${startX}vw`, `${endX}vw`],
                y: [0, pseudoRandom(i + 800) * 100 - 50, 0],
                rotate: [0, pseudoRandom(i + 900) * 20 - 10, 0]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay
              }}
            >
              {word}
            </motion.div>
          );
        })}
      </div>

      {/* Floating Skilled Human People (Icons) */}
      <div className="absolute inset-0 z-20 pointer-events-none perspective-[1000px]">
        {Array.from({ length: 15 }).map((_, i) => {
          const Icon = ICONS[i % ICONS.length];
          const startX = pseudoRandom(i + 1000) * 100;
          const startY = pseudoRandom(i + 1100) * 100;
          const duration = 15 + pseudoRandom(i + 1200) * 15;
          const delay = pseudoRandom(i + 1300) * 5;
          const size = 30 + pseudoRandom(i + 1400) * 40;

          return (
            <motion.div
              key={`icon-${i}`}
              className="absolute text-indigo-300 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]"
              style={{ left: `${startX}%`, top: `${startY}%` }}
              initial={{ z: -500, opacity: 0 }}
              animate={{
                z: [-500, 200, 500, -500],
                x: [0, pseudoRandom(i + 1500) * 200 - 100, 0],
                y: [0, pseudoRandom(i + 1600) * 200 - 100, 0],
                opacity: [0, 1, 1, 0],
                rotateX: [0, 360],
                rotateY: [0, 360]
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
              }}
            >
              <Icon size={size} strokeWidth={1.5} />
            </motion.div>
          );
        })}
      </div>

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
