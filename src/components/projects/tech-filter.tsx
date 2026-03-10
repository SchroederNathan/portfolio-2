"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface TechFilterProps {
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
}

export default function TechFilter({
  allTags,
  selectedTags,
  onToggleTag,
  onClear,
}: TechFilterProps) {
  const hasSelection = selectedTags.length > 0;

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {/* All / Clear button */}
      <button
        type="button"
        onClick={onClear}
        className={cn(
          "px-3 py-1.5 text-xs rounded-lg transition-all duration-200 cursor-pointer",
          !hasSelection
            ? "bg-foreground text-background shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
            : "text-muted bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg hover:text-foreground"
        )}
      >
        All
      </button>

      {allTags.map((tag) => {
        const isSelected = selectedTags.includes(tag);

        return (
          <motion.button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            layout
            className={cn(
              "px-3 py-1.5 text-xs rounded-lg transition-all duration-200 cursor-pointer",
              isSelected
                ? "bg-foreground text-background shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
                : "text-muted bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg hover:text-foreground"
            )}
          >
            {tag}
          </motion.button>
        );
      })}
    </div>
  );
}
