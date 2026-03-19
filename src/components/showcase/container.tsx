"use client";

import ShowcaseCard from "@/components/showcase/card";
import { showcaseItems } from "@/data/showcase";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useState } from "react";

const ShowcaseContainer = () => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const { scrollRef, getMaskStyle } = useHorizontalScroll();

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
              isAnyHovered={hoveredKey !== null}
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
