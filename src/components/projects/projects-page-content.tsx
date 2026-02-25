"use client";

import { projects } from "@/data/projects";
import { ArrowUpRightIcon, LinkIcon } from "@/components/ui/svg-icons";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
};

export default function ProjectsPageContent() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isDesktop = useIsDesktop();

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl py-16 sm:py-32">
        <Link
          href="/"
          className="group flex items-center gap-3 mb-8"
        >
          <div className="text-muted group-hover:text-foreground transition-colors duration-200">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-foreground font-bold text-2xl">All Projects</h1>
        </Link>

        <div className="flex flex-col gap-8">
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const cardOpacity = isDesktop && isAnyHovered && !isHovered ? 0.5 : 1;

            return (
              <Link
                key={project.title}
                href={`/projects/${project.slug}`}
              >
                <motion.div
                  className="group relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{ opacity: cardOpacity }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Card background with hover effect */}
                  <motion.div
                    className="absolute -inset-4 z-0 hidden rounded-xl lg:block bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{
                      scale: isDesktop && isHovered ? 1 : 0.98,
                      opacity: isDesktop && isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Left: Image */}
                    <div className="relative sm:w-40 shrink-0 self-start">
                      <div
                        className="relative w-full rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.05)] drop-shadow-lg p-px overflow-hidden aspect-video"
                      >
                        <div className="relative w-full h-full rounded-lg overflow-hidden">
                          <Image
                            src={project.image}
                            alt={`Screenshot of ${project.title} — ${project.description}`}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Middle: Title, Description, Tags */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-lg text-foreground font-medium">
                          {project.title}
                        </h2>
                        <motion.span
                          className="-mb-4 text-muted group-hover:text-foreground transition-colors duration-200"
                          animate={{
                            x: isHovered ? 4 : 0,
                            y: isHovered ? -4 : 0,
                          }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <ArrowUpRightIcon size={14} />
                        </motion.span>
                      </div>

                      <p className="text-muted text-sm mb-3">
                        {project.longDescription || project.description}
                      </p>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 text-xs text-muted rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: External link */}
                    {project.url && (
                      <div className="flex items-center sm:items-start shrink-0">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 hover:text-foreground transition-colors duration-200"
                        >
                          <span className="text-xs text-muted truncate max-w-[120px] sm:max-w-[150px]">
                            {project.url.replace(/^https?:\/\//, "")}
                          </span>
                          <LinkIcon size={14} className="text-muted shrink-0" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
