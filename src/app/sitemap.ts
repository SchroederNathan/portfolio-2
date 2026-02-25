import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { playgroundItems } from "@/data/playground";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projects.map((p) => ({
    url: `https://nathanschroeder.dev/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  const playgroundUrls = playgroundItems.map((item) => ({
    url: `https://nathanschroeder.dev/playground/${item.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://nathanschroeder.dev", lastModified: new Date() },
    { url: "https://nathanschroeder.dev/projects", lastModified: new Date() },
    ...projectUrls,
    ...playgroundUrls,
  ];
}
