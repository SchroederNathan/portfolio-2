"use client";

import { PROJECT_CATEGORIES, type ProjectCategory } from "@/data/projects";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FilterTagsProps {
  selected: ProjectCategory | null;
  onChange: (category: ProjectCategory | null) => void;
}

export default function FilterTags({ selected, onChange }: FilterTagsProps) {
  const filters: (ProjectCategory | null)[] = [null, ...PROJECT_CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((category) => {
        const isActive = selected === category;
        const label = category ?? "All";

        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(category)}
            className={cn(
              "relative px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-colors duration-200",
              isActive ? "text-background" : "text-muted hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="filter-active-pill"
                className="absolute inset-0 rounded-lg bg-foreground"
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              />
            )}
            {!isActive && (
              <div className="absolute inset-0 rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg" />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
