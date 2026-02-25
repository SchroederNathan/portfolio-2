"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRightIcon } from "../ui/svg-icons";

export function ProjectUrl({ url }: { url: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors duration-200 mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span>{url.replace(/^https?:\/\//, "")}</span>
      <motion.span
        className="-mb-2"
        animate={{
          x: isHovered ? 4 : 0,
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <ArrowUpRightIcon size={14} />
      </motion.span>
    </a>
  );
}
