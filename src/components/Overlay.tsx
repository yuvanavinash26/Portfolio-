"use client";

import { useState, useEffect } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Section 1: Center Aligned (Scroll range 0% - 28%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.28], [0, -100]);
  const blurVal1 = useTransform(scrollYProgress, [0, 0.20, 0.28], ["blur(0px)", "blur(0px)", "blur(12px)"]);
  const blur1 = isMobile ? "none" : blurVal1;

  // Section 2: Left Aligned (Scroll range 25% - 62%)
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.62], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.62], [60, 0, 0, -60]);
  const blurVal2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.62], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
  const blur2 = isMobile ? "none" : blurVal2;

  // Section 3: Right Aligned (Scroll range 58% - 95%)
  const opacity3 = useTransform(scrollYProgress, [0.58, 0.68, 0.88, 0.95], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.58, 0.68, 0.88, 0.95], [60, 0, 0, -60]);
  const blurVal3 = useTransform(scrollYProgress, [0.58, 0.68, 0.88, 0.95], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);
  const blur3 = isMobile ? "none" : blurVal3;

  // Scroll Indicator (Scroll range 0% - 10%)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      {/* Section 1: Hero */}
      <motion.div
        style={{ opacity: opacity1, y: y1, filter: blur1 }}
        className="absolute inset-y-0 left-0 flex flex-col justify-end md:justify-center items-center md:items-start text-center md:text-left px-6 md:px-16 lg:px-24 max-w-xl w-full pb-10 md:pb-0 z-10"
      >
        <h1 className="text-3xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-white uppercase max-w-2xl leading-none drop-shadow-[0_4px_24px_rgba(0,102,255,0.35)] font-heading">
          Yuvan Avinash
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 text-base md:text-xl font-bold tracking-widest uppercase mt-3 md:mt-4">
            Computer Science Engineer & Full-Stack Developer
          </span>
        </h1>
        <p className="mt-4 text-[10px] md:text-xs font-mono tracking-widest text-neutral-300 uppercase max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] leading-relaxed">
          Building software, automations, and intelligent systems that solve real-world problems.
        </p>

        {/* CTA Buttons (Simplified to prevent any background blocking) */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2.5 md:gap-3 mt-6 md:mt-8 pointer-events-auto">
          <a
            href="#projects"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-[0_0_15px_rgba(0,102,255,0.4)] transition-all duration-300 text-[10px] md:text-xs tracking-wider uppercase font-mono border border-blue-500/20"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download="Yuvan_Avinash_Resume.pdf"
            className="px-5 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white font-bold rounded-full border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 text-[10px] md:text-xs tracking-wider uppercase font-mono flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            Download Resume
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/15 transition-all duration-300 text-[10px] md:text-xs tracking-wider uppercase font-mono"
          >
            Contact Me
          </a>
        </div>
      </motion.div>

      {/* Section 2: Statement */}
      <motion.div
        style={{ opacity: opacity2, y: y2, filter: blur2 }}
        className="absolute inset-y-0 left-0 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-24 max-w-xl w-full z-10"
      >
        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-2 drop-shadow-[0_2px_8px_rgba(0,102,255,0.3)]">
          [ 01 // PROFILE SUMMARY ]
        </span>
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] font-heading">
          Driven by curiosity <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-200 to-neutral-200">
            & technology.
          </span>
        </h2>
        <p className="mt-4 text-xs md:text-sm text-neutral-200 max-w-md font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Pursuing B.Tech in CSE at SRM Ramapuram, Chennai. Committed to solving complex problems through technology, open-source software, and full-stack engineering.
        </p>
      </motion.div>

      {/* Section 3: Vision */}
      <motion.div
        style={{ opacity: opacity3, y: y3, filter: blur3 }}
        className="absolute inset-y-0 right-0 flex flex-col justify-center items-center md:items-end text-center md:text-right px-6 md:px-24 ml-auto max-w-xl w-full z-10"
      >
        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-2 drop-shadow-[0_2px_8px_rgba(0,102,255,0.3)]">
          [ 02 // COGNITIVE LABS ]
        </span>
        <h2 className="text-2xl md:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] font-heading">
          Building new <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-neutral-200 via-cyan-200 to-blue-400">
            automations.
          </span>
        </h2>
        <p className="mt-4 text-xs md:text-sm text-neutral-200 max-w-md md:ml-auto font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          Creating software that works smarter, not harder—combining automation, full-stack development, and AI-driven solutions to solve real-world challenges.
        </p>

        {/* Capabilities HUD Widget */}
        <div className="mt-6 p-5 rounded-2xl border border-cyan-500/30 bg-[#04090b]/80 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.12)] md:ml-auto w-full max-w-sm pointer-events-auto relative group overflow-hidden">
          {/* Neon Corner Brackets */}
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/80" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/80" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/80" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/80" />

          <div className="flex items-center justify-between text-[10px] text-cyan-400 font-bold tracking-wider mb-4 border-b border-cyan-500/20 pb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              CAPABILITIES_MATRIX.SYS
            </span>
            <span className="text-neutral-500 text-[9px]">[ACTIVE]</span>
          </div>

          <div className="space-y-3 font-mono text-left">
            {[
              { name: "Python", val: 90, color: "from-cyan-500 to-blue-500", glow: "rgba(34,211,238,0.25)" },
              { name: "JavaScript", val: 80, color: "from-cyan-500 to-indigo-500", glow: "rgba(56,189,248,0.25)" },
              { name: "Automation", val: 85, color: "from-emerald-500 to-cyan-500", glow: "rgba(16,185,129,0.25)" },
              { name: "React / Next.js", val: 80, color: "from-blue-500 to-cyan-400", glow: "rgba(59,130,246,0.25)" },
              { name: "Problem Solving", val: 95, color: "from-cyan-400 to-emerald-400", glow: "rgba(34,211,238,0.25)" }
            ].map(skill => (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-neutral-300">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-cyan-400 font-bold">{skill.val}%</span>
                </div>
                {/* Micro-designed glowing progress bar */}
                <div className="h-1.5 w-full bg-white/[0.04] border border-white/[0.06] rounded-full overflow-hidden p-[0.5px]">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.val}%` }}
                    transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
                    style={{ boxShadow: `0 0 6px ${skill.glow}` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono font-bold text-blue-400 tracking-[0.25em] uppercase">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-blue-400" />
        </motion.div>
      </motion.div>
    </div>
  );
}
