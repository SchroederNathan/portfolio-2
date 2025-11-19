"use client";

import ExperienceContainer from "@/components/experience/container";
import VariableProximity from "@/components/ui/variable-proximity";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MoonIcon,
  XIcon,
} from "@/components/ui/svg-icons";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl sm:py-32 py-16 lg:pb-40">
        <h1 className="sr-only">Nathan Schroeder</h1>
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
          <MoonIcon className="text-muted hover:text-foreground transition-colors duration-300" />
        </div>
        <p className="text-lg font-sans text-muted mb-3">
          developer, UI/UX designer
        </p>
        <div className="flex flex-row gap-3 mb-8">
          <XIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          <InstagramIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          <LinkedInIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          <GitHubIcon className="text-muted hover:text-foreground transition-colors duration-300" />
        </div>
        <p className="text-lg text-muted mb-8">
          I build cool stuff that actually feels good to use whether its a
          personal/internal tool or a large- scale application. I care about the
          details.{" "}
          <span className="italic font-exposure font-bold text-foreground">
            elegant
          </span>{" "}
          Ul,{" "}
          <span className="italic font-exposure font-bold text-foreground">
            great
          </span>{" "}
          performance, and code that doesn&apos;t feel like a mess. <br />{" "}
          <br />I dabble in a lot of frontend and backend frameworks, but
          currently I&apos;m focused on React Native development and NextJS for
          web.
        </p>
        <ExperienceContainer />
      </div>
    </div>
  );
}
