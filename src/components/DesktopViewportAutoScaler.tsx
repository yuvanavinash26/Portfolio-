"use client";

import { useEffect } from "react";

export default function DesktopViewportAutoScaler() {
  useEffect(() => {
    const applyDesktopScale = () => {
      const desktopWidth = 1280;
      const screenWidth = window.screen.width || window.innerWidth;
      
      let metaViewport = document.querySelector('meta[name="viewport"]');
      if (!metaViewport) {
        metaViewport = document.createElement("meta");
        metaViewport.setAttribute("name", "viewport");
        document.head.appendChild(metaViewport);
      }

      if (screenWidth < desktopWidth) {
        const scale = (screenWidth / desktopWidth).toFixed(4);
        metaViewport.setAttribute(
          "content",
          `width=${desktopWidth}, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=3, user-scalable=yes`
        );
      } else {
        metaViewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes"
        );
      }
    };

    applyDesktopScale();
    window.addEventListener("resize", applyDesktopScale);
    window.addEventListener("orientationchange", applyDesktopScale);

    return () => {
      window.removeEventListener("resize", applyDesktopScale);
      window.removeEventListener("orientationchange", applyDesktopScale);
    };
  }, []);

  return null;
}
