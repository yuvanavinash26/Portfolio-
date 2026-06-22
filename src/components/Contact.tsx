"use client";

import emailjs from "@emailjs/browser";
import { Mail, Terminal, MessageSquare, ArrowRight, Loader2, Phone } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

/* Blinking cursor component */
function Cursor({ active }: { active: boolean }) {
  const [on, setOn] = useState(true);
  useEffect(() => {
    if (!active) { setOn(true); return; }
    const t = setInterval(() => setOn(p => !p), 530);
    return () => clearInterval(t);
  }, [active]);
  return (
    <span className={`inline-block w-[7px] h-[15px] ml-0.5 align-middle bg-emerald-400 transition-opacity duration-75 ${on && active ? "opacity-100" : "opacity-0"}`} />
  );
}

/* Terminal input row */
function TermField({
  prompt, label, type = "text", value, onChange, multiline = false, maxLen,
}: {
  prompt: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; multiline?: boolean; maxLen?: number;
}) {
  const [focused, setFocused] = useState(false);
  const inputClass =
    "bg-transparent outline-none border-none text-emerald-300 font-mono text-sm w-full placeholder:text-neutral-700 resize-none caret-emerald-400";

  return (
    <div className={`rounded-lg border transition-all duration-200 ${focused ? "border-emerald-500/40 bg-emerald-500/[0.04]" : "border-white/[0.06] bg-transparent"}`}>
      {/* Field header */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-1 border-b border-white/[0.04]">
        <span className="text-emerald-500 font-mono text-[11px] font-bold">{prompt}</span>
        <span className="text-neutral-600 font-mono text-[10px] uppercase tracking-widest">{label}</span>
        {focused && <span className="ml-auto text-[9px] font-mono text-emerald-600 uppercase tracking-wider animate-pulse">● ACTIVE</span>}
      </div>
      {/* Input */}
      <div className="flex items-start gap-2 px-4 py-3">
        <span className="text-emerald-600 font-mono text-sm mt-0.5 select-none flex-shrink-0">▸</span>
        <div className="flex-1 relative">
          {multiline ? (
            <textarea
              rows={3}
              value={value}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              maxLength={maxLen}
              placeholder={`// type here...`}
              className={inputClass + " leading-relaxed"}
            />
          ) : (
            <input
              type={type}
              value={value}
              onChange={e => onChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={`// type here...`}
              className={inputClass}
            />
          )}
          {focused && !value && <Cursor active={focused} />}
        </div>
        {maxLen && (
          <span className="text-[10px] font-mono text-neutral-700 flex-shrink-0 mt-0.5">
            {value.length}/{maxLen}
          </span>
        )}
      </div>
    </div>
  );
}

/* Typewriter effect for success lines */
function TypewriterLines({ lines }: { lines: string[] }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown(p => p + 1), 380);
    return () => clearTimeout(t);
  }, [shown, lines.length]);
  return (
    <div className="space-y-1.5 font-mono text-sm">
      {lines.slice(0, shown).map((line, i) => (
        <div key={i} className={`flex items-start gap-2 ${line.startsWith("[OK]") ? "text-emerald-400" : line.startsWith("[>>]") ? "text-cyan-400" : line.startsWith("[!!]") ? "text-amber-400" : "text-neutral-500"}`}>
          <span className="flex-shrink-0 text-[11px] mt-0.5">{line.split(" ")[0]}</span>
          <span className="text-[13px]">{line.split(" ").slice(1).join(" ")}</span>
        </div>
      ))}
      {shown < lines.length && <Cursor active={true} />}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      setErrorMsg("ERR: All fields are required before transmission.");
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message, to_email: "yuvanavinash26@gmail.com", reply_to: form.email },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMsg("ERR: Connection failed. Try emailing directly.");
    }
  };

  const successLines = [
    "[>>] Establishing secure channel...",
    "[OK] Handshake complete — TLS 1.3",
    "[>>] Packaging payload...",
    "[OK] Sender authenticated: " + (form.name || "user"),
    "[>>] Routing to yuvanavinash26@gmail.com",
    "[OK] Message delivered successfully",
    "[!!] Yuvan will reply within 24h",
  ];

  const opportunities = [
    "Software Development",
    "Hackathon Collaborations",
    "Open Source Projects",
    "Startup Discussions",
    "Freelance Work",
  ];

  return (
    <section id="contact" className="relative bg-transparent px-6 py-24 md:py-32 z-20 border-t border-white/5">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 4px)" }} />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* ── Left column ── */}
          <div className="lg:col-span-5 space-y-10">

            {/* Section label */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" /> ~/yuvan/contact
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-white uppercase leading-[1.05] font-heading">
                Let&apos;s Build<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                  Something
                </span><br />
                Great.
              </h2>
              <p className="mt-4 text-sm text-neutral-500 font-mono leading-relaxed max-w-sm">
                <span className="text-emerald-600"># </span>
                Whether it&apos;s a collaboration, a project idea, or just a hello — I&apos;m always reachable.
              </p>
            </div>

            {/* Open to */}
            <div className="font-mono">
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-4">
                <span className="text-emerald-600">$ </span>cat open_to.txt
              </p>
              <ul className="space-y-2">
                {opportunities.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-neutral-400">
                    <span className="text-emerald-600 text-[11px]">[{String(idx + 1).padStart(2, "0")}]</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact info */}
            <div className="font-mono space-y-3">
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-4">
                <span className="text-emerald-600">$ </span>cat contact_info.txt
              </p>

              {/* Email */}
              <div className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#080e0b]/60 px-5 py-3.5 group hover:border-emerald-500/25 hover:bg-emerald-500/[0.04] transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-0.5"><span className="text-cyan-700">[mail]</span></p>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=yuvanavinash26@gmail.com" target="_blank" rel="noreferrer"
                    className="text-sm font-bold text-neutral-300 group-hover:text-cyan-300 transition-colors break-all">
                    yuvanavinash26@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#080e0b]/60 px-5 py-3.5 group hover:border-emerald-500/25 hover:bg-emerald-500/[0.04] transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div>
                  <p className="text-[9px] text-neutral-600 uppercase tracking-widest mb-0.5"><span className="text-amber-700">[phone]</span></p>
                  <a href="tel:9363484782" className="text-sm font-bold text-neutral-300 group-hover:text-amber-300 transition-colors tracking-wider">
                    +91 93634 84782
                  </a>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="font-mono">
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest mb-4">
                <span className="text-emerald-600">$ </span>ls socials/
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "linkedin", icon: <LinkedinIcon className="w-3 h-3" />, url: "https://www.linkedin.com/in/yuvan-avinash" },
                  { name: "github", icon: <GithubIcon className="w-3 h-3" />, url: "https://github.com/yuvanavinash26" },
                  { name: "instagram", icon: <InstagramIcon className="w-3 h-3" />, url: "https://instagram.com" },
                ].map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/[0.07] bg-white/[0.02] hover:bg-emerald-500/8 hover:border-emerald-500/30 text-neutral-500 hover:text-emerald-400 text-[11px] font-mono transition-all duration-200">
                    {s.icon}
                    <span>./{s.name}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* ── Right column — Terminal card ── */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_rgba(16,185,129,0.07)]"
              style={{ background: "linear-gradient(160deg, #080e0b 0%, #060b0f 100%)" }}>

              {/* Terminal title bar */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-black/30">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <div className="flex-1 text-center">
                  <span className="text-[11px] font-mono text-neutral-600">
                    yuvan@portfolio: <span className="text-neutral-500">~/contact</span>
                  </span>
                </div>
              </div>

              <div className="px-6 md:px-8 py-7">
                {status === "success" ? (

                  /* ── Success terminal output ── */
                  <div className="space-y-5">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-600 mb-4">
                      <span className="text-emerald-600">yuvan@portfolio</span>
                      <span className="text-neutral-700">:</span>
                      <span className="text-cyan-700">~/contact</span>
                      <span className="text-neutral-700">$</span>
                      <span className="text-neutral-400 ml-1">send_message --exec</span>
                    </div>

                    <TypewriterLines lines={successLines} />

                    <div className="mt-6 pt-5 border-t border-white/[0.05]">
                      <button
                        onClick={() => setStatus("idle")}
                        className="font-mono text-[11px] text-neutral-600 hover:text-emerald-400 transition-colors flex items-center gap-2"
                      >
                        <span className="text-emerald-700">$</span>
                        <span className="hover:underline underline-offset-2">./new_message.sh</span>
                        <Cursor active={true} />
                      </button>
                    </div>
                  </div>

                ) : (

                  /* ── Form ── */
                  <form onSubmit={handleSubmit} className="space-y-1">

                    {/* Command prompt header */}
                    <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-600 mb-5">
                      <span className="text-emerald-600">yuvan@portfolio</span>
                      <span className="text-neutral-700">:</span>
                      <span className="text-cyan-700">~/contact</span>
                      <span className="text-neutral-700">$</span>
                      <span className="text-neutral-400 ml-1">compose_message</span>
                      <Cursor active={true} />
                    </div>

                    <div className="space-y-3">
                      <TermField
                        prompt="[01]"
                        label="name"
                        value={form.name}
                        onChange={v => setForm({ ...form, name: v })}
                      />
                      <TermField
                        prompt="[02]"
                        label="email"
                        type="email"
                        value={form.email}
                        onChange={v => setForm({ ...form, email: v })}
                      />
                      <TermField
                        prompt="[03]"
                        label="message"
                        multiline
                        value={form.message}
                        onChange={v => setForm({ ...form, message: v })}
                        maxLen={500}
                      />
                    </div>

                    {/* Error */}
                    {status === "error" && errorMsg && (
                      <div className="flex items-start gap-2 font-mono text-xs text-rose-400 bg-rose-500/5 border border-rose-500/15 rounded-lg px-4 py-3 mt-3">
                        <span className="text-rose-600 flex-shrink-0">✗</span>
                        {errorMsg}
                      </div>
                    )}

                    {/* Submit */}
                    <div className="flex items-center justify-between pt-5 mt-2 border-t border-white/[0.05]">
                      <span className="font-mono text-[10px] text-neutral-700">
                        <span className="text-emerald-700">--to</span> yuvanavinash26@gmail.com
                      </span>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-xs font-bold
                          bg-emerald-500/10 border border-emerald-500/30 text-emerald-400
                          hover:bg-emerald-500/20 hover:border-emerald-400/50 hover:text-emerald-300
                          shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]
                          disabled:opacity-40 disabled:cursor-not-allowed
                          transition-all duration-200"
                      >
                        {status === "sending" ? (
                          <><Loader2 className="w-3.5 h-3.5 animate-spin" /> executing…</>
                        ) : (
                          <><span className="text-emerald-600 group-hover:text-emerald-400 transition-colors">$</span> send_message</>
                        )}
                      </button>
                    </div>
                  </form>

                )}
              </div>
            </div>

            {/* Below-card hint */}
            <p className="text-center font-mono text-[10px] text-neutral-700 mt-4 tracking-wider uppercase">
              <span className="text-emerald-800">■</span> Encrypted &nbsp;·&nbsp; <span className="text-emerald-800">■</span> No spam &nbsp;·&nbsp; <span className="text-emerald-800">■</span> Replies within 24h
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
