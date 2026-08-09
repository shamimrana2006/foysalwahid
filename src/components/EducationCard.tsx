"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Calendar, GraduationCap } from "lucide-react";
import { useRef, useState } from "react";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

interface EducationCardProps {
  item: EducationItem;
  index: number;
}

export default function EducationCard({ item, index }: EducationCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position values for the 3D tilt effect (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Mouse position values in pixels for the spotlight border
  const mouseXPos = useMotionValue(0);
  const mouseYPos = useMotionValue(0);
  
  // Spring configuration for smooth tilt recovery
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  // Transform mouse position into rotation degrees (-10deg to 10deg)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate percentage from center (-0.5 to 0.5)
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
    
    // Set raw pixel values for the spotlight
    mouseXPos.set(mouseX);
    mouseYPos.set(mouseY);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly snap back to flat when mouse leaves
    x.set(0);
    y.set(0);
  };

  // Generate bubbles for this card once
  const bubbles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    angle: Math.random() * 360,
    distance: Math.random() * 150 + 50,
    delay: Math.random() * 0.5,
    duration: Math.random() * 1 + 1.5,
  }));

  return (
    <div style={{ perspective: "1000px" }} className={`w-full h-full relative ${index === 0 ? 'lg:col-span-2' : ''}`}>
      {/* Continuous small particle bubbles emanating from center ON HOVER */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-visible flex items-center justify-center">
        {bubbles.map((bubble) => {
          const rad = (bubble.angle * Math.PI) / 180;
          const targetX = Math.cos(rad) * bubble.distance;
          const targetY = Math.sin(rad) * bubble.distance;

          return (
            <motion.div
              key={`edu-bubble-${bubble.id}`}
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
              className="absolute rounded-full bg-gradient-to-br from-[var(--walton-blue)] to-[var(--walton-red)] shadow-[0_0_8px_rgba(227,24,55,0.6)]"
              style={{ width: bubble.size, height: bubble.size }}
            />
          );
        })}
      </div>

      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d" 
        }}
        className={`glass p-8 rounded-3xl transition-colors duration-700 group relative overflow-hidden z-10 w-full h-full border border-[var(--glass-border)] hover:bg-white/5 hover:shadow-[0_20px_40px_-10px_rgba(0,85,165,0.2)] select-none ${
          index === 0 ? 'bg-[var(--text-primary)]/5' : ''
        }`}
      >
        {/* Animated Mouse Spotlight Border (Ultra thin 1px gradient) */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseXPos}px ${mouseYPos}px,
                rgba(0, 85, 165, 0.9), /* Walton blue */
                rgba(227, 24, 55, 0.6) 40%, /* Walton red */
                transparent 80%
              )
            `,
            padding: "1px", // Defines the border thickness
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Big Graduation Cap Icon floating in the background */}
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
          <GraduationCap size={64} />
        </div>
        
        {/* We apply translateZ to the content to make it pop out in 3D! */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full">
          <span className="inline-block px-3 py-1 bg-[var(--text-primary)]/10 rounded-full text-xs font-bold text-[var(--text-muted)] mb-6 flex items-center w-fit gap-2 transition-colors duration-500 group-hover:text-[var(--walton-blue)]">
            <Calendar size={14} />
            {item.period}
          </span>
          
          <h4 className={`font-bold mb-3 transition-colors duration-500 text-[var(--text-primary)] group-hover:text-[var(--walton-blue)] ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
            {item.degree}
          </h4>
          
          <h5 className="font-medium leading-relaxed transition-colors duration-500 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]">
            {item.institution}
          </h5>
        </div>
      </motion.div>
    </div>
  );
}
