"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number;
  isLoading: boolean;
}

export default function Preloader({ progress, isLoading }: PreloaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0d]"
        >
          <div className="w-full max-w-xs px-4">
            {/* Logo / Branding */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center mb-8"
            >
              <h2 className="text-sm font-mono tracking-[0.3em] uppercase text-blue-400 font-bold">
                YUAN EXPERIENCE
              </h2>
              <p className="text-xs text-neutral-400 font-mono mt-1">
                SYSTEM BOOT & CORE INITIALIZATION
              </p>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="relative h-[2px] w-full bg-neutral-900 rounded-full overflow-hidden mb-4 border border-white/5">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 shadow-[0_0_10px_#0066ff]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>

            {/* Progress Percentage */}
            <div className="flex justify-between items-center text-[10px] font-mono text-blue-400 font-bold">
              <span className="tracking-widest">LOADING CORE</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
