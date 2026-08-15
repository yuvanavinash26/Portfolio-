import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yuvan Avinash | Portfolio",
  description: "Yuvan Avinash — Full Stack Developer Portfolio showcasing projects, technical skills, certifications, and experience.",
  keywords: [
    "Yuvan Avinash",
    "Portfolio",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Machine Learning",
    "Software Engineer"
  ],
  authors: [{ name: "Yuvan Avinash" }],
  creator: "Yuvan Avinash",
  metadataBase: new URL("https://yuvan-portfolio-chi.vercel.app"),
  openGraph: {
    title: "Yuvan Avinash | Portfolio",
    description: "Yuvan Avinash — Full Stack Developer Portfolio showcasing projects, technical skills, certifications, and experience.",
    url: "https://yuvan-portfolio-chi.vercel.app",
    siteName: "Yuvan Avinash Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yuvan Avinash | Portfolio",
    description: "Yuvan Avinash — Full Stack Developer Portfolio showcasing projects, technical skills, certifications, and experience.",
  },
};

export const viewport = {
  width: 1280,
  initialScale: 0.35,
  minimumScale: 0.1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${plusJakartaSans.variable} font-sans antialiased bg-[#0d0d0d] text-neutral-100`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}


