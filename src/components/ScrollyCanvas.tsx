"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
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
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade vignettes to 0% opacity near the end of scroll to fully reveal the clean face cut
  const vignetteOpacity = useTransform(scrollYProgress, [0.88, 0.96], [1, 0]);

  // Inertia spring filter to smooth out trackpad/wheel increments and prevent frame stuttering
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 65,
    damping: 22,
    restDelta: 0.0005
  });

  // Center-aligned drawing logic for the 3D face sequence
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

    // Clear canvas
    ctx.fillStyle = "#0d0d0d";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw the image centered
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Keep references stable for callbacks to prevent infinite rendering loop
  const onProgressRef = useRef(onProgress);
  const onLoadingCompleteRef = useRef(onLoadingComplete);
  const drawImageRef = useRef(drawImage);

  useEffect(() => {
    onProgressRef.current = onProgress;
    onLoadingCompleteRef.current = onLoadingComplete;
    drawImageRef.current = drawImage;
  });

  // 1. Preload 160 Images on Mount (Guaranteed to execute exactly once)
  useEffect(() => {
    let active = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const checkLoadingComplete = () => {
      loadedCount++;
      const percent = (loadedCount / TOTAL_FRAMES) * 100;
      onProgressRef.current(percent);

      if (loadedCount === TOTAL_FRAMES) {
        if (active) {
          setImages(loadedImages);
          imagesRef.current = loadedImages;
          
          // Draw the very first frame immediately
          setTimeout(() => {
            if (loadedImages[0]) {
              drawImageRef.current(loadedImages[0]);
            }
            onLoadingCompleteRef.current();
          }, 300);
        }
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = String(i).padStart(3, "0");
      img.src = `/sequence/frame_${pad}_delay-0.063s.webp`;
      img.onload = checkLoadingComplete;
      img.onerror = checkLoadingComplete;
      loadedImages.push(img);
    }

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Handle Canvas Resizing (DPR aware)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Draw current active frame
      const imgs = imagesRef.current;
      const img = imgs[currentIndexRef.current];
      if (img && img.complete) {
        drawImage(img);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images, drawImage]);

  // 3. Scroll scrubbing via MotionValue subscription (high performance bypass of React renders)
  useEffect(() => {
    if (images.length === 0) return;

    const unsubscribe = smoothProgress.on("change", (progress) => {
      if ((window as unknown as { isNavigating: boolean }).isNavigating) return;

      const imgs = imagesRef.current;
      if (imgs.length === 0) return;

      const frameIndex = Math.floor(progress * (imgs.length - 1));
      const clampedIndex = Math.max(0, Math.min(imgs.length - 1, frameIndex));

      if (clampedIndex !== currentIndexRef.current) {
        currentIndexRef.current = clampedIndex;
        const img = imgs[clampedIndex];
        if (img && img.complete) {
          drawImage(img);
        }
      }
    });

    // Force frame update when navigation scroll finishes
    const handleNavComplete = () => {
      const progress = smoothProgress.get();
      const imgs = imagesRef.current;
      if (imgs.length === 0) return;

      const frameIndex = Math.floor(progress * (imgs.length - 1));
      const clampedIndex = Math.max(0, Math.min(imgs.length - 1, frameIndex));
      currentIndexRef.current = clampedIndex;
      const img = imgs[clampedIndex];
      if (img && img.complete) {
        drawImage(img);
      }
    };

    window.addEventListener("scroll-nav-complete", handleNavComplete);

    return () => {
      unsubscribe();
      window.removeEventListener("scroll-nav-complete", handleNavComplete);
    };
  }, [images, smoothProgress, drawImage]);

  return (
    <div ref={containerRef} className="relative h-[500vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0d0d0d]">
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover block opacity-95 transition-opacity duration-300"
          style={{ display: "block" }}
        />
        
        {/* Ambient vignettes to make overlay fonts fully visible against the canvas backside */}
        <motion.div 
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-transparent z-[5] pointer-events-none" 
        />
        <motion.div 
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 bg-gradient-to-l from-black/85 via-black/35 to-transparent z-[5] pointer-events-none" 
        />
        <motion.div 
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent z-[5] pointer-events-none h-40 bottom-0 top-auto" 
        />

        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
