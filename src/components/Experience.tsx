"use client";

import { Briefcase, GraduationCap, Calendar, MapPin, Terminal } from "lucide-react";

interface TimelineItem {
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description?: string;
}

const EXPERIENCE_ITEMS: TimelineItem[] = [
  {
    title: "Open Source Contributor",
    subtitle: "GirlScript Summer of Code",
    date: "May 2026 - Present",
    location: "Global Collaboration",
    description: "Contributing to community-driven open-source projects, fixing issues, improving documentation, and collaborating with developers worldwide."
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
    description: "Relevant Interests: Software Engineering, Web Development, Artificial Intelligence, Automation, System Design."
  },
  {
    title: "Sudharsanam Vidyaashram",
    subtitle: "Higher Secondary & Secondary Education",
    date: "2019 - 2025",
    location: "Chennai, India",
    description: "Achievements: Scored 95% in Class 10 Board Examinations, Received Highest Academic Honors, Participated in Technical and Leadership Activities."
  }
];

function TimelineColumn({ title, icon, items }: { title: string; icon: React.ReactNode; items: TimelineItem[] }) {
  return (
    <div className="flex flex-col w-full">
      {/* Column Title */}
      <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-4">
        <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
          {icon}
        </div>
        <h3 className="text-xl font-bold tracking-wider text-white uppercase font-heading">
          {title}
        </h3>
      </div>

      {/* Timeline items */}
      <div className="relative border-l border-blue-500/20 ml-3 pl-8 space-y-12">
        {items.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-[#000000] border-2 border-neutral-800 group-hover:border-blue-500 transition-colors duration-300 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-neutral-800 group-hover:bg-blue-500 transition-colors duration-300" />
            </div>

            {/* Content card */}
            <div className="glass-panel p-6 rounded-xl hover:border-blue-500/30 transition-all duration-300 bg-black/40">
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider block mb-1">
                {item.title}
              </span>
              <h4 className="text-lg font-bold text-white mb-2 leading-tight font-heading">
                {item.subtitle}
              </h4>

              {/* Metadata */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-300 font-mono font-semibold mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>{item.location}</span>
                </div>
              </div>

              {item.description && (
                <p className="text-sm text-neutral-200 font-medium leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-1/4 right-1/2 translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center justify-center md:justify-start gap-2">
            <Terminal className="w-4 h-4" /> [ TIMELINE & ROLES ]
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase mt-4 font-heading">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">& Education</span>
          </h2>
        </div>

        {/* Double column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12">
          {/* Experience Column */}
          <TimelineColumn
            title="Experience & Leadership"
            icon={<Briefcase className="w-5 h-5" />}
            items={EXPERIENCE_ITEMS}
          />

          {/* Education Column */}
          <TimelineColumn
            title="Education"
            icon={<GraduationCap className="w-5 h-5" />}
            items={EDUCATION_ITEMS}
          />
        </div>
      </div>
    </section>
  );
}
