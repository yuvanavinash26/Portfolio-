"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Certifications from "@/components/Certifications";
import DynamicIslandNav from "@/components/DynamicIslandNav";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import AboutMe from "@/components/AboutMe";
import Hackathons from "@/components/Hackathons";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ResumeModal from "@/components/ResumeModal";

const SECTION_BG_COLORS: Record<string, { color1: string; color2: string }> = {
  home: { color1: "#000000", color2: "#010a24" },
  about: { color1: "#010105", color2: "#070526" },
  skills: { color1: "#020106", color2: "#14052b" },
  experience: { color1: "#000302", color2: "#03201b" },
  hackathons: { color1: "#030200", color2: "#221503" },
  github: { color1: "#010006", color2: "#18052f" },
  certifications: { color1: "#040001", color2: "#25050f" },
  contact: { color1: "#000201", color2: "#032012" },
};

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  // Minimum 3-second preloader display
  const framesReady = useRef(false);
  const timerReady = useRef(false);

  const tryDismiss = useCallback(() => {
    if (framesReady.current && timerReady.current) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      timerReady.current = true;
      tryDismiss();
    }, 3500);
    return () => clearTimeout(timer);
  }, [tryDismiss]);

  // Always scroll to top on page load / reload
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Remove any hash so the browser doesn't auto-scroll to a section
      if (window.location.hash) {
        history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, []);

  // Track active section to dynamically shift page background colors
  useEffect(() => {
    const handleScroll = () => {
      if ((window as any).isNavigating) return;

      const sections = ["home", "about", "skills", "experience", "hackathons", "github", "certifications", "contact"];
      let currentSection = "home";
      let closestSection = "home";
      let closestDistance = Infinity;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          const triggerPoint = 160;

          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            currentSection = section;
            closestDistance = -1;
            break;
          }

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
    window.addEventListener("scroll-nav-complete", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll-nav-complete", handleScroll);
    };
  }, []);

  const activeColors = SECTION_BG_COLORS[activeSection] || SECTION_BG_COLORS.home;

  return (
    <motion.main
      animate={{
        "--bg-color-1": activeColors.color1,
        "--bg-color-2": activeColors.color2,
      } as any}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        background: "linear-gradient(135deg, var(--bg-color-1) 0%, var(--bg-color-2) 100%)"
      }}
      className="relative min-h-screen transition-colors duration-500"
    >
      {/* Premium Preloader overlay */}
      <Preloader progress={progress} isLoading={isLoading} />

      {/* Main Portfolio Sections */}
      <div className="relative">
        <DynamicIslandNav />
        <div id="home">
          <ScrollyCanvas
            onProgress={setProgress}
            onLoadingComplete={() => {
              framesReady.current = true;
              tryDismiss();
            }}
          />
        </div>
        <AboutMe />
        <Skills />
        <Experience />
        <Hackathons />
        <InteractiveTerminal />
        <GitHubHeatmap />
        <Certifications />
        <Contact />
        <Footer />
        <ResumeModal />
      </div>
    </motion.main>
  );
}
