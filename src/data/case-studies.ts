export interface CaseStudy {
  title: string;
  impact: string;
  tags: string[];
  github?: string;
  url?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    title: "macro-ai",
    impact: "AI-powered macro tracker with a chat-first UX",
    tags: ["Next.js", "OpenAI", "Tailwind CSS"],
    github: "https://github.com/nschroeder/macro-ai",
    url: "https://macro-ai.vercel.app",
  },
  {
    title: "theme-gen",
    impact: "Developer tool for generating accessible color themes",
    tags: ["Next.js", "Tailwind CSS", "WCAG"],
    github: "https://github.com/nschroeder/theme-gen",
    url: "https://themegen.dev",
  },
  {
    title: "rylie-meals",
    impact: "Personalized meal planning app with AI suggestions",
    tags: ["React Native", "Expo", "OpenAI"],
    github: "https://github.com/nschroeder/rylie-meals",
  },
];
