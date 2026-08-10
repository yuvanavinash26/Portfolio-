"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PreloaderProps {
  progress: number;
  isLoading: boolean;
}

export default function Preloader({ progress: externalProgress, isLoading }: PreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smoothly increment progress over ~3.5s for a complete luxury loading experience
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setDisplayProgress(prev => {
        const next = prev + Math.random() * 3.5 + 1.2;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isLoading]);

  const currentProgress = Math.min(100, Math.max(displayProgress, externalProgress));

  // Clean status messages (no duplicate 'welcome' text)
  let statusText = "INITIALIZING CORE...";
  if (currentProgress >= 95) {
    statusText = "PORTFOLIO READY";
  } else if (currentProgress >= 70) {
    statusText = "COMPOSITING EXPERIENCE...";
  } else if (currentProgress >= 35) {
    statusText = "LOADING CORE ASSETS...";
  }

  const welcomeWords = ["Welcome", "to", "My", "Portfolio"];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const }
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden select-none"
        >
          {/* Animated Ambient Radial Glow */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-emerald-500/20 rounded-full blur-[160px] pointer-events-none"
          />

          {/* Main Title Banner: "Welcome to My Portfolio" with Staggered Word Reveal */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-10 text-center px-4 z-10">
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 font-luxury text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
              {welcomeWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  className={
                    word === "Portfolio"
                      ? "bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(16,185,129,0.4)] font-extrabold"
                      : "bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,255,255,0.2)]"
                  }
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* Author Credit Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
              className="flex items-center gap-2 mt-4"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-cyan-300/90 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                YUVAN AVINASH
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </motion.div>
          </div>

          {/* Luxury Animated Loading Bar Track */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-64 sm:w-80 md:w-96 h-2.5 bg-neutral-950/90 border border-white/10 rounded-full relative overflow-hidden my-5 z-10 p-[1.5px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.8)]"
          >
            {/* Active Progress Fill Bar */}
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500 rounded-full relative overflow-hidden shadow-[0_0_16px_rgba(16,185,129,0.8)]"
              style={{ width: `${currentProgress}%` }}
              transition={{ ease: "easeOut", duration: 0.15 }}
            >
              {/* Continuous Scanning Shimmer Light Beam Effect */}
              <motion.div
                animate={{ x: ["-100%", "250%"] }}
                transition={{ repeat: Infinity, duration: 1.3, ease: "linear" }}
                className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none"
              />
            </motion.div>
          </motion.div>

          {/* Status Message & Progress Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-col items-center gap-2 mt-2 z-10"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={statusText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-[11px] sm:text-xs text-neutral-300 tracking-[0.35em] uppercase font-semibold text-center"
              >
                {statusText}
              </motion.span>
            </AnimatePresence>

            <span className="font-mono text-[10px] text-cyan-300 font-bold tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              {Math.round(currentProgress)}%
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
