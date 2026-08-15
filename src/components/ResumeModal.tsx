"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Download, FileText, ExternalLink, CheckCircle2 } from "lucide-react";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [autoDownloadedThisSession, setAutoDownloadedThisSession] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Trigger download helper (force = true when manually clicking Download button)
  const handleDownload = (force = false) => {
    if (typeof window === "undefined") return;

    const alreadyDownloaded = sessionStorage.getItem("resume_downloaded_session");

    if (force || !alreadyDownloaded) {
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Yuvan_Avinash_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      sessionStorage.setItem("resume_downloaded_session", "true");
      setAutoDownloadedThisSession(true);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3500);
    }
  };

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      // Auto download only on first open per session
      const alreadyDownloaded = sessionStorage.getItem("resume_downloaded_session");
      if (!alreadyDownloaded) {
        handleDownload(false);
      } else {
        setAutoDownloadedThisSession(true);
      }
    };

    window.addEventListener("open-resume-modal", handleOpen);
    return () => window.removeEventListener("open-resume-modal", handleOpen);
  }, []);

  // Handle ESC key press & body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setIsFullscreen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(false);
              setIsFullscreen(false);
            }}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-0"
          />

          {/* Modal Card */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative z-10 bg-[#080d1a]/95 border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col overflow-hidden transition-all duration-300 w-full ${
              isFullscreen
                ? "fixed inset-2 md:inset-4 h-[calc(100vh-1rem)] md:h-[calc(100vh-2rem)] max-w-none rounded-xl"
                : "max-w-5xl h-[88vh] md:h-[86vh]"
            }`}
          >
            {/* Header Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0d1527] border-b border-cyan-500/20 font-mono">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-wide">
                      YUVAN_AVINASH_RESUME.PDF
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-bold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {downloaded ? "Downloaded!" : autoDownloadedThisSession ? "Downloaded" : "PDF Loaded"}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 hidden sm:block">
                    Full Preview &amp; Single Auto-Download
                  </p>
                </div>
              </div>

              {/* Control Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 rounded-lg text-xs font-bold transition-all shadow-[0_0_10px_rgba(6,182,212,0.15)]"
                  title="Download PDF Copy"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </button>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-lg text-xs font-bold transition-all"
                  title="Open in new window"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Tab</span>
                </a>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-lg transition-all"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Preview"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsFullscreen(false);
                  }}
                  className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg transition-all ml-1"
                  title="Close Resume View"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            <div className="px-4 py-1.5 bg-cyan-950/40 border-b border-cyan-500/10 text-[11px] font-mono text-cyan-300/90 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {downloaded
                  ? "Resume downloaded to your device!"
                  : autoDownloadedThisSession
                  ? "Resume already downloaded in this session. Click Download above for a fresh copy."
                  : "Downloading resume automatically..."}
              </span>
              <span className="hidden md:inline text-gray-400">Press ESC or click Outside to close</span>
            </div>

            {/* Embedded PDF View */}
            <div className="relative flex-1 w-full bg-[#050811] overflow-hidden flex flex-col items-center justify-center">
              <object
                data="/resume.pdf#toolbar=1"
                type="application/pdf"
                className="w-full h-full border-none"
              >
                <iframe
                  src="/resume.pdf"
                  className="w-full h-full border-none"
                  title="Yuvan Avinash Resume PDF Preview"
                >
                  <div className="flex flex-col items-center justify-center h-full p-8 text-center text-white space-y-4">
                    <FileText className="w-14 h-14 text-cyan-400 animate-pulse" />
                    <p className="text-sm font-medium text-neutral-300">
                      Your browser does not support inline PDF preview.
                    </p>
                    <div className="flex items-center gap-3">
                      <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-cyan-500 text-black font-bold rounded-xl shadow-lg hover:bg-cyan-400 transition-all flex items-center gap-2 text-xs"
                      >
                        <ExternalLink className="w-4 h-4" /> Open Resume PDF in New Tab
                      </a>
                      <button
                        onClick={() => handleDownload(true)}
                        className="px-5 py-2.5 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 text-xs"
                      >
                        <Download className="w-4 h-4" /> Download PDF
                      </button>
                    </div>
                  </div>
                </iframe>
              </object>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
