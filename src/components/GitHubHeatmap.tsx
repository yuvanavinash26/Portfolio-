"use client";

import { useState, useEffect } from "react";
import { GitPullRequest, GitFork, GitCommit, BookOpen, ExternalLink } from "lucide-react";

interface Repo {
  name: string;
  html_url: string;
  created_at: string;
  language: string | null;
}

interface ContributionCell {
  date: string;
  count: number;
  level: number;
  isCurrentYear: boolean;
  dayOfWeek: number;
  month: number;
}

interface MonthLabel {
  label: string;
  colIndex: number;
}

interface CommitActivity {
  repoName: string;
  count: number;
}

interface MonthActivity {
  monthName: string;
  monthNum: number;
  year: number;
  createdRepos: Repo[];
  commits: CommitActivity[];
}

export default function GitHubHeatmap() {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [showAllActivity, setShowAllActivity] = useState<boolean>(false);
  const PREVIEW_COUNT = 2;
  const [tooltip, setTooltip] = useState<string | null>(null);
  
  const [totalCommits, setTotalCommits] = useState<number>(40);
  const [publicRepos, setPublicRepos] = useState<number>(11);
  const [isLive, setIsLive] = useState<boolean>(false);

  const [allContributions, setAllContributions] = useState<{ date: string; count: number; level: number }[]>([]);
  const [reposList, setReposList] = useState<Repo[]>([]);

  useEffect(() => {
    async function fetchGitHubData() {
      let contributionsFetched = false;
      let reposFetched = false;

      try {
        const response = await fetch("https://github-contributions-api.jogruber.de/v4/yuvanavinash26");
        if (!response.ok) throw new Error("Contributions API failed");
        const data = await response.json();
        if (data && Array.isArray(data.contributions)) {
          setAllContributions(data.contributions);
          const allCommitsSum = data.contributions.reduce((acc: number, curr: any) => acc + (curr.count || 0), 0);
          setTotalCommits(allCommitsSum);
          contributionsFetched = true;
        }
      } catch (err) {
        console.error("Error fetching live github contributions, using fallback:", err);
        const mockContributions: { date: string; count: number; level: number }[] = [];
        const start = new Date(2025, 0, 1);
        const end = new Date(2026, 11, 31);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split("T")[0];
          let count = 0; let level = 0;
          if (dateStr === "2025-12-31" || dateStr === "2025-12-29") { count = 4; level = 4; }
          else if (dateStr === "2025-12-28") { count = 2; level = 2; }
          else if (["2025-12-10","2025-12-08","2025-10-18","2025-10-01"].includes(dateStr)) { count = 1; level = 1; }
          else if (["2026-06-15","2026-04-12","2026-04-08","2026-03-28"].includes(dateStr)) { count = 3; level = 3; }
          else if (["2026-02-08","2026-01-01"].includes(dateStr)) { count = 2; level = 2; }
          mockContributions.push({ date: dateStr, count, level });
        }
        setAllContributions(mockContributions);
      }

      try {
        const repoResponse = await fetch("https://api.github.com/users/yuvanavinash26/repos?sort=created&direction=desc&per_page=100");
        if (repoResponse.ok) {
          const repoData = await repoResponse.json();
          if (Array.isArray(repoData)) {
            setReposList(repoData.map((r: any) => ({ name: r.name, html_url: r.html_url, created_at: r.created_at, language: r.language })));
            setPublicRepos(repoData.length);
            reposFetched = true;
          }
        }
      } catch (err) {
        console.error("Error fetching GitHub repo list, using fallback:", err);
        const fallbackRepos: Repo[] = [
          { name: "Hackathon-saveetha", html_url: "https://github.com/yuvanavinash26/Hackathon-saveetha", created_at: "2026-06-15T04:35:53Z", language: "TypeScript" },
          { name: "Test-gen", html_url: "https://github.com/yuvanavinash26/Test-gen", created_at: "2026-04-12T13:51:35Z", language: "HTML" },
          { name: "TestGenEnv", html_url: "https://github.com/yuvanavinash26/TestGenEnv", created_at: "2026-04-08T16:47:12Z", language: "Python" },
          { name: "ecogrid-insights", html_url: "https://github.com/yuvanavinash26/ecogrid-insights", created_at: "2026-03-28T04:31:15Z", language: null },
          { name: "Codekrafters-hackathon", html_url: "https://github.com/yuvanavinash26/Codekrafters-hackathon", created_at: "2026-02-08T06:12:39Z", language: "JavaScript" },
          { name: "codekrafters-website", html_url: "https://github.com/yuvanavinash26/codekrafters-website", created_at: "2026-01-01T18:33:22Z", language: null },
          { name: "yuvanavinash26", html_url: "https://github.com/yuvanavinash26/yuvanavinash26", created_at: "2025-12-31T10:59:20Z", language: null },
          { name: "studo---project", html_url: "https://github.com/yuvanavinash26/studo---project", created_at: "2025-12-28T17:41:45Z", language: "TypeScript" },
          { name: "CodeX-AI-Assistant-App", html_url: "https://github.com/yuvanavinash26/CodeX-AI-Assistant-App", created_at: "2025-12-08T14:25:44Z", language: null },
          { name: "krafterslink", html_url: "https://github.com/yuvanavinash26/krafterslink", created_at: "2025-10-18T08:04:03Z", language: null },
          { name: "Portfolio", html_url: "https://github.com/yuvanavinash26/Portfolio", created_at: "2025-10-01T19:56:15Z", language: "HTML" }
        ];
        setReposList(fallbackRepos);
        setPublicRepos(11);
      }

      if (contributionsFetched || reposFetched) setIsLive(true);
    }
    fetchGitHubData();
  }, []);

  const yearContributions = allContributions.filter(c => c.date.startsWith(selectedYear.toString()));
  const yearContributionsTotal = yearContributions.reduce((acc, curr) => acc + curr.count, 0);

  const { cells, monthLabels } = (() => {
    const contribMap = new Map(yearContributions.map(c => [c.date, c]));
    const startDate = new Date(selectedYear, 0, 1);
    const startDayOfWeek = startDate.getDay();
    const gridStart = new Date(startDate);
    gridStart.setDate(startDate.getDate() - startDayOfWeek);

    const cellsList: ContributionCell[] = [];
    const labelsList: MonthLabel[] = [];
    let currentMonth = -1;

    for (let i = 0; i < 371; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      const dateStr = d.toISOString().split("T")[0];
      const isCurrentYear = d.getFullYear() === selectedYear;
      const info = contribMap.get(dateStr);
      const count = isCurrentYear && info ? info.count : 0;
      const level = isCurrentYear && info ? info.level : 0;

      cellsList.push({ date: dateStr, count, level, isCurrentYear, dayOfWeek: d.getDay(), month: d.getMonth() });

      if (i % 7 === 0 && isCurrentYear) {
        const m = d.getMonth();
        if (m !== currentMonth) {
          labelsList.push({ label: d.toLocaleDateString("en-US", { month: "short" }), colIndex: Math.floor(i / 7) });
          currentMonth = m;
        }
      }
    }
    return { cells: cellsList, monthLabels: labelsList };
  })();

  const timelineActivities = (() => {
    if (selectedYear === 2025) {
      return [
        {
          monthName: "December", monthNum: 11, year: 2025,
          createdRepos: [
            { name: "yuvanavinash26", html_url: "https://github.com/yuvanavinash26/yuvanavinash26", created_at: "2025-12-31", language: null },
            { name: "studo---project", html_url: "https://github.com/yuvanavinash26/studo---project", created_at: "2025-12-28", language: "TypeScript" },
            { name: "Studo", html_url: "https://github.com/yuvanavinash26/Studo", created_at: "2025-12-28", language: "TypeScript" },
            { name: "EduMind", html_url: "https://github.com/yuvanavinash26/EduMind", created_at: "2025-12-10", language: "TypeScript" },
            { name: "CodeX-AI-Assistant-App", html_url: "https://github.com/yuvanavinash26/CodeX-AI-Assistant-App", created_at: "2025-12-08", language: null }
          ],
          commits: [
            { repoName: "yuvanavinash26/studo---project", count: 5 },
            { repoName: "yuvanavinash26/EduMind", count: 5 },
            { repoName: "yuvanavinash26/yuvanavinash26", count: 3 },
            { repoName: "yuvanavinash26/Studo", count: 3 }
          ]
        },
        {
          monthName: "October", monthNum: 9, year: 2025,
          createdRepos: [
            { name: "krafterslink", html_url: "https://github.com/yuvanavinash26/krafterslink", created_at: "2025-10-18", language: null },
            { name: "Portfolio", html_url: "https://github.com/yuvanavinash26/Portfolio", created_at: "2025-10-01", language: "HTML" }
          ],
          commits: [{ repoName: "yuvanavinash26/Portfolio", count: 1 }]
        }
      ];
    }

    const monthlyData: Record<number, MonthActivity> = {};
    for (let m = 0; m < 12; m++) {
      monthlyData[m] = { monthName: new Date(selectedYear, m, 1).toLocaleDateString("en-US", { month: "long" }), monthNum: m, year: selectedYear, createdRepos: [], commits: [] };
    }
    reposList.forEach(repo => {
      const d = new Date(repo.created_at);
      if (d.getFullYear() === selectedYear) monthlyData[d.getMonth()].createdRepos.push(repo);
    });
    const monthlyCommits: Record<number, number> = {};
    yearContributions.forEach(c => { const m = new Date(c.date).getMonth(); monthlyCommits[m] = (monthlyCommits[m] || 0) + c.count; });
    Object.keys(monthlyCommits).forEach(mStr => {
      const m = parseInt(mStr);
      const commitCount = monthlyCommits[m];
      if (commitCount > 0) {
        const activeRepos = reposList.filter(repo => {
          const rDate = new Date(repo.created_at);
          return rDate.getFullYear() < selectedYear || (rDate.getFullYear() === selectedYear && rDate.getMonth() <= m);
        });
        if (activeRepos.length > 0) {
          const currentMonthRepos = activeRepos.filter(r => new Date(r.created_at).getMonth() === m && new Date(r.created_at).getFullYear() === selectedYear);
          const targets = currentMonthRepos.length > 0 ? currentMonthRepos : [activeRepos[0]];
          const perRepo = Math.max(1, Math.floor(commitCount / targets.length));
          targets.forEach((t, i) => {
            const count = i === targets.length - 1 ? commitCount - (perRepo * (targets.length - 1)) : perRepo;
            if (count > 0) monthlyData[m].commits.push({ repoName: `yuvanavinash26/${t.name}`, count });
          });
        } else {
          monthlyData[m].commits.push({ repoName: "yuvanavinash26/Portfolio", count: commitCount });
        }
      }
    });
    return Object.values(monthlyData).filter(m => m.createdRepos.length > 0 || m.commits.length > 0).sort((a, b) => b.monthNum - a.monthNum);
  })();

  function getLanguageColor(lang: string | null) {
    if (!lang) return "#8b949e";
    const colors: Record<string, string> = { TypeScript: "#3178c6", JavaScript: "#f1e05a", HTML: "#e34c26", CSS: "#563d7c", Python: "#3572a5" };
    return colors[lang] || "#8b949e";
  }

  const maxCommits = Math.max(1, ...timelineActivities.flatMap(m => m.commits.map(c => c.count)));

  return (
    <section id="github" className="relative bg-transparent px-6 py-12 md:py-24 z-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center gap-2">
            <GitPullRequest className="w-4 h-4" /> [ GITHUB // CORE_GRAPH ]
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse' : 'bg-amber-500'}`} />
            {isLive ? 'Live Sync Active' : 'Offline Mode'}
          </span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white uppercase mb-8 font-heading">
          Contributions <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Heatmap</span>
        </h2>

        {/* Outer Flex Container for Heatmap + Year Picker */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* Main GitHub styled grid block */}
          <div className="flex-1 bg-[#0d1117] border border-[#30363d] rounded-xl p-4 relative overflow-hidden">

            {/* Heatmap header */}
            <div className="flex items-center mb-4 border-b border-[#21262d] pb-2">
              <span className="text-sm font-normal text-[#f0f6fc]">
                <span className="font-semibold text-white">{yearContributionsTotal} contributions</span> in {selectedYear}
              </span>
            </div>

            {/* Scrollable grid container */}
            <div className="relative">
              <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#30363d] scrollbar-track-transparent">
                <div className="min-w-[720px] flex flex-col gap-1 select-none">

                  {/* Month headers row */}
                  <div className="flex text-[9px] text-[#8b949e] h-4 relative mb-1 font-mono">
                    {monthLabels.map((ml, idx) => (
                      <span key={idx} className="absolute transition-all duration-300" style={{ left: `${25 + ml.colIndex * 13}px` }}>
                        {ml.label}
                      </span>
                    ))}
                  </div>

                  {/* Day labels + Heatmap columns */}
                  <div className="flex gap-[3px]">
                    <div className="flex flex-col justify-between text-[9px] text-[#8b949e] pr-2 h-[82px] py-1 select-none font-mono">
                      <span>Mon</span>
                      <span>Wed</span>
                      <span>Fri</span>
                    </div>

                    {/* Matrix of days */}
                    <div className="grid grid-flow-col grid-rows-7 gap-[3px] flex-grow">
                      {cells.map((cell, idx) => {
                        let bg = "bg-[#161b22] border border-[#21262d]";
                        if (cell.level === 1) bg = "bg-[#0e4429] border border-[#1b432e]";
                        if (cell.level === 2) bg = "bg-[#006d32] border border-[#0b532f]";
                        if (cell.level === 3) bg = "bg-[#26a641] border border-[#2d8d47]";
                        if (cell.level === 4) bg = "bg-[#39d353] border border-[#4be065]";
                        if (!cell.isCurrentYear) bg = "bg-transparent border-transparent pointer-events-none";

                        return (
                          <div
                            key={idx}
                            className={`w-[10px] h-[10px] rounded-[2px] transition-colors duration-150 cursor-pointer ${bg} hover:ring-1 hover:ring-white/20`}
                            onMouseEnter={() => {
                              if (cell.isCurrentYear) {
                                const formattedDate = new Date(cell.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                setTooltip(`${cell.count === 0 ? "No" : cell.count} contributions on ${formattedDate}`);
                              }
                            }}
                            onMouseLeave={() => setTooltip(null)}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tooltip Overlay */}
              {tooltip && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 bg-[#21262d] border border-[#30363d] text-white font-mono text-[10px] px-3 py-1.5 rounded shadow-xl z-30 pointer-events-none transition-all duration-150">
                  {tooltip}
                </div>
              )}
            </div>

            {/* Heatmap Footer */}
            <div className="flex items-center justify-between text-[11px] text-[#8b949e] mt-4 pt-2 border-t border-[#21262d] font-mono">
              <a href="https://docs.github.com/articles/why-are-my-contributions-not-showing-on-my-profile" target="_blank" rel="noreferrer"
                className="hover:text-[#58a6ff] hover:underline flex items-center gap-1 transition-all">
                Learn how we count contributions <ExternalLink className="w-3 h-3" />
              </a>
              <div className="flex items-center gap-1.5 select-none">
                <span>Less</span>
                <div className="w-[10px] h-[10px] bg-[#161b22] border border-[#21262d] rounded-[2px]" />
                <div className="w-[10px] h-[10px] bg-[#0e4429] border border-[#1b432e] rounded-[2px]" />
                <div className="w-[10px] h-[10px] bg-[#006d32] border border-[#0b532f] rounded-[2px]" />
                <div className="w-[10px] h-[10px] bg-[#26a641] border border-[#2d8d47] rounded-[2px]" />
                <div className="w-[10px] h-[10px] bg-[#39d353] border border-[#4be065] rounded-[2px]" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Year Switcher Panel */}
          <div className="md:w-28 flex md:flex-col gap-2">
            {[2026, 2025].map(year => {
              const active = selectedYear === year;
              return (
                <button key={year} onClick={() => { setSelectedYear(year); setShowAllActivity(false); }}
                  className={`flex-1 md:flex-none text-left px-4 py-2 text-xs font-semibold rounded-lg font-mono transition-all border ${
                    active
                      ? "bg-[#2f81f7] text-white border-transparent shadow-[0_0_12px_rgba(47,129,247,0.3)]"
                      : "text-[#8b949e] border-[#30363d] hover:bg-[#21262d] hover:text-[#f0f6fc]"
                  }`}>
                  {year}
                </button>
              );
            })}
          </div>
        </div>

        {/* Contribution Activity Section */}
        <div className="mt-8 font-sans">
          <h3 className="text-lg font-bold text-white mb-6 tracking-tight">Contribution activity</h3>

          <div className="relative border-l border-[#30363d] ml-4 pl-8 space-y-8 pb-4">
            {timelineActivities.length === 0 ? (
              <div className="text-xs text-[#8b949e] italic font-mono pl-2">No recorded public activities found for {selectedYear}.</div>
            ) : (
              (showAllActivity ? timelineActivities : timelineActivities.slice(0, PREVIEW_COUNT)).map((activity, idx) => (
                <div key={idx} className="relative">
                  <h4 className="text-xs font-semibold text-white border-b border-[#21262d] pb-2 mb-4">
                    {activity.monthName} <span className="text-[#8b949e] font-normal">{activity.year}</span>
                  </h4>

                  {/* Commits block */}
                  {activity.commits.length > 0 && (
                    <div className="relative pl-6 mb-6">
                      <span className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e]">
                        <GitCommit className="w-3.5 h-3.5" />
                      </span>
                      <h5 className="text-[13px] font-semibold text-white mb-3">
                        Created {activity.commits.reduce((a, b) => a + b.count, 0)} commits in {activity.commits.length} repositories
                      </h5>
                      <div className="space-y-3 pl-2">
                        {activity.commits.map((commit, cIdx) => (
                          <div key={cIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-xl">
                            <a href={`https://github.com/${commit.repoName}`} target="_blank" rel="noreferrer"
                              className="text-xs font-medium text-[#58a6ff] hover:underline">
                              {commit.repoName}
                            </a>
                            <div className="flex items-center gap-3">
                              <span className="text-[11px] text-[#8b949e] font-mono w-20 text-right">
                                {commit.count} {commit.count === 1 ? "commit" : "commits"}
                              </span>
                              <div className="w-20 h-2 bg-[#21262d] rounded-full overflow-hidden">
                                <div className="bg-[#26a641] h-full rounded-full transition-all duration-500" style={{ width: `${(commit.count / maxCommits) * 100}%` }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Created repositories block */}
                  {activity.createdRepos.length > 0 && (
                    <div className="relative pl-6">
                      <span className="absolute -left-[41px] top-0.5 w-6 h-6 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e]">
                        <BookOpen className="w-3.5 h-3.5" />
                      </span>
                      <h5 className="text-[13px] font-semibold text-white mb-3">
                        Created {activity.createdRepos.length} {activity.createdRepos.length === 1 ? "repository" : "repositories"}
                      </h5>
                      <div className="space-y-2 pl-2">
                        {activity.createdRepos.map((repo, rIdx) => {
                          const dateStr = new Date(repo.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                          return (
                            <div key={rIdx} className="flex items-center justify-between max-w-xl text-xs">
                              <div className="flex items-center gap-2">
                                <span className="p-1 bg-[#21262d] rounded text-[#8b949e]">
                                  <GitFork className="w-3 h-3" />
                                </span>
                                <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-medium text-[#58a6ff] hover:underline">
                                  yuvanavinash26/{repo.name}
                                </a>
                              </div>
                              <div className="flex items-center gap-3 text-[11px] text-[#8b949e]">
                                {repo.language && (
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getLanguageColor(repo.language) }} />
                                    <span>{repo.language}</span>
                                  </div>
                                )}
                                <span className="font-mono">{dateStr}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Show more / Show less button */}
          {timelineActivities.length > PREVIEW_COUNT && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAllActivity(prev => !prev)}
                className="flex items-center gap-2 text-xs font-semibold text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] px-5 py-2 rounded-full transition-all duration-200"
              >
                {showAllActivity ? (
                  <>
                    <span>Show less</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                  </>
                ) : (
                  <>
                    <span>Show more activity</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
