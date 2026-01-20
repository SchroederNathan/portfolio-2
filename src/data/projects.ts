export interface Project {
  title: string;
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
    description: "Productivity app for focused work",
    longDescription:
      "A minimalist productivity application designed to help users stay focused and accomplish their goals. Features include customizable focus sessions, task management, and progress tracking to boost daily productivity.",
    image: "/images/focusgrid.png",
    tags: ["React Native", "Expo"],
    video: undefined,
    url: "https://focusgridapp.com",
  },
  {
    title: "Medley",
    description: "A media tracking and recommendation app",
    longDescription:
      "A personal media tracking application that helps users catalog and discover movies, TV shows, books, and music. Features intelligent recommendations based on user preferences and a clean interface for managing your media library.",
    image: "/images/medley.jpg",
    tags: ["React Native", "Expo", "PostgreSQL"],
    video: undefined,
    url: "https://medley.app",
  },
];
