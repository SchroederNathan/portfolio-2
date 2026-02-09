"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useHorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [leftFade, setLeftFade] = useState(0);
  const [rightFade, setRightFade] = useState(0);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const fadeDistance = 150;

      setLeftFade(Math.min(scrollLeft / fadeDistance, 1));
      setRightFade(maxScroll > 0 ? Math.min((maxScroll - scrollLeft) / fadeDistance, 1) : 0);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        scrollEl.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [checkScroll]);

  const getMaskStyle = () => {
    if (leftFade === 0 && rightFade === 0) return {};

    const maxFade = 80;
    const leftSize = Math.round(leftFade * maxFade);
    const rightSize = Math.round(rightFade * maxFade);

    const gradient = `linear-gradient(to right, transparent, black ${leftSize}px, black calc(100% - ${rightSize}px), transparent)`;

    return {
      maskImage: gradient,
      WebkitMaskImage: gradient,
    };
  };

  return { scrollRef, getMaskStyle };
}
