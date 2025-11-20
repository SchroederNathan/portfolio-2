"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import React from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  blurStrength?: number;
  rotation?: number;
  yOffset?: number;
  duration?: number;
  delay?: number;
}

export const Reveal = ({
  children,
  className,
  blurStrength = 4,
  rotation = 3,
  yOffset = 40,
  duration = 0.8,
  delay = 0,
}: RevealProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blurStrength}px)`,
        rotate: rotation,
        y: yOffset,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        rotate: 0,
        y: 0,
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier for smooth ease-out
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
