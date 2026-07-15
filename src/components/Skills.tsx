"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Terminal,
  Layers,
  Database,
  Layout,
  GitBranch,
  Cpu,
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



// ================= MUZLI-STYLE FLOATING TECH STACK BUBBLE CLUSTER =================

function TechBubbleCluster({ scrollYProgress }: { scrollYProgress: any }) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const bubbles = [
    { name: "React", size: 66, x: "42%", y: "45%", color: "bg-[#0b1329]", border: "border-[#61dafb]/40", icon: "react", dx: 110, dy: -600 },
    { name: "TypeScript", size: 50, x: "12%", y: "24%", color: "bg-[#002b4d]", border: "border-[#3178c6]/50", icon: "ts", dx: -220, dy: -550 },
    { name: "Next.js", size: 54, x: "72%", y: "18%", color: "bg-black", border: "border-white/30", icon: "nextjs", dx: 240, dy: -500 },
    { name: "Node.js", size: 48, x: "14%", y: "58%", color: "bg-[#102416]", border: "border-[#6cc24a]/40", icon: "node", dx: -260, dy: -620 },
    { name: "Python", size: 50, x: "76%", y: "48%", color: "bg-[#1e293b]", border: "border-[#ffd43b]/30", icon: "python", dx: 270, dy: -580 },
    { name: "JavaScript", size: 44, x: "43%", y: "15%", color: "bg-[#1f1e10]", border: "border-[#f7df1e]/40", icon: "js", dx: -50, dy: -480 },
    { name: "Tailwind", size: 46, x: "44%", y: "76%", color: "bg-[#0c1e2b]", border: "border-[#38bdf8]/40", icon: "tailwind", dx: 50, dy: -680 },
    { name: "MongoDB", size: 44, x: "16%", y: "84%", color: "bg-[#0e2417]", border: "border-[#47a248]/40", icon: "mongodb", dx: -280, dy: -700 },
    { name: "Docker", size: 42, x: "74%", y: "80%", color: "bg-[#0b1d30]", border: "border-[#2496ed]/40", icon: "docker", dx: 210, dy: -720 },
    { name: "Git", size: 36, x: "92%", y: "30%", color: "bg-[#2b1612]", border: "border-[#f05032]/40", icon: "git", dx: 300, dy: -450 },
    { name: "Figma", size: 38, x: "3%", y: "42%", color: "bg-[#1f162b]", border: "border-[#a259ff]/40", icon: "figma", dx: -300, dy: -400 },
    { name: "AWS", size: 36, x: "25%", y: "6%", color: "bg-[#241a0e]", border: "border-[#ff9900]/40", icon: "aws", dx: -130, dy: -380 },
    { name: "Framer Motion", size: 40, x: "62%", y: "5%", color: "bg-[#241021]", border: "border-[#f024b6]/40", icon: "framer", dx: 140, dy: -350 },
    // AI/ML focused additions
    { name: "OpenAI", size: 54, x: "58%", y: "35%", color: "bg-[#0b241e]", border: "border-[#10a37f]/50", icon: "openai", dx: 180, dy: -520 },
    { name: "PyTorch", size: 48, x: "30%", y: "32%", color: "bg-[#2d1715]", border: "border-[#ee4c2c]/40", icon: "pytorch", dx: -100, dy: -590 },
    { name: "TensorFlow", size: 46, x: "56%", y: "60%", color: "bg-[#2b1f13]", border: "border-[#ff6f00]/40", icon: "tensorflow", dx: 130, dy: -610 },
    { name: "Hugging Face", size: 44, x: "26%", y: "65%", color: "bg-[#2b2713]", border: "border-[#ffd21e]/40", icon: "huggingface", dx: -120, dy: -650 },
    { name: "OpenCV", size: 42, x: "88%", y: "62%", color: "bg-[#101c2d]", border: "border-[#00ff00]/30", icon: "opencv", dx: 290, dy: -660 },
    // Advanced systems & developer toolkit additions
    { name: "C++", size: 40, x: "88%", y: "10%", color: "bg-[#0f1f38]", border: "border-[#00599c]/40", icon: "cpp", dx: 310, dy: -390 },
    { name: "PostgreSQL", size: 42, x: "30%", y: "90%", color: "bg-[#0e2133]", border: "border-[#336791]/40", icon: "postgres", dx: -90, dy: -730 },
    { name: "Redis", size: 38, x: "58%", y: "88%", color: "bg-[#2b1011]", border: "border-[#d82c20]/40", icon: "redis", dx: 120, dy: -740 },
    { name: "GitHub", size: 38, x: "8%", y: "8%", color: "bg-[#181818]", border: "border-white/20", icon: "github", dx: -250, dy: -360 },
    { name: "Linux", size: 40, x: "94%", y: "46%", color: "bg-[#242410]", border: "border-[#fcc624]/40", icon: "linux", dx: 320, dy: -520 }
  ];

  const renderIcon = (type: string) => {
    switch (type) {
      case "react":
        return (
          <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-2/3 h-2/3 text-[#61dafb] fill-none stroke-current" strokeWidth="1.2">
            <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
            <g stroke="currentColor" fill="none">
              <ellipse rx="11" ry="4.2"/>
              <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
              <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
            </g>
          </svg>
        );
      case "ts":
        return <span className="text-[12px] font-extrabold text-[#3178c6] font-sans tracking-tight">TS</span>;
      case "nextjs":
        return (
          <svg viewBox="0 0 180 180" className="w-2/3 h-2/3 fill-white">
            <path d="M90 0a90 90 0 100 180 90 90 0 000-180zm32 125l-39-50v50H72V58h11l37 47V58h11v67h-9z" />
          </svg>
        );
      case "node":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-[#6cc24a]">
            <path d="M12 2L4.5 6.3v8.6L12 19.3l7.5-4.4V6.3L12 2zm1.5 12.3c-.3.2-.6.3-1 .3s-.7-.1-1-.3c-.3-.2-.5-.5-.6-.9h-2.1c.1.9.5 1.6 1.2 2.1.7.5 1.5.7 2.5.7s1.8-.2 2.5-.7c.7-.5 1.1-1.2 1.2-2.1H14c-.1.4-.3.7-.5.9zm0-4.8c-.3-.2-.6-.3-1-.3s-.7.1-1 .3c-.3.2-.5.5-.6.9H8.8c.1-.9.5-1.6 1.2-2.1.7-.5 1.5-.7 2.5-.7s1.8.2 2.5.7c.7.5 1.1 1.2 1.2 2.1H14c-.1-.4-.3-.7-.5-.9z" />
          </svg>
        );
      case "python":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#ffd43b]">
            <path d="M11.9 2c-3.1 0-2.9 1.3-2.9 1.3v2.2h3v.4H7.9s-1.8-.2-1.8 1.8V11c0 0-.1 1.7 1.7 1.7h1.1v-1.5c0-.9.8-1.7 1.7-1.7h3c.9 0 1.7-.8 1.7-1.7V5c0-1.8-1.8-1.8-1.8-1.8l-1.6-.2V2zm-1.5 1.6c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7zm5 6.1c0 0 .1 1.5-1.5 1.5h-3c-.9 0-1.7.8-1.7 1.7V17c0 1.8 1.8 1.8 1.8 1.8h1.6v1.2c0 3.1 2.9 2.9 2.9 2.9s3.1 0 2.9-2.9v-2.2h-3v-.4h4.1s1.8.2 1.8-1.8V13c0 0 .1-1.7-1.7-1.7h-1.1v1.5c0 .9-.8 1.7-1.7 1.7zm1.5 9.1c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" />
          </svg>
        );
      case "js":
        return <span className="text-[12px] font-extrabold text-[#f7df1e] font-sans leading-none">JS</span>;
      case "tailwind":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#38bdf8]">
            <path d="M12 6.036c-2.28-2.28-5.7-1.71-8.55 1.71 1.71 1.71 3.42 2.28 5.13.57 1.71-1.71 2.85-1.71 3.42-.57.57 1.14-.57 2.85-2.85 5.13-2.85 2.85-2.85 4.56-1.71 5.7 1.14 1.14 2.85 0 5.7-2.85 2.28 2.28 5.7 1.71 8.55-1.71-1.71-1.71-3.42-2.28-5.13-.57-1.71 1.71-2.85 1.71-3.42.57-.57-1.14.57-2.85 2.85-5.13 2.85-2.85 2.85-4.56 1.71-5.7-1.14-1.14-2.85 0-5.7 2.85z" />
          </svg>
        );
      case "mongodb":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#47a248]">
            <path d="M12 0c-.5 0-1 .4-1.1.9C9.8 4.2 6.5 9 6.5 13.5c0 3.3 2.2 6 5.5 6.5v2.8c0 .7.8 1.2 1.4.8.4-.3.6-.8.6-1.3v-2.3c3.3-.5 5.5-3.2 5.5-6.5 0-4.5-3.3-9.3-4.4-12.6C13 2.4 12.5 2 12 2zM12 3.5c.3 1.2 1.8 4.5 2.2 6.5H9.8c.4-2 1.9-5.3 2.2-6.5zm0 8.5c1.1 0 2.2.3 3 .8-.8-1.5-2-3.2-3-4.4-1 1.2-2.2 2.9-3 4.4.8-.5 1.9-.8 3-.8zm0 6c-2.2 0-4-1.8-4-4 0-.8.3-1.6.8-2.2.8 1.5 2 3.2 3.2 4.4v1.8zm0-1.8c-.8-.8-1.8-2.1-2.4-3.2.6.2 1.3.4 2.4.4v2.8z" />
          </svg>
        );
      case "docker":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#2496ed]">
            <path d="M13.983 8.878h-2.4808c-.2837 0-.5136-.23-.5136-.5137V5.8835c0-.2837.23-.5136.5137-.5136h2.4808c.2836 0 .5137.23.5137.5136v2.4808c0 .2837-.23.5137-.5137.5137zM11.127 8.878H8.646c-.2836 0-.5136-.23-.5136-.5137V5.8835c0-.2837.23-.5136.5136-.5136h2.4808c.2837 0 .5137.23.5137.5136v2.4808c0 .2837-.23.5137-.5137.5137zm-2.86 0H5.786c-.2836 0-.5136-.23-.5136-.5137V5.8835c0-.2837.23-.5136.5136-.5136h2.4808c.2837 0 .5137.23.5137.5136v2.4808c0 .2837-.23.5137-.5137.5137zm8.58-2.859h-2.481c-.284 0-.514-.23-.514-.514V5.884c0-.284.23-.514.514-.514h2.48c.284 0 .514.23.514.514v2.48c-.001.284-.231.514-.513.514zm-2.86 2.859h-2.481c-.284 0-.514-.23-.514-.514V8.742c0-.284.23-.514.514-.514h2.48c.284 0 .514.23.514.514v2.48c-.001.284-.231.514-.513.514zm5.72 0H14.12c-.284 0-.514-.23-.514-.514V8.742c0-.284.23-.514.514-.514h2.48c.284 0 .514.23.514.514v2.48c0 .284-.23.514-.514.514zM22.215 11.22c-.144-.065-.584-.25-1.173-.25-.664 0-1.289.263-1.637.768-.22.32-.303.71-.303 1.25 0 2.22 1.764 4.025 4.025 4.025.132 0 .263-.006.39-.018.175.485.4.922.668 1.3-.873.344-1.84.536-2.883.536-4.542 0-8.24-3.698-8.24-8.24h.02c0-.236-.008-.47-.023-.703-.016-.25-.027-.5-.027-.753 0-.66.11-1.295.312-1.89l.067-.202c.162-.485.4-.937.7-1.353l.244-.326c.382-.472.836-.88 1.344-1.21L16.42 4.2c.873-.553 1.874-.882 2.94-.882 3.824 0 6.945 3.013 7.07 6.804-.002.383-.075.752-.215 1.098z" />
          </svg>
        );
      case "git":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#f05032]">
            <path d="M23.2 11.2c.8.8.8 2 0 2.8l-8.4 8.4c-.8.8-2 .8-2.8 0L3.6 14c-.8-.8-.8-2 0-2.8L12 2.8c.8-.8 2-.8 2.8 0l8.4 8.4zM10.8 17.6c.4.4.9.4 1.3.1l2.5-2.5c.3-.3.3-.8 0-1.1l-2.4-2.4v-3.2c.4-.3.6-.8.4-1.3-.2-.6-.8-1-1.4-1s-1.2.4-1.4 1c-.1.5.1 1 .4 1.3V15c-.6.3-.9.9-.7 1.6.2.5.7 1 1.3 1zm1.2-1.2c.3 0 .6.3.6.6s-.3.6-.6.6-.6-.3-.6-.6.3-.6.6-.6zm-.6 7.8c-.3 0-.6-.3-.6-.6s.3-.6.6-.6.6.3.6.6-.3.6-.6.6z" />
          </svg>
        );
      case "figma":
        return (
          <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 fill-current">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4H8v8h4zm-4 4c0 2.21 1.79 4 4 4s4-1.79 4-4-1.79-4-4-4H8v8zm0-12C5.79 4 4 5.79 4 8s1.79 4 4 4v-8zm0 16c-2.21 0-4-1.79-4-4s1.79-4 4-4v8zm4-8c2.21 0 4-1.79 4-4s-1.79-4-4-4v8z" fill="#f24e1e"/>
          </svg>
        );
      case "aws":
        return <span className="text-[10px] font-black text-[#ff9900] font-sans">AWS</span>;
      case "framer":
        return (
          <svg viewBox="0 0 24 24" className="w-1/2 h-1/2 fill-current text-[#f024b6]">
            <path d="M0 0h24v12H12L0 0zm0 12h12l12 12H0V12zm12 0L24 0v12H12z" />
          </svg>
        );
      case "openai":
        return (
          <svg viewBox="0 0 16 16" className="w-2/3 h-2/3 fill-current text-[#10a37f]">
            <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 0 0z" />
          </svg>
        );
      case "pytorch":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#ee4c2c]">
            <path d="M12.005.04l-7.03 7.03a9.832 9.832 0 0 0 0 13.975 9.833 9.833 0 0 0 13.976 0c3.97-3.887 3.972-10.171.084-13.976l-1.738 1.737c2.895 2.895 2.895 7.608 0 10.503-2.894 2.894-7.608 2.894-10.503 0C3.9 16.414 3.9 11.7 6.794 8.806l4.632-4.631.58-.663z"/>
          </svg>
        );
      case "tensorflow":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#ff6f00]">
            <path d="M19.6 12l.1 4.7-3.1-1.8v6.7L12.5 24V0l10.2 5.9v5.3l-6.1-3.6v2.7zM1.3 5.9L11.5 0v24l-4.1-2.4v-14l-6.1 3.6z"/>
          </svg>
        );
      case "huggingface":
        return <span className="text-[20px] leading-none">🤗</span>;
      case "opencv":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#5C3EE8]">
            <path d="M11.8992.8525C8.735.8525 6.17 3.4175 6.17 6.5817c0 2.102 1.1321 3.9398 2.8198 4.9366l1.6412-2.7849c.0411-.0699.0176-.1593-.0495-.2048-.6233-.4227-1.0328-1.137-1.0328-1.947 0-1.298 1.0524-2.3504 2.3505-2.3504 1.2981 0 2.3505 1.0524 2.3505 2.3505 0 .8098-.4095 1.5242-1.0328 1.947-.0671.0454-.0907.1348-.0495.2047l1.6414 2.785c1.6878-.9969 2.8199-2.8346 2.8199-4.9367 0-3.1642-2.5653-5.7292-5.7295-5.7292zm-6.17 10.8366C2.565 11.6891 0 14.2541 0 17.4183c0 3.1642 2.565 5.7292 5.7292 5.7292 3.1798 0 5.8074-2.6995 5.7275-5.8762H8.2313c-.0847 0-.1513.0717-.1519.1564-.0082 1.266-1.0644 2.3411-2.3502 2.3411-1.2981 0-2.3505-1.0524-2.3505-2.3505 0-1.2982 1.0524-2.3505 2.3505-2.3505.34 0 .663.0724.9547.2022.0713.0318.1566.0077.1962-.0595l1.6464-2.7935c-.8273-.4636-1.7815-.7279-2.7973-.7279zm15.4424.7614l-1.6366 2.7878c-.041.07-.0172.1594.05.2048.624.4217 1.0348 1.1354 1.0363 1.9452.0022 1.298-1.0483 2.352-2.3465 2.3542-1.298.0023-2.3523-1.0482-2.3545-2.3462-.0015-.8098.4068-1.5248 1.0294-1.9486.067-.0457.0905-.1353.0492-.2051l-1.6464-2.7818c-1.6859.9998-2.8146 2.8394-2.811 4.9415.0056 3.1641 2.575 5.7248 5.7393 5.7192 3.1641-.0054 5.7246-2.575 5.7192-5.7392-.0037-2.1022-1.139-3.938-2.8284-4.9318z"/>
          </svg>
        );
      case "cpp":
        return <span className="text-[12px] font-extrabold text-[#00599c] font-mono leading-none">C++</span>;
      case "postgres":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#336791]">
            <path d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z" />
          </svg>
        );
      case "redis":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#DC382D]">
            <path d="M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73zm-4.349-5.013c0 1.959-1.926 2.922-3.685 2.922-.941 0-1.664-.247-2.235-.568 1.051-1.592 2.092-3.225 3.21-4.973 1.972.334 2.71 1.43 2.71 2.619z"/>
          </svg>
        );
      case "github":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-white">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
          </svg>
        );
      case "linux":
        return (
          <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-current text-[#fcc624]">
            <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-[320px] rounded-3xl p-4 flex items-center justify-center">
      {/* Background card with clipping for grid/glows */}
      <div className="absolute inset-0 rounded-3xl border border-white/5 bg-[#08090a]/40 backdrop-blur-md overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
      </div>

      {/* Scattered Interactive Tech Bubbles (overflow-visible to escape the box) */}
      <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        {bubbles.map((tech, idx) => {
          // Scroll-driven transforms (disperse out of the box on scroll, re-assemble on scroll back up)
          const scrollX = useTransform(scrollYProgress, [0.3, 0.8], [0, tech.dx]);
          const scrollY = useTransform(scrollYProgress, [0.3, 0.8], [0, tech.dy]);
          const scrollOpacity = useTransform(scrollYProgress, [0.7, 0.85], [1, 0.15]);

          const floatDelay = idx * 0.4;
          const floatDuration = 4 + (idx % 3) * 1.5;

          return (
            <motion.div
              key={tech.name}
              className="absolute pointer-events-auto"
              style={{
                top: tech.y,
                left: tech.x,
                x: scrollX,
                y: scrollY,
                opacity: scrollOpacity,
                transform: "translate(-50%, -50%)",
                width: tech.size,
                height: tech.size
              }}
            >
              {/* Inner floating micro-animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0, 8, 0],
                  x: [0, 6, 0, -6, 0]
                }}
                transition={{
                  duration: floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: floatDelay
                }}
                className="w-full h-full"
              >
                <motion.div
                  onHoverStart={() => setHoveredTech(tech.name)}
                  onHoverEnd={() => setHoveredTech(null)}
                  whileHover={{ scale: 1.25, zIndex: 100 }}
                  className={`w-full h-full rounded-full ${tech.color} border ${tech.border} flex items-center justify-center cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-shadow duration-300 relative group`}
                >
                  {renderIcon(tech.icon)}

                  {/* Tooltip on Hover */}
                  {hoveredTech === tech.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: -28, scale: 1 }}
                      className="absolute z-[110] px-2.5 py-1 rounded bg-[#020504] border border-white/10 text-[9px] font-mono text-white font-bold uppercase tracking-wider shadow-xl pointer-events-none whitespace-nowrap"
                    >
                      {tech.name}
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Center text helper */}
      <div className="absolute pointer-events-none text-center opacity-40 select-none">
        <span className="text-[9px] font-mono text-neutral-500 tracking-[0.25em] uppercase font-bold">// TECH STACKDNA</span>
      </div>
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

const SKILL_CARDS: SkillCardData[] = [
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

// ================= SPOTLIGHT CARD WITH CURSOR-TRACKING TRANSITION =================

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  hoverColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
}

function SpotlightCard({
  children,
  className = "",
  hoverColor = "rgba(99, 102, 241, 0.08)",
  borderColor = "rgba(255, 255, 255, 0.06)",
  hoverBorderColor = "rgba(99, 102, 241, 0.25)"
}: SpotlightCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setCoords({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? "transparent" : borderColor
      }}
      className={`relative p-6 rounded-[24px] border bg-[#090b0f]/60 backdrop-blur-xl shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[170px] ${className}`}
    >
      {/* Background Spotlight Glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 z-0"
        style={{
          width: "280px",
          height: "280px",
          background: `radial-gradient(140px circle at ${coords.x}px ${coords.y}px, ${hoverColor}, transparent 80%)`,
          left: `${coords.x - 140}px`,
          top: `${coords.y - 140}px`,
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Border Spotlight Glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[24px] z-10"
        style={{
          border: `1.2px solid transparent`,
          backgroundImage: isHovered
            ? `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, ${hoverBorderColor}, transparent 80%)`
            : "none",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
          opacity: isHovered ? 1 : 0
        }}
      />
      
      {/* Content wrapper to ensure it stays above spotlight */}
      <div className="relative z-20 flex flex-col justify-between h-full w-full flex-1">
        {children}
      </div>
    </div>
  );
}

// ================= MAIN SKILLS ECOSYSTEM COMPONENT =================

export default function Skills() {
  const dashboardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: dashboardRef,
    offset: ["start end", "end start"]
  });

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
        {/* Single Lane: Sliding Left */}
        <div className="overflow-hidden flex w-full relative">
          <div className="animate-marquee-left py-4">
            {SKILL_CARDS.map((card, idx) => (
              <SkillCard key={`skill-${idx}`} card={card} />
            ))}
            {SKILL_CARDS.map((card, idx) => (
              <SkillCard key={`skill-dup-${idx}`} card={card} />
            ))}
          </div>
          {/* Edge Fades for Cinematic Depth */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none z-15" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent pointer-events-none z-15" />
        </div>
      </div>

      {/* Bottom Section: Futuristic Unified Console Dashboard */}
      <div ref={dashboardRef} className="max-w-6xl mx-auto relative z-20 mt-12">
        <div className="border border-white/[0.06] bg-[#050608]/40 backdrop-blur-2xl rounded-[32px] p-8 md:p-12 shadow-3xl relative overflow-visible">
          
          {/* Ambient Background Glows */}
          <div className="absolute -left-32 -top-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute left-1/3 top-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Grid Layout: Left (Info + Bubbles), Right (Integrated Metrics Dashboard) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (Span 5): Title, Badges, Tech Bubble Cluster */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-[0.25em] flex items-center gap-2 mb-3">
                  <Activity className="w-3.5 h-3.5 animate-pulse" /> [ CORE DEVELOPMENT DNA ]
                </span>
                <h3 className="text-4xl font-extrabold tracking-tighter text-white uppercase font-heading bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
                  TECH DNA
                </h3>
                <p className="mt-3 text-xs md:text-sm text-neutral-400 font-medium leading-relaxed mb-4">
                  Interactive visualization of core programming languages, frameworks, and tools mapped to my engineering ecosystem.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9.5px] font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 uppercase tracking-wider">
                    Full-Stack Developer
                  </span>
                  <span className="text-[9.5px] font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 uppercase tracking-wider">
                    AI & Automation // IoT
                  </span>
                </div>
              </div>

              {/* Muzli-style interactive tech bubble cluster */}
              <div className="relative">
                <TechBubbleCluster scrollYProgress={scrollYProgress} />
              </div>
            </div>

            {/* Right Column (Span 7): Premium Apple-style Bento Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 self-stretch items-stretch">
              
              {/* Card 01: Projects Built (Cyan Accent) */}
              <SpotlightCard className="group border-white/[0.06] hover:border-cyan-500/35 hover:shadow-[0_0_25px_rgba(34,211,238,0.1)]">
                <div className="flex justify-between items-start z-10">
                  <div className="p-2 bg-cyan-500/5 rounded-xl border border-cyan-500/10 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-colors duration-300">
                    <FolderOpen className="w-5.5 h-5.5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-[8px] font-mono text-neutral-500 group-hover:text-cyan-300 transition-colors uppercase tracking-widest font-bold">// REPOS</span>
                </div>
                
                <div className="mt-4 flex items-end justify-between gap-3 z-10">
                  <div>
                    <AnimatedCounter target={10} suffixClass="text-cyan-400" />
                    <span className="text-xs font-sans font-semibold text-neutral-400 group-hover:text-neutral-200 transition-colors block tracking-wide mt-1.5">Projects Built</span>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById("hackathons");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="shrink-0 px-4 py-1.5 bg-white text-black hover:bg-neutral-200 rounded-full font-sans text-[10px] font-extrabold tracking-tight shadow-md transition-all duration-300 cursor-pointer"
                  >
                    Explore
                  </button>
                </div>
              </SpotlightCard>

              {/* Card 02: OS Contributions (Emerald Accent) */}
              <SpotlightCard
                hoverColor="rgba(16, 185, 129, 0.08)"
                hoverBorderColor="rgba(16, 185, 129, 0.3)"
                className="group border-white/[0.06] hover:border-emerald-500/35 hover:shadow-[0_0_25px_rgba(16,185,129,0.1)]"
              >
                <div className="flex justify-between items-start z-10">
                  <div className="p-2 bg-emerald-500/5 rounded-xl border border-emerald-500/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors duration-300">
                    <Code2 className="w-5.5 h-5.5 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-[8px] font-mono text-neutral-500 group-hover:text-emerald-300 transition-colors uppercase tracking-widest font-bold">// COMMITS</span>
                </div>
                
                <div className="mt-4 z-10">
                  <AnimatedCounter target={10} suffixClass="text-emerald-400" />
                  <span className="text-xs font-sans font-semibold text-neutral-400 group-hover:text-neutral-200 transition-colors block tracking-wide mt-1.5">OS Contributions</span>
                </div>
              </SpotlightCard>

              {/* Card 03: Hackathons (Amber Accent) */}
              <SpotlightCard
                hoverColor="rgba(245, 158, 11, 0.08)"
                hoverBorderColor="rgba(245, 158, 11, 0.3)"
                className="group border-white/[0.06] hover:border-amber-500/35 hover:shadow-[0_0_25px_rgba(245,158,11,0.1)]"
              >
                <div className="flex justify-between items-start z-10">
                  <div className="p-2 bg-amber-500/5 rounded-xl border border-amber-500/10 group-hover:border-amber-500/30 group-hover:bg-amber-500/10 transition-colors duration-300">
                    <Award className="w-5.5 h-5.5 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-[8px] font-mono text-neutral-500 group-hover:text-amber-300 transition-colors uppercase tracking-widest font-bold">// HACKATHONS</span>
                </div>
                
                <div className="mt-4 z-10">
                  <AnimatedCounter target={5} suffixClass="text-amber-400" />
                  <span className="text-xs font-sans font-semibold text-neutral-400 group-hover:text-neutral-200 transition-colors block tracking-wide mt-1.5">Hackathons Participated</span>
                </div>
              </SpotlightCard>

              {/* Card 04: Tech Learned (Indigo Accent) */}
              <SpotlightCard
                hoverColor="rgba(99, 102, 241, 0.08)"
                hoverBorderColor="rgba(99, 102, 241, 0.3)"
                className="group border-white/[0.06] hover:border-indigo-500/35 hover:shadow-[0_0_25px_rgba(99,102,241,0.1)]"
              >
                <div className="flex justify-between items-start z-10">
                  <div className="p-2 bg-indigo-500/5 rounded-xl border border-indigo-500/10 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-colors duration-300">
                    <BookOpen className="w-5.5 h-5.5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="text-[8px] font-mono text-neutral-500 group-hover:text-indigo-300 transition-colors uppercase tracking-widest font-bold">// FRAMEWORKS</span>
                </div>
                
                <div className="mt-4 z-10">
                  <AnimatedCounter target={18} suffixClass="text-indigo-400" />
                  <span className="text-xs font-sans font-semibold text-neutral-400 group-hover:text-neutral-200 transition-colors block tracking-wide mt-1.5">Tech Learned</span>
                </div>
              </SpotlightCard>

            </div>

          </div>

          {/* Full-width Unified Mission Statement Section at bottom */}
          <div className="mt-10 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold">// DEV MISSION</span>
            </div>
            <p className="text-xs md:text-sm text-neutral-300 font-medium italic leading-relaxed max-w-3xl">
              "Build software products that solve real-world problems and scale into impactful businesses."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
