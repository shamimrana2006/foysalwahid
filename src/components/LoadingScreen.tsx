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
        setTimeout(() => setIsLoading(false), 400); // tiny pause at 100% to let users see it
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
          <div className="relative flex flex-col items-center">
            
            {/* Spinning Rings Animation */}
            <motion.div 
              className="absolute inset-[-40px] border-t-2 border-r-2 border-[var(--walton-blue)] rounded-full opacity-60"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-[-60px] border-b-2 border-l-2 border-[var(--walton-red)] rounded-full opacity-60"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-[-80px] border-t-2 border-l-2 border-[var(--text-primary)] rounded-full opacity-10"
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center Logo/Text Pulse */}
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-[var(--walton-blue)] to-[var(--walton-red)] flex items-center justify-center shadow-[0_0_40px_rgba(0,85,165,0.4)] relative overflow-hidden"
              animate={{ scale: [0.9, 1.05, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="absolute inset-1 bg-[var(--background)] rounded-full flex items-center justify-center">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-[var(--walton-blue)] to-[var(--walton-red)] tracking-tighter">
                  FW
                </span>
              </div>
            </motion.div>

            {/* Percentage Text */}
            <div className="mt-28 flex flex-col items-center">
              <span className="text-6xl md:text-8xl font-black tabular-nums tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--walton-blue)] via-[#8e44ad] to-[var(--walton-red)] drop-shadow-[0_0_15px_rgba(0,85,165,0.4)]">
                {progress}<span className="text-3xl md:text-5xl text-[var(--walton-red)] drop-shadow-none ml-1">%</span>
              </span>
              <motion.span 
                className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[var(--text-muted)] mt-6"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              >
                {loadingText}
              </motion.span>
            </div>
            
            {/* Progress Bar Line */}
            <div className="w-64 md:w-80 h-1 bg-[var(--border-color)] rounded-full mt-8 overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-[var(--walton-blue)] to-[var(--walton-red)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
