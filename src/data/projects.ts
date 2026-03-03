export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  video?: string;
  url?: string;
}

export const projects: Project[] = [
  {
    title: "Movati",
    slug: "movati",
    description: "Class booking and account management app",
    longDescription:
      "A comprehensive fitness app for Movati Athletic members to book classes, manage their accounts, and track their fitness journey. Built with React Native and Expo for cross-platform support, with a Laravel backend for robust API functionality.",
    image: "/images/movati.jpg",
    tags: ["React Native", "Expo", "Laravel"],
    video: undefined,
    url: "https://movatiathletic.com",
  },
  {
    title: "FocusGrid",
    slug: "focusgrid",
    description: "Productivity app for focused work",
    longDescription:
      "A minimalist productivity application designed to help users stay focused and accomplish their goals. Features include customizable focus sessions, task management, and progress tracking to boost daily productivity.",
    image: "/images/focusgrid.png",
    tags: ["React Native", "Expo"],
    video: undefined,
    url: "https://focusgridapp.com",
  },
  // {
  //   title: "Medley",
  //   slug: "medley",
  //   description: "A media tracking and recommendation app",
  //   longDescription:
  //     "A personal media tracking application that helps users catalog and discover movies, TV shows, books, and music. Features intelligent recommendations based on user preferences and a clean interface for managing your media library.",
  //   image: "/images/medley.jpg",
  //   tags: ["React Native", "Expo", "PostgreSQL"],
  //   video: undefined,
  //   url: "https://medley.app",
  // },
  {
    title: "ThemeGen",
    slug: "themegen",
    description: "Theme generator with WCAG contrast auditing",
    longDescription:
      "A visual theme generator for creating accessible, shareable color palettes. Pick colors, check contrast ratios against WCAG standards, and export production-ready theme code. Features smart shuffle, color locking, light/dark mode, URL sharing, and export to CSS, Tailwind, SCSS, and more.",
    image: "/images/themegen.png",
    tags: ["Next.js", "Tailwind CSS", "WCAG"],
    video: undefined,
    url: "https://themegen.dev",
  },
  {
    title: "readme.style",
    slug: "readme-style",
    description: "Beautiful README generator with 5 templates",
    longDescription:
      "Stop shipping ugly READMEs. readme.style lets you fill in a form, pick from 5 professional templates (Minimal, Detailed, Startup, SaaS, CLI), and get polished Markdown instantly. Features GitHub repo import that auto-fills your project info, live preview, copy-to-clipboard, and download.",
    image: "/images/readme-style.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    video: undefined,
    url: "https://readme.style",
  },
];
