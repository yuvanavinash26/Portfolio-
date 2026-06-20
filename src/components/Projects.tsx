"use client";

import { useState, useRef } from "react";
import { ExternalLink, Terminal, HeartPulse, Leaf, Compass, AppWindow } from "lucide-react";

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

function Card({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden rounded-2xl glass-panel p-8 group transition-all duration-500 hover:border-blue-500/30 hover:translate-y-[-4px] flex flex-col justify-between min-h-[300px] bg-black/40"
    >
      {/* Glow highlight background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(0, 102, 255, 0.08), transparent 80%)`,
        }}
      />

      <div>
        {/* Card Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:border-blue-500/40 transition-colors duration-300">
            {project.icon}
          </div>
          <a
            href={project.link}
            onClick={(e) => {
              e.preventDefault();
              alert("Project case studies are being integrated!");
            }}
            className="text-neutral-400 hover:text-blue-400 transition-colors duration-300 p-2"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Card Content */}
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

      {/* Card Tags */}
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

export default function Projects() {
  return (
    <section id="projects" className="relative bg-transparent px-6 py-24 md:py-36 border-t border-white/5 z-20">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
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

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
