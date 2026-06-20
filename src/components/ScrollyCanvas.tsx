"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll } from "framer-motion";
import Overlay from "./Overlay";

interface ScrollyCanvasProps {
  onProgress: (progress: number) => void;
  onLoadingComplete: () => void;
}

const TOTAL_FRAMES = 160;

export default function ScrollyCanvas({ onProgress, onLoadingComplete }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // Refs to avoid state triggers in scroll/resize loops
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Programmatic "object-fit: cover" draw function
  const drawImage = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const imgWidth = img.width;
    const imgHeight = img.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image aspect ratio
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller than image aspect ratio
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Re-draw current frame on resize or screen change
  const drawCurrentFrame = useCallback(() => {
    const img = imagesRef.current[currentIndexRef.current];
    if (img && img.complete) {
      drawImage(img);
    }
  }, [drawImage]);


  // 1. Preload Images
  useEffect(() => {
    let active = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const checkLoadingComplete = () => {
      loadedCount++;
      const percent = (loadedCount / TOTAL_FRAMES) * 100;
      onProgress(percent);

      if (loadedCount === TOTAL_FRAMES) {
        if (active) {
          setImages(loadedImages);
          imagesRef.current = loadedImages;
          // Draw the very first frame immediately
          setTimeout(() => {
            if (loadedImages[0]) {
              drawImage(loadedImages[0]);
            }
            onLoadingComplete();
          }, 300);
        }
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = String(i).padStart(3, "0");
      img.src = `/sequence/frame_${pad}_delay-0.063s.webp`;
      img.onload = checkLoadingComplete;
      img.onerror = checkLoadingComplete; // Fallback in case of individual frame error
      loadedImages.push(img);
    }

    return () => {
      active = false;
    };
  }, [onProgress, onLoadingComplete, drawImage]);

  // 2. Handle Canvas Resizing (DPR aware)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      drawCurrentFrame();
    };

    window.addEventListener("resize", handleResize);
    // Initial size setup
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images, drawCurrentFrame]);

  // 3. Scroll scrubbing via MotionValue subscription (high performance bypass of React renders)
  useEffect(() => {
    if (images.length === 0) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      // If we are actively navigating (smooth scrolling via nav links), skip drawing new frames
      if ((window as unknown as { isNavigating: boolean }).isNavigating) return;

      const frameIndex = Math.floor(progress * (images.length - 1));
      const clampedIndex = Math.max(0, Math.min(images.length - 1, frameIndex));
      
      console.log("Scroll progress:", progress, "Clamped Frame index:", clampedIndex);

      if (clampedIndex !== currentIndexRef.current) {
        currentIndexRef.current = clampedIndex;
        const img = images[clampedIndex];
        if (img && img.complete) {
          drawImage(img);
        }
      }
    });

    // Force frame update when navigation scroll finishes
    const handleNavComplete = () => {
      const progress = scrollYProgress.get();
      const frameIndex = Math.floor(progress * (images.length - 1));
      const clampedIndex = Math.max(0, Math.min(images.length - 1, frameIndex));
      currentIndexRef.current = clampedIndex;
      const img = images[clampedIndex];
      if (img && img.complete) {
        drawImage(img);
      }
    };

    window.addEventListener("scroll-nav-complete", handleNavComplete);

    return () => {
      unsubscribe();
      window.removeEventListener("scroll-nav-complete", handleNavComplete);
    };
  }, [images, scrollYProgress, drawImage]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0d0d0d]">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover block opacity-95 transition-opacity duration-300"
          style={{ display: "block" }}
        />
        {/* Gradient overlay to preserve text readability on left while showing face on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent z-[5] pointer-events-none" />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
