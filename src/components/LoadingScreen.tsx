"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [loadingText, setLoadingText] = useState("INITIALIZING EXPERIENCE...");

  useEffect(() => {
    // Check if we've already shown the loading screen this session
    const hasLoaded = sessionStorage.getItem("hasLoadedBefore");
    if (hasLoaded) {
      setIsLoading(false);
      return; // Skip loading logic completely
    }

    // Lock scrolling while loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  useEffect(() => {
    const texts = [
      "INITIALIZING EXPERIENCE...",
      "OPTIMIZING 3D ASSETS...",
      "LOADING HR EXPERTISE...",
      "PREPARING PORTFOLIO..."
    ];
    let idx = 0;
    const textInterval = setInterval(() => {
      idx = (idx + 1) % texts.length;
      setLoadingText(texts[idx]);
    }, 300);
    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const duration = 1200; // 1.2 seconds total simulated load time (faster)
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Easing function for smoother progress visual (fast initially, slows down at end)
      const rawProgress = currentStep / steps;
      const easeOutProgress = 1 - Math.pow(1 - rawProgress, 3);
      
      const currentProgress = Math.min(Math.round(easeOutProgress * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          sessionStorage.setItem("hasLoadedBefore", "true");
          setIsLoading(false);
        }, 400); // tiny pause at 100% to let users see it
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--background)] backdrop-blur-3xl"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // smooth exit
        >
          <div className="relative flex flex-col items-center justify-center w-full h-full px-6 overflow-hidden">
            
            {/* Massive Background Percentage Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03] select-none">
              <span className="text-[30vw] font-black text-[var(--text-primary)] leading-none tabular-nums">
                {progress}
              </span>
            </div>

            {/* Smooth Floating Background Particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: i % 2 === 0 ? '4px' : '8px',
                    height: i % 2 === 0 ? '4px' : '8px',
                    backgroundColor: i % 2 === 0 ? 'var(--walton-blue)' : 'var(--walton-red)',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [0, -80, 0],
                    x: [0, Math.random() * 40 - 20, 0],
                    opacity: [0.1, 0.6, 0.1],
                    scale: [1, 1.5, 1]
                  }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            <motion.div 
              className="relative z-10 flex flex-col items-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              
              {/* Photo Container with Spinning Rings */}
              <div className="relative flex items-center justify-center mb-8">
                
                {/* Outer Spinning Ring */}
                <motion.div
                  className="absolute w-[120%] h-[120%] rounded-full border-[2px] border-dashed border-[var(--walton-blue)]/40"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Inner Spinning Ring */}
                <motion.div
                  className="absolute w-[110%] h-[110%] rounded-full border-[2px] border-dashed border-[var(--walton-red)]/30"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />

                {/* Photo Fill Container */}
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[var(--glass-border)] shadow-2xl z-10 bg-[var(--background)]">
                  
                  {/* Background Grayscale Photo */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale opacity-20"
                    style={{ backgroundImage: "url('/about/about-1.jpg')" }}
                  />
                  
                  {/* Foreground Colored Photo (Fills up based on progress) */}
                  <div 
                    className="absolute bottom-0 left-0 w-full bg-cover bg-center transition-all duration-100 ease-linear"
                    style={{ 
                      backgroundImage: "url('/about/about-1.jpg')",
                      height: `${progress}%`
                    }}
                  />
                  
                  {/* Overlay Ring Glow */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.6)] pointer-events-none" />
                </div>
              </div>

              {/* Progress Text */}
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-black text-[var(--text-primary)] tabular-nums tracking-wider mb-2">
                  {progress}<span className="text-[var(--walton-red)]">%</span>
                </span>
                
                <motion.div 
                  className="px-4 py-1.5 rounded-full bg-[var(--text-primary)]/5 border border-[var(--glass-border)] backdrop-blur-md"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-[var(--walton-blue)] uppercase">
                    {loadingText}
                  </span>
                </motion.div>
              </div>

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
