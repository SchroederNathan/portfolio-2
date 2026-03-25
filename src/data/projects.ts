export type ProjectCategory = "Web" | "Mobile" | "AI" | "Tools";

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Web",
  "Mobile",
  "AI",
  "Tools",
];

export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  categories: ProjectCategory[];
  video?: string;
  url?: string;
}

export const projects: Project[] = [
  {
    title: "React Native Motion",
    slug: "rnmotion",
    description: "Beautiful animation library for React Native",
    longDescription:
      "A comprehensive animation library and documentation site for React Native and Expo developers. Features production-ready animation patterns like gallery stack carousels and radial menus, with detailed implementation guides, live video previews, and copy-paste ready code.",
    image: "/images/rnmotion.png",
    tags: ["React Native", "Next.js", "MDX"],
    categories: ["Mobile", "Tools"],
    video: undefined,
    url: "https://rnmotion.dev",
  },
  {
    title: "Movati",
    slug: "movati",
    description: "Class booking and account management app",
    longDescription:
      "A comprehensive fitness app for Movati Athletic members to book classes, manage their accounts, and track their fitness journey. Built with React Native and Expo for cross-platform support, with a Laravel backend for robust API functionality.",
    image: "/images/movati.jpg",
    tags: ["React Native", "Expo", "Laravel"],
    categories: ["Mobile"],
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
    categories: ["Mobile"],
    video: undefined,
    url: "https://focusgridapp.com",
  },

  {
    title: "ThemeGen",
    slug: "themegen",
    description: "Theme generator with WCAG contrast auditing",
    longDescription:
      "A visual theme generator for creating accessible, shareable color palettes. Pick colors, check contrast ratios against WCAG standards, and export production-ready theme code. Features smart shuffle, color locking, light/dark mode, URL sharing, and export to CSS, Tailwind, and SCSS.",
    image: "/images/themegen.png",
    tags: ["Next.js", "Tailwind CSS", "WCAG"],
    categories: ["Web", "Tools"],
    video: undefined,
    url: "https://themegen.dev",
  },
];
