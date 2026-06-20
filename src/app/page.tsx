"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Preloader from "@/components/Preloader";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import DynamicIslandNav from "@/components/DynamicIslandNav";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import AboutMe from "@/components/AboutMe";
import Hackathons from "@/components/Hackathons";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import BeyondCoding from "@/components/BeyondCoding";
import Contact from "@/components/Contact";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor the scroll progress of the entire page
  const { scrollYProgress } = useScroll();

  // Color 1: Base metallic tone for liquid chrome look
  const color1 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.75, 1.0],
    ["#000000", "#01010a", "#020412", "#00081a", "#000000"]
  );

  // Color 2: Highlight metallic tone for liquid chrome look
  const color2 = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.75, 1.0],
    ["#030718", "#06133a", "#0c1b4b", "#031d4d", "#02071a"]
  );

  // Combine into a premium liquid chrome gradient
  const background = useMotionTemplate`linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;

  return (
    <motion.main 
      style={{ background }}
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
            onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
        <AboutMe />
        <Skills />
        <Experience />
        <Hackathons />
        <InteractiveTerminal />
        <GitHubHeatmap />
        <BeyondCoding />
        <Projects />
        <Contact />
      </div>
    </motion.main>
  );
}

