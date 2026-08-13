"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail, Layers, BadgeCheck, FolderGit2, GitBranch } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home", icon: <Home className="w-4 h-4" /> },
  { label: "About", href: "#about", icon: <User className="w-4 h-4" /> },
  { label: "Skills", href: "#skills", icon: <Layers className="w-4 h-4" /> },
  { label: "Timeline", href: "#experience", icon: <Briefcase className="w-4 h-4" /> },
  { label: "Projects", href: "#hackathons", icon: <FolderGit2 className="w-4 h-4" /> },
  { label: "GitHub", href: "#github", icon: <GitBranch className="w-4 h-4" /> },
  { label: "Certifications", href: "#certifications", icon: <BadgeCheck className="w-4 h-4" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> },
];

interface SectionTheme {
  bg: string;
  border: string;
  shadow: string;
  activeText: string;
  bgGlow: string;
  dotColor: string;
}

const SECTION_THEMES: Record<string, SectionTheme> = {
  home: {
    bg: "from-black/95 via-blue-950/20 to-black/95",
    border: "border-blue-500/25",
    shadow: "shadow-[0_0_25px_rgba(59,130,246,0.18)]",
    activeText: "text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.55)]",
    bgGlow: "bg-blue-500/10 border-cyan-400/20 shadow-[0_0_10px_rgba(34,211,238,0.15)]",
    dotColor: "#3b82f6",
  },
  about: {
    bg: "from-black/95 via-indigo-950/20 to-black/95",
    border: "border-indigo-500/25",
    shadow: "shadow-[0_0_25px_rgba(99,102,241,0.18)]",
    activeText: "text-indigo-300 drop-shadow-[0_0_8px_rgba(165,180,252,0.55)]",
    bgGlow: "bg-indigo-500/10 border-indigo-400/20 shadow-[0_0_10px_rgba(165,180,252,0.15)]",
    dotColor: "#6366f1",
  },
  skills: {
    bg: "from-black/95 via-purple-950/20 to-black/95",
    border: "border-purple-500/25",
    shadow: "shadow-[0_0_25px_rgba(168,85,247,0.18)]",
    activeText: "text-purple-300 drop-shadow-[0_0_8px_rgba(216,180,254,0.55)]",
    bgGlow: "bg-purple-500/10 border-purple-400/20 shadow-[0_0_10px_rgba(216,180,254,0.15)]",
    dotColor: "#a855f7",
  },
  experience: {
    bg: "from-black/95 via-teal-950/20 to-black/95",
    border: "border-teal-500/25",
    shadow: "shadow-[0_0_25px_rgba(20,184,166,0.18)]",
    activeText: "text-teal-300 drop-shadow-[0_0_8px_rgba(115,250,229,0.55)]",
    bgGlow: "bg-teal-500/10 border-teal-400/20 shadow-[0_0_10px_rgba(115,250,229,0.15)]",
    dotColor: "#14b8a6",
  },
  hackathons: {
    bg: "from-black/95 via-amber-950/20 to-black/95",
    border: "border-amber-500/25",
    shadow: "shadow-[0_0_25px_rgba(245,158,11,0.18)]",
    activeText: "text-amber-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.55)]",
    bgGlow: "bg-amber-500/10 border-amber-400/20 shadow-[0_0_10px_rgba(253,224,71,0.15)]",
    dotColor: "#f59e0b",
  },
  certifications: {
    bg: "from-black/95 via-rose-950/20 to-black/95",
    border: "border-rose-500/25",
    shadow: "shadow-[0_0_25px_rgba(244,63,94,0.18)]",
    activeText: "text-rose-300 drop-shadow-[0_0_8px_rgba(253,164,186,0.55)]",
    bgGlow: "bg-rose-500/10 border-rose-400/20 shadow-[0_0_10px_rgba(253,164,186,0.15)]",
    dotColor: "#f43f5e",
  },
  github: {
    bg: "from-black/95 via-violet-950/20 to-black/95",
    border: "border-violet-500/25",
    shadow: "shadow-[0_0_25px_rgba(139,92,246,0.18)]",
    activeText: "text-violet-300 drop-shadow-[0_0_8px_rgba(196,181,253,0.55)]",
    bgGlow: "bg-violet-500/10 border-violet-400/20 shadow-[0_0_10px_rgba(196,181,253,0.15)]",
    dotColor: "#8b5cf6",
  },
  contact: {
    bg: "from-black/95 via-emerald-950/20 to-black/95",
    border: "border-emerald-500/25",
    shadow: "shadow-[0_0_25px_rgba(16,185,129,0.18)]",
    activeText: "text-emerald-300 drop-shadow-[0_0_8px_rgba(110,231,183,0.55)]",
    bgGlow: "bg-emerald-500/10 border-emerald-400/20 shadow-[0_0_10px_rgba(110,231,183,0.15)]",
    dotColor: "#10b981",
  },
};

export default function DynamicIslandNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll and active sections
  useEffect(() => {
    // Detect initial section from URL hash
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      const sections = ["home", "about", "skills", "experience", "hackathons", "certifications", "github", "contact"];
      if (sections.includes(hashId)) {
        setActiveSection(hashId);
      }
    }

    const handleScroll = () => {
      // Ignore scroll spy tracking during programmatic clicks to prevent navbar flashing
      if ((window as unknown as { isNavigating: boolean }).isNavigating) {
        return;
      }

      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Viewport-relative active section detection (robust trigger point check)
      const sections = ["home", "about", "skills", "experience", "hackathons", "certifications", "github", "contact"];
      let currentSection = "home";
      let closestSection = "home";
      let closestDistance = Infinity;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Trigger line is 120px from top of viewport
          const triggerPoint = 120;

          // If the element spans across the trigger line, it is the active section
          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            currentSection = section;
            closestDistance = -1;
            break;
          }

          // Otherwise, find the section whose boundary is closest to the trigger line
          const distance = Math.abs(rect.top - triggerPoint);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestSection = section;
          }
        }
      }

      if (closestDistance !== -1) {
        currentSection = closestSection;
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    setActiveSection(targetId); // Update active section immediately

    // Flag to stop canvas frame updates during smooth scroll
    (window as unknown as { isNavigating: boolean }).isNavigating = true;

    const onScrollComplete = () => {
      (window as unknown as { isNavigating: boolean }).isNavigating = false;
      window.dispatchEvent(new Event("scroll-nav-complete"));
      window.dispatchEvent(new Event("scroll")); // Trigger scroll-spy sync at destination
      setActiveSection(targetId);
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

  const theme = SECTION_THEMES[activeSection] || SECTION_THEMES.home;

  return (
    <motion.div
      id="dynamic-island-nav"
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[95vw] sm:w-[92%] max-w-[760px]"
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        className={`glass-panel flex items-center justify-between overflow-hidden shadow-2xl transition-all duration-700 ${theme.shadow} ${theme.border} ${isScrolled
          ? `px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r ${theme.bg}`
          : "px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full bg-white/5 border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.02)]"
          }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Dynamic Island Indicator Dot */}
          <motion.div
            layoutId="island-dot"
            className="w-2 h-2 rounded-full mr-2 flex-shrink-0 transition-all duration-700"
            style={{ backgroundColor: theme.dotColor }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />

          <div className="flex items-center gap-[2px] xs:gap-1 sm:gap-2 flex-grow justify-around pl-0.5 sm:pl-2">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] md:text-xs font-mono font-bold tracking-tighter xs:tracking-normal sm:tracking-wide uppercase px-1.5 py-1 sm:px-2.5 sm:py-1.5 rounded-full transition-all duration-300 flex items-center gap-1 sm:gap-1.5 ${isActive
                    ? theme.activeText
                    : "text-neutral-300 hover:text-white"
                    }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-bg"
                      className={`absolute inset-0 border rounded-full z-[-1] transition-all duration-700 ${theme.bgGlow}`}
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    />
                  )}
                  {/* Hide icons on mobile completely to prevent layout overflow */}
                  <span className={`hidden sm:inline-block opacity-80 ${isScrolled ? "sm:hidden" : ""}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
