"use client";

import ProjectCard, { Project } from "@/components/projects/card";
import { useCallback, useEffect, useRef, useState } from "react";

const projects: Project[] = [
  {
    title: "Movati",
    description: "Class booking and account management app",
    image: "/images/movati.jpg",
    tags: ["React Native", "Expo", "Laravel"],
    video: undefined,
    url: "https://movatiathletic.com",
  },
  {
    title: "FocusGrid",
    description: "Productivity app for focused work",
    image: "/images/focusgrid.png",
    tags: ["React Native", "Expo"],
    video: undefined,
    url: "https://focusgridapp.com",
  },
  {
    title: "Medley",
    description: "A media tracking and recommendation app",
    image: "/images/medley.jpg",
    tags: ["React Native", "Expo", "PostgreSQL"],
    video: undefined,
    url: "https://medley.app",
  },
];

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
      <p className="text-foreground mb-4 font-bold text-xl">Projects</p>

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
