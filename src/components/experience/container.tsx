"use client";

import ExperienceCard, { Experience } from "@/components/experience/card";
import { useState } from "react";

const experiences: Experience[] = [
  {
    role: "Software Developer",
    company: "Red Piston",
    startDate: new Date("2025-04-01"),
    description: `I spend of my time designing, building, and maintaining mobile apps 
        in React Native SwiftUl, and Java with products that reached over 130k monthly 
        active users. I also work on several web applications using React and Laravel. 
        Besides development, I helped shape parts of our Devops worklow, setting up servers,
         managing CI/CU pipelines. and working with AWS`,
    url: "https://redpiston.com/",
  },
  {
    role: "Mobile Applications Development",
    company: "St. Clair College",
    startDate: new Date("2020-09-01"),
    endDate: new Date("2024-05-01"),
    description: `In this program I learned to develop, test, and deploy a variety of native mobile and web applications for multiple platforms while also designing, modeling, implementing and maintain databases within. I also learned how to design user-friendly prototypes inside these applications using tools like Figma. This program also gave me plenty of opportunity to work and lead teams to accomplish larger scale projects.`,
    url: "https://www.stclaircollege.ca/",
  },
];

const ExperienceContainer = () => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  return (
    <section
      id="EXPERIENCE"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <p className="text-foreground mb-8 font-bold text-xl">Experience</p>
      <ol>
        {experiences.map((experience) => (
          <ExperienceCard 
            key={experience.company} 
            experience={experience}
            isHovered={hoveredKey === experience.company}
            isAnyHovered={hoveredKey !== null}
            onHoverChange={(hovered) => setHoveredKey(hovered ? experience.company : null)}
          />
        ))}
      </ol>
    </section>
  );
};

export default ExperienceContainer;
