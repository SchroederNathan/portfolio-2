export interface PlaygroundItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  slug: string;
}

export const playgroundItems: PlaygroundItem[] = [
  {
    title: "Particle Effects",
    description: "Interactive particle system with physics-based animations",
    image: "/images/playground/particle-effects.png",
    tags: ["Canvas", "Animation", "Physics"],
    slug: "particle-effects",
  },
];
