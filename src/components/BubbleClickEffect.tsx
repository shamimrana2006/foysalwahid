"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Bubble {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  scale: number;
  duration: number;
  color: string;
}

export default function BubbleClickEffect() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const colors = ["rgba(0, 85, 165, 0.8)", "rgba(227, 24, 55, 0.6)", "rgba(148, 163, 184, 0.8)", "rgba(255, 255, 255, 0.9)"];
      
      const numBubbles = Math.floor(Math.random() * 8) + 12; // 12 to 20 elegant particles
      const newBubbles: Bubble[] = [];

      for (let i = 0; i < numBubbles; i++) {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const offsetX = (Math.random() - 0.5) * 20; 
        const offsetY = (Math.random() - 0.5) * 20; 
        
        const startX = e.clientX + offsetX;
        const startY = e.clientY + offsetY;
        
        newBubbles.push({
          id: Date.now() + Math.random(),
          startX,
          startY,
          endX: startX + (Math.random() - 0.5) * 100,
          endY: startY - 30 - Math.random() * 80,
          scale: 0.4 + Math.random() * 0.6,
          duration: 1.2 + Math.random() * 0.8,
          color: randomColor,
        });
      }

      setBubbles((prev) => [...prev, ...newBubbles]);

      // Remove bubbles after animation completes (longer duration for elegance)
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => !newBubbles.includes(b)));
      }, 2000);
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ 
              opacity: 1, 
              scale: 0,
              x: bubble.startX, 
              y: bubble.startY 
            }}
            animate={{ 
              opacity: 0, 
              scale: bubble.scale,
              x: bubble.endX,
              y: bubble.endY
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: bubble.duration, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: 10, // tiny particle
              height: 10,
              backgroundColor: bubble.color,
              boxShadow: `0 0 12px 2px ${bubble.color.replace('0.8', '0.4').replace('0.9', '0.5').replace('0.6', '0.3')}` // subtle glow
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
