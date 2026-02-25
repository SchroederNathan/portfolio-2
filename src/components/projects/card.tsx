"use client";

import { Project } from "@/data/projects";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRightIcon, LinkIcon } from "../ui/svg-icons";

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

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

const ProjectCard = ({
  project,
  isHovered,
  isAnyHovered,
  onHoverChange,
}: ProjectCardProps) => {
  const isDesktop = useIsDesktop();
  // Calculate opacity: dim if any card is hovered but not this one (desktop only)
  const cardOpacity = isDesktop && isAnyHovered && !isHovered ? 0.5 : 1;

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        className="group relative flex flex-col w-[320px] shrink-0"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        animate={{ opacity: cardOpacity }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Card background with hover effect - extends beyond content like experience card */}
        <motion.div
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl lg:-inset-x-6 lg:block bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{
            scale: isDesktop && isHovered ? 1 : 0.98,
            opacity: isDesktop && isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />

        {/* Content container */}
        <div className="relative z-10 flex flex-col">
          {/* Title and description */}
          <div className="mb-4">
            <p className="text-lg text-foreground flex items-center mb-2">
              {project.title}
              <motion.span
                className="-mb-4 ms-2 text-muted group-hover:text-foreground transition-colors duration-200"
                animate={{
                  x: isHovered ? 4 : 0,
                  y: isHovered ? -4 : 0,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ArrowUpRightIcon size={14} />
              </motion.span>
            </p>
            <p className="text-muted text-sm mb-3">{project.description}</p>

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs text-muted rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Media container - image/video at bottom */}
          <div
            className="relative w-full rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.05)] drop-shadow-lg p-px"
            style={{ aspectRatio: "1.9047619048" }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              {/* Image */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  isHovered && project.video ? "opacity-0" : "opacity-100"
                }`}
              />

              {/* Video - only shown on hover if available */}
              {project.video && (
                <video
                  src={project.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              )}
            </div>
          </div>

          {/* URL bar - external link with stopPropagation */}
          {project.url && (
            <motion.div
              role="link"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(project.url, "_blank", "noopener,noreferrer");
              }}
              className="flex items-center justify-between gap-2 pt-3 cursor-pointer"
              animate={{
                opacity: isHovered ? 1 : 0,
                filter: isHovered ? "blur(0px)" : "blur(4px)",
                y: isHovered ? 0 : -8,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span className="text-xs text-muted truncate flex-1">
                {project.url}
              </span>
              <LinkIcon size={14} className="text-muted shrink-0" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
