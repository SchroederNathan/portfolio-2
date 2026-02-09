"use client";

import { PlaygroundItem } from "@/data/playground";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "../ui/svg-icons";

interface PlaygroundCardProps {
  item: PlaygroundItem;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const PlaygroundCard = ({
  item,
  isHovered,
  isAnyHovered,
  onHoverChange,
}: PlaygroundCardProps) => {
  const cardOpacity = isAnyHovered && !isHovered ? 0.5 : 1;

  return (
    <Link href={`/playground/${item.slug}`}>
      <motion.div
        className="group relative flex flex-col w-[320px] shrink-0"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        animate={{ opacity: cardOpacity }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Card background with hover effect */}
        <motion.div
          className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl lg:-inset-x-6 lg:block bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0.98,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />

        {/* Content container */}
        <div className="relative z-10 flex flex-col">
          {/* Title and description */}
          <div className="mb-4">
            <p className="text-lg text-foreground flex items-center mb-2">
              {item.title}
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
            <p className="text-muted text-sm mb-3">{item.description}</p>

            {/* Tags */}
            {item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
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

          {/* Image */}
          <div
            className="relative w-full rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.05)] drop-shadow-lg p-px"
            style={{ aspectRatio: "1.9047619048" }}
          >
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PlaygroundCard;
