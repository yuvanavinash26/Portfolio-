"use client";

import { useRef } from "react";
import { Award, CheckCircle, Brain, Calendar, Shield } from "lucide-react";
import { motion } from "framer-motion";

const ACHIEVEMENTS = [
  "Highest Academic Honors Recipient",
  "Open Source Contributor @ GirlScript & Social Summer of Code",
  "Active Hackathon Participant & Dashboard Builder",
  "Development Domain Member at CodeKrafters",
  "Passionate Builder & Tech Innovator"
];

const ADDITIONAL_CERTS = [
  {
    title: "Artificial Intelligence Fundamentals",
    issuer: "IBM / Cognitive Class",
    date: "2024",
    skills: "Python, Neural Networks, Deep Learning Models"
  },
  {
    title: "Cloud Computing Architect",
    issuer: "AWS Academy",
    date: "2025",
    skills: "Cloud Architecture, EC2, S3, IAM Roles"
  },
  {
    title: "Machine Learning Foundations",
    issuer: "Stanford / Coursera",
    date: "2025",
    skills: "Supervised Learning, Regressions, Cost Functions"
  },
  {
    title: "Data Analytics Specialist",
    issuer: "Google Career Certificates",
    date: "2025",
    skills: "SQL, R Programming, Tableau Dashboards"
  },
  {
    title: "Advanced Full-Stack Engineering",
    issuer: "Meta / Coursera",
    date: "2026",
    skills: "React, Next.js, Django, Database Optimization"
  }
];

const BEYOND_CODING = [
  "Exploring startup ideas and business frameworks",
  "Learning emerging automation tools & RPA nodes",
  "Participating in collaborative tech webinars",
  "Contributing to community library structures",
  "Networking with developers, founders, & designers"
];

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative bg-[#040001] px-6 py-24 md:py-36 border-t border-white/5 z-20 overflow-hidden"
    >
      {/* Liquid Chrome keyframes injection */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes liquidChrome {
          0% { background-position: 0% 50%; filter: hue-rotate(0deg); }
          50% { background-position: 100% 50%; filter: hue-rotate(180deg); }
          100% { background-position: 0% 50%; filter: hue-rotate(360deg); }
        }
        .animate-liquid-chrome {
          background-size: 200% 200%;
          animation: liquidChrome 18s ease-in-out infinite;
        }
      `}} />

      {/* 1. Background Ambient Lights, Grid & Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Holographic Glowing Hues */}
        <div className="absolute left-[15%] top-[15%] w-[350px] h-[350px] md:w-[650px] md:h-[650px] bg-blue-500/10 rounded-full blur-[140px] mix-blend-screen z-0 animate-pulse" />
        <div className="absolute right-[20%] bottom-[15%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen z-0" />
        <div className="absolute left-[40%] bottom-[5%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-purple-500/5 rounded-full blur-[130px] mix-blend-screen z-0 animate-pulse" />
        
        {/* Liquid Chrome Iridescent Shifting Glow */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.14] mix-blend-screen pointer-events-none filter blur-[120px] animate-liquid-chrome"
          style={{
            background: "radial-gradient(circle at 20% 30%, #3b82f6 0%, #a855f7 35%, #d1d5db 70%, transparent 100%), radial-gradient(circle at 80% 70%, #00ffff 0%, #ff007f 40%, #4f46e5 75%, transparent 100%)",
          }}
        />

        {/* Retro tech grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none" 
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "36px 36px"
          }}
        />

        {/* Ambient Floating Light Particles */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => {
            const duration = 10 + (i % 4) * 3;
            const delay = (i % 3) * 2.5;
            const size = 3 + (i % 3) * 1.5;
            const left = 10 + (i * 7) % 80;
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-cyan-400/20"
                style={{
                  width: size,
                  height: size,
                  left: `${left}%`,
                  bottom: "-5%",
                  boxShadow: "0 0 10px rgba(34,211,238,0.2)",
                }}
                animate={{
                  y: ["0vh", "-110vh"],
                  x: ["0px", `${(i % 2 === 0 ? 1 : -1) * 20}px`, "0px"],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: delay,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 2. Content Layout */}
      <div className="max-w-6xl mx-auto relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Info Column (Sticky Column on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center gap-2">
              <Award className="w-4.5 h-4.5" /> [ CREDENTIALS ]
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white uppercase font-heading leading-tight">
              Credentials &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 animate-pulse">
                Learning
              </span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded" />
            <p className="text-sm text-neutral-300 font-medium leading-relaxed max-w-sm">
              Continuous upskilling log mapped to industry competencies. Ranging from Artificial Intelligence to cloud infrastructure and full-stack software architectures.
            </p>
          </div>

          {/* Right Side: Horizontal static cards layout (staggered fade-in on enter, hover effect only) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative w-full select-none pr-0">
            
            {/* Column 1: Key Achievements */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="w-full relative border border-white/[0.05] bg-[#07090c]/70 backdrop-blur-3xl rounded-[28px] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.85)] hover:border-emerald-500/30 hover:bg-[#07090c]/85 hover:shadow-[0_20px_50px_rgba(16,185,129,0.1)] transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[460px] md:min-h-[500px]"
            >
              {/* Top border shine */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">Achievements</h3>
                    <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">MILESTONES & HONORS</p>
                  </div>
                </div>
                
                <ul className="space-y-4">
                  {ACHIEVEMENTS.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-neutral-200 font-semibold leading-relaxed">
                      <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Column 2: Technical Certifications */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="w-full relative border border-white/[0.05] bg-[#07090c]/70 backdrop-blur-3xl rounded-[28px] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.85)] hover:border-cyan-500/35 hover:bg-[#07090c]/85 hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[460px] md:min-h-[500px]"
            >
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">Technical Certs</h3>
                    <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">VERIFIED PATHWAYS</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {ADDITIONAL_CERTS.map((cert, idx) => (
                    <div key={idx} className="border-b border-white/5 pb-3.5 last:border-0 last:pb-0 space-y-1.5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-xs text-white font-bold">{cert.title}</h4>
                          <p className="text-[9px] text-neutral-400 font-medium">
                            Issuer: <span className="text-neutral-200">{cert.issuer}</span>
                          </p>
                        </div>
                        <div className="text-neutral-500 flex items-center gap-1 text-[9px] font-mono shrink-0">
                          <Calendar className="w-3 h-3 text-neutral-600" />
                          {cert.date}
                        </div>
                      </div>
                      
                      <div className="text-[9px] font-mono text-neutral-400">
                        Skills: <span className="text-cyan-400 font-semibold">{cert.skills}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Column 3: Beyond Coding */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="w-full relative border border-white/[0.05] bg-[#07090c]/70 backdrop-blur-3xl rounded-[28px] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_30px_60px_rgba(0,0,0,0.85)] hover:border-indigo-500/35 hover:bg-[#07090c]/85 hover:shadow-[0_20px_50px_rgba(99,102,241,0.1)] transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[460px] md:min-h-[500px]"
            >
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">Beyond Coding</h3>
                    <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">INTEREST MATRIX</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {BEYOND_CODING.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-neutral-200 font-semibold leading-relaxed">
                      <span className="text-indigo-400 font-bold font-mono shrink-0 mt-0.5">#0{idx + 1}</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
