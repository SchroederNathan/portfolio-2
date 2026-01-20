"use client";

import ProjectCard from "@/components/projects/card";
import { projects } from "@/data/projects";
import { ArrowUpRightIcon } from "@/components/ui/svg-icons";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const ProjectsContainer = () => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
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

  // Build mask based on scroll position
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

  return (
    <section id="PROJECTS" className="mb-3">
      <Link
        href="/projects"
        className="group flex items-center justify-between mb-4"
      >
        <p className="text-foreground font-bold text-xl">Projects</p>
        <div className="flex items-center gap-1.5 text-muted group-hover:text-foreground transition-colors duration-200">
          <span className="text-sm">View All</span>
          <ArrowUpRightIcon size={12} />
        </div>
      </Link>

      {/* Horizontal scrolling container - extra padding to accommodate hover background overflow */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 scrollbar-hide"
          style={getMaskStyle()}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              isHovered={hoveredKey === project.title}
              isAnyHovered={hoveredKey !== null}
              onHoverChange={(hovered) =>
                setHoveredKey(hovered ? project.title : null)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsContainer;
