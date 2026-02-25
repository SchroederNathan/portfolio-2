import ExperienceContainer from "@/components/experience/container";
import HeroSection from "@/components/hero-section";
import MusicCard from "@/components/music-card";
import PlaygroundContainer from "@/components/playground/container";
import ProjectsContainer from "@/components/projects/container";
import Reveal from "@/components/ui/reveal";

export default function Home() {
  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl sm:py-32 py-16 lg:pb-40">
        <HeroSection />
        <Reveal delay={0.35}>
          <ProjectsContainer />
        </Reveal>
        <Reveal delay={0.375}>
          <PlaygroundContainer />
        </Reveal>
        <Reveal delay={0.4}>
          <ExperienceContainer />
        </Reveal>
        <Reveal delay={0.45}>
          <MusicCard search="From the swamp" />
        </Reveal>
      </div>
    </div>
  );
}
