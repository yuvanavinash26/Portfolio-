"use client";

import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Terminal, Activity } from "lucide-react";
import Link from "next/link";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function AboutMe() {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [autoFlipped, setAutoFlipped] = useState(false);

  const inView = useInView(containerRef, { once: false, amount: 0.15 });

  useEffect(() => {
    let timerStart: NodeJS.Timeout;
    let timerRevert: NodeJS.Timeout;

    if (inView) {
      timerStart = setTimeout(() => {
        setAutoFlipped(true);
        timerRevert = setTimeout(() => {
          setAutoFlipped(false);
        }, 2000);
      }, 2200); // Wait for the lanyard spring landing animation to fully place down and settle
    } else {
      setAutoFlipped(false);
    }

    return () => {
      if (timerStart) clearTimeout(timerStart);
      if (timerRevert) clearTimeout(timerRevert);
    };
  }, [inView]);

  // Framer Motion motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Maps values to rotation degrees
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set(mouseX);
    y.set(mouseY);
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    // Calculate percentage coordinates relative to card size for holographic shine
    const percentX = ((e.clientX - rect.left) / width) * 100;
    const percentY = ((e.clientY - rect.top) / height) * 100;
    setMousePos({ x: percentX, y: percentY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setMousePos({ x: 50, y: 50 });
  };

  return (
    <section id="about" ref={containerRef} className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5 overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Bio Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> [ ABOUT ME // BIO ]
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white uppercase mb-8 font-heading">
              Engineering solutions, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                shaping the future.
              </span>
            </h2>
            <div className="space-y-6 text-neutral-200 font-medium text-sm md:text-base leading-relaxed">
              <p>
                I am <strong className="text-white font-bold">Yuvan Avinash</strong>, a Computer Science Engineering student at SRM IST Ramapuram with a strong passion for software development, emerging technologies, and innovation.
              </p>
              <p>
                My journey began with curiosity about how technology shapes the world. Since then, I have explored full-stack web development, Python programming, automation technologies, and open-source software.
              </p>
              <p>
                I actively participate in hackathons, technical communities, and collaborative development programs where I transform ideas into practical solutions.
              </p>
              <p>
                My long-term vision is to build impactful technology products and eventually launch innovative startups that solve meaningful problems at scale.
              </p>
            </div>

            {/* Subpage CTA Actions */}
            <div className="mt-8 flex flex-wrap gap-4 z-30">
              <Link
                href="/terminal"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-400 hover:text-white px-5 py-3 border border-blue-500/20 bg-blue-500/5 rounded-full hover:bg-blue-500 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all duration-300"
              >
                <Terminal className="w-4 h-4" /> Launch Dev Terminal
              </Link>
              <Link
                href="/github"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 hover:text-white px-5 py-3 border border-cyan-500/20 bg-cyan-500/5 rounded-full hover:bg-cyan-500 hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(34,211,238,0.35)] transition-all duration-300"
              >
                <GithubIcon className="w-4 h-4" /> View Git Heatmap
              </Link>
            </div>
          </div>

          {/* Right: Holographic 3D Interactive Card (Lanyard ID Pass) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-start pt-6 relative min-h-[580px]">

            {/* Lanyard Assembly Wrapper: handles scroll-triggered drop, bounce, and infinite swaying */}
            <motion.div
              style={{
                transformOrigin: "top center",
              }}
              animate={inView ? {
                y: 0,
                rotate: [-3.5, 3.5],
              } : {
                y: -750, // Starts completely hidden above the top boundary of the About section
                rotate: 0,
              }}
              transition={{
                y: { type: "spring", stiffness: 28, damping: 13, mass: 1.15, delay: 0.2 },
                rotate: { repeat: Infinity, repeatType: "reverse", duration: 3.2, ease: "easeInOut", delay: 0.2 }
              }}
              className="flex flex-col items-center justify-start relative w-full pt-[100px]"
            >

              {/* 1. Lanyard Wire extending to top of About section (braided steel style cable) */}
              <div
                className="absolute bottom-full w-[3.5px] h-[260px] pointer-events-none overflow-visible flex flex-col justify-end"
                style={{
                  left: "calc(50% - 1.75px)",
                  background: "linear-gradient(90deg, #1b1b1c 0%, #4a4a4d 30%, #8c8c93 50%, #4a4a4d 70%, #1b1b1c 100%)",
                  boxShadow: "0 0 6px rgba(0,0,0,0.6), inset 0 0 2px rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                }}
              >
                {/* Glowing Electrical Core inside the wire */}
                <motion.div
                  className="absolute top-0 bottom-0 w-[1.5px] bg-cyan-400 shadow-[0_0_6px_#22d3ee,0_0_12px_#06b6d4]"
                  style={{ left: "calc(50% - 0.75px)" }}
                  animate={{
                    opacity: [0.3, 0.9, 0.4, 1, 0.2, 0.9, 0.3],
                    scaleX: [1, 1.4, 0.8, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Moving Electric Pulse Sparks traveling UP the wire */}
                {[...Array(3)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute w-1.5 h-1.5 rounded-full bg-cyan-200"
                    style={{
                      left: "calc(50% - 3px)",
                      boxShadow: "0 0 8px #22d3ee, 0 0 16px #0891b2",
                    }}
                    animate={{
                      bottom: ["0%", "100%"],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.8 + idx * 0.4,
                      repeat: Infinity,
                      ease: "linear",
                      delay: idx * 0.7,
                    }}
                  />
                ))}

                {/* Crackling Wire Spark particles along the wire */}
                {inView && [...Array(5)].map((_, i) => (
                  <motion.div
                    key={`wire-spark-${i}`}
                    className="absolute w-1 h-1 bg-cyan-300 rounded-full"
                    style={{
                      left: "50%",
                      bottom: `${15 + i * 18}%`,
                      boxShadow: "0 0 6px #22d3ee",
                    }}
                    animate={{
                      x: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30],
                      y: [0, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30],
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.3, 0.1],
                    }}
                    transition={{
                      duration: 0.3 + Math.random() * 0.4,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 1.8,
                      repeatDelay: Math.random() * 2.2,
                    }}
                  />
                ))}
              </div>

              {/* 2. Metal crimp clamp / sleeve */}
              <div
                className="w-9 h-5 border border-neutral-600/30 rounded-sm shadow-lg z-20 -mt-0.5 flex items-center justify-center relative pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, #55555a 0%, #9999a0 30%, #ffffff 50%, #9999a0 70%, #55555a 100%)",
                }}
              >
                {/* Clamp details - crimp indentation line */}
                <div className="w-full h-[1.5px] bg-black/40 absolute top-1/2 -translate-y-1/2" />
              </div>

              {/* 3. Steel key ring / split ring loop */}
              <svg width="24" height="24" viewBox="0 0 24 24" className="z-20 -mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] pointer-events-none">
                <defs>
                  <linearGradient id="ring-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#444" />
                    <stop offset="25%" stopColor="#aaa" />
                    <stop offset="50%" stopColor="#fff" />
                    <stop offset="75%" stopColor="#888" />
                    <stop offset="100%" stopColor="#333" />
                  </linearGradient>
                </defs>
                <circle cx="12" cy="12" r="9" fill="none" stroke="url(#ring-metal)" strokeWidth="2" />
                <circle cx="12" cy="12" r="7.5" fill="none" stroke="#111" strokeWidth="0.5" />
              </svg>

              {/* 4. Swivel Carabiner Trigger Snap Hook Clip */}
              <svg width="28" height="42" viewBox="0 0 28 42" className="z-30 -mt-2 drop-shadow-[0_3px_5px_rgba(0,0,0,0.6)] pointer-events-none">
                <defs>
                  <linearGradient id="clip-metal" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#555" />
                    <stop offset="20%" stopColor="#bbb" />
                    <stop offset="40%" stopColor="#fff" />
                    <stop offset="60%" stopColor="#888" />
                    <stop offset="80%" stopColor="#ddd" />
                    <stop offset="100%" stopColor="#333" />
                  </linearGradient>
                </defs>

                {/* Swivel D-loop connector at top */}
                <rect x="9" y="0" width="10" height="5" rx="1.5" fill="url(#clip-metal)" stroke="#222" strokeWidth="0.5" />

                {/* Swivel neck ring */}
                <path d="M10 5h8v3h-8z" fill="url(#clip-metal)" stroke="#222" strokeWidth="0.5" />

                {/* Main solid steel hook body that wraps down through slot */}
                <path
                  d="M14 8c-3 0-5.5 3-5.5 8c0 5 2.5 10 4 14.5c1 3.5 2 7 3.5 8.5c1.5 1.5 3 0.5 3.5-1.5c0.8-3 1.5-6.5 1.5-10c0-4.5-1-8.5-2.5-11.5"
                  fill="none"
                  stroke="url(#clip-metal)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* Spring gate latch clip arm */}
                <line x1="17.5" y1="12" x2="13" y2="28" stroke="#444" strokeWidth="1.2" strokeLinecap="round" />

                {/* Trigger thumb lever toggle */}
                <rect x="7" y="14" width="2" height="4" rx="0.5" fill="url(#clip-metal)" stroke="#222" strokeWidth="0.5" transform="rotate(-15 7 14)" />
              </svg>

              {/* Electric Sparks around trigger clip connection */}
              {inView && (
                <div className="absolute top-[115px] w-16 h-16 pointer-events-none z-40 flex items-center justify-center">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-cyan-300 rounded-full"
                      style={{
                        boxShadow: "0 0 6px #22d3ee, 0 0 12px #06b6d4",
                      }}
                      animate={{
                        x: [0, (Math.random() - 0.5) * 55, (Math.random() - 0.5) * 75],
                        y: [0, (Math.random() - 0.5) * 55, (Math.random() - 0.5) * 75],
                        opacity: [0, 1, 1, 0],
                        scale: [0.4, 1.3, 0.1],
                      }}
                      transition={{
                        duration: 0.3 + Math.random() * 0.4,
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: Math.random() * 1.5,
                        repeatDelay: Math.random() * 1.2,
                      }}
                    />
                  ))}
                  <motion.div
                    className="absolute w-7 h-7 rounded-full bg-cyan-400/10 blur-sm pointer-events-none"
                    animate={{
                      scale: [0.8, 1.4, 0.9, 1.3, 0.8],
                      opacity: [0.2, 0.7, 0.3, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              )}

              {/* Interactive Flip Card Badge Container */}
              <div style={{ perspective: 1200 }} className="w-full max-w-[310px] h-[485px] -mt-1.5 z-10">
                <motion.div
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => { setIsHovered(false); handleMouseLeave(); }}
                  style={{
                    rotateX: (isHovered || autoFlipped) ? 0 : rotateX,
                    rotateY: (isHovered || autoFlipped) ? 0 : rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  className="w-full h-full cursor-pointer"
                >
                  <motion.div
                    ref={cardRef}
                    animate={{ rotateY: (isHovered || autoFlipped) ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 75, damping: 15 }}
                    style={{
                      transformStyle: "preserve-3d",
                      width: "100%",
                      height: "100%"
                    }}
                    className="relative w-full h-full"
                  >

                    {/* ================= CARD FRONT ================= */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-[24px] p-5 flex flex-col justify-between border border-neutral-800 bg-[#121213] shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        backgroundImage: "radial-gradient(circle at 50% 0%, #1e1e20 0%, #121213 100%)",
                      }}
                    >
                      {/* Subtle card grid print overlay */}
                      <div
                        className="absolute inset-0 rounded-[24px] opacity-[0.02] pointer-events-none"
                        style={{
                          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                          backgroundSize: "20px 20px"
                        }}
                      />

                      {/* Hole eyelet at top center */}
                      <div className="w-12 h-3.5 rounded-full bg-black border border-neutral-800/80 ring-2 ring-neutral-900/40 mx-auto flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-[1.5px] rounded-full border-[1.5px] border-neutral-700/60" />
                      </div>

                      {/* Card Header (Logo & Event details) */}
                      <div className="flex justify-between items-start mt-3 mb-2 flex-shrink-0">
                        {/* Serif Twnty Style Logo */}
                        <div className="font-serif italic font-extrabold text-xl text-white tracking-tighter leading-none select-none">
                          yvn<span className="text-blue-500 font-sans font-bold">.</span>
                        </div>
                        {/* University / Event details */}
                        <div className="text-right font-mono text-[7px] text-neutral-400 leading-tight tracking-wider uppercase max-w-[170px]">
                          <div className="text-white font-bold tracking-widest text-[7.5px] mb-0.5">SRM IST RAMAPURAM</div>
                          <div className="opacity-80">COMP. SCIENCE ENGINEERING</div>
                          <div className="opacity-60">CHENNAI // REG_NO: 2026</div>
                        </div>
                      </div>

                      {/* Big Photograph Container */}
                      <div className="w-full h-52 rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden relative flex-shrink-0 flex items-center justify-center">
                        {/* Retro Grid / Bracket styling inside frame */}
                        <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t border-l border-neutral-700 pointer-events-none z-10" />
                        <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t border-r border-neutral-700 pointer-events-none z-10" />
                        <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b border-l border-neutral-700 pointer-events-none z-10" />
                        <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b border-r border-neutral-700 pointer-events-none z-10" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 z-10 pointer-events-none" />

                        {!photoError ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src="/yuvan_profile.jpg"
                            alt="Yuvan Avinash"
                            onError={() => setPhotoError(true)}
                            className="w-full h-full object-cover grayscale contrast-[1.04] brightness-95"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 font-mono p-4 text-center">
                            <Sparkles className="w-7 h-7 text-neutral-700 mb-2 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-300">PHOTO_REQUIRED</span>
                            <span className="text-[7px] text-neutral-600 mt-1.5 leading-normal">Place image in:<br />/public/yuvan_profile.jpg</span>
                          </div>
                        )}

                      </div>

                      {/* Card Main content details */}
                      <div className="flex flex-col justify-center flex-grow mt-3">
                        {/* Thin Separator Line */}
                        <div className="w-full h-[1px] bg-neutral-800/80 mb-3" />

                        {/* Big Bold Speaker Type Typography */}
                        <div className="text-left leading-none">
                          <span className="text-[8px] font-mono font-bold text-blue-400 uppercase tracking-[0.25em] block mb-1">
                            PRIMARY ROLE
                          </span>
                          <h3 className="text-[28px] font-black text-white font-heading tracking-tighter uppercase leading-tight select-none">
                            DEVELOPER
                          </h3>
                          <p className="text-[9px] font-mono text-neutral-400 font-medium uppercase tracking-[0.1em] mt-1 select-none">
                            FULL-STACK DEVELOPMENT
                          </p>
                        </div>
                      </div>

                      {/* Card Access security label */}
                      <div className="pt-2.5 mt-auto border-t border-neutral-800/80 flex flex-col items-start gap-0.5 flex-shrink-0">
                        <div className="text-[10px] font-black text-white tracking-[0.2em] uppercase font-heading select-none">
                          ACCESS ALL AREAS
                        </div>
                        <div className="text-[7.5px] font-mono text-neutral-500 uppercase tracking-widest select-none">
                          SYS_SEC_LEVEL: 04 // REF_ID: 178204
                        </div>
                      </div>

                      {/* Card Footer Details */}
                      <div className="flex justify-between items-end mt-2 text-[7px] font-mono text-neutral-600 tracking-wider flex-shrink-0 select-none">
                        <span>WWW.YUVANAVINASH.DEV</span>
                        <span className="text-right text-xs font-bold text-neutral-500 font-serif italic">1.</span>
                      </div>

                      {/* Holographic Sheen Reflection Overlay */}
                      <div
                        className="absolute inset-0 rounded-[24px] pointer-events-none opacity-20 mix-blend-overlay transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.18) 0%, transparent 65%), linear-gradient(135deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.08) 40%, rgba(34,211,238,0.12) 50%, rgba(168,85,247,0.08) 60%, rgba(255,255,255,0) 100%)`,
                          backgroundBlendMode: "screen",
                        }}
                      />
                    </div>

                    {/* ================= CARD BACK ================= */}
                    <div
                      className="absolute inset-0 w-full h-full rounded-[24px] p-5 flex flex-col justify-between border border-neutral-800 bg-[#121213] shadow-[0_20px_45px_rgba(0,0,0,0.7)]"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        backgroundImage: "radial-gradient(circle at 50% 0%, #1e1e20 0%, #121213 100%)",
                      }}
                    >
                      {/* Subtle card grid print overlay */}
                      <div
                        className="absolute inset-0 rounded-[24px] opacity-[0.02] pointer-events-none"
                        style={{
                          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                          backgroundSize: "20px 20px"
                        }}
                      />

                      {/* Hole eyelet at top center */}
                      <div className="w-12 h-3.5 rounded-full bg-black border border-neutral-800/80 ring-2 ring-neutral-900/40 mx-auto flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-[1.5px] rounded-full border-[1.5px] border-neutral-700/60" />
                      </div>

                      {/* Back Header */}
                      <div className="flex justify-between items-center text-[8px] font-mono text-neutral-500 uppercase tracking-widest mt-3 mb-4 flex-shrink-0 select-none">
                        <span>[ PASS_BACK // SECURITY ]</span>
                        <span className="text-emerald-500 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          SYS_SEC_OK
                        </span>
                      </div>

                      {/* Focus Matrices */}
                      <div className="space-y-5 font-mono text-[10.5px] leading-relaxed flex-grow mt-2 select-none">
                        <div>
                          <div className="text-[8px] text-blue-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            PRIMARY FOCUS
                          </div>
                          <ul className="space-y-1.5 text-neutral-300 pl-3">
                            <li className="flex items-center gap-2">
                              <span className="text-neutral-600 text-[8px]">▶</span> Full-Stack Development
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-neutral-600 text-[8px]">▶</span> Web Applications
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-neutral-600 text-[8px]">▶</span> UI/UX Engineering
                            </li>
                          </ul>
                        </div>

                        <div className="pt-2 border-t border-neutral-900">
                          <div className="text-[8px] text-cyan-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                            SECONDARY INTERESTS
                          </div>
                          <ul className="space-y-1.5 text-neutral-300 pl-3">
                            <li className="flex items-center gap-2">
                              <span className="text-neutral-600 text-[8px]">▶</span> Automation
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-neutral-600 text-[8px]">▶</span> IoT Systems
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-neutral-600 text-[8px]">▶</span> Artificial Intelligence
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Barcode at bottom */}
                      <div className="w-full h-9 bg-neutral-950 border border-neutral-900 rounded px-2.5 py-1.5 flex items-center justify-between opacity-80 mt-auto select-none">
                        <div className="flex gap-[1.5px] items-stretch h-full flex-1">
                          {[1.5, 3, 1, 4.5, 1.5, 3, 1, 1.5, 4.5, 1.5, 3, 1.5, 3, 1, 4.5, 1.5, 3, 1.5, 3, 1.5, 1, 4.5, 1.5, 3, 1].map((w, i) => (
                            <span key={i} className="bg-neutral-600" style={{ width: `${w}px` }} />
                          ))}
                        </div>
                        <span className="text-[7.5px] font-mono text-neutral-500 ml-3 tracking-widest">Y.A.26-2026</span>
                      </div>

                      {/* Holographic Sheen Reflection Overlay for Back Side */}
                      <div
                        className="absolute inset-0 rounded-[24px] pointer-events-none opacity-20 mix-blend-overlay transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.18) 0%, transparent 65%), linear-gradient(135deg, rgba(59,130,246,0) 0%, rgba(59,130,246,0.08) 40%, rgba(34,211,238,0.12) 50%, rgba(168,85,247,0.08) 60%, rgba(255,255,255,0) 100%)`,
                          backgroundBlendMode: "screen",
                        }}
                      />
                    </div>

                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
