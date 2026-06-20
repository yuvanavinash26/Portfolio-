"use client";

import { useState } from "react";
import { GitPullRequest, GitFork, GitCommit, ShieldAlert } from "lucide-react";

export default function GitHubHeatmap() {
  const [tooltip, setTooltip] = useState<string | null>(null);

  // Generate mock contribution grid data (7 rows x 32 columns)
  const rows = 7;
  const cols = 32;
  const totalCells = rows * cols;



  // Pre-generate grid cells with random levels of commits (0 to 4)
  const gridCells = Array.from({ length: totalCells }).map((_, idx) => {
    // Generate dates backwards from today
    const date = new Date();
    date.setDate(date.getDate() - (totalCells - idx));
    
    // Higher commits on midweek, lower on weekends
    const day = date.getDay();
    let level = 0;
    if (day > 0 && day < 6) {
      level = Math.floor(Math.random() * 5); // 0-4
    } else {
      level = Math.floor(Math.random() * 2); // 0-1
    }

    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    return {
      level,
      date: dateStr,
      commits: level === 0 ? "No contributions" : `${level * 2 + 1} contributions`
    };
  });

  return (
    <section id="github" className="relative bg-transparent px-6 py-12 md:py-24 z-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
          <GitPullRequest className="w-4 h-4" /> [ GITHUB // CONCURRENCY ]
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white uppercase mb-8 font-heading">
          Contributions <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Heatmap</span>
        </h2>

        {/* Heatmap Panel Container */}
        <div className="glass-panel p-6 md:p-8 rounded-2xl border border-blue-500/20 bg-black/40 glow-blue">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6 border-b border-white/5 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                <GitCommit className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">430+ Commits</div>
                <div className="text-[9px] font-mono text-neutral-400 uppercase">Past 12 Months</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                <GitFork className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">12 Repos</div>
                <div className="text-[9px] font-mono text-neutral-400 uppercase">Open Source</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-xl text-blue-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">99.8%</div>
                <div className="text-[9px] font-mono text-neutral-400 uppercase">Build Uptime</div>
              </div>
            </div>
          </div>

          {/* Grid Render */}
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-blue-600">
              {/* Day Labels */}
              <div className="flex flex-col justify-between text-[9px] font-mono text-neutral-400 pr-1 select-none pt-1">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Matrix */}
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 flex-grow">
                {gridCells.map((cell, idx) => {
                  let bgClass = "bg-neutral-900"; // level 0
                  if (cell.level === 1) bgClass = "bg-blue-950/60 border border-blue-950";
                  if (cell.level === 2) bgClass = "bg-blue-900/80 border border-blue-900";
                  if (cell.level === 3) bgClass = "bg-blue-600 border border-blue-500/30";
                  if (cell.level === 4) bgClass = "bg-cyan-400 shadow-[0_0_8px_#00d2ff]";

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setTooltip(`${cell.commits} on ${cell.date}`)}
                      onMouseLeave={() => setTooltip(null)}
                      className={`w-3.5 h-3.5 rounded-sm transition-all duration-150 cursor-pointer hover:scale-125 hover:z-10 ${bgClass}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-end gap-1.5 text-[9px] font-mono text-neutral-400 mt-2 select-none">
              <span>Less</span>
              <div className="w-2.5 h-2.5 bg-neutral-900 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-blue-900 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-sm" />
              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-sm" />
              <span>More</span>
            </div>

            {/* Hover Tooltip Overlay */}
            {tooltip && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-blue-950 border border-blue-500/30 text-white font-mono text-[10px] px-3 py-1.5 rounded-lg shadow-xl z-20 transition-all pointer-events-none">
                {tooltip}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
