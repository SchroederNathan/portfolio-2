"use client";

import ExperienceContainer from "@/components/experience/container";
import MusicCard from "@/components/music-card";
import PlaygroundContainer from "@/components/playground/container";
import ProjectsContainer from "@/components/projects/container";
import ThemeToggle from "@/components/theme-toggle";
import Reveal from "@/components/ui/reveal";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/ui/svg-icons";
import VariableProximity from "@/components/ui/variable-proximity";
import { motion } from "motion/react";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl sm:py-32 py-16 lg:pb-40">
        <h1 className="sr-only">Nathan Schroeder</h1>
        <Reveal delay={0}>
          <div className="flex flex-row justify-between gap-3 mb-3">
            <h1 className="text-4xl font-exposure">
              <VariableProximity
                label="hey, I'm Nate"
                fromFontVariationSettings="'wght' 1000, 'opsz' -30"
                toFontVariationSettings="'wght' 1000, 'opsz' -100"
                containerRef={containerRef}
                radius={100}
                falloff="gaussian"
                className="font-black"
              />
            </h1>
            <ThemeToggle />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg font-sans text-muted mb-3">
            developer, UI/UX designer
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-row gap-3 mb-8">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05, cursor: "pointer" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <XIcon className="text-muted hover:text-foreground transition-colors duration-300" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05, cursor: "pointer" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <InstagramIcon className="text-muted hover:text-foreground transition-colors duration-300" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05, cursor: "pointer" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <LinkedInIcon className="text-muted hover:text-foreground transition-colors duration-300" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05, cursor: "pointer" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <GitHubIcon className="text-muted hover:text-foreground transition-colors duration-300" />
            </motion.button>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="text-lg text-muted mb-8">
            I build cool stuff that actually feels good to use whether its a
            personal/internal tool or a large-scale application. I care about
            the details.{" "}
            <span
              className="italic font-exposure text-foreground"
              style={{ fontFamily: "Exposure-30" }}
            >
              elegant
            </span>{" "}
            Ul,{" "}
            <span
              className="italic font-exposure text-foreground"
              style={{ fontFamily: "Exposure-30" }}
            >
              great
            </span>{" "}
            performance, and code that doesn&apos;t feel like a mess. <br />{" "}
            <br />I dabble in a lot of frontend and backend frameworks, but
            currently I&apos;m focused on React Native development and NextJS
            for web.
          </p>
        </Reveal>
        <Reveal delay={0.35}>
          <ProjectsContainer />
        </Reveal>
        <Reveal delay={0.375}>
          <PlaygroundContainer />
        </Reveal>

        <Reveal delay={0.4}>
          <ExperienceContainer />
        </Reveal>
        <Reveal delay={0.45}>
          <MusicCard search="From the swamp" />
        </Reveal>
      </div>
    </div>
  );
}
