"use client";

import React, { useRef } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Calendar, MapPin, Terminal, ExternalLink } from "lucide-react";

interface TimelineItem {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description?: string;
  website?: string;
}

const EXPERIENCE_ITEMS: TimelineItem[] = [
  {
    title: "Open Source Contributor",
    subtitle: "GirlScript Summer of Code",
    date: "May 2026 - Present",
    location: "Global Collaboration",
    description: "Contributing to community-driven open-source projects, fixing issues, refactoring UI components, and collaborating with developers worldwide."
  },
  {
    title: "Open Source Contributor",
    subtitle: "Social Summer Of Code",
    date: "May 2026 - Present",
    location: "Global Collaboration",
    description: "Participating in collaborative software projects and building solutions that create social impact through technology."
  },
  {
    title: "Development Domain Member",
    subtitle: "CodeKrafters",
    date: "October 2025 - Present",
    location: "SRM Ramapuram, Chennai",
    description: "Working with student developers on web applications, technical workshops, hackathons, and software innovation initiatives."
  }
];

const EDUCATION_ITEMS: TimelineItem[] = [
  {
    title: "B.Tech Computer Science and Engineering",
    subtitle: "SRM Institute of Science and Technology",
    date: "2025 - 2029",
    location: "Ramapuram, Chennai, India",
    description: "Relevant Interests: Software Engineering, Web Development, Artificial Intelligence, Automation, System Design.",
    website: "https://srmrmp.edu.in/"
  },
  {
    title: "Sudharsanam Vidyaashram",
    subtitle: "Higher Secondary & Secondary Education",
    date: "2019 - 2025",
    location: "Chennai, India",
    description: "Achievements: Scored 95% in Class 10 Board Examinations, Received Highest Academic Honors, Participated in Technical and Leadership Activities.",
    website: "https://sudharsanamvidyaashram.org/"
  }
];

function TimelineCard({
  item,
  idx,
  type,
  scrollY
}: {
  item: TimelineItem;
  idx: number;
  type: "work" | "education";
  scrollY: any;
}) {
  const scrollVelocity = useVelocity(scrollY);

  // Organic variety: each index has slightly different physics parameters (stiffness, damping, mass)
  // so the cards swing out of sync, creating a natural hanging pendulum simulation.
  const stiffness = 70 + (idx % 3) * 25; // 70, 95, 120
  const damping = 12 + (idx % 2) * 4;     // 12, 16
  const mass = 0.8 + (idx % 3) * 0.2;     // 0.8, 1.0, 1.2

  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness,
    damping,
    mass
  });

  // Map scroll velocity to rotation degrees (-10 to 10 degrees).
  // Negative velocity (scrolling up) tilts card down/left, positive tilts it up/right.
  const rotate = useTransform(smoothVelocity, [-1500, 1500], [-10, 10]);

  return (
    <div className="relative group">
      
      {/* Timeline Spine Anchor Node */}
      <div className="absolute -left-[49px] top-1 w-4 h-4 rounded-full bg-neutral-950 border-2 border-neutral-800 group-hover:border-blue-400 group-hover:shadow-[0_0_8px_#3b82f6] transition-all duration-300 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-blue-400 transition-colors duration-300" />
      </div>

      {/* Horizontal Hanger Wire */}
      <div className="absolute -left-[35px] top-[9px] w-[35px] h-[1px] border-t border-dashed border-neutral-700 group-hover:border-blue-500/40 transition-colors duration-300" />

      {/* Hanging Clip at top center of card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[15px] z-30 flex flex-col items-center pointer-events-none">
        <div className="w-6 h-3 bg-gradient-to-b from-zinc-400 to-zinc-600 rounded-sm border border-zinc-700 shadow-md flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-zinc-950" />
        </div>
        <div className="w-[1px] h-3 bg-zinc-400" />
      </div>

      {/* Hanging Swing Card */}
      <motion.div
        className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#08090a]/85 backdrop-blur-md relative shadow-[0_15px_35px_rgba(0,0,0,0.5)] cursor-grab active:cursor-grabbing hover:border-blue-500/30 transition-all duration-300"
        style={{ transformOrigin: "top center", rotate }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {/* Card Hanger Hole cutout */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-neutral-950 border border-white/10 rounded-full" />

        {/* Card Header Info */}
        <div className="flex items-center justify-between mb-4 mt-2 flex-wrap gap-2">
          <span className="text-[9px] font-mono font-bold text-blue-400 uppercase tracking-widest px-2.5 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
            {type === "work" ? "EXPERIENCE" : "EDUCATION"}
          </span>
          <span className="text-[10px] font-mono text-neutral-400 font-semibold flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            {item.date}
          </span>
        </div>

        {/* Job / Degree Title */}
        <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider block mb-1">
          {item.title}
        </span>
        {/* Institution / Company */}
        <h4 className="text-lg font-bold text-white mb-2 leading-tight font-heading">
          {item.subtitle}
        </h4>

        {/* Location metadata */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono font-semibold mb-4">
          <MapPin className="w-3.5 h-3.5 text-blue-400" />
          <span>{item.location}</span>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-neutral-200 font-medium leading-relaxed mb-4">
            {item.description}
          </p>
        )}

        {/* Website Link (Maintains SRM and Sudharsanam Vidyaashram links) */}
        {item.website && (
          <div className="border-t border-white/5 pt-4 mt-4 flex justify-end">
            <a
              href={item.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono font-bold text-blue-400 hover:text-cyan-300 flex items-center gap-1 transition-colors group"
            >
              VISIT WEBSITE
              <ExternalLink className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
}

function TimelineColumn({
  title,
  icon,
  items,
  type,
  scrollY
}: {
  title: string;
  icon: React.ReactNode;
  items: TimelineItem[];
  type: "work" | "education";
  scrollY: any;
}) {
  return (
    <div className="flex flex-col w-full relative">
      {/* Column Title */}
      <div className="flex items-center gap-3 mb-12 border-b border-white/5 pb-4 z-20">
        <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          {icon}
        </div>
        <h3 className="text-xl font-bold tracking-wider text-white uppercase font-heading">
          {title}
        </h3>
      </div>

      {/* Ladder Spine (Vertical Timeline Line) */}
      <div className="absolute left-[20px] top-20 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/40 via-cyan-400/20 to-transparent pointer-events-none z-10" />

      {/* Timeline items */}
      <div className="relative ml-5 pl-10 space-y-16 z-20">
        {items.map((item, idx) => (
          <TimelineCard
            key={idx}
            item={item}
            idx={idx}
            type={type}
            scrollY={scrollY}
          />
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  return (
    <section ref={containerRef} id="experience" className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5 overflow-hidden">
      {/* Cinematic radial glows */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20 md:mb-24 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center justify-center md:justify-start gap-2">
            <Terminal className="w-4 h-4" /> [ TIMELINE & ROLES ]
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase mt-4 font-heading">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">& Education</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-neutral-400 max-w-xl font-medium">
            Chronological records of my professional history, open-source work, and academic degrees. Cards sway dynamically as you scroll.
          </p>
        </div>

        {/* Double column layout (Experience on left, Education on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 relative">
          {/* Divider between columns - hidden on mobile */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden lg:block" />

          {/* Experience Column */}
          <TimelineColumn
            title="Experience & Leadership"
            icon={<Briefcase className="w-5 h-5" />}
            items={EXPERIENCE_ITEMS}
            type="work"
            scrollY={scrollY}
          />

          {/* Education Column */}
          <TimelineColumn
            title="Education"
            icon={<GraduationCap className="w-5 h-5" />}
            items={EDUCATION_ITEMS}
            type="education"
            scrollY={scrollY}
          />
        </div>
      </div>
    </section>
  );
}
