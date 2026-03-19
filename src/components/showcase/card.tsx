"use client";

import { ShowcaseItem } from "@/data/showcase";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

interface ShowcaseCardProps {
  item: ShowcaseItem;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const ShowcaseCard = ({
  item,
  isHovered,
  isAnyHovered,
  onHoverChange,
}: ShowcaseCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardOpacity = isAnyHovered && !isHovered ? 0.5 : 1;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isHovered) {
      video.currentTime = 0;
      const playPromise = video.play();
      playPromise?.catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isHovered]);

  return (
    <motion.div
      className="group relative flex w-[320px] shrink-0 flex-col cursor-default"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      animate={{ opacity: cardOpacity }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl lg:-inset-x-6 lg:block bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0.98,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      <div className="relative z-10 flex flex-col pb-2 lg:pb-3">
        <div className="mb-4">
          <p className="text-lg text-foreground mb-2">{item.title}</p>
          <p className="text-muted text-sm mb-3">{item.description}</p>

          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-muted rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="relative w-full rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.05)] drop-shadow-lg p-px"
          style={{ aspectRatio: "1 / 1" }}
        >
          <div className="relative w-full h-full rounded-lg overflow-hidden bg-white">
            <video
              ref={videoRef}
              src={item.video}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 block h-full w-full object-contain"
            />

            <motion.div
              className="pointer-events-none absolute inset-0 bg-black/10"
              animate={{ opacity: isHovered ? 0 : 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShowcaseCard;
