import { useState, useEffect } from "react";

export type HeaderLayout = "desktop" | "intermediate" | "compact" | "mobile";

export const useHeaderLayout = () => {
  const [layout, setLayout] = useState<HeaderLayout>("desktop");

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      
      if (width >= 1100) {
        setLayout("desktop");
      } else if (width >= 900) {
        setLayout("intermediate");
      } else if (width >= 768) {
        setLayout("compact");
      } else {
        setLayout("mobile");
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  return {
    layout,
    isDesktop: layout === "desktop",
    isIntermediate: layout === "intermediate",
    isCompact: layout === "compact",
    isMobile: layout === "mobile",
    showFullNav: layout === "desktop" || layout === "intermediate",
    showMobileMenu: layout === "compact" || layout === "mobile",
  };
};
