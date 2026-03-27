export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectProof {
  role: string;
  timeline: string;
  impact: string;
}

export interface Project {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  metrics?: ProjectMetric[];
  proof?: ProjectProof;
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
    metrics: [
      { label: "Docs quality", value: "Production-ready patterns" },
      { label: "Audience", value: "React Native teams" },
      { label: "Delivery", value: "Live demos + copy/paste guides" },
    ],
    proof: {
      role: "Product designer + frontend engineer",
      timeline: "0 → launch-ready documentation system",
      impact: "Made advanced motion patterns easier to evaluate and adopt with clear implementation examples.",
    },
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
    metrics: [
      { label: "Platform", value: "iOS + Android" },
      { label: "Core flows", value: "Booking, account, fitness" },
      { label: "Stack", value: "Expo app + Laravel APIs" },
    ],
    proof: {
      role: "Mobile engineer",
      timeline: "Multi-feature product delivery",
      impact: "Shipped class-booking and account-management experiences for a real membership base.",
    },
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
    metrics: [
      { label: "Use case", value: "Focused work sessions" },
      { label: "Product surface", value: "Tasks + progress tracking" },
      { label: "Design goal", value: "Low-friction daily retention" },
    ],
    proof: {
      role: "Product-minded indie builder",
      timeline: "Rapid MVP to usable product",
      impact: "Turned a simple focus timer idea into a more complete productivity system with habit-building hooks.",
    },
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
    metrics: [
      { label: "Positioning", value: "SEO-friendly design utility" },
      { label: "Differentiator", value: "Contrast auditing + exports" },
      { label: "Business angle", value: "Launch + monetize tooling" },
    ],
    proof: {
      role: "Founder + full-stack product engineer",
      timeline: "Iterative public shipping",
      impact: "Built a design utility with clear accessibility value, stronger shareability, and room for monetized premium workflows.",
    },
    video: undefined,
    url: "https://themegen.dev",
  },
];
