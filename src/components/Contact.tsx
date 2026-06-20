"use client";


import { Mail, Terminal, MessageSquare, ArrowRight } from "lucide-react";
import { useState } from "react";

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
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

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("Please fill in all fields.");
      return;
    }
    setStatus("Message sent successfully! (Mock submission)");
    setForm({ name: "", email: "", message: "" });
  };

  const opportunities = [
    "Software Development Opportunities",
    "Hackathon Collaborations",
    "Open Source Projects",
    "Startup Discussions",
    "Freelance Web Development"
  ];

  return (
    <section id="contact" className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Context & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4" /> [ INVITATION // DISPATCH ]
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white uppercase font-heading">
                Let&apos;s Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Extraordinary
                </span> <br />
                Together.
              </h2>
            </div>

            <div>
              <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest mb-3">
                OPEN TO ENGAGEMENTS
              </div>
              <ul className="space-y-2.5">
                {opportunities.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-neutral-200 font-semibold">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Grid */}
            <div className="space-y-4 pt-4">
              <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                CONNECT CHANNELS
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: "Email", icon: <Mail className="w-4 h-4" />, url: "mailto:yuvanavinash26@gmail.com" },
                  { name: "LinkedIn", icon: <LinkedinIcon className="w-4 h-4" />, url: "https://www.linkedin.com/in/yuvan-avinash" },
                  { name: "GitHub", icon: <GithubIcon className="w-4 h-4" />, url: "https://github.com/yuvanavinash26" },
                  { name: "Instagram", icon: <InstagramIcon className="w-4 h-4" />, url: "https://instagram.com" }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/5 rounded-xl hover:border-blue-500/35 hover:bg-blue-500/10 text-neutral-200 hover:text-white transition-all duration-300 font-mono text-xs font-bold"
                  >
                    {social.icon}
                    <span>{social.name.toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form Panel */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/5 bg-black/45 hover:border-blue-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-6 font-heading">Transmit Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2 font-bold">
                    Identification / Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter name"
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-white/5 rounded-xl text-white text-sm outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2 font-bold">
                    Return Address / Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Enter email"
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-white/5 rounded-xl text-white text-sm outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2 font-bold">
                    Content / Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe details of project..."
                    className="w-full px-4 py-3 bg-neutral-900/50 border border-white/5 rounded-xl text-white text-sm outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                </div>

                {status && (
                  <div className={`text-xs font-mono font-semibold ${status.includes("successfully") ? "text-emerald-400" : "text-rose-400"}`}>
                    {status}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(0,102,255,0.3)] hover:shadow-[0_0_20px_rgba(0,102,255,0.5)] transition-all duration-300 font-mono text-xs tracking-wider uppercase"
                >
                  Send Transmission
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-neutral-400 gap-4 select-none">
          <span>© 2026 Yuvan Avinash. Crafted with passion, curiosity, and code.</span>
          <span className="flex items-center gap-1.5 text-blue-400 font-bold uppercase tracking-wider">
            <Terminal className="w-4 h-4" /> srmist.csec.node
          </span>
        </div>
      </div>
    </section>
  );
}
