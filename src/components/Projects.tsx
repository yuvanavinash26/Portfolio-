"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Terminal, HeartPulse, Leaf, Compass, AppWindow } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  link: string;
  icon: React.ReactNode;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "CARESYNC AI",
    category: "Healthcare Operations Hub",
    description: "A next-generation healthcare intelligence platform featuring predictive insights, hospital digital twins, patient analytics, and smart healthcare operations.",
    tags: ["Next.js", "AI APIs", "Data Visualization", "Cloud Systems"],
    link: "#",
    icon: <HeartPulse className="w-5 h-5 text-blue-400" />
  },
  {
    id: 2,
    title: "EcoGrid",
    category: "Smart Sustainability Analytics",
    description: "A smart sustainability platform developed during a 48-hour hackathon that monitors energy and water consumption using analytics to identify inefficiencies and reduce wastage.",
    tags: ["Python", "Data Analytics", "Dashboard Systems", "Flask"],
    link: "#",
    icon: <Leaf className="w-5 h-5 text-blue-400" />
  },
  {
    id: 3,
    title: "Skill Gap Navigator",
    category: "Career Guidance Engine",
    description: "An AI-powered career guidance platform that compares student profiles with industry requirements and generates personalized learning roadmaps.",
    tags: ["AI", "Web Development", "Recommendation Systems", "Node.js"],
    link: "#",
    icon: <Compass className="w-5 h-5 text-blue-400" />
  },
  {
    id: 4,
    title: "Portfolio Website",
    category: "Interactive Scrollytelling",
    description: "A futuristic personal portfolio demonstrating advanced UI/UX design, interactive experiences, and modern web technologies.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Canvas Render"],
    link: "#",
    icon: <AppWindow className="w-5 h-5 text-blue-400" />
  }
];

const JOURNEY_IMAGES = [
  "/project-01.jpg",
  "/project-02.jpg",
  "/project-03.jpg",
  "/project-04.jpg",
  "/project-05.jpg",
  "/project-06.jpg",
  "/project-07.jpg",
  "/project-08.jpg",
  "/project-09.jpg",
  "/project-10.jpg",
  "/project-11.jpg",
  "/project-12.jpg",
  "/project-13.jpg",
  "/project-14.jpg",
  "/project-15.jpg",
];

// ─── Photo Rail ────────────────────────────────────────────────────────────────
function PhotoRail() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef    = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const [hoverLeft,   setHoverLeft]   = useState(false);
  const [hoverRight,  setHoverRight]  = useState(false);

  const CARD_W  = 396; // card width + gap
  const TOTAL_W = JOURNEY_IMAGES.length * CARD_W;
  const images  = [...JOURNEY_IMAGES, ...JOURNEY_IMAGES, ...JOURNEY_IMAGES];

  useEffect(() => {
    offsetRef.current = TOTAL_W;
    const tick = () => {
      if (!pausedRef.current) {
        offsetRef.current += 1.8;
        if (offsetRef.current >= TOTAL_W * 2) offsetRef.current -= TOTAL_W;
        if (offsetRef.current <  TOTAL_W)     offsetRef.current += TOTAL_W;
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [TOTAL_W]);

  const skip = (dir: "fwd" | "back") => {
    const delta = CARD_W * 3;
    offsetRef.current += dir === "fwd" ? delta : -delta;
    if (offsetRef.current >= TOTAL_W * 2) offsetRef.current -= TOTAL_W;
    if (offsetRef.current <  TOTAL_W)     offsetRef.current += TOTAL_W;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
    }
  };

  const btnBase: React.CSSProperties = {
    flexShrink: 0,
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.03)",
    color: "rgba(255,255,255,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    transition: "all 0.18s ease",
    zIndex: 10,
  };

  return (
    /* Column: strip on top, arrows row below */
    <div
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* Scrolling strip */}
      <div
        style={{
          overflow: "hidden",
          maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          paddingTop: 20,
          paddingBottom: 20,
        }}
      >
        <div
          ref={trackRef}
          style={{ display: "flex", gap: 16, width: "max-content", willChange: "transform" }}
        >
          {images.map((src, i) => (
            <PhotoCard key={i} src={src} index={i} />
          ))}
        </div>
      </div>

      {/* Arrows — centered row below the strip */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, marginTop: 10 }}>
        <button
          onClick={() => skip("back")}
          onMouseEnter={() => setHoverLeft(true)}
          onMouseLeave={() => setHoverLeft(false)}
          aria-label="Scroll left"
          style={{
            ...btnBase,
            background: hoverLeft ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
            color: hoverLeft ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)",
            border: `1px solid ${hoverLeft ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)"}`,
            transform: hoverLeft ? "scale(1.06)" : "scale(1)",
          }}
        >
          <ChevronLeft size={16} strokeWidth={2} />
        </button>

        <button
          onClick={() => skip("fwd")}
          onMouseEnter={() => setHoverRight(true)}
          onMouseLeave={() => setHoverRight(false)}
          aria-label="Scroll right"
          style={{
            ...btnBase,
            background: hoverRight ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
            color: hoverRight ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.35)",
            border: `1px solid ${hoverRight ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.1)"}`,
            transform: hoverRight ? "scale(1.06)" : "scale(1)",
          }}
        >
          <ChevronRight size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function PhotoCard({ src, index }: { src: string; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 380,
        height: 250,
        borderRadius: 18,
        overflow: "hidden",
        border: hovered
          ? "1.5px solid rgba(6,182,212,0.65)"
          : "1.5px solid rgba(255,255,255,0.09)",
        boxShadow: hovered
          ? "0 0 0 2px rgba(6,182,212,0.22), 0 12px 50px rgba(6,182,212,0.18), 0 6px 36px rgba(0,0,0,0.6)"
          : "0 6px 36px rgba(0,0,0,0.55)",
        position: "relative",
        transform: hovered ? "scale(1.05) translateY(-5px)" : "scale(1)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
        cursor: "pointer",
      }}
    >
      <img
        src={src}
        alt={`Project memory ${(index % JOURNEY_IMAGES.length) + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: hovered ? "scale(1.09)" : "scale(1)",
          transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
        onError={(e) => {
          const el = e.currentTarget.parentElement;
          if (el) {
            el.style.background = "linear-gradient(135deg, rgba(6,182,212,0.07), rgba(59,130,246,0.05))";
            const n = (index % JOURNEY_IMAGES.length) + 1;
            el.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:monospace;font-size:11px;color:rgba(255,255,255,0.2);letter-spacing:0.12em;">project-${String(n).padStart(2,"0")}</div>`;
          }
        }}
      />
      {/* Glass shine overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 55%, rgba(6,182,212,0.04) 100%)",
          pointerEvents: "none",
          borderRadius: 18,
        }}
      />
      {/* Cyan glow on hover */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 18,
            pointerEvents: "none",
            boxShadow: "inset 0 0 40px rgba(6,182,212,0.12)",
          }}
        />
      )}
    </div>
  );
}

// ─── Project Card ──────────────────────────────────────────────────────────────
function Card({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-2xl glass-panel p-8 group transition-all duration-500 hover:border-blue-500/30 hover:translate-y-[-4px] flex flex-col justify-between min-h-[300px] bg-black/40"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(0, 102, 255, 0.08), transparent 80%)`,
        }}
      />
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:border-blue-500/40 transition-colors duration-300">
            {project.icon}
          </div>
          <a
            href={project.link}
            onClick={(e) => { e.preventDefault(); alert("Project case studies are being integrated!"); }}
            className="text-neutral-400 hover:text-blue-400 transition-colors duration-300 p-2"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase">
          {project.category}
        </span>
        <h3 className="text-xl font-bold tracking-tight text-white mt-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all duration-300 font-heading">
          {project.title}
        </h3>
        <p className="text-neutral-200 font-medium text-sm mt-3 leading-relaxed">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mt-8">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-mono font-bold px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-neutral-200 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="relative bg-transparent pt-20 pb-24 md:pt-28 md:pb-36 border-t border-white/5 z-20">

      {/* Photo Rail */}
      <div className="mb-20 md:mb-28">
        <div className="flex items-center gap-3 px-6 md:px-16 mb-8">
          <div className="h-px flex-1 max-w-[40px] bg-white/10" />
          <span className="text-[10px] font-mono font-bold text-blue-400/80 uppercase tracking-[0.3em]">
            Project Memories &amp; Journey
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <PhotoRail />
      </div>

      {/* Featured Projects Grid */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center gap-2">
              <Terminal className="w-4 h-4" /> [ SELECTED WORK // PROJECTS ]
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase mt-4 font-heading">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Projects</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-200 max-w-sm font-medium leading-relaxed">
            A small archive of tools, interfaces, and experiments exploring healthcare intelligence, resource sustainability, and recommendation systems.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
