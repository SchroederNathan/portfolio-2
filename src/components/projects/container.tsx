"use client";

import ProjectCard from "@/components/projects/card";
import FilterTags from "@/components/projects/filter-tags";
import { projects, type ProjectCategory } from "@/data/projects";
import { ArrowUpRightIcon } from "@/components/ui/svg-icons";
import { useHorizontalScroll } from "@/hooks/useHorizontalScroll";
import Link from "next/link";
import { useState, useMemo } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

const ProjectsContainer = () => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory | null>(null);
  const { scrollRef, getMaskStyle } = useHorizontalScroll();

  const filteredProjects = useMemo(
    () =>
      selectedCategory
        ? projects.filter((p) => p.categories.includes(selectedCategory))
        : projects,
    [selectedCategory]
  );

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

      <div className="mb-4">
        <FilterTags
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* Horizontal scrolling container - extra padding to accommodate hover background overflow */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
        <div
          ref={scrollRef}
          className="flex gap-12 overflow-x-auto px-4 sm:px-6 lg:px-8 pt-4 pb-10 scrollbar-hide"
          style={getMaskStyle()}
        >
          <LayoutGroup>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <ProjectCard
                    project={project}
                    isHovered={hoveredKey === project.title}
                    isAnyHovered={hoveredKey !== null}
                    onHoverChange={(hovered) =>
                      setHoveredKey(hovered ? project.title : null)
                    }
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </div>
    </section>
  );
};

export default ProjectsContainer;
