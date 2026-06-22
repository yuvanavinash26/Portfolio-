"use client";

import { useState, useEffect } from "react";
import { Terminal, Mail, MapPin, ArrowUp } from "lucide-react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface NavLinkItem {
  name: string;
  href: string;
}

const navLinks: NavLinkItem[] = [
  { name: "home", href: "#home" },
  { name: "about", href: "#about" },
  { name: "skills", href: "#skills" },
  { name: "timeline", href: "#experience" },
  { name: "projects", href: "#hackathons" },
  { name: "github", href: "#github" },
  { name: "certifications", href: "#certifications" },
  { name: "contact", href: "#contact" },
];

export default function Footer() {
  const [time, setTime] = useState("");
  const [cpuLoad, setCpuLoad] = useState(12);

  // Keep Chennai timezone clock updated
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Soft fluctuate CPU Load mock to make page feel alive
  useEffect(() => {
    const cpuInterval = setInterval(() => {
      setCpuLoad(prev => {
        const delta = Math.floor(Math.random() * 5) - 2; // -2 to +2
        const next = prev + delta;
        return next > 3 && next < 25 ? next : prev;
      });
    }, 3000);
    return () => clearInterval(cpuInterval);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    
    (window as any).isNavigating = true;
    
    const onScrollComplete = () => {
      (window as any).isNavigating = false;
      window.dispatchEvent(new Event("scroll-nav-complete"));
      window.dispatchEvent(new Event("scroll")); // sync scrollspy
    };

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(onScrollComplete, 850);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(onScrollComplete, 850);
      }
    }
  };

  return (
    <footer className="relative bg-[#020504] border-t border-white/[0.04] py-10 px-6 md:px-12 z-20 overflow-hidden font-mono">
      {/* Cyber Grid Background Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Laser horizontal divider line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        {/* Corner Cyber HUD Brackets */}
        <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-emerald-500/20 pointer-events-none" />
        <div className="absolute -top-4 -right-4 w-4 h-4 border-t border-r border-emerald-500/20 pointer-events-none" />
        <div className="absolute -bottom-4 -left-4 w-4 h-4 border-b border-l border-emerald-500/20 pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-emerald-500/20 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pb-8 border-b border-white/[0.05]">
          
          {/* COLUMN 1: Profile & System Logs */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-extrabold tracking-widest text-white uppercase font-heading">
                YUVAN<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">AVINASH</span>
              </h3>
              <p className="text-[9px] text-neutral-600 mt-0.5 uppercase tracking-widest">
                [ Creative Developer ]
              </p>
            </div>

            {/* Simulated System Console Log */}
            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-[#070e0a]/50 text-[10px] text-neutral-500 leading-normal font-mono relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300">
              <div className="absolute top-1 right-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[8px] text-emerald-500/60 font-bold uppercase tracking-widest">MONITOR</span>
              </div>
              <div className="space-y-1">
                <div><span className="text-emerald-700">user:</span> guest@client</div>
                <div><span className="text-emerald-700">ip:</span> 127.0.0.1 (dhcp)</div>
                <div><span className="text-emerald-700">latency:</span> <span className="text-cyan-500">14ms</span></div>
                <div><span className="text-emerald-700">engine:</span> next.js v14.2</div>
                <div><span className="text-emerald-700">cpu_mock:</span> <span className="text-amber-500">{cpuLoad}%</span></div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: Site Directory Map */}
          <div className="space-y-3">
            <h4 className="text-[9px] text-neutral-600 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <span className="text-emerald-500">▶</span> cat sitemap.json
            </h4>
            <ul className="grid grid-cols-2 gap-y-1.5 text-[11px]">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group flex items-center gap-1 text-neutral-400 hover:text-emerald-400 transition-colors py-0.5"
                  >
                    <span className="text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">/</span>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Contact Channels */}
          <div className="space-y-3">
            <h4 className="text-[9px] text-neutral-600 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <span className="text-cyan-400">▶</span> cat contacts.txt
            </h4>
            <div className="space-y-2 text-[11px] text-neutral-400">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=yuvanavinash26@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-cyan-300 transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-500 group-hover:text-cyan-400" />
                <span className="break-all">yuvanavinash26@gmail.com</span>
              </a>

              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Chennai, TN, India</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Live Telemetry Dashboard */}
          <div className="space-y-3">
            <h4 className="text-[9px] text-neutral-600 uppercase tracking-widest font-bold flex items-center gap-1.5">
              <span className="text-emerald-500">▶</span> cat telemetry.ini
            </h4>
            <div className="space-y-2 text-[11px] text-neutral-400">
              {/* Clock */}
              <div className="flex items-center justify-between border-b border-white/[0.03] pb-2">
                <span className="text-neutral-500">LOCAL_TIME (IST):</span>
                <span className="font-bold text-white tracking-widest bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">
                  {time || "00:00:00 AM"}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between border-b border-white/[0.03] pb-2">
                <span className="text-neutral-500">SYSTEM_STATUS:</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-ping" />
                  OPERATIONAL
                </span>
              </div>

              {/* Coffee state */}
              <div className="flex items-center justify-between border-b border-white/[0.03] pb-2">
                <span className="text-neutral-500">CREATIVE_FLOW:</span>
                <span className="text-cyan-400 font-bold">ACTIVE = TRUE</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright, Socials, & Scroll Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-[10px] text-neutral-600">
          
          {/* Copyright signature */}
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Yuvan Avinash.</span>
            <span className="text-neutral-800">|</span>
            <span className="text-neutral-500 uppercase tracking-widest hover:text-emerald-400 cursor-default transition-colors">
              crafted with logic
            </span>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/yuvan-avinash"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-cyan-400 transition-colors p-1"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/yuvanavinash26"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-emerald-400 transition-colors p-1"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/yuvan__nash_?igsh=MTRld2Y0NWU5Y2J6Nw=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-rose-400 transition-colors p-1"
              aria-label="Instagram Profile"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

          {/* CLI execution scroll top */}
          <div>
            <button
              onClick={() => {
                (window as any).isNavigating = true;
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                  (window as any).isNavigating = false;
                  window.dispatchEvent(new Event("scroll-nav-complete"));
                  window.dispatchEvent(new Event("scroll"));
                }, 850);
              }}
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/[0.07] bg-white/[0.02] hover:bg-emerald-500/[0.06] hover:border-emerald-500/30 text-neutral-400 hover:text-emerald-400 transition-all duration-250 cursor-pointer"
            >
              <ArrowUp className="w-3 h-3 text-emerald-500 animate-bounce group-hover:text-emerald-400 transition-colors" />
              <span>[run] scroll_top.sh</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}
