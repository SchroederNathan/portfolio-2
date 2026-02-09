"use client";

import PlaygroundCard from "@/components/playground/card";
import { playgroundItems } from "@/data/playground";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import { useState } from "react";

const PlaygroundContainer = () => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const { scrollRef, getMaskStyle } = useHorizontalScroll();

  return (
    <section id="PLAYGROUND" className="mb-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-foreground font-bold text-xl">Playground</p>
      </div>

      {/* Horizontal scrolling container */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 scrollbar-hide"
          style={getMaskStyle()}
        >
          {playgroundItems.map((item) => (
            <PlaygroundCard
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

export default PlaygroundContainer;
