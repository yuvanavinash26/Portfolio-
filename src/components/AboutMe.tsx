"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Sparkles, Terminal, Activity } from "lucide-react";

export default function AboutMe() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

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
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="about" className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5">
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
          </div>

          {/* Right: Holographic 3D Interactive Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-[360px] h-[420px] rounded-3xl hologram-card p-8 flex flex-col justify-between cursor-pointer overflow-hidden transition-all duration-300 border border-blue-500/20 group"
            >
              {/* Card Radial Mouse Highlight */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, rgba(0, 102, 255, 0.15), transparent 80%)`,
                }}
              />

              {/* Hologram Scanner Line */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/80 to-transparent shadow-[0_0_8px_#0066ff] animate-[pulse_2s_infinite] pointer-events-none z-10" />

              {/* Grid Background Overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{
                  backgroundImage: "radial-gradient(#0066ff 1px, transparent 1px)",
                  backgroundSize: "20px 20px"
                }}
              />

              {/* Card Header */}
              <div className="flex justify-between items-start z-10">
                <div>
                  <h3 className="text-2xl font-black text-white font-heading tracking-tight">YUVAN AVINASH</h3>
                  <p className="text-[10px] font-mono text-blue-400 font-bold uppercase mt-1">developer.profile // active</p>
                </div>
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
              </div>

              {/* Card Mid Info */}
              <div className="space-y-4 z-10" style={{ transform: "translateZ(30px)" }}>
                <div>
                  <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">AFFILIATION</div>
                  <div className="text-sm font-bold text-white mt-0.5">SRM Institute of Science & Technology</div>
                  <div className="text-xs text-neutral-300">Ramapuram Campus, Chennai</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">STUDY TIMELINE</div>
                  <div className="text-sm font-bold text-white mt-0.5">B.Tech CSE (2025 - 2029)</div>
                </div>
              </div>

              {/* Card Footer Status */}
              <div className="z-10 pt-4 border-t border-blue-500/15 flex items-center justify-between" style={{ transform: "translateZ(20px)" }}>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    CURRENTLY BUILDING
                  </span>
                </div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-400" /> CARESYNC AI
                </div>
              </div>
              
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
