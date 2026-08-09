"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Calendar } from "lucide-react";
import { useRef } from "react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceCardProps {
  item: ExperienceItem;
  isActive: boolean;
  isEven: boolean;
}

export default function ExperienceCard({ item, isActive, isEven }: ExperienceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
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

  const handleMouseLeave = () => {
    // Smoothly snap back to flat when mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full h-full">
      <motion.div 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, x: isEven ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d" 
        }}
        className={`glass p-8 rounded-3xl transition-colors duration-700 group relative overflow-hidden z-10 w-full h-full select-none ${
          isActive 
            ? 'border border-white/30 bg-white/10 backdrop-blur-xl shadow-[0_30px_60px_-15px_rgba(0,85,165,0.5)]' 
            : 'border border-[var(--glass-border)] hover:bg-white/5 hover:shadow-[0_20px_40px_-10px_rgba(0,85,165,0.2)]'
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

        {/* Subtle internal gradient for active state */}
        <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* We apply translateZ to the content to make it pop out in 3D! */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full">
          <span className={`inline-block px-4 py-1.5 bg-[var(--text-primary)]/5 rounded-full text-xs font-bold tracking-wider mb-5 flex items-center w-fit gap-2 transition-colors duration-500 ${isActive ? 'text-[var(--walton-red)]' : 'text-[var(--walton-blue)]'} ${isEven ? 'md:ml-auto' : ''}`}>
            <Calendar size={14} />
            {item.period}
          </span>
          
          <h4 className={`text-2xl font-black mb-2 transition-colors duration-500 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-primary)] group-hover:text-[var(--walton-blue)]'}`}>
            {item.role}
          </h4>
          
          <h5 className="text-[var(--walton-blue)] font-bold mb-5 text-lg">
            {item.company}
          </h5>
          
          <p className={`transition-colors duration-500 leading-relaxed ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'}`}>
            {item.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
