"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  progress: number;
  isLoading: boolean;
}

// Boot sequence log lines — revealed progressively as loading advances
const BOOT_LINES = [
  { threshold: 0,  text: "[SYS]  YUVAN_OS v3.2.1 — kernel init", color: "text-blue-400" },
  { threshold: 5,  text: "[BIOS] POST check .............. OK", color: "text-emerald-400" },
  { threshold: 10, text: "[MEM]  Allocating 16GB VRAM .... OK", color: "text-emerald-400" },
  { threshold: 18, text: "[GPU]  WebGL 2.0 context bound . OK", color: "text-emerald-400" },
  { threshold: 25, text: "[NET]  Establishing secure pipe  OK", color: "text-emerald-400" },
  { threshold: 32, text: "[I/O]  Loading /assets/3d_seq .. ", color: "text-cyan-400" },
  { threshold: 40, text: "[GFX]  Decoding frame buffer ░░░ ", color: "text-cyan-400" },
  { threshold: 50, text: "[CPU]  Compiling shaders ....... OK", color: "text-emerald-400" },
  { threshold: 60, text: "[DOM]  Hydrating components ... ", color: "text-cyan-400" },
  { threshold: 70, text: "[API]  Preloading GitHub data .. OK", color: "text-emerald-400" },
  { threshold: 80, text: "[RDR]  Compositing layers ...... OK", color: "text-emerald-400" },
  { threshold: 90, text: "[SYS]  All subsystems nominal", color: "text-blue-400" },
  { threshold: 95, text: "[>>>]  READY — launching portfolio", color: "text-amber-400" },
];

// Blinking cursor
function Cursor() {
  const [on, setOn] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setOn(p => !p), 480);
    return () => clearInterval(t);
  }, []);
  return (
    <span className={`inline-block w-[7px] h-[14px] ml-0.5 align-middle bg-emerald-400 transition-opacity duration-75 ${on ? "opacity-100" : "opacity-0"}`} />
  );
}

// Matrix rain column
function MatrixColumn({ delay, left, speed }: { delay: number; left: string; speed: number }) {
  const chars = "01アイウエオカキクケコYUVAN{}[]<>/=;:()+-*&^%$#@!".split("");
  const [column, setColumn] = useState<string[]>([]);

  useEffect(() => {
    const arr: string[] = [];
    for (let i = 0; i < 20; i++) {
      arr.push(chars[Math.floor(Math.random() * chars.length)]);
    }
    setColumn(arr);
  }, []);

  return (
    <motion.div
      className="absolute top-0 font-mono text-[10px] leading-[14px] pointer-events-none select-none"
      style={{ left }}
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: "120vh", opacity: [0, 0.4, 0.4, 0] }}
      transition={{
        duration: speed,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {column.map((char, i) => (
        <div
          key={i}
          className={i === column.length - 1 ? "text-white font-bold" : "text-emerald-500/30"}
        >
          {char}
        </div>
      ))}
    </motion.div>
  );
}

export default function Preloader({ progress, isLoading }: PreloaderProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [accessGranted, setAccessGranted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  // Reveal boot lines based on progress thresholds
  useEffect(() => {
    const count = BOOT_LINES.filter(l => progress >= l.threshold).length;
    setVisibleLines(count);
  }, [progress]);

  // Trigger "ACCESS GRANTED" glitch when fully loaded
  useEffect(() => {
    if (progress >= 100 && !accessGranted) {
      setGlitchActive(true);
      setTimeout(() => {
        setAccessGranted(true);
        setGlitchActive(false);
      }, 600);
    }
  }, [progress, accessGranted]);

  // Auto-scroll log container
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // Random glitch flashes
  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 80);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Generate matrix rain columns
  const matrixCols = useRef(
    Array.from({ length: 25 }, (_, i) => ({
      delay: Math.random() * 4,
      left: `${(i / 25) * 100}%`,
      speed: 3 + Math.random() * 5,
    }))
  );

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px) brightness(2)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050508] overflow-hidden"
        >
          {/* Glitch overlay */}
          {glitchActive && (
            <div className="absolute inset-0 z-40 pointer-events-none">
              <div className="absolute inset-0 bg-cyan-500/[0.03]" style={{ transform: "translateX(2px)" }} />
              <div className="absolute inset-0 bg-red-500/[0.02]" style={{ transform: "translateX(-2px)" }} />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                }}
              />
            </div>
          )}

          {/* Matrix rain background */}
          <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
            {matrixCols.current.map((col, i) => (
              <MatrixColumn key={i} {...col} />
            ))}
          </div>

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.5) 1px, rgba(255,255,255,0.5) 2px)",
            }}
          />

          {/* Outer CRT vignette */}
          <div className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Main Terminal Window */}
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 w-[90vw] max-w-[520px] bg-[#0a0c10]/90 border border-[#1a1f2e] rounded-xl overflow-hidden shadow-[0_0_60px_rgba(59,130,246,0.08),0_30px_80px_rgba(0,0,0,0.9)] backdrop-blur-sm"
          >
            {/* Terminal title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#1a1f2e] bg-[#080a0e]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c840]" />
              </div>
              <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">
                yuvan@portfolio — bash
              </span>
              <div className="w-12" /> {/* spacer */}
            </div>

            {/* ASCII Art Header */}
            <div className="px-4 pt-4 pb-2">
              <motion.pre
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-[8px] sm:text-[9px] font-mono text-blue-400/80 leading-[1.2] select-none whitespace-pre"
              >
{`  ██╗   ██╗██╗   ██╗██╗   ██╗ █████╗ ███╗   ██╗
  ╚██╗ ██╔╝██║   ██║██║   ██║██╔══██╗████╗  ██║
   ╚████╔╝ ██║   ██║██║   ██║███████║██╔██╗ ██║
    ╚██╔╝  ██║   ██║╚██╗ ██╔╝██╔══██║██║╚██╗██║
     ██║   ╚██████╔╝ ╚████╔╝ ██║  ██║██║ ╚████║
     ╚═╝    ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═══╝`}
              </motion.pre>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[9px] font-mono text-neutral-500 mt-1.5 tracking-wider"
              >
                Portfolio OS • Build 2026.07 • Creative Developer
              </motion.div>
              <div className="h-[1px] bg-gradient-to-r from-blue-500/30 via-cyan-500/20 to-transparent mt-3" />
            </div>

            {/* Boot log area */}
            <div
              ref={logRef}
              className="px-4 py-2 h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#1a1f2e] scrollbar-track-transparent"
            >
              <div className="space-y-[5px]">
                {BOOT_LINES.slice(0, visibleLines).map((line, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex items-center gap-0 text-[11px] font-mono leading-tight"
                  >
                    <span className={`${line.color} whitespace-pre`}>{line.text}</span>
                    {idx === visibleLines - 1 && !accessGranted && <Cursor />}
                  </motion.div>
                ))}

                {/* ACCESS GRANTED line */}
                {accessGranted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                    className="mt-3 pt-3 border-t border-emerald-500/20"
                  >
                    <div className="text-emerald-400 font-mono text-xs font-bold tracking-widest flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                      ACCESS GRANTED — WELCOME BACK
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Progress bar section */}
            <div className="px-4 py-3 border-t border-[#1a1f2e] bg-[#080a0e]/60">
              {/* Segmented progress bar */}
              <div className="flex gap-[2px] h-[6px] mb-2.5">
                {Array.from({ length: 30 }).map((_, i) => {
                  const segmentProgress = (i / 30) * 100;
                  const isFilled = progress >= segmentProgress;
                  const isActive = progress >= segmentProgress && progress < segmentProgress + (100 / 30) + 2;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-[1px] transition-all duration-150 ${
                        isFilled
                          ? isActive
                            ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                            : "bg-blue-500/80"
                          : "bg-[#1a1f2e]/60"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Bottom status bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider">
                    {progress < 100 ? "LOADING CORE ASSETS" : "BOOT COMPLETE"}
                  </span>
                  {progress < 100 && (
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="text-[9px] font-mono text-cyan-500"
                    >
                      ●
                    </motion.span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-mono text-neutral-600">
                    PID: 1337
                  </span>
                  <span className={`text-xs font-mono font-bold tabular-nums tracking-tight ${
                    progress >= 100 ? "text-emerald-400" : "text-blue-400"
                  }`}>
                    {Math.round(progress)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ambient corner decorations */}
          <div className="absolute top-6 left-6 z-20 text-[9px] font-mono text-neutral-700 select-none pointer-events-none">
            <div>SYS.CLOCK: {new Date().toLocaleTimeString("en-US", { hour12: false })}</div>
            <div className="mt-1">MEM: 16384MB</div>
          </div>
          <div className="absolute bottom-6 right-6 z-20 text-[9px] font-mono text-neutral-700 text-right select-none pointer-events-none">
            <div>NODE: v22.4.0</div>
            <div className="mt-1">NEXT: v15.x</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
