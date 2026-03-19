"use client";

import ShowcaseCard from "@/components/showcase/card";
import { showcaseItems } from "@/data/showcase";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useEffect, useState } from "react";

const ShowcaseContainer = () => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [centeredKey, setCenteredKey] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const { scrollRef, getMaskStyle } = useHorizontalScroll();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: none) and (pointer: coarse)");

    const syncTouchMode = () => {
      setIsTouchDevice(mediaQuery.matches);
    };

    syncTouchMode();
    mediaQuery.addEventListener("change", syncTouchMode);

    return () => {
      mediaQuery.removeEventListener("change", syncTouchMode);
    };
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (!scrollElement || !isTouchDevice) {
      return;
    }

    let frameId = 0;

    const updateCenteredCard = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const containerRect = scrollElement.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const cards = Array.from(
          scrollElement.querySelectorAll<HTMLElement>("[data-showcase-slug]"),
        );

        let nextCenteredKey: string | null = null;
        let closestDistance = Number.POSITIVE_INFINITY;

        for (const card of cards) {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            nextCenteredKey = card.dataset.showcaseSlug ?? null;
          }
        }

        setCenteredKey(nextCenteredKey);
      });
    };

    updateCenteredCard();
    scrollElement.addEventListener("scroll", updateCenteredCard, { passive: true });
    window.addEventListener("resize", updateCenteredCard);

    return () => {
      cancelAnimationFrame(frameId);
      scrollElement.removeEventListener("scroll", updateCenteredCard);
      window.removeEventListener("resize", updateCenteredCard);
    };
  }, [isTouchDevice, scrollRef]);

  return (
    <section id="SHOWCASE" className="mb-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-foreground font-bold text-xl">Showcase</p>
      </div>

      <div className="relative -mx-4 overflow-hidden sm:-mx-6 lg:-mx-8">
        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto overflow-y-hidden px-4 pt-4 pb-10 sm:px-6 lg:px-8 scrollbar-hide"
          style={getMaskStyle()}
        >
          {showcaseItems.map((item) => (
            <ShowcaseCard
              key={item.slug}
              item={item}
              isHovered={hoveredKey === item.slug}
              isAnyHovered={!isTouchDevice && hoveredKey !== null}
              shouldPlay={
                isTouchDevice ? centeredKey === item.slug : hoveredKey === item.slug
              }
              isTouchDevice={isTouchDevice}
              onHoverChange={(hovered) =>
                setHoveredKey(hovered ? item.slug : null)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseContainer;
