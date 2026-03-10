"use client";

import { CaseStudy } from "@/data/case-studies";
import { motion } from "motion/react";
import { ArrowUpRightIcon, GitHubIcon, LinkIcon } from "../ui/svg-icons";

interface CaseStudyCardProps {
  study: CaseStudy;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const CaseStudyCard = ({
  study,
  isHovered,
  isAnyHovered,
  onHoverChange,
}: CaseStudyCardProps) => {
  const cardOpacity = isAnyHovered && !isHovered ? 0.5 : 1;

  return (
    <motion.div
      className="group relative flex-1 min-w-0 rounded-xl p-5 bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      animate={{ opacity: cardOpacity }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Title */}
      <p className="text-lg text-foreground flex items-center mb-2">
        {study.title}
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

      {/* Impact statement */}
      <p className="text-muted text-sm mb-4">{study.impact}</p>

      {/* Tech stack badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {study.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs text-muted rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        {study.github && (
          <a
            href={study.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <GitHubIcon size={18} />
          </a>
        )}
        {study.url && (
          <a
            href={study.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors duration-200 flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <LinkIcon size={18} />
            <span className="text-xs">{study.url.replace(/^https?:\/\//, "")}</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default CaseStudyCard;
