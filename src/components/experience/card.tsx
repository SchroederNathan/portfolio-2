"use client";

import { ArrowUpRightIcon } from "../ui/svg-icons";
import { motion } from "motion/react";
import { useState } from "react";

export interface Experience {
  role: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  url?: string;
}

const formatDateRange = (startDate: Date, endDate?: Date): string => {
  const startYear = startDate.getFullYear();
  const endYear = endDate ? endDate.getFullYear() : null;

  if (endYear) {
    return `${startYear} - ${endYear}`;
  }
  return `${startYear} - present`;
};

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const [isHovered, setIsHovered] = useState(false);
  const dateRange = formatDateRange(experience.startDate, experience.endDate);
  const isWork =
    !experience.url?.includes("college") &&
    !experience.url?.includes("education");
  const groupType = isWork ? "work" : "education";
  const groupClass = `group/${groupType}`;

  const content = (
    <div 
      className="group flex flex-row flex-basis relative pb-1 transition-all md:grid-cols-8 md:gap-8 lg:gap-4 lg:hover:opacity-100! lg:group-hover/list:opacity-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover background effect */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-foreground/5 lg:group-hover:shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] lg:group-hover:drop-shadow-lg"></div>

      {/* Date header - hidden on small screens */}
      <header className="basis-1/4 max-md:hidden text-muted z-10">
        {dateRange}
      </header>

      {/* Main content */}
      <main className="md:basis-3/4 z-10">
        {/* Date - shown on small screens */}
        <p className="md:hidden block text-muted z-10 mb-3">{dateRange}</p>

        {/* Role/Title and Company */}
        <p className="text-lg text-foreground  flex items-center mb-3">
          {experience.role}
          <span className="text-foreground ms-2">·</span>
          <span className="text-foreground ms-2"> {experience.company}</span>
          <motion.span
            className="-mb-4 ms-2 text-muted group-hover/work:text-foreground group-hover/education:text-foreground transition-colors duration-200"
            animate={{ 
              x: isHovered ? 4 : 0, 
              y: isHovered ? -4 : 0 
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ArrowUpRightIcon size={14} />
          </motion.span>
        </p>

        {/* Description */}
        {experience.description && (
          <p className="text-muted">{experience.description}</p>
        )}
      </main>
    </div>
  );

  if (experience.url) {
    return (
      <li className={`mb-12 ${groupClass}`}>
        <a href={experience.url} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </li>
    );
  }

  return <li className={`mb-12 ${groupClass}`}>{content}</li>;
};

export default ExperienceCard;
