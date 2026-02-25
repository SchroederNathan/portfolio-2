"use client";

import { playgroundItems } from "@/data/playground";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import ParticleEffects from "@/components/playground/experiments/particle-effects";

const experimentComponents: Record<string, ComponentType> = {
  "particle-effects": ParticleEffects,
};

export default function PlaygroundPageContent({ slug }: { slug: string }) {
  const item = playgroundItems.find((i) => i.slug === slug);
  const ExperimentComponent = experimentComponents[slug];

  if (!item || !ExperimentComponent) {
    notFound();
  }

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl py-16 sm:py-32">
        <Link
          href="/"
          className="group flex items-center gap-3 mb-8"
        >
          <div className="text-muted group-hover:text-foreground transition-colors duration-200">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19l-7-7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-foreground font-bold text-2xl">{item.title}</h1>
        </Link>

        <ExperimentComponent />
      </div>
    </div>
  );
}
