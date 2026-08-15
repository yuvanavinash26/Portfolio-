"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, ShieldCheck } from "lucide-react";

interface LogEntry {
  command?: string;
  output: string;
  isSystem?: boolean;
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    { output: "Welcome to Yuvan Avinash's developer environment [v1.0.0]", isSystem: true },
    { output: "Type 'help' to see the list of available commands.", isSystem: true },
    { output: "", isSystem: true }
  ]);
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let reply = "";

    if (trimmed === "help") {
      reply = `Available Commands:
  about    - Summary of who I am and my engineering focus
  skills   - List my skill ecosystem & tech stack
  projects - Summary of featured projects
  startup  - My long-term startup vision & products
  contact  - My email and LinkedIn contact links
  clear    - Clear the terminal history`;
    } else if (trimmed === "about") {
      reply = `I am Yuvan Avinash, a Computer Science Engineering student at SRM IST Ramapuram.
I specialize in full-stack web applications, Python programming, automation scripts, and open-source development.
My goal is to construct software that automates workflows and solves real-world operational problems.`;
    } else if (trimmed === "skills") {
      reply = `Skill Ecosystem:
  [Frontend]  HTML, CSS, JavaScript, React, Next.js, Tailwind CSS
  [Backend]   Python, Node.js, REST APIs
  [Tools]     Git, GitHub, VS Code, Postman
  [Automation] RPA, Workflow Automation
  [Learning]  AI & Machine Learning, System Design, Cloud Computing`;
    } else if (trimmed === "projects") {
      reply = `Featured Projects:
  1. CARESYNC AI        - AI healthcare intelligence & hospital digital twins (Next.js, React, APIs)
  2. EcoGrid            - Smart energy & water consumption analytics dashboard (Python, Flask)
  3. Skill Gap Navigator - AI career roadmap recommendation engine (Web Dev, AI APIs)
  4. SafeCircle AI      - AI safety companion & emergency SOS network (React, Socket.io, Node.js)
  5. Smart Waste Segregation - Automated IoT & ML waste sorting system (Arduino, Sensors, VS Code)
  6. Portfolio Website  - Interactive personal web portfolio (Next.js, Framer Motion)`;
    } else if (trimmed === "startup") {
      reply = `Future Startup Vision:
  "To build highly impactful technology products and launch software startups that automate operations, optimize logistics, and solve meaningful problems at scale."`;
    } else if (trimmed === "contact") {
      reply = `Get In Touch:
  Email    : yuvanavinash26@gmail.com
  LinkedIn : www.linkedin.com/in/yuvan-avinash
  GitHub   : github.com/yuvanavinash26`;
    } else if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (trimmed === "") {
      reply = "";
    } else {
      reply = `bash: command not found: ${trimmed}. Type 'help' to view valid commands.`;
    }

    setHistory((prev) => [
      ...prev,
      { command: cmd, output: reply }
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <section id="terminal" className="relative bg-transparent px-6 py-12 md:py-24 z-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] mb-4 flex items-center gap-2">
          <Terminal className="w-4 h-4" /> [ INTERACTIVE CONSOLE // REPL ]
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white uppercase mb-8 font-heading">
          Live Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Terminal</span>
        </h2>

        {/* Terminal Window */}
        <div className="w-full rounded-2xl border border-blue-500/20 bg-black/85 shadow-2xl overflow-hidden font-mono text-xs md:text-sm glow-blue">
          {/* Header Bar */}
          <div className="bg-neutral-900 px-4 py-3 flex items-center justify-between border-b border-white/5 select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> yuvan@srmist-node:~
            </div>
            <div className="w-12" /> {/* Spacer */}
          </div>

          {/* Output History Area */}
          <div className="p-6 h-[280px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-blue-600">
            {history.map((entry, idx) => (
              <div key={idx} className="space-y-1">
                {entry.command !== undefined && (
                  <div className="text-neutral-400 flex items-center gap-2">
                    <span className="text-blue-500 font-bold">yuvan@srmist:~#</span>
                    <span>{entry.command}</span>
                  </div>
                )}
                <div className={`whitespace-pre-wrap ${entry.isSystem ? "text-cyan-400/80 font-bold" : "text-neutral-200"}`}>
                  {entry.output}
                </div>
              </div>
            ))}
            <div ref={outputEndRef} />
          </div>

          {/* Input Panel */}
          <div className="bg-neutral-900/50 px-6 py-4 flex items-center border-t border-white/5 gap-3">
            <span className="text-blue-500 font-bold select-none">yuvan@srmist:~#</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Query developer stats..."
              className="flex-grow bg-transparent text-white outline-none border-none caret-blue-500 placeholder-neutral-600"
            />
            <button
              onClick={() => handleCommand(input)}
              className="p-1.5 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg border border-blue-500/20 hover:border-blue-500 transition-all duration-300"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
