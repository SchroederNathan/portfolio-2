"use client";

import ThemeToggle from "@/components/theme-toggle";
import Reveal from "@/components/ui/reveal";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/ui/svg-icons";

export default function HeroSection() {
  return (
    <div>
      <Reveal delay={0}>
        <div className="flex flex-row justify-between gap-3 mb-3">
          <h1
            className="text-4xl font-exposure font-black"
            style={{ fontVariationSettings: "'wght' 1000, 'opsz' -30" }}
          >
            hey, I&apos;m Nate
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
          <a
            href="https://x.com/nater02"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 active:scale-90 transition-transform duration-200"
          >
            <XIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          </a>
          <a
            href="https://www.instagram.com/nathanschroederr/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 active:scale-90 transition-transform duration-200"
          >
            <InstagramIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          </a>
          <a
            href="https://www.linkedin.com/in/nathan-schroeder-a40aa2210/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 active:scale-90 transition-transform duration-200"
          >
            <LinkedInIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          </a>
          <a
            href="https://github.com/SchroederNathan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-105 active:scale-90 transition-transform duration-200"
          >
            <GitHubIcon className="text-muted hover:text-foreground transition-colors duration-300" />
          </a>
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        <p className="text-lg text-muted mb-8">
          I build cool stuff that actually feels good to use whether it's a
          personal/internal tool or a large-scale application. I care about
          the details.{" "}
          <span
            className="italic font-exposure text-foreground"
            style={{ fontFamily: "Exposure-30" }}
          >
            elegant
          </span>{" "}
          UI,{" "}
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
    </div>
  );
}
