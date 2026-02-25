import type { Metadata } from "next";
import ProjectsPageContent from "@/components/projects/projects-page-content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Software projects by Nathan Schroeder including Movati, FocusGrid, and ThemeGen. React Native, Next.js, and full-stack development.",
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
