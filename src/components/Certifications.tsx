"use client";

import { useRef, useState, useEffect } from "react";
import { Award, CheckCircle, Brain, Calendar, Shield, Layers } from "lucide-react";
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
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (isWalletOpen) {
        setIsWalletOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isWalletOpen]);

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

        {/* Centered Large Interactive Wallet Card Stack Section */}
        <div className="mt-28 pt-20 border-t border-white/5 flex flex-col items-center text-center space-y-12 w-full">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-[0.25em] flex items-center justify-center gap-2">
              <Layers className="w-4.5 h-4.5" /> [ INTERACTIVE BADGE WALLET ]
            </span>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-heading leading-none">
              Credential Card Wallet
            </h3>
            <p className="text-sm md:text-base text-neutral-300 font-medium leading-relaxed max-w-xl mx-auto">
              Hover or click the badge card sleeve below to expand your wallet. Click the cards to cycle through your verified badges.
            </p>
          </div>

          {/* Interactive Stack component centered */}
          <div className="w-full flex justify-center py-8">
            {(() => {
              const CARDS = [
                {
                  id: 0,
                  title: "AI Fundamentals",
                  issuer: "IBM_SKILLSBUILD",
                  credId: "0e5e8b99-4149-4bfd-90d6-46517f8310e2",
                  verifyLink: "https://www.credly.com/badges/0e5e8b99-4149-4bfd-90d6-46517f8310e2/public_url",
                  badgeImage: "/badges/ibm-ai-fundamentals.png",
                  bg: "bg-[#5B63E6]", // Royal Indigo/Blue (like top card in user's image)
                  textColor: "text-white",
                  iconColor: "text-orange-400",
                  dividerColor: "border-white/10",
                  labelColor: "text-white/60"
                },
                {
                  id: 1,
                  title: "AI Foundations",
                  issuer: "IBM_SKILLSBUILD",
                  credId: "adddc707-ce87-4640-904e-69294554705d",
                  verifyLink: "https://www.credly.com/badges/adddc707-ce87-4640-904e-69294554705d/public_url",
                  badgeImage: "/badges/ibm-ai-foundations.png",
                  bg: "bg-[#ffffff]", // Pristine White (like middle card in user's image)
                  textColor: "text-black",
                  iconColor: "text-blue-600",
                  dividerColor: "border-neutral-200",
                  labelColor: "text-neutral-500"
                },
                {
                  id: 2,
                  title: "Craft Precise Prompts",
                  issuer: "IBM_SKILLSBUILD",
                  credId: "f974e13d-1821-4e12-923e-45bff6a89a1a",
                  verifyLink: "https://www.credly.com/badges/f974e13d-1821-4e12-923e-45bff6a89a1a/public_url",
                  badgeImage: "/badges/ibm-prompt-engineering.png",
                  bg: "bg-[#db2777]", // Premium Deep Rose/Pink (matching prompt badge header)
                  textColor: "text-white",
                  iconColor: "text-pink-200",
                  dividerColor: "border-white/20",
                  labelColor: "text-white/60"
                },
                {
                  id: 3,
                  title: "Web Dev Fundamentals",
                  issuer: "IBM_SKILLSBUILD",
                  credId: "f59cb92a-5f76-4f3c-b651-9429320a6b15",
                  verifyLink: "https://www.credly.com/badges/f59cb92a-5f76-4f3c-b651-9429320a6b15/public_url",
                  badgeImage: "/badges/ibm-web-development-fundamentals.png",
                  bg: "bg-[#0b0c10]", // Sleek Matte Black (like bottom pocket sleeve in user's image)
                  textColor: "text-white",
                  iconColor: "text-cyan-300",
                  dividerColor: "border-white/10",
                  labelColor: "text-white/60"
                }
              ];

              return (
                <motion.div
                  initial="tucked"
                  whileHover="open"
                  animate={isWalletOpen ? "open" : "tucked"}
                  onClick={() => {
                    if (!isWalletOpen) {
                      setIsWalletOpen(true);
                    } else {
                      // Cycle card to the back when clicked in open state
                      setActiveCardIdx((prev) => (prev + 1) % CARDS.length);
                    }
                  }}
                  className="relative w-[320px] h-[380px] cursor-pointer select-none overflow-visible"
                >
                  {CARDS.map((card, i) => {
                    // Compute stacking order relative to the active card index
                    const relativeIndex = (i - activeCardIdx + CARDS.length) % CARDS.length;
                    const isTop = relativeIndex === 0;

                    // Tucked values
                    const tuckedY = 25 + i * 15;
                    const tuckedScale = 0.94 + i * 0.02;
                    const tuckedZIndex = i + 1;

                    // Open fanned-out values
                    const openY = isTop ? -160 : -45 - relativeIndex * 24;
                    const openScale = isTop ? 1.0 : 0.95 - relativeIndex * 0.03;
                    const openRotate = isTop ? 0 : (relativeIndex % 2 === 0 ? 1 : -1) * 3.5 * relativeIndex;
                    const openZIndex = isTop ? 6 : 6 - relativeIndex;

                    return (
                      <motion.div
                        key={card.id}
                        variants={{
                          tucked: { y: tuckedY, scale: tuckedScale, rotate: 0, zIndex: tuckedZIndex },
                          open: { y: openY, scale: openScale, rotate: openRotate, zIndex: openZIndex }
                        }}
                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                        className={`absolute inset-x-4 h-[210px] rounded-2xl ${card.bg} border border-white/10 p-5 flex items-center gap-4 ${card.textColor} shadow-2xl`}
                        style={{ pointerEvents: isWalletOpen && !isTop ? "none" : "auto" }}
                      >
                        {/* Left Side: Large Badge Image */}
                        <div className="w-[110px] h-[110px] rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden shrink-0 shadow-inner p-1 bg-neutral-900/10">
                          {card.badgeImage ? (
                            <img src={card.badgeImage} alt={card.title} className="w-full h-full object-contain" />
                          ) : (
                            <Award className={`w-14 h-14 ${card.iconColor}`} />
                          )}
                        </div>

                        {/* Right Side: Details Column */}
                        <div className="flex-1 flex flex-col justify-between h-[110px] min-w-0 text-left">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-[8px] font-mono opacity-80 uppercase tracking-widest">
                              <span className="truncate">{card.issuer}</span>
                              <Award className={`w-3 h-3 ${card.iconColor} shrink-0`} />
                            </div>
                            <h4 className="text-[12px] md:text-[13px] font-extrabold tracking-tight leading-tight uppercase font-heading line-clamp-2">
                              {card.title}
                            </h4>
                            <p className="text-[7px] font-mono opacity-65 font-semibold truncate">ID: {card.credId.length > 18 ? card.credId.substring(0, 18) + "..." : card.credId}</p>
                          </div>

                          <div className={`pt-2 border-t ${card.dividerColor} flex justify-between items-center text-[8px]`}>
                            <span className="font-mono opacity-60">// SECURE_VERIFY</span>
                            <a
                              href={card.verifyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.stopPropagation(); // Stop parent click events from triggering a card cycle
                              }}
                              className={`font-mono font-bold hover:underline transition-colors uppercase tracking-wider ${card.textColor}`}
                            >
                              Verify Badge ↗
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Pocket Cover Card: Black (Google) */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[210px] bg-[#0a0f1d] border border-white/5 p-5 flex items-center gap-4 z-10 shadow-[0_-15px_30px_rgba(0,0,0,0.85)]"
                    style={{
                      borderRadius: "28px 28px 32px 32px",
                      clipPath: "polygon(0 0, 30% 0, 35% 15px, 65% 15px, 70% 0, 100% 0, 100% 100%, 0 100%)"
                    }}
                  >
                    {/* Left Side: Large Icon Container */}
                    <div className="w-[110px] h-[110px] rounded-xl border border-white/5 bg-white/5 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                      <Award className="w-14 h-14 text-emerald-400" />
                    </div>

                    {/* Right Side: Details Column */}
                    <div className="flex-1 flex flex-col justify-between h-[110px] min-w-0 text-left text-white">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[8px] font-mono text-neutral-500 uppercase tracking-widest">
                          <span>GOOGLE_CAREER</span>
                          <Award className="w-3 h-3 text-emerald-400 shrink-0" />
                        </div>
                        <h4 className="text-[12px] md:text-[13px] font-extrabold tracking-tight leading-tight uppercase font-heading line-clamp-2">
                          Data Analytics
                        </h4>
                        <p className="text-[7px] font-mono text-neutral-500 font-semibold truncate">ID: GOOG-42219</p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[8px]">
                        <span className="text-neutral-500 font-mono">// GOOG_COMPLETION</span>
                        <a
                        href="https://www.credly.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider"
                      >
                        Verify Badge ↗
                      </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
