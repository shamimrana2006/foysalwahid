"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";

interface MagneticLogoProps {
  layoutId?: string;
}

export default function MagneticLogo({ layoutId }: MagneticLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position values for magnetic effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the magnetic pull
  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Move the logo towards the mouse when hovered
  const x = useTransform(springX, [-0.5, 0.5], ["-20%", "20%"]);
  const y = useTransform(springY, [-0.5, 0.5], ["-20%", "20%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = rect.left + width / 2;
    const centerY = rect.top + height / 2;

    // Calculate percentage from center (-0.5 to 0.5)
    mouseX.set((e.clientX - centerX) / width);
    mouseY.set((e.clientY - centerY) / height);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset magnetic pull
    mouseX.set(0);
    mouseY.set(0);
  };

  // Generate many continuous random bubbles for the distribution effect
  const bubbles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 3,
    angle: Math.random() * 360,
    distance: Math.random() * 50 + 40,
    delay: Math.random() * 2, // Spread out the start times
    duration: Math.random() * 1 + 1.5,
  }));

  return (
    <motion.div
      ref={ref}
      layoutId={layoutId}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      transition={{
        layout: { type: "spring", stiffness: 100, damping: 15 }
      }}
      // Enable pointer events here so it's interactive
      className="relative flex items-center justify-center cursor-pointer pointer-events-auto z-30"
      style={{
        width: "120px", // Reduced interaction area
        height: "120px",
      }}
    >
      {/* Magnetic Wrapper */}
      <motion.div
        style={{ x, y }}
        animate={{
          scale: isHovered ? 1.15 : 1, // Keep the physical scale working every time
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative z-10 flex items-center justify-center w-12 h-12 md:w-16 md:h-16" // Reduced default size
      >
        {/* Background Glowing Pulse - Scales up ONCE per hover, no continuous pulsing */}
        <motion.div
          animate={{
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.25 : 0.05,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-[-40%] rounded-full bg-gradient-to-tr from-[var(--walton-blue)] to-sky-400 blur-xl"
        />

        {/* Bubble Distribution Effect - Repeatedly plays while hovered */}
        {bubbles.map((bubble) => {
          const rad = (bubble.angle * Math.PI) / 180;
          const targetX = Math.cos(rad) * bubble.distance;
          const targetY = Math.sin(rad) * bubble.distance;

          return (
            <motion.div
              key={bubble.id}
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
              animate={{
                x: isHovered ? targetX : 0,
                y: isHovered ? targetY : 0,
                scale: isHovered ? 1 : 0,
                opacity: isHovered ? [0, 0.8, 0] : 0,
              }}
              transition={{
                duration: bubble.duration,
                repeat: isHovered ? Infinity : 0,
                delay: bubble.delay,
                ease: "easeOut",
              }}
              className="absolute rounded-full bg-gradient-to-br from-[var(--walton-blue)] to-sky-300 shadow-sm"
              style={{
                width: bubble.size,
                height: bubble.size,
              }}
            />
          );
        })}

        {/* Inner Logo Container - Keep the inner container glow working normally or also 1-time? Standard shadow is fine */}
        <div className="relative bg-white/90 backdrop-blur-md w-full h-full rounded-full flex items-center justify-center border border-white/40 shadow-[0_0_15px_rgba(0,85,165,0.2)] overflow-hidden p-2 group-hover:shadow-[0_0_30px_rgba(227,24,55,0.4)] transition-shadow duration-500">
          <Image
            src="/experience/walton-logo.png"
            alt="Walton"
            width={60}
            height={60}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
