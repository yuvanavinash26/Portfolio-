"use client";

import { motion } from "framer-motion";
import { Award, Sparkles, BookOpen, CheckCircle, Brain } from "lucide-react";

export default function BeyondCoding() {
  const achievements = [
    "Scored 95% in Class 10 Board Examinations",
    "Highest Academic Honors Recipient",
    "Open Source Contributor @ GirlScript & Social Summer of Code",
    "Active Hackathon Participant & Dashboard Builder",
    "Development Domain Member at CodeKrafters",
    "Passionate Builder & Tech Innovator"
  ];

  const certifications = [
    { title: "Artificial Intelligence Fundamentals", status: "Active" },
    { title: "Cloud Computing Architect", status: "In Progress" },
    { title: "Machine Learning Foundations", status: "Future Objective" },
    { title: "Data Analytics Specialist", status: "Future Objective" },
    { title: "Advanced Full-Stack Engineering", status: "Future Objective" }
  ];

  const funFacts = [
    "Exploring startup ideas and business frameworks",
    "Learning emerging automation tools & RPA nodes",
    "Participating in collaborative tech webinars",
    "Contributing to community library structures",
    "Networking with developers, founders, & designers"
  ];

  return (
    <section id="beyond" className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-4 h-4" /> [ BEYOND THE TERMINAL // CREDENTIALS ]
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase mt-4 font-heading">
            Credentials <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">& Insights</span>
          </h2>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-panel p-8 rounded-2xl border border-white/5 bg-black/40 hover:border-blue-500/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Key Achievements</h3>
              </div>
              <ul className="space-y-4">
                {achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-200 font-semibold leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 2: Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel p-8 rounded-2xl border border-white/5 bg-black/40 hover:border-blue-500/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Certifications</h3>
              </div>
              <ul className="space-y-4">
                {certifications.map((cert, idx) => (
                  <li key={idx} className="flex flex-col gap-1 border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-xs md:text-sm text-white font-bold">{cert.title}</span>
                    <span className={`text-[10px] font-mono font-bold uppercase ${
                      cert.status === "Active"
                        ? "text-emerald-400"
                        : cert.status === "In Progress"
                        ? "text-blue-400"
                        : "text-neutral-500"
                    }`}>
                      {cert.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Column 3: Fun Facts / Beyond Coding */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-8 rounded-2xl border border-white/5 bg-black/40 hover:border-blue-500/25 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Beyond Coding</h3>
              </div>
              <ul className="space-y-4">
                {funFacts.map((fact, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-200 font-semibold leading-relaxed">
                    <span className="text-blue-400 font-bold font-mono">#0{idx + 1}</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
