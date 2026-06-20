"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: Center Aligned (Scroll range 0% - 28%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.20, 0.28], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.28], [0, -100]);
  const blur1 = useTransform(scrollYProgress, [0, 0.20, 0.28], ["blur(0px)", "blur(0px)", "blur(12px)"]);

  // Section 2: Left Aligned (Scroll range 25% - 62%)
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.62], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.62], [60, 0, 0, -60]);
  const blur2 = useTransform(scrollYProgress, [0.25, 0.35, 0.55, 0.62], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  // Section 3: Right Aligned (Scroll range 58% - 95%)
  const opacity3 = useTransform(scrollYProgress, [0.58, 0.68, 0.88, 0.95], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.58, 0.68, 0.88, 0.95], [60, 0, 0, -60]);
  const blur3 = useTransform(scrollYProgress, [0.58, 0.68, 0.88, 0.95], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  // Scroll Indicator (Scroll range 0% - 10%)
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      {/* Section 1: Hero */}
      <motion.div
        style={{ opacity: opacity1, y: y1, filter: blur1 }}
        className="absolute inset-0 flex flex-col justify-center items-start text-left px-8 md:px-24 max-w-3xl"
      >
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white uppercase max-w-2xl leading-none drop-shadow-[0_4px_24px_rgba(0,102,255,0.3)] font-heading">
          Yuvan Avinash
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 text-lg md:text-2xl font-bold tracking-widest uppercase mt-4">
            Computer Science Engineer & Full-Stack Developer
          </span>
        </h1>
        <p className="mt-4 text-xs md:text-sm font-mono tracking-widest text-neutral-300 uppercase max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Building software, automations, and intelligent systems that solve real-world problems.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-8 max-w-xl w-full pointer-events-auto">
          {[
            { value: "SRM IST", label: "B.Tech CSE Ramapuram" },
            { value: "95%", label: "Class 10 Boards" },
            { value: "Active", label: "Open Source Contributor" },
            { value: "Multiple", label: "Hackathons" },
            { value: "CodeKrafters", label: "Dev Domain Member" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel px-3 py-4 rounded-xl border border-white/5 bg-black/40 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="text-sm md:text-base font-bold text-blue-400 group-hover:text-cyan-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-[9px] md:text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-start gap-3 mt-8 pointer-events-auto">
          <a
            href="#projects"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-[0_0_15px_rgba(0,102,255,0.4)] transition-all duration-300 text-xs tracking-wider uppercase font-mono border border-blue-500/20"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/15 transition-all duration-300 text-xs tracking-wider uppercase font-mono"
          >
            Contact Me
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert("Resume download path configured! Replace with actual resume asset.");
            }}
            className="px-5 py-2.5 bg-blue-950/40 hover:bg-blue-950/70 text-blue-400 font-bold rounded-full border border-blue-500/30 transition-all duration-300 text-xs tracking-wider uppercase font-mono"
          >
            Download Resume
          </a>
        </div>
      </motion.div>

      {/* Section 2: Statement */}
      <motion.div
        style={{ opacity: opacity2, y: y2, filter: blur2 }}
        className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-24 max-w-3xl"
      >
        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-2 drop-shadow-[0_2px_8px_rgba(0,102,255,0.3)]">
          [ 01 // PROFILE SUMMARY ]
        </span>
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] font-heading">
          Driven by curiosity <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-200 to-neutral-200">
            & technology.
          </span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-neutral-200 max-w-md font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Pursuing B.Tech in CSE at SRM Ramapuram, Chennai. Committed to solving complex problems through technology, open-source software, and full-stack engineering.
        </p>
      </motion.div>

      {/* Section 3: Vision */}
      <motion.div
        style={{ opacity: opacity3, y: y3, filter: blur3 }}
        className="absolute inset-0 flex flex-col justify-center items-end text-right px-8 md:px-24 ml-auto max-w-3xl"
      >
        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-2 drop-shadow-[0_2px_8px_rgba(0,102,255,0.3)]">
          [ 02 // COGNITIVE LABS ]
        </span>
        <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] font-heading">
          Building new <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-neutral-200 via-cyan-200 to-blue-400">
            automations.
          </span>
        </h2>
        <p className="mt-4 text-sm md:text-base text-neutral-200 max-w-md ml-auto font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Constructing robust architectures using Python, Robotic Process Automation (RPA), workflow systems, and modern React environments.
        </p>
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
