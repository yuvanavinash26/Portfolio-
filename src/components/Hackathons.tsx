"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from "framer-motion";
import { Terminal, ExternalLink, Activity, BookOpen, Zap, Cpu, Globe, Database, Play } from "lucide-react";

interface ProjectData {
  id: number;
  title: string;
  category: string;
  type: string;
  badge?: string;
  description: string;
  highlights: string[];
  techStack: string[];
  role: string;
  transition: string;
  icon: React.ReactNode;
  link?: string;
  videoLink?: string;
}

const PROJECTS: ProjectData[] = [
  {
    id: 1,
    title: "CARESYNC AI",
    category: "Healthcare Intelligence Platform",
    type: "Hackathon Project",
    description: "CARESYNC AI is an intelligent healthcare ecosystem designed to improve hospital operations, patient monitoring, resource allocation, and clinical decision-making through data-driven technologies and predictive analytics.",
    highlights: [
      "Hospital Digital Twin",
      "Patient Monitoring",
      "Resource Management",
      "Predictive Healthcare Analytics",
      "Real-Time Dashboards",
      "Intelligent Hospital Operations"
    ],
    techStack: ["Next.js", "React", "JavaScript", "AI APIs", "Data Visualization", "Tailwind CSS"],
    role: "Team Lead & Full-Stack Developer",
    transition: "Hospital blueprint transforms into a futuristic healthcare command center.",
    icon: <Activity className="w-5 h-5 text-cyan-400" />,
    link: "https://hackathon-saveetha.vercel.app/"
  },
  {
    id: 2,
    title: "ECOGRID",
    category: "Sustainability Technology",
    type: "Hackathon Project",
    badge: "🏆 HACKATHON BUILD",
    description: "EcoGrid is a sustainability-focused platform that monitors resource consumption, visualizes usage patterns, and encourages efficient energy and water management through actionable insights.",
    highlights: [
      "Resource Monitoring",
      "Energy Analytics",
      "Water Consumption Tracking",
      "Sustainability Reports",
      "Smart Recommendations"
    ],
    techStack: ["Next.js", "React", "Analytics Systems", "JavaScript"],
    role: "Full-Stack Developer",
    transition: "Digital city lights animate according to resource usage patterns.",
    icon: <Globe className="w-5 h-5 text-emerald-400" />,
    link: "https://ecogrid-insights.vercel.app/",
    videoLink: "https://www.youtube.com/watch?v=4xUx0Iva4Sw&t=114s"
  },
  {
    id: 3,
    title: "DARKBID",
    category: "Marketplace Platform",
    type: "Hackathon Project",
    badge: "🏆 HACKATHON BUILD",
    description: "DarkBid is a modern digital auction platform enabling users to participate in competitive real-time bidding experiences through an intuitive and secure web interface.",
    highlights: [
      "Live Bidding",
      "Real-Time Updates",
      "Auction Dashboard",
      "Bid Tracking",
      "User Authentication"
    ],
    techStack: ["Next.js", "React", "JavaScript", "Database Systems"],
    role: "Full-Stack Developer",
    transition: "Auction data streams transform into a futuristic marketplace network.",
    icon: <Database className="w-5 h-5 text-amber-500" />,
    link: "https://darkbid-gray.vercel.app/",
    videoLink: "https://www.youtube.com/watch?v=ZJnYZZIEOBA"
  },
  {
    id: 4,
    title: "STUDO",
    category: "Student Productivity Platform",
    type: "Full-Stack Product",
    description: "STUDO is a student productivity operating system that combines study planning, task management, notes organization, exam preparation, and intelligent academic assistance into a unified learning workspace.",
    highlights: [
      "Study Room",
      "Notes Management",
      "Smart Planner",
      "Exam Dashboard",
      "Learning Analytics",
      "Academic Workspace"
    ],
    techStack: ["Next.js", "React", "JavaScript", "Tailwind CSS"],
    role: "Full-Stack Developer",
    transition: "Floating productivity widgets assemble into a futuristic academic dashboard.",
    icon: <BookOpen className="w-5 h-5 text-indigo-400" />,
    link: "https://studo-project.vercel.app/"
  },
  {
    id: 5,
    title: "EDUMIND AI",
    category: "EdTech Platform",
    type: "AI Product",
    description: "EduMind AI helps students learn smarter by generating summaries, quizzes, and visual mind maps while organizing educational resources and collaborative learning experiences.",
    highlights: [
      "Smart Summary Generator",
      "AI Quiz Generation",
      "Mind Map Creation",
      "Exam Preparation Library",
      "Study Groups",
      "Learning Dashboard"
    ],
    techStack: ["Next.js", "React", "AI APIs", "JavaScript"],
    role: "Full-Stack Developer",
    transition: "Knowledge particles connect into an expanding neural network.",
    icon: <Cpu className="w-5 h-5 text-fuchsia-400" />,
    link: "https://edumindai1.netlify.app/"
  }
];

const JOURNEY_IMAGES = [
  {
    src: "/project-01.jpg",
    title: "Hackathon Brainstorm",
    caption: "Late-night whiteboard session mapping system architectures and APIs."
  },
  {
    src: "/project-02.jpg",
    title: "CARESYNC AI Demo",
    caption: "Demonstrating our predictive healthcare hospital digital twin system."
  },
  {
    src: "/project-03.jpg",
    title: "Pitching Session",
    caption: "Presenting our smart operational dashboard live to the industry jury."
  },
  {
    src: "/project-04.jpg",
    title: "Late Night Coding",
    caption: "Refining Next.js rendering loops and dashboard state integrations."
  },
  {
    src: "/project-05.jpg",
    title: "Saveetha Victory",
    caption: "Proud team moment securing first place at the Saveetha Hackathon."
  },
  {
    src: "/project-06.jpg",
    title: "EcoGrid Prototype",
    caption: "Deploying resource usage algorithms and sustainability charts."
  },
  {
    src: "/project-07.jpg",
    title: "Wireframing UI",
    caption: "Designing high-fidelity dark-themed console layout layouts."
  },
  {
    src: "/project-08.jpg",
    title: "DarkBid Engine Test",
    caption: "Running stress tests on real-time decentralized bidding operations."
  },
  {
    src: "/project-09.jpg",
    title: "Database Architecture",
    caption: "Structuring relationships for collaborative student networks."
  },
  {
    src: "/project-10.jpg",
    title: "Studo Workspace",
    caption: "Testing integration of exam planners and study note widgets."
  },
  {
    src: "/project-11.jpg",
    title: "AI Workshop",
    caption: "Leading a developer webinar on neural network fundamentals."
  },
  {
    src: "/project-12.jpg",
    title: "Debugging Flow",
    caption: "Profiling rendering performance issues on the terminal canvas."
  },
  {
    src: "/project-13.jpg",
    title: "Startup Discussion",
    caption: "Aligning on core business modules with founders and investors."
  },
  {
    src: "/project-14.jpg",
    title: "EduMind AI Launch",
    caption: "Demonstrating automatic study guide generation for peers."
  },
  {
    src: "/project-15.jpg",
    title: "Final Deployment",
    caption: "Pushing code to production and celebrating team success."
  }
];

// SVG Animations inside device mockups
function CareSyncVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 bg-cyan-950/5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:16px_16px] rounded-xl" />
      <svg viewBox="0 0 400 150" className="w-full h-28 text-cyan-400 overflow-visible z-10">
        <motion.path
          d="M 0 75 L 120 75 L 132 50 L 145 105 L 158 75 L 175 75 L 188 30 L 202 120 L 215 75 L 400 75"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 0 75 L 120 75 L 132 50 L 145 105 L 158 75 L 175 75 L 188 30 L 202 120 L 215 75 L 400 75"
          fill="transparent"
          stroke="#06b6d4"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="blur-sm opacity-40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute border border-cyan-500/10 w-4/5 h-4/5 rounded flex items-center justify-center pointer-events-none">
        <span className="text-[8px] font-mono text-cyan-500/30 uppercase tracking-widest absolute top-2 left-2">[ SEC_BLUEPRINT_A ]</span>
        <div className="w-12 h-12 rounded-full border border-dashed border-cyan-500/15 animate-spin" style={{ animationDuration: "16s" }} />
      </div>
    </div>
  );
}

function StudoVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 bg-indigo-950/5">
      <div className="relative w-full h-full max-w-[280px] flex items-center justify-center">
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-1, 1.5, -1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-4 left-0 w-36 p-2.5 bg-black/60 border border-indigo-500/20 rounded-lg shadow-lg backdrop-blur-sm z-10 text-[9px] font-mono text-indigo-400"
        >
          <div className="h-1.5 w-10 bg-indigo-500/30 rounded mb-1.5" />
          <div className="space-y-1">
            <div className="h-0.5 bg-white/5 rounded w-full" />
            <div className="h-0.5 bg-white/5 rounded w-4/5" />
            <div className="h-0.5 bg-white/5 rounded w-2/3" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [6, -6, 6], rotate: [1.5, -1, 1.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-4 right-0 w-36 p-2.5 bg-black/60 border border-violet-500/20 rounded-lg shadow-lg backdrop-blur-sm z-10"
        >
          <div className="flex justify-between items-center mb-1.5">
            <div className="h-1.5 w-14 bg-violet-500/30 rounded" />
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          </div>
          <div className="flex items-end gap-1 h-8 pt-1">
            <div className="w-2 bg-indigo-500/30 h-[50%] rounded-t" />
            <div className="w-2 bg-violet-500/50 h-[80%] rounded-t" />
            <div className="w-2 bg-fuchsia-500/40 h-[30%] rounded-t" />
            <div className="w-2 bg-indigo-500/60 h-[70%] rounded-t" />
          </div>
        </motion.div>
        <div className="w-24 h-24 rounded-full border border-dashed border-indigo-500/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-indigo-500/10 bg-indigo-500/5 flex items-center justify-center">
            <span className="text-[8px] font-mono text-indigo-400/60 tracking-widest font-bold">WORKSPACE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EduMindVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 bg-fuchsia-950/5">
      <svg className="w-full h-full text-fuchsia-500/20 overflow-visible" viewBox="0 0 300 200">
        <motion.line x1="60" y1="50" x2="150" y2="100" stroke="currentColor" strokeWidth="0.8" animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.line x1="240" y1="60" x2="150" y2="100" stroke="currentColor" strokeWidth="0.8" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 5, repeat: Infinity }} />
        <motion.line x1="150" y1="100" x2="100" y2="150" stroke="currentColor" strokeWidth="0.8" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.line x1="150" y1="100" x2="200" y2="150" stroke="currentColor" strokeWidth="0.8" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.circle cx="150" cy="100" r="8" fill="#d946ef" className="shadow-[0_0_8px_#d946ef]" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="60" cy="50" r="5" fill="#a21caf" />
        <motion.circle cx="240" cy="60" r="5" fill="#a21caf" />
        <motion.circle cx="100" cy="150" r="6" fill="#ec4899" />
        <motion.circle cx="200" cy="150" r="6" fill="#ec4899" />
      </svg>
    </div>
  );
}

function EcoGridVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6 bg-emerald-950/5">
      <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.04)_1px,transparent_1px)] bg-[size:14px_14px]" />
      <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400">
        <span>RESOURCE_GRID_LIVE</span>
        <span className="animate-pulse">● OPTIMIZED</span>
      </div>
      <div className="flex items-end justify-between h-28 pt-2">
        {[60, 40, 85, 55, 75, 45, 70].map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 w-[10%]">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 1.2, delay: i * 0.08 }}
              className="w-full bg-gradient-to-t from-emerald-600/20 to-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)] rounded-t"
            />
            <div className="w-1 h-1 rounded-full bg-emerald-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DarkBidVisual() {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5 bg-amber-950/5 font-mono text-[9px]">
      <div className="absolute inset-0 opacity-10 overflow-hidden flex justify-around select-none pointer-events-none text-[7px] text-amber-500/30">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            {Array.from({ length: 20 }).map((_, j) => (
              <span key={j}>{Math.floor(Math.random() * 9)}</span>
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center text-amber-500 border-b border-amber-500/15 pb-1">
        <span>DARKBID_NODE: 0x92</span>
        <span>LIVE_SYS</span>
      </div>
      <div className="flex flex-col gap-1 text-[8px] text-left pt-2 text-amber-400/80">
        <div>&gt; AUCTION STARTED // SECURE_COMM</div>
        <div>&gt; NEW HIGH BID: $1,420</div>
        <div className="text-emerald-400">&gt; RESERVE PRICE MET</div>
        <div className="text-neutral-500">&gt; BROADCASTING TRANSACTION LOG</div>
      </div>
    </div>
  );
}

const renderVisualComponent = (title: string) => {
  switch (title) {
    case "CARESYNC AI":
      return <CareSyncVisual />;
    case "STUDO":
      return <StudoVisual />;
    case "EDUMIND AI":
      return <EduMindVisual />;
    case "ECOGRID":
      return <EcoGridVisual />;
    case "DARKBID":
      return <DarkBidVisual />;
    default:
      return null;
  }
};

function RailCard({ img }: { img: { src: string; title: string; caption: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 440,
        height: 285,
        borderRadius: 18,
        overflow: "hidden",
        border: hovered ? "1.5px solid rgba(6,182,212,0.7)" : "1.5px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 0 0 2px rgba(6,182,212,0.25), 0 14px 50px rgba(6,182,212,0.22)"
          : "0 6px 36px rgba(0,0,0,0.65)",
        position: "relative",
        transform: hovered ? "scale(1.04) translateY(-5px)" : "scale(1)",
        transition: "all 0.32s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <img
        src={img.src}
        alt={img.title}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}
        onError={(e) => {
          const el = e.currentTarget.parentElement;
          if (el) {
            el.style.background = "linear-gradient(135deg, rgba(6,182,212,0.07), rgba(59,130,246,0.05))";
            e.currentTarget.style.display = "none";
          }
        }}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 60%)",
        pointerEvents: "none",
        borderRadius: 16,
      }} />
    </div>
  );
}

export default function Hackathons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const xBg = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const yParallax1 = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);

  const [activeStep, setActiveStep] = useState(0);
  // Photo rail rAF state
  const railTrackRef = useRef<HTMLDivElement>(null);
  const railOffsetRef = useRef(0);
  const railRafRef = useRef<number | null>(null);
  const railPausedRef = useRef(false);
  const [railHoverL, setRailHoverL] = useState(false);
  const [railHoverR, setRailHoverR] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let step = 0;
    if (latest < 0.143) step = 0;
    else if (latest < 0.286) step = 1;
    else if (latest < 0.429) step = 2;
    else if (latest < 0.572) step = 3;
    else if (latest < 0.715) step = 4;
    else if (latest < 0.858) step = 5;
    else step = 6; // Outro Orbit

    if (step !== activeStep) {
      setActiveStep(step);
    }
  });

  const scrollToStep = (stepIndex: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offsetPercent = [0.05, 0.20, 0.34, 0.48, 0.62, 0.76, 0.92];
    const targetScroll = scrollTop + rect.top + (offsetPercent[stepIndex] * rect.height);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  // rAF loop for the photo rail
  const RAIL_CARD_W = 454; // card width + gap
  const RAIL_TOTAL = JOURNEY_IMAGES.length * RAIL_CARD_W;
  useEffect(() => {
    railOffsetRef.current = RAIL_TOTAL;
    const tick = () => {
      if (!railPausedRef.current) {
        railOffsetRef.current += 3.5;
        if (railOffsetRef.current >= RAIL_TOTAL * 2) railOffsetRef.current -= RAIL_TOTAL;
        if (railOffsetRef.current < RAIL_TOTAL) railOffsetRef.current += RAIL_TOTAL;
        if (railTrackRef.current) {
          railTrackRef.current.style.transform = `translateX(-${railOffsetRef.current}px)`;
        }
      }
      railRafRef.current = requestAnimationFrame(tick);
    };
    railRafRef.current = requestAnimationFrame(tick);
    return () => { if (railRafRef.current) cancelAnimationFrame(railRafRef.current); };
  }, [RAIL_TOTAL]);

  const skipRail = (dir: "fwd" | "back") => {
    railOffsetRef.current += dir === "fwd" ? RAIL_CARD_W * 3 : -RAIL_CARD_W * 3;
    if (railOffsetRef.current >= RAIL_TOTAL * 2) railOffsetRef.current -= RAIL_TOTAL;
    if (railOffsetRef.current < RAIL_TOTAL) railOffsetRef.current += RAIL_TOTAL;
    if (railTrackRef.current) {
      railTrackRef.current.style.transform = `translateX(-${railOffsetRef.current}px)`;
    }
  };

  const activeProject = activeStep >= 1 && activeStep <= 5 ? PROJECTS[activeStep - 1] : null;

  const activeColorClass =
    activeStep === 1 ? "text-cyan-400" :
      activeStep === 2 ? "text-emerald-400" :
        activeStep === 3 ? "text-amber-400" :
          activeStep === 4 ? "text-indigo-400" :
            activeStep === 5 ? "text-fuchsia-400" :
              "text-neutral-600";

  return (
    <section
      id="hackathons"
      ref={containerRef}
      className="relative bg-transparent h-[800vh] w-full z-20 border-t border-white/5"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          display: flex;
          width: max-content;
          animation: infiniteScroll 45s linear infinite;
        }
      `}} />

      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 py-8 md:px-16 md:py-10 relative z-10">

        {/* Dynamic World Fullscreen Background morphs (housed inside sticky container to remain fixed in viewport) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Step 0: Intro — deep royal blue */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeStep === 0 ? 1 : 0, background: "linear-gradient(to bottom, #020a1a, #0a1f52, #020a1a)" }}
          />
          {/* Step 1: CareSync */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeStep === 1 ? 1 : 0, background: "linear-gradient(to bottom, #01091a, #051c4f, #01091a)" }}
          />
          {/* Step 2: EcoGrid */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeStep === 2 ? 1 : 0, background: "linear-gradient(to bottom, #001205, #002d0b, #001205)" }}
          />
          {/* Step 3: DarkBid */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeStep === 3 ? 1 : 0, background: "linear-gradient(to bottom, #140d00, #382400, #140d00)" }}
          />
          {/* Step 4: Studo */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeStep === 4 ? 1 : 0, background: "linear-gradient(to bottom, #08011c, #240c5e, #08011c)" }}
          />
          {/* Step 5: EduMind */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeStep === 5 ? 1 : 0, background: "linear-gradient(to bottom, #170116, #40073e, #170116)" }}
          />
          {/* Step 6: Project Journey */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeStep === 6 ? 1 : 0, background: "linear-gradient(to bottom, #010410, #0c1a40, #010410)" }}
          />
          {/* Step 7: Outro Orbit — deep navy */}
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: activeStep === 7 ? 1 : 0, background: "linear-gradient(to bottom, #010712, #040e2b, #010712)" }}
          />

          {/* Giant Parallax Background Text */}
          <div className="absolute inset-0 overflow-hidden flex items-center justify-center select-none z-0">
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.title}
                  initial={{ opacity: 0, scale: 0.85, y: 15 }}
                  animate={{ opacity: 0.05, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.15, y: -15 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    x: xBg,
                    WebkitTextStroke: "1px rgba(255, 255, 255, 0.35)",
                    color: "transparent",
                  } as any}
                  className="text-[14vw] font-black tracking-tighter text-white whitespace-nowrap uppercase select-none font-heading"
                >
                  {activeProject.title}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Memphis Design Corner Shapes */}
          <div
            className={`absolute inset-0 pointer-events-none overflow-hidden transition-all duration-1000 ${activeColorClass} opacity-30`}
            style={{
              filter: "drop-shadow(0 0 6px currentColor)",
            }}
          >

            {/* Top-Left Corner Vector */}
            <motion.div
              style={{ y: yParallax1 }}
              className="absolute top-6 left-6 w-32 h-32 md:w-48 md:h-48"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
                <rect x="20" y="20" width="100" height="100" transform="rotate(15 70 70)" strokeDasharray="3,3" />
                <path d="M40,50 L90,100 M50,40 L100,90 M60,30 L110,80" opacity="0.7" />
                {Array.from({ length: 3 }).map((_, r) =>
                  Array.from({ length: 3 }).map((_, c) => (
                    <circle key={`r-${r}-c-${c}`} cx={140 + c * 14} cy={60 + r * 14} r="2.5" className="fill-current stroke-none" />
                  ))
                )}
                <path d="M 30 160 A 30 30 0 0 1 90 160" />
              </svg>
            </motion.div>

            {/* Top-Right Corner Vector */}
            <motion.div
              style={{ y: yParallax2 }}
              className="absolute top-6 right-6 w-32 h-32 md:w-48 md:h-48"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
                <path d="M 20,40 Q 35,25 50,40 T 80,40 T 110,40" />
                <path d="M 20,52 Q 35,37 50,52 T 80,52 T 110,52" />
                <path d="M 20,64 Q 35,49 50,64 T 80,64 T 110,64" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <rect key={`pill-${i}`} x={130 + i * 12} y={30} width="6" height="24" rx="3" className="fill-current stroke-none" />
                ))}
                <path d="M150,90 C150,70 180,70 180,90 L180,160 L150,160 Z" />
                <circle cx="165" cy="120" r="10" className="fill-current stroke-none" />
              </svg>
            </motion.div>

            {/* Bottom-Left Corner Vector */}
            <motion.div
              style={{ y: yParallax2 }}
              className="absolute bottom-12 left-6 w-32 h-32 md:w-48 md:h-48"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
                <path d="M20,60 L32,72 M32,60 L20,72" />
                <path d="M44,60 L56,72 M56,60 L44,72" />
                <path d="M68,60 L80,72 M80,60 L68,72" />
                <path d="M 20,100 Q 35,115 50,100 T 80,100 T 110,100" />
                <path d="M130,120 A 25 25 0 0 1 180,120 Z" className="fill-current stroke-none" opacity="0.3" />
                <path d="M130,120 A 25 25 0 0 1 180,120" />
                <path d="M20,150 A 40 40 0 0 0 100,150" strokeWidth="4" />
              </svg>
            </motion.div>

            {/* Bottom-Right Corner Vector */}
            <motion.div
              style={{ y: yParallax1 }}
              className="absolute bottom-12 right-6 w-32 h-32 md:w-48 md:h-48"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full fill-none stroke-current" strokeWidth="1.5">
                <rect x="50" y="50" width="100" height="100" transform="rotate(-25 100 100)" strokeWidth="1.5" />
                <path d="M120,60 L140,80 M110,70 L130,90 M100,80 L120,100" opacity="0.8" />
                <path d="M70,80 L70,120 L95,120" strokeWidth="3" />
                <path d="M85,95 L115,95 L115,115" strokeWidth="3" />
                <line x1="20" y1="120" x2="60" y2="160" />
                <line x1="30" y1="120" x2="70" y2="160" />
              </svg>
            </motion.div>

          </div>
        </div>

        {/* Top HUD Display Info */}
        <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-neutral-500 uppercase border-b border-white/5 pb-3 z-10">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            <span>PROJECT CASE STUDY ARCHIVE // SYS_REVEAL</span>
          </div>
          <div>
            <span>OS_DOCK: 0x0{activeStep}</span>
          </div>
        </div>

        {/* Center Canvas Areas */}
        <div className="flex-1 flex items-center justify-center w-full my-6 font-sans">
          <AnimatePresence mode="wait">
            {/* Step 0: Intro Section */}
            {activeStep === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="w-full flex flex-col items-center gap-3 z-10"
              >
                {/* Title Block */}
                <div className="text-center flex flex-col items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-[0.25em] px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    [ SECTION DOCK // ARCHIVE ]
                  </span>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase font-heading leading-none">
                    PROJECT ARCHIVE
                  </h2>
                  <p className="text-sm md:text-base text-neutral-300 max-w-2xl font-medium leading-relaxed mt-1">
                    A selection of my projects, products, and hackathon builds that showcase my journey as a full-stack developer. Each project reflects a unique challenge, a learning experience, and my passion for building technology that creates real-world impact.
                  </p>
                </div>

                {/* ── Photo Rail — strip above, arrows below ── */}
                <div
                  style={{ width: "calc(100% + 3rem)", marginLeft: "-1.5rem", marginTop: 8 }}
                  onMouseEnter={() => { railPausedRef.current = true; }}
                  onMouseLeave={() => { railPausedRef.current = false; }}
                >
                  {/* Scrolling strip */}
                  <div style={{
                    overflow: "hidden",
                    maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    paddingTop: 12, paddingBottom: 12,
                  }}>
                    <div
                      ref={railTrackRef}
                      style={{ display: "flex", gap: 14, width: "max-content", willChange: "transform" }}
                    >
                      {[...JOURNEY_IMAGES, ...JOURNEY_IMAGES, ...JOURNEY_IMAGES].map((img, i) => (
                        <RailCard key={i} img={img} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Showcase Navigation Chips */}
                <div className="flex flex-wrap justify-center gap-2 mt-1">
                  {PROJECTS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => scrollToStep(idx + 1)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 hover:border-blue-500/30 hover:bg-blue-500/10 text-neutral-300 hover:text-white transition-all duration-300 font-mono text-[9px] font-bold uppercase tracking-wider"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      {p.title}
                    </button>
                  ))}
                </div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2 text-[9px] font-mono text-neutral-500 uppercase tracking-widest cursor-pointer"
                  onClick={() => scrollToStep(1)}
                >
                  <span>Scroll to Explore</span>
                  <div className="w-5 h-8 border-2 border-neutral-600 rounded-full p-1 flex justify-center">
                    <div className="w-1 h-2 bg-blue-400 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Steps 1-5: Product Presentation */}
            {activeStep >= 1 && activeStep <= 5 && activeProject && (
              <motion.div
                key={`project-${activeStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl z-10"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full max-h-[70vh] lg:max-h-[60vh]">
                  {/* Left Column: Glassmorphic center device */}
                  <motion.div
                    initial={{ scale: 0.94, opacity: 0, x: -30 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="lg:col-span-6 flex items-center justify-center relative w-full h-[220px] sm:h-[280px] lg:h-[350px]"
                  >
                    {/* Perspective card mock browser */}
                    <div className="glass-panel w-full h-full rounded-2xl border border-white/10 bg-black/40 shadow-2xl relative overflow-hidden backdrop-blur-md flex flex-col justify-between">
                      {/* Browser Mock Top Bar */}
                      <div className="flex justify-between items-center px-4 py-2 border-b border-white/5 bg-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                        </div>
                        <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                          {activeProject.title.toLowerCase()}.sys
                        </div>
                        <div className="w-10 h-1 bg-neutral-800 rounded" />
                      </div>

                      {/* Mockup custom canvas drawing */}
                      <div className="flex-1 w-full relative overflow-hidden">
                        {renderVisualComponent(activeProject.title)}
                      </div>

                      {/* Browser Footer details */}
                      <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex justify-between items-center text-[8px] font-mono text-neutral-500">
                        <span>PORT_SECURE: v1.0.8</span>
                        <span>CORE_READY</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column: Specs Sheet Details */}
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="lg:col-span-6 flex flex-col gap-4 text-left overflow-y-auto pr-1"
                  >
                    <div>
                      {/* Badge / Type */}
                      {activeProject.type === "Hackathon Project" && (
                        <div className="flex items-center mb-2">
                          <span className="text-[9px] font-mono font-extrabold tracking-widest text-amber-400 px-2 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 uppercase shadow-[0_0_10px_rgba(245,158,11,0.15)] flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5 fill-amber-400/15" /> HACKATHON PRODUCT
                          </span>
                        </div>
                      )}
                      <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold">
                        {activeProject.category}
                      </span>
                      <h3 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase mt-1 font-heading">
                        {activeProject.title}
                      </h3>
                    </div>

                    <p className="text-neutral-300 font-medium text-xs md:text-sm leading-relaxed max-w-xl">
                      {activeProject.description}
                    </p>

                    {(activeProject.link || activeProject.videoLink) && (
                      <div className="flex flex-wrap gap-3 mt-1">
                        {activeProject.link && (
                          <a
                            href={activeProject.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 rounded-lg font-mono text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:border-cyan-400/50"
                          >
                            <Globe className="w-3.5 h-3.5 animate-pulse" />
                            Visit Live Project
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        )}
                        {activeProject.videoLink && (
                          <a
                            href={activeProject.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 rounded-lg font-mono text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.25)] hover:border-red-400/50"
                          >
                            <Play className="w-3.5 h-3.5 fill-red-500/20 animate-pulse" />
                            Watch Video
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Highlights Grid */}
                    <div>
                      <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block mb-2">
                        // Key Specifications
                      </span>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {activeProject.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-neutral-200">
                            <span className="text-blue-400 text-[9px] mt-[3px]">▲</span>
                            <span className="text-[11px] leading-tight font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack Row */}
                    <div>
                      <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest block mb-2">
                        // Technology Stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] font-mono font-bold px-2 py-1 bg-white/5 border border-white/5 rounded text-neutral-200 hover:border-blue-500/35 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>


                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Step 6: Outro Orbit */}
            {activeStep === 6 && (
              <motion.div
                key="outro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative min-h-[400px] z-10"
              >
                {/* 3D Orbiting Cards Animation */}
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center flex-shrink-0">
                  {/* Central glowing core sphere */}
                  <div className="absolute w-24 h-24 rounded-full bg-blue-500/10 border border-blue-400/20 blur-sm flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-pulse" />
                  </div>

                  {/* Orbit Ring visual */}
                  <div className="absolute w-[280px] h-[280px] lg:w-[340px] lg:h-[340px] border border-white/5 rounded-full pointer-events-none" />

                  {/* revolving orbiting boxes */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {PROJECTS.map((p, idx) => {
                      const angle = (idx * 360) / 5;
                      const radius = 140; // distance from center in px
                      return (
                        <div
                          key={p.id}
                          className="absolute pointer-events-none"
                          style={{
                            transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`
                          }}
                        >
                          <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                            className="glass-panel px-3 py-2 text-[9px] font-mono font-bold text-center border border-white/10 rounded-lg bg-black/80 shadow-lg min-w-[90px] select-none pointer-events-auto"
                          >
                            <div className="text-white font-bold">{p.title}</div>
                            <div className="text-blue-400 text-[8px] mt-0.5">{p.category.split(" ")[0]}</div>
                          </motion.div>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Final Closing Statement Details */}
                <div className="text-center lg:text-left max-w-md flex flex-col gap-4">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-[0.2em] block">
                    // ARCHIVE_COMPLETE
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight uppercase font-heading">
                    BUILDING PRODUCTS,<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">NOT JUST PROJECTS.</span>
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed font-medium">
                    Exploring healthcare, education, sustainability, automation, and intelligent systems through modern software engineering.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-blue-500/25 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 rounded font-mono text-[10px] font-bold uppercase tracking-wider transition-colors"
                    >
                      Connect with me
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Progress Indicator Dots / Step Buttons */}
        <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 uppercase border-t border-white/5 pt-3 z-10">
          <div className="flex gap-2.5 items-center">
            {Array.from({ length: 7 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToStep(idx)}
                className={`relative flex items-center justify-center transition-all duration-300 ${activeStep === idx
                    ? "w-7 h-3.5 border border-blue-500/40 bg-blue-500/10 rounded text-blue-400 font-bold"
                    : "w-2.5 h-2.5 rounded-full border border-neutral-700 bg-neutral-900 hover:border-blue-500/50"
                  }`}
              >
                {activeStep === idx && (
                  <span className="text-[8px] leading-none">0{idx}</span>
                )}
              </button>
            ))}
          </div>
          <div>
            <span>SYSTEM STATE: {activeStep === 6 ? "COMPLETE" : `STEP_0${activeStep}`}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
