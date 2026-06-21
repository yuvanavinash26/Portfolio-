"use client";

import { motion } from "framer-motion";
import { Award, Zap, Target, FolderGit2 } from "lucide-react";

interface PortfolioItem {
  eventName: string;
  projectName: string;
  teamName: string;
  problemStatement: string;
  role: string;
  technologies: string[];
  outcome: string;
  isFeatured?: boolean;
  type: "Hackathon Entry" | "Standalone Project";
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    eventName: "HealthTech Innovation Challenge",
    projectName: "CARESYNC AI",
    teamName: "Nexus Health",
    problemStatement: "Smart hospital management and patient-care ecosystem featuring live hospital digital twin visualization, predictive healthcare analytics, intelligent resource allocation, patient monitoring, and emergency optimization systems.",
    role: "Team Lead & Full Stack Developer",
    technologies: ["Next.js", "React", "AI APIs", "Data Visualization", "Real-Time Systems"],
    outcome: "Outstanding Prototype Winner",
    isFeatured: true,
    type: "Hackathon Entry"
  },
  {
    eventName: "Eco-Sustainability Hackathon",
    projectName: "EcoGrid",
    teamName: "GreenGrid Tech",
    problemStatement: "A smart sustainability platform developed during a 48-hour hackathon that monitors energy and water consumption using analytics to identify inefficiencies and reduce wastage.",
    role: "Full Stack Developer",
    technologies: ["Python", "Data Analytics", "Dashboard Systems", "Flask"],
    outcome: "Finalist & Best Analytics Award",
    type: "Hackathon Entry"
  },
  {
    eventName: "Independent Engineering Experiment",
    projectName: "Skill Gap Navigator",
    teamName: "Individual Project",
    problemStatement: "An AI-powered career guidance engine comparing student profiles with global job descriptions to generate personalized step-by-step learning roadmaps.",
    role: "Sole Creator",
    technologies: ["AI APIs", "Node.js", "Vector Databases", "Express"],
    outcome: "Active Showcase",
    type: "Standalone Project"
  },
  {
    eventName: "Interactive Scrollytelling Interface",
    projectName: "Portfolio Website",
    teamName: "Individual Project",
    problemStatement: "A high-performance scrollytelling visual resume utilizing custom Canvas shaders, framer-motion choreographies, and responsive dynamic navigation.",
    role: "Lead Designer & Developer",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Canvas Render"],
    outcome: "Active Showcase",
    type: "Standalone Project"
  }
];

export default function Hackathons() {
  return (
    <section id="hackathons" className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center justify-center md:justify-start gap-2">
            <Award className="w-4 h-4" /> [ PORTFOLIO // PROJECTS & HACKATHONS ]
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase mt-4 font-heading">
            Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Hackathons</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-neutral-200 max-w-2xl font-medium leading-relaxed">
            A comprehensive archive of engineering prototypes, competition entries, and standalone web tools.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="space-y-8">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.projectName}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl p-8 md:p-12 transition-all duration-300 border ${
                item.isFeatured
                  ? "hologram-card border-blue-500/30 glow-blue bg-blue-950/5"
                  : "glass-panel border-white/5 bg-black/40 hover:border-blue-500/20"
              }`}
            >
              {/* Type Badge */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-2">
                <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                  item.type === "Hackathon Entry"
                    ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                    : "bg-blue-500/10 border-blue-500/30 text-blue-300"
                }`}>
                  {item.type}
                </span>
                {item.isFeatured && (
                  <span className="bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-amber-400/20" /> FEATURED
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Column 1: Event & Roles */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    {item.eventName}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white font-heading tracking-tight">
                    {item.projectName}
                  </h3>
                  <div className="flex flex-col gap-1 text-xs text-neutral-300 font-mono">
                    <div>
                      <strong className="text-neutral-400 uppercase">TEAM:</strong> {item.teamName}
                    </div>
                    <div>
                      <strong className="text-neutral-400 uppercase">ROLE:</strong> {item.role}
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="text-[10px] font-mono font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/35 text-emerald-400 rounded-full">
                      🏆 {item.outcome}
                    </span>
                  </div>
                </div>

                {/* Column 2: Problem Statement & Tech Stack */}
                <div className="lg:col-span-8 space-y-6">
                  <div>
                    <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5 text-blue-400" /> PROBLEM STATEMENT
                    </div>
                    <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-medium">
                      {item.problemStatement}
                    </p>
                  </div>

                  <div>
                    <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-3">
                      TECHNOLOGIES INTEGRATED
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono font-bold px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-neutral-100 hover:border-blue-500/30 transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
