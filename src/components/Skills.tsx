"use client";

import { motion } from "framer-motion";
import { Layout, Database, Cpu, Wrench, Settings, BookOpen, Terminal } from "lucide-react";

interface SkillCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend Engineering",
    description: "Creating responsive, interactive, and high-performance user interfaces.",
    icon: <Layout className="w-5 h-5 text-blue-400" />,
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"]
  },
  {
    title: "Backend Development",
    description: "Constructing robust server structures, web logic, and database schemas.",
    icon: <Database className="w-5 h-5 text-blue-400" />,
    skills: ["Python", "Node.js", "REST APIs"]
  },
  {
    title: "Programming Languages",
    description: "Core scripting and compiler languages used for development and automation.",
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
    skills: ["Python", "JavaScript"]
  },
  {
    title: "Developer Tools",
    description: "Tools and software used to optimize development workflow and versioning.",
    icon: <Wrench className="w-5 h-5 text-blue-400" />,
    skills: ["Git", "GitHub", "VS Code", "Postman"]
  },
  {
    title: "Automation Technologies",
    description: "Building scripts and workflows to automate repetitive tasks and save human hours.",
    icon: <Settings className="w-5 h-5 text-blue-400" />,
    skills: ["RPA", "Workflow Automation"]
  },
  {
    title: "Currently Learning",
    description: "Emerging domains and technologies being researched and adopted.",
    icon: <BookOpen className="w-5 h-5 text-blue-400" />,
    skills: ["AI & Machine Learning", "System Design", "Cloud Technologies", "Advanced Full-Stack"]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center justify-center md:justify-start gap-2">
            <Terminal className="w-4 h-4" /> [ SKILLS & CAPABILITIES ]
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase mt-4 font-heading">
            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Ecosystem</span>
          </h2>
          <p className="mt-6 text-sm md:text-base text-neutral-200 max-w-2xl font-medium leading-relaxed">
            A comprehensive overview of my technological capabilities, tools, and current fields of study.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-2xl glass-panel p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between group bg-black/30"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-xl group-hover:border-blue-500/40 transition-colors duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-white font-heading">
                    {category.title}
                  </h3>
                </div>

                <p className="text-neutral-300 font-medium text-xs md:text-sm leading-relaxed mb-6">
                  {category.description}
                </p>
              </div>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] md:text-xs font-mono font-bold px-3 py-1.5 bg-white/5 border border-white/5 rounded-full text-neutral-200 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
