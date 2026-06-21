"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GitHubHeatmap from "@/components/GitHubHeatmap";

export default function GitHubPage() {
  return (
    <main className="relative min-h-screen bg-[#060608] text-white overflow-hidden py-12 md:py-20 flex flex-col justify-start">
      {/* Background glowing gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,58,138,0.25),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(8,47,73,0.2),transparent_60%)] pointer-events-none" />

      {/* Floating back button */}
      <div className="max-w-4xl mx-auto w-full px-6 mb-8 relative z-30">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 hover:text-white px-4 py-2 border border-white/5 bg-white/5 rounded-full backdrop-blur-md transition-all hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>

      {/* GitHub Heatmap component */}
      <div className="relative z-20 flex-grow">
        <GitHubHeatmap />
      </div>
    </main>
  );
}
