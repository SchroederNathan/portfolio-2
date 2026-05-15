"use client";

import { ShowcaseItem } from "@/data/showcase";
import { ArrowUpRightIcon, LinkIcon } from "@/components/ui/svg-icons";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

interface ShowcaseCardProps {
  item: ShowcaseItem;
  isHovered: boolean;
  isAnyHovered: boolean;
  shouldPlay: boolean;
  isTouchDevice: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const ShowcaseCard = ({
  item,
  isHovered,
  isAnyHovered,
  shouldPlay,
  isTouchDevice,
  onHoverChange,
}: ShowcaseCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardOpacity = isTouchDevice ? 1 : isAnyHovered && !isHovered ? 0.5 : 1;

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (shouldPlay) {
      video.currentTime = 0;
      const playPromise = video.play();
      playPromise?.catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [shouldPlay]);

  return (
    <motion.div
      className={`group relative flex w-[320px] shrink-0 flex-col ${item.url ? "cursor-pointer" : "cursor-default"}`}
      onClick={() => {
        if (item.url) {
          window.open(item.url, "_blank", "noopener,noreferrer");
        }
      }}
      data-showcase-slug={item.slug}
      onMouseEnter={() => {
        if (!isTouchDevice) {
          onHoverChange(true);
        }
      }}
      onMouseLeave={() => {
        if (!isTouchDevice) {
          onHoverChange(false);
        }
      }}
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
          <p className="text-lg text-foreground flex items-center mb-2">
            {item.title}
            {item.url && (
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
            )}
          </p>
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
              animate={{ opacity: shouldPlay ? 0 : 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* URL bar */}
        {item.url && (
          <motion.div
            className="flex items-center justify-between gap-2 pt-3"
            animate={{
              opacity: isHovered ? 1 : 0,
              filter: isHovered ? "blur(0px)" : "blur(4px)",
              y: isHovered ? 0 : -8,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span className="text-xs text-muted truncate flex-1">
              {item.url}
            </span>
            <LinkIcon size={14} className="text-muted shrink-0" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ShowcaseCard;
