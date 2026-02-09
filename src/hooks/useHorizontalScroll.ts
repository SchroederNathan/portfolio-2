"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useHorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
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
    const fadeSize = "80px";

    if (canScrollLeft && canScrollRight) {
      return {
        maskImage: `linear-gradient(to right, transparent, black ${fadeSize}, black calc(100% - ${fadeSize}), transparent)`,
        WebkitMaskImage: `linear-gradient(to right, transparent, black ${fadeSize}, black calc(100% - ${fadeSize}), transparent)`,
      };
    } else if (canScrollLeft) {
      return {
        maskImage: `linear-gradient(to right, transparent, black ${fadeSize})`,
        WebkitMaskImage: `linear-gradient(to right, transparent, black ${fadeSize})`,
      };
    } else if (canScrollRight) {
      return {
        maskImage: `linear-gradient(to left, transparent, black ${fadeSize})`,
        WebkitMaskImage: `linear-gradient(to left, transparent, black ${fadeSize})`,
      };
    }
    return {};
  };

  return { scrollRef, getMaskStyle };
}
