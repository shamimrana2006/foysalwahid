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
  const pupilX = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);
  const pupilY = useTransform(mouseYSpring, [-0.5, 0.5], [-12, 12]);

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
          const size = Math.random() * 3 + 1;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const duration = Math.random() * 20 + 10;
          const delay = Math.random() * 10;

          return (
            <motion.div
              key={`star-${i}`}
              className="absolute bg-white rounded-full"
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
                opacity: Math.random() * 0.5 + 0.1,
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
          const startY = 10 + Math.random() * 80;
          const duration = 25 + Math.random() * 20;
          const delay = Math.random() * 15;

          return (
            <motion.div
              key={`word-${i}`}
              className="absolute text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-xl md:text-3xl lg:text-4xl whitespace-nowrap opacity-50"
              style={{ top: `${startY}%`, left: `${startX}%` }}
              animate={{
                x: [`${startX}vw`, `${endX}vw`],
                y: [0, Math.random() * 100 - 50, 0],
                rotate: [0, Math.random() * 20 - 10, 0]
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
          const startX = Math.random() * 100;
          const startY = Math.random() * 100;
          const duration = 15 + Math.random() * 15;
          const delay = Math.random() * 5;
          const size = 30 + Math.random() * 40;

          return (
            <motion.div
              key={`icon-${i}`}
              className="absolute text-indigo-300 drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]"
              style={{ left: `${startX}%`, top: `${startY}%` }}
              initial={{ z: -500, opacity: 0 }}
              animate={{
                z: [-500, 200, 500, -500],
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, 0],
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
          {/* Network-Relevant Professional Observer Face */}
          <div className="absolute w-24 h-28 md:w-32 md:h-36 bg-indigo-950/90 backdrop-blur-xl rounded-[2rem] shadow-[0_0_60px_rgba(99,102,241,0.5),_inset_0_0_30px_rgba(56,189,248,0.2)] z-10 flex flex-col items-center justify-center border border-indigo-400 overflow-hidden">
            
            {/* Background Network Grid/Lines */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.4) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
            
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-indigo-500/30" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-indigo-500/30" />

            {/* The Eyes (Much Bigger) */}
            <div className="flex gap-4 md:gap-6 relative z-10">
              
              {/* Left Eye */}
              <div className="w-8 h-10 md:w-10 md:h-12 bg-black/60 rounded-full flex items-center justify-center border border-indigo-300 shadow-[inset_0_0_15px_rgba(99,102,241,0.5)] overflow-hidden relative">
                {/* Network crosshair */}
                <div className="absolute w-full h-[1px] bg-indigo-500/30" />
                <div className="absolute h-full w-[1px] bg-indigo-500/30" />
                
                {/* Moving Pupil */}
                <motion.div 
                  style={{ x: pupilX, y: pupilY }}
                  className="w-4 h-4 md:w-5 md:h-5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1),0_0_30px_rgba(34,211,238,0.8)]"
                />
              </div>

              {/* Right Eye */}
              <div className="w-8 h-10 md:w-10 md:h-12 bg-black/60 rounded-full flex items-center justify-center border border-indigo-300 shadow-[inset_0_0_15px_rgba(99,102,241,0.5)] overflow-hidden relative">
                <div className="absolute w-full h-[1px] bg-indigo-500/30" />
                <div className="absolute h-full w-[1px] bg-indigo-500/30" />
                
                <motion.div 
                  style={{ x: pupilX, y: pupilY }}
                  className="w-4 h-4 md:w-5 md:h-5 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1),0_0_30px_rgba(34,211,238,0.8)]"
                />
              </div>
            </div>

            {/* Cybernetic/Network data stream below (replaces mouth) */}
            <div className="mt-4 flex gap-1 relative z-10 items-center justify-center">
               <motion.div animate={{ height: [4, 12, 4] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 bg-indigo-400 rounded-full" />
               <motion.div animate={{ height: [4, 16, 4] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} className="w-1.5 bg-cyan-300 rounded-full" />
               <motion.div animate={{ height: [4, 8, 4] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} className="w-1.5 bg-indigo-400 rounded-full" />
               <motion.div animate={{ height: [4, 14, 4] }} transition={{ duration: 1.1, repeat: Infinity, delay: 0.1 }} className="w-1.5 bg-cyan-300 rounded-full" />
            </div>

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
