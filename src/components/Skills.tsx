"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  Terminal,
  Layers,
  Database,
  Layout,
  Settings,
  GitBranch,
  Cpu,
  Compass,
  Wrench,
  BookOpen,
  Activity,
  Award,
  Code2,
  FolderOpen
} from "lucide-react";

// ================= CUSTOM HOVER ANIMATIONS FOR CARDS =================

// Card 01: Full-Stack Development - Monospace code streams
function CodeStreams() {
  const codeLines = [
    "const express = require('express');",
    "const app = express();",
    "app.get('/', (req, res) => {",
    "  res.send('API Active');",
    "});",
    "import React, { useState } from 'react';",
    "export default function Main() {",
    "  const [state, setState] = useState(null);",
    "  return <div className='grid'>Hello</div>;",
    "}",
    "const db = await MongoClient.connect();",
    "const cursor = db.collection('data');"
  ];

  return (
    <div className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500 font-mono text-[8px] text-blue-400 select-none overflow-hidden pointer-events-none">
      <div className="grid grid-cols-4 gap-2 h-full px-4 py-2">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: ["0%", "-50%"] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="flex flex-col gap-3 whitespace-nowrap"
          >
            {codeLines.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Card 02: Backend Engineering - Glowing data packets between nodes
function DataPackets() {
  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
      <svg className="w-48 h-32 text-blue-500/20" viewBox="0 0 200 120">
        <line x1="30" y1="60" x2="100" y2="20" stroke="currentColor" strokeWidth="1" />
        <line x1="30" y1="60" x2="100" y2="100" stroke="currentColor" strokeWidth="1" />
        <line x1="100" y1="20" x2="170" y2="60" stroke="currentColor" strokeWidth="1" />
        <line x1="100" y1="100" x2="170" y2="60" stroke="currentColor" strokeWidth="1" />
        
        <circle cx="30" cy="60" r="4.5" className="fill-blue-500" />
        <circle cx="100" cy="20" r="4.5" className="fill-cyan-500" />
        <circle cx="100" cy="100" r="4.5" className="fill-indigo-500" />
        <circle cx="170" cy="60" r="4.5" className="fill-blue-400" />
        
        <motion.circle
          cx="30" cy="60" r="3"
          className="fill-cyan-400"
          animate={{
            cx: [30, 100, 170],
            cy: [60, 20, 60]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="30" cy="60" r="3"
          className="fill-indigo-400"
          animate={{
            cx: [30, 100, 170],
            cy: [60, 100, 60]
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
        />
      </svg>
    </div>
  );
}

// Card 03: UI / UX Development - Interface layers skew-unfold
function UILayers() {
  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center pointer-events-none scale-90 group-hover:scale-100">
      <div className="relative w-36 h-24 flex items-center justify-center">
        {/* Bottom Layer */}
        <motion.div
          className="absolute w-24 h-16 bg-blue-500/10 border border-blue-500/25 rounded-md shadow-lg"
          style={{ transform: "rotateX(60deg) rotateY(-10deg) rotateZ(20deg)" }}
          animate={{ y: [0, 20], opacity: [0.3, 0.7] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.8 }}
        />
        {/* Middle Layer */}
        <motion.div
          className="absolute w-24 h-16 bg-cyan-500/15 border border-cyan-500/35 rounded-md shadow-xl backdrop-blur-[1px]"
          style={{ transform: "rotateX(60deg) rotateY(-10deg) rotateZ(20deg)" }}
          animate={{ scale: [0.95, 1.02] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.8 }}
        />
        {/* Top Layer */}
        <motion.div
          className="absolute w-24 h-16 bg-indigo-500/20 border border-indigo-500/45 rounded-md shadow-2xl backdrop-blur-[2px] flex items-center justify-center text-[8px] text-white/90 font-mono font-bold tracking-widest"
          style={{ transform: "rotateX(60deg) rotateY(-10deg) rotateZ(20deg)" }}
          animate={{ y: [0, -20], opacity: [0.6, 1] }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.8 }}
        >
          LAYOUT
        </motion.div>
      </div>
    </div>
  );
}

// Card 04: Automation Systems - Rotating Gears & Connections
function AutomationGears() {
  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-4 top-4"
        >
          <Settings className="w-12 h-12 text-cyan-400" />
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute right-4 bottom-4"
        >
          <Settings className="w-8 h-8 text-blue-400" />
        </motion.div>
      </div>
    </div>
  );
}

// Card 05: Cloud & DevOps - Orbiting Nodes
function CloudOrbit() {
  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <Compass className="w-10 h-10 text-cyan-400 animate-pulse absolute" />
        <motion.div
          className="w-20 h-20 border border-dashed border-blue-500/35 rounded-full absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 absolute -top-1.5 left-1/2 -translate-x-1/2" />
        </motion.div>
      </div>
    </div>
  );
}

// Card 06: Database Systems - Node Network
function NodeNetwork() {
  const nodes = [
    { x: 30, y: 30 }, { x: 170, y: 30 },
    { x: 100, y: 60 },
    { x: 30, y: 90 }, { x: 170, y: 90 }
  ];

  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
      <svg className="w-48 h-32 text-indigo-500/20" viewBox="0 0 200 120">
        {nodes.map((node, i) => (
          <g key={i}>
            {nodes.map((other, j) => {
              const dist = Math.hypot(node.x - other.x, node.y - other.y);
              if (dist > 30 && dist < 150) {
                return (
                  <line
                    key={j}
                    x1={node.x} y1={node.y} x2={other.x} y2={other.y}
                    stroke="currentColor" strokeWidth="0.8"
                  />
                );
              }
              return null;
            })}
          </g>
        ))}
        {nodes.map((node, i) => (
          <circle key={i} cx={node.x} cy={node.y} r="4" className="fill-indigo-500" />
        ))}
        <motion.circle
          cx="100" cy="60" r="3"
          className="fill-white"
          animate={{
            cx: [100, 30, 100, 170, 100],
            cy: [60, 30, 60, 90, 60]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

// Card 07: IoT Concentric Signal Signals
function IoTSignals() {
  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-45 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 absolute z-10 shadow-[0_0_12px_#22d3ee]" />
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-cyan-400/35"
            initial={{ width: 10, height: 10, opacity: 1 }}
            animate={{ width: 110, height: 110, opacity: 0 }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Card 08: Developer Toolkit Floating Rotating Icons
function FloatingIcons() {
  return (
    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none flex items-center justify-around px-8">
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Terminal className="w-7 h-7 text-blue-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <Wrench className="w-7 h-7 text-cyan-400" />
      </motion.div>
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [0, -180, -360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <BookOpen className="w-7 h-7 text-indigo-400" />
      </motion.div>
    </div>
  );
}

// ================= ANIMATED COUNTER HELPER =================

function AnimatedCounter({ target, suffix = "+", suffixClass = "text-blue-500" }: { target: number; suffix?: string; suffixClass?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (!inView) {
      setCount(0);
      return;
    }
    let startTime: number | null = null;
    const duration = 1500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOutQuad = percentage * (2 - percentage);
      const current = Math.floor(easeOutQuad * target);
      setCount(current);

      if (progress < duration) {
        window.requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(animate);
  }, [target, inView]);

  return (
    <span ref={ref} className="font-heading font-black text-4xl md:text-5xl text-white tracking-tight">
      {count}
      <span className={`${suffixClass} font-sans ml-0.5`}>{suffix}</span>
    </span>
  );
}

// ================= SKILL CARD LISTS =================

interface SkillCardData {
  title: string;
  icon: React.ReactNode;
  tags: string[];
  description: string;
  hoverElement: React.ReactNode;
}

const LANE_1_CARDS: SkillCardData[] = [
  {
    title: "Full-Stack Development",
    icon: <Terminal className="w-6 h-6 text-blue-400" />,
    description: "Building responsive, modern frontend UIs integrated seamlessly with scalable server-side systems.",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    hoverElement: <CodeStreams />
  },
  {
    title: "Backend Engineering",
    icon: <Database className="w-6 h-6 text-cyan-400" />,
    description: "Designing database architectures, optimizing APIs, and structuring robust server-side networks.",
    tags: ["Node.js", "Express", "Python", "REST APIs"],
    hoverElement: <DataPackets />
  },
  {
    title: "UI / UX Development",
    icon: <Layout className="w-6 h-6 text-indigo-400" />,
    description: "Crafting modern layouts, implementing smooth micro-interactions, and refining accessibility details.",
    tags: ["Figma", "Design Systems", "Framer Motion", "Animations"],
    hoverElement: <UILayers />
  },
  {
    title: "Automation Systems",
    icon: <Settings className="w-6 h-6 text-blue-400" />,
    description: "Writing scripts to eliminate repetitive operations, fetch bulk datasets, and build efficient pipelines.",
    tags: ["Python", "Bash", "RPA", "Scraping"],
    hoverElement: <AutomationGears />
  }
];

const LANE_2_CARDS: SkillCardData[] = [
  {
    title: "Cloud & DevOps",
    icon: <Compass className="w-6 h-6 text-cyan-400" />,
    description: "Deploying production builds, configuring virtualized environments, and managing web hosts.",
    tags: ["AWS", "Docker", "Vercel", "Netlify", "CI/CD"],
    hoverElement: <CloudOrbit />
  },
  {
    title: "Database Systems",
    icon: <GitBranch className="w-6 h-6 text-indigo-400" />,
    description: "Modeling data relationships, composing search commands, and keeping records safe and secure.",
    tags: ["MongoDB", "PostgreSQL", "Redis", "MySQL"],
    hoverElement: <NodeNetwork />
  },
  {
    title: "Internet of Things",
    icon: <Cpu className="w-6 h-6 text-blue-400" />,
    description: "Interfacing physical circuitry with web servers, fetching sensor data, and programming controllers.",
    tags: ["Arduino", "Raspberry Pi", "Hardware", "Sensors"],
    hoverElement: <IoTSignals />
  },
  {
    title: "Developer Toolkit",
    icon: <Wrench className="w-6 h-6 text-cyan-400" />,
    description: "Utilizing professional setups, executing diagnostic scripts, and using collaborative systems.",
    tags: ["Git", "GitHub", "VS Code", "Postman", "NPM"],
    hoverElement: <FloatingIcons />
  }
];

function SkillCard({ card }: { card: SkillCardData }) {
  return (
    <div className="w-[300px] md:w-[350px] shrink-0 px-4">
      <div className="group relative h-[220px] rounded-2xl border border-white/5 bg-[#08090a]/80 backdrop-blur-md p-6 overflow-hidden transition-all duration-300 hover:border-blue-500/25 flex flex-col justify-between shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
        {/* Custom animated background helper */}
        {card.hoverElement}

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3.5 mb-3">
            <div className="p-2 bg-neutral-900 rounded-lg border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-500/5 transition-colors duration-300">
              {card.icon}
            </div>
            <h3 className="font-heading font-black text-base md:text-lg text-white uppercase tracking-tight">
              {card.title}
            </h3>
          </div>
          <p className="text-xs md:text-sm text-neutral-300 font-medium leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Technology tags */}
        <div className="relative z-10 flex flex-wrap gap-1.5 mt-4">
          {card.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[9px] font-mono text-neutral-400 font-semibold px-2 py-0.5 rounded bg-neutral-900 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================= MAIN SKILLS ECOSYSTEM COMPONENT =================

export default function Skills() {
  return (
    <section id="skills" className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5 overflow-hidden">
      {/* Dynamic Keyframes and Styling for Horizontal Marquee Infinite Slider */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          display: flex;
          width: max-content;
          animation: marquee-left 40s linear infinite;
        }
        .animate-marquee-right {
          display: flex;
          width: max-content;
          animation: marquee-right 40s linear infinite;
        }
        .marquee-parent:hover .animate-marquee-left,
        .marquee-parent:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}} />

      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center justify-center md:justify-start gap-2">
            <Terminal className="w-4 h-4" /> [ SKILLS & CAPABILITIES ]
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase mt-4 font-heading">
            SKILL <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">ECOSYSTEM</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-neutral-200 max-w-2xl font-medium leading-relaxed">
            An infinite, interactive sliding ecosystem detailing my engineering capabilities. Hover over any lane to pause and inspect the details.
          </p>
        </div>
      </div>

      {/* Sliding Marquee Card Lanes (Horizontal Sliders to optimize space) */}
      <div className="marquee-parent flex flex-col gap-6 w-full select-none mb-24 relative z-20">
        {/* Lane 1: Sliding Left */}
        <div className="overflow-hidden flex w-full relative">
          <div className="animate-marquee-left py-4">
            {LANE_1_CARDS.map((card, idx) => (
              <SkillCard key={`lane1-${idx}`} card={card} />
            ))}
            {LANE_1_CARDS.map((card, idx) => (
              <SkillCard key={`lane1-dup-${idx}`} card={card} />
            ))}
          </div>
          {/* Edge Fades for Cinematic Depth */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-15" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-15" />
        </div>

        {/* Lane 2: Sliding Right */}
        <div className="overflow-hidden flex w-full relative">
          <div className="animate-marquee-right py-4">
            {LANE_2_CARDS.map((card, idx) => (
              <SkillCard key={`lane2-${idx}`} card={card} />
            ))}
            {LANE_2_CARDS.map((card, idx) => (
              <SkillCard key={`lane2-dup-${idx}`} card={card} />
            ))}
          </div>
          {/* Edge Fades for Cinematic Depth */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-15" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-15" />
        </div>
      </div>

      {/* Bottom Section: Futuristic Overlapping Dashboard */}
      <div className="max-w-6xl mx-auto relative z-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          
          {/* Left Column: Tech DNA Identity */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-[0.25em] flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4" /> [ CORE DEVELOPMENT DNA ]
              </span>
              <h3 className="text-4xl font-extrabold tracking-tighter text-white uppercase font-heading bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                TECH DNA
              </h3>
              <p className="mt-4 text-xs md:text-sm text-neutral-400 font-medium leading-relaxed">
                Primary engineering identities and systemic objectives compiled into a unified status report.
              </p>
            </div>

            {/* Glass Cards for Identity */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-white/5 bg-[#08090a]/70 backdrop-blur-md relative overflow-hidden shadow-xl">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                  // PRIMARY IDENTITY
                </span>
                <span className="text-base font-extrabold text-white uppercase tracking-wider block font-heading">
                  Full-Stack Developer
                </span>
              </div>

              <div className="p-5 rounded-2xl border border-white/5 bg-[#08090a]/70 backdrop-blur-md relative overflow-hidden shadow-xl">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                  // SECONDARY INTERESTS
                </span>
                <span className="text-sm font-semibold text-neutral-300 block">
                  Automation // IoT // Artificial Intelligence
                </span>
              </div>

              <div className="p-5 rounded-2xl border border-white/5 bg-[#08090a]/70 backdrop-blur-md relative overflow-hidden shadow-xl">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                  // DEVELOPMENT MISSION
                </span>
                <p className="text-xs md:text-sm text-neutral-300 font-medium italic leading-relaxed pl-3 border-l border-indigo-500/50">
                  "Build software products that solve real-world problems and scale into impactful businesses."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Status Dashboard Metrics Grid */}
          <div className="w-full lg:w-[65%] grid grid-cols-2 gap-5">
            
            {/* Metric 01: Projects Built (Cyan) — with Visit Projects button */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#08090a]/50 backdrop-blur-md relative overflow-hidden shadow-xl flex flex-col justify-between h-[155px] group hover:border-cyan-500/30 hover:bg-[#08090a]/80 hover:shadow-[0_0_25px_rgba(34,211,238,0.1)] transition-all duration-500 transform hover:-translate-y-1">
              {/* Background Glow */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start z-10">
                <div className="p-2.5 bg-neutral-900/80 rounded-xl border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/5 transition-all duration-500">
                  <FolderOpen className="w-6.5 h-6.5 text-cyan-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-[9px] font-mono text-neutral-500 group-hover:text-cyan-400/70 transition-colors duration-500 uppercase tracking-widest">// REPOS</span>
              </div>

              {/* Counter + Visit Button inline */}
              <div className="z-10 flex items-end justify-between gap-3">
                <div>
                  <AnimatedCounter target={20} suffixClass="text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500 block uppercase tracking-wider mt-1.5">Projects Built</span>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById("hackathons");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="shrink-0 flex items-center gap-1 px-3 py-2 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/20 text-cyan-300 hover:text-white rounded-xl font-mono text-[9px] font-extrabold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:border-cyan-400/50 cursor-pointer mb-0.5"
                >
                  Visit Projects ↗
                </button>
              </div>
            </div>

            {/* Metric 02: OS Contributions (Emerald) */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#08090a]/50 backdrop-blur-md relative overflow-hidden shadow-xl flex flex-col justify-between h-[155px] group hover:border-emerald-500/30 hover:bg-[#08090a]/80 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)] transition-all duration-500 transform hover:-translate-y-1">
              {/* Background Glow */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start z-10">
                <div className="p-2.5 bg-neutral-900/80 rounded-xl border border-white/5 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 transition-all duration-500">
                  <Code2 className="w-6.5 h-6.5 text-emerald-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-[9px] font-mono text-neutral-500 group-hover:text-emerald-400/70 transition-colors duration-500 uppercase tracking-widest">// COMMITS</span>
              </div>
              <div className="z-10">
                <AnimatedCounter target={10} suffixClass="text-emerald-400" />
                <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500 block uppercase tracking-wider mt-1.5">OS Contributions</span>
              </div>
            </div>

            {/* Metric 03: Hackathons Participated (Amber) */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#08090a]/50 backdrop-blur-md relative overflow-hidden shadow-xl flex flex-col justify-between h-[155px] group hover:border-amber-500/30 hover:bg-[#08090a]/80 hover:shadow-[0_0_25px_rgba(245,158,11,0.1)] transition-all duration-500 transform hover:-translate-y-1">
              {/* Background Glow */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start z-10">
                <div className="p-2.5 bg-neutral-900/80 rounded-xl border border-white/5 group-hover:border-amber-500/30 group-hover:bg-amber-500/5 transition-all duration-500">
                  <Award className="w-6.5 h-6.5 text-amber-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-[9px] font-mono text-neutral-500 group-hover:text-amber-400/70 transition-colors duration-500 uppercase tracking-widest">// EVENT BUILD</span>
              </div>
              <div className="z-10">
                <AnimatedCounter target={5} suffixClass="text-amber-400" />
                <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500 block uppercase tracking-wider mt-1.5">Hackathons Participated</span>
              </div>
            </div>

            {/* Metric 04: Tech Learned (Indigo) */}
            <div className="p-6 rounded-2xl border border-white/5 bg-[#08090a]/50 backdrop-blur-md relative overflow-hidden shadow-xl flex flex-col justify-between h-[155px] group hover:border-indigo-500/30 hover:bg-[#08090a]/80 hover:shadow-[0_0_25px_rgba(99,102,241,0.1)] transition-all duration-500 transform hover:-translate-y-1">
              {/* Background Glow */}
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
              
              <div className="flex justify-between items-start z-10">
                <div className="p-2.5 bg-neutral-900/80 rounded-xl border border-white/5 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all duration-500">
                  <BookOpen className="w-6.5 h-6.5 text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-[9px] font-mono text-neutral-500 group-hover:text-indigo-400/70 transition-colors duration-500 uppercase tracking-widest">// FRAMEWORKS</span>
              </div>
              <div className="z-10">
                <AnimatedCounter target={18} suffixClass="text-indigo-400" />
                <span className="text-xs font-mono font-bold text-neutral-400 group-hover:text-neutral-300 transition-colors duration-500 block uppercase tracking-wider mt-1.5">Tech Learned</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
