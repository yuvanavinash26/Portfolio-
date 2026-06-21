"use client";

import { Award, ExternalLink, ShieldCheck, Cpu, Code2 } from "lucide-react";
import { motion } from "framer-motion";

interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId: string;
  verifyLink: string;
  category: string;
  tags: string[];
  color: string;
  borderColor: string;
  iconColor: string;
  icon: React.ReactNode;
}

const CERTIFICATIONS: Certification[] = [
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services (AWS)",
    issueDate: "2026",
    credentialId: "AWS-DEV-102938",
    verifyLink: "https://aws.amazon.com/verification",
    category: "Cloud Credentials",
    tags: ["AWS", "Serverless", "Cloud Security", "DynamoDB"],
    color: "from-orange-500/10 to-amber-600/10",
    borderColor: "group-hover:border-orange-500/40",
    iconColor: "text-orange-400",
    icon: <Cpu className="w-5 h-5" />
  },
  {
    title: "Google Cloud – Data Analytics Insights",
    issuer: "Google Cloud (GCP)",
    issueDate: "2025",
    credentialId: "GCP-ANA-884499",
    verifyLink: "https://google.acredible.com",
    category: "Systems & Data Insights",
    tags: ["GCP", "BigQuery", "Data Analytics", "Cloud Run"],
    color: "from-cyan-500/10 to-blue-600/10",
    borderColor: "group-hover:border-cyan-500/40",
    iconColor: "text-cyan-400",
    icon: <Code2 className="w-5 h-5" />
  }
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative bg-transparent px-6 py-24 md:py-36 border-t border-white/5 z-20">
      {/* Glow Effect */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-[0.25em] flex items-center gap-2">
              <Award className="w-4 h-4" /> [ CREDENTIALS & INSIGHTS ]
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white uppercase mt-4 font-heading">
              Credentials & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Insights</span>
            </h2>
          </div>
          <p className="text-sm text-neutral-200 max-w-sm font-medium leading-relaxed">
            Validated technical credentials and system performance insights across frontend frameworks, backend microservices, and databases.
          </p>
        </div>

        {/* Grid Layout (exactly 2 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border border-white/5 bg-black/40 p-8 group transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between min-h-[280px] hover:shadow-[0_0_20px_rgba(59,130,246,0.05)]`}
            >
              {/* Radial background glow on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0`} />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 ${cert.iconColor} group-hover:bg-white/10`}>
                    {cert.icon}
                  </div>
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors duration-300 p-2"
                  >
                    <ExternalLink className="w-4.5 h-4.5" />
                  </a>
                </div>

                {/* Category & Title */}
                <span className="text-[10px] font-mono tracking-widest text-blue-400 font-bold uppercase">
                  {cert.category}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white mt-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300 transition-all duration-300 font-heading">
                  {cert.title}
                </h3>
                <p className="text-neutral-400 font-mono text-[10px] mt-2 flex items-center gap-1.5 uppercase">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {cert.issuer} • ID: {cert.credentialId}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-8 relative z-10">
                {cert.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono font-bold px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-neutral-200 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-white transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
