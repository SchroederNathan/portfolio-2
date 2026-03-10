"use client";

import { caseStudies } from "@/data/case-studies";
import { useState } from "react";
import CaseStudyCard from "./card";

const CaseStudiesContainer = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="mb-16">
      <h2 className="text-lg font-bold text-foreground mb-6">Featured Work</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {caseStudies.map((study, index) => (
          <CaseStudyCard
            key={study.title}
            study={study}
            isHovered={hoveredIndex === index}
            isAnyHovered={hoveredIndex !== null}
            onHoverChange={(hovered) =>
              setHoveredIndex(hovered ? index : null)
            }
          />
        ))}
      </div>
    </section>
  );
};

export default CaseStudiesContainer;
