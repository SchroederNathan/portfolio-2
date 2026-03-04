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
      "A visual theme generator for creating accessible, shareable color palettes. Pick colors, check contrast ratios against WCAG standards, and export production-ready theme code. Features smart shuffle, color locking, light/dark mode, URL sharing, and export to CSS, Tailwind, and SCSS.",
    image: "/images/themegen.png",
    tags: ["Next.js", "Tailwind CSS", "WCAG"],
    video: undefined,
    url: "https://themegen.dev",
  },
  {
    title: "favicon-gen",
    slug: "favicon-gen",
    description: "Generate all favicon sizes instantly — from image, emoji, or color",
    longDescription:
      "A browser-based favicon generator that creates all 7 PNG sizes (16px to 512px), a ZIP with HTML snippets and manifest.json, and Apple-style rounded corners on large icons — all from an uploaded image, typed emoji, or solid color. No backend, no uploads, no accounts.",
    image: "/images/favicon-gen.png",
    tags: ["Next.js", "TypeScript", "Canvas API"],
    video: undefined,
    url: "https://favicon-gen.vercel.app",
  },
  {
    title: "og-checker",
    slug: "og-checker",
    description: "Preview and audit Open Graph tags — Twitter, Facebook, LinkedIn",
    longDescription:
      "Paste any URL and see pixel-faithful previews of how your link looks on Twitter/X, Facebook, and LinkedIn — plus a scored OG audit checklist and a full raw meta tags table. Server-side fetching bypasses CORS and resolves relative image URLs.",
    image: "/images/og-checker.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    video: undefined,
    url: "https://og-checker.vercel.app",
  },
];
