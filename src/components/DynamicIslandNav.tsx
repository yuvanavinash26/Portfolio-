"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, FolderGit2, Mail, Layers, Award } from "lucide-react";

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
  { label: "Hackathons", href: "#hackathons", icon: <Award className="w-4 h-4" /> },
  { label: "Projects", href: "#projects", icon: <FolderGit2 className="w-4 h-4" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> },
];

export default function DynamicIslandNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll and active sections
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const scrollPosition = window.scrollY + 200; // Offset
      
      const sections = ["home", "about", "skills", "experience", "hackathons", "projects", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
      
      if (window.scrollY < 50) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    
    // Flag to stop canvas frame updates during smooth scroll
    (window as unknown as { isNavigating: boolean }).isNavigating = true;
    
    const onScrollComplete = () => {
      (window as unknown as { isNavigating: boolean }).isNavigating = false;
      window.dispatchEvent(new Event("scroll-nav-complete"));
      setActiveSection(targetId);
    };

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(onScrollComplete, 800);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(onScrollComplete, 800);
      }
    }
  };

  return (
    <motion.div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[92%] max-w-[680px]"
      initial={{ y: -100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`glass-panel flex items-center justify-between overflow-hidden shadow-2xl transition-all duration-300 ${
          isScrolled 
            ? "px-4 py-2.5 rounded-full bg-black/85 border-blue-500/25 shadow-[0_0_20px_rgba(0,102,255,0.15)]" 
            : "px-6 py-3 rounded-full bg-white/5 border-white/10"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Dynamic Island Indicator Dot */}
          <motion.div 
            layoutId="island-dot"
            className="w-2.5 h-2.5 bg-blue-500 rounded-full mr-2 shadow-[0_0_8px_#0066ff]"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
          
          <div className="flex items-center gap-1 md:gap-2 flex-grow justify-around">
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-[9px] md:text-xs font-bold tracking-wide uppercase px-2.5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                    isActive ? "text-white" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-blue-600/10 border border-blue-500/20 rounded-full z-[-1] shadow-[0_0_8px_rgba(0,102,255,0.1)]"
                      transition={{ type: "spring", stiffness: 250, damping: 25 }}
                    />
                  )}
                  <span className={`${isScrolled ? "hidden" : "hidden md:inline"}`}>{item.icon}</span>
                  <span className={isScrolled ? "text-[8px] md:text-[10px]" : ""}>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
