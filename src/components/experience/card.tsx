"use client";

import { ArrowUpRightIcon } from "../ui/svg-icons";
import { motion } from "motion/react";

export interface Experience {
  role: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  url?: string;
}

interface ExperienceCardProps {
  experience: Experience;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

const formatDateRange = (startDate: Date, endDate?: Date): string => {
  const startYear = startDate.getFullYear();
  const endYear = endDate ? endDate.getFullYear() : null;

  if (endYear) {
    return `${startYear} - ${endYear}`;
  }
  return `${startYear} - present`;
};

const ExperienceCard = ({ experience, isHovered, isAnyHovered, onHoverChange }: ExperienceCardProps) => {
  const dateRange = formatDateRange(experience.startDate, experience.endDate);
  const isWork =
    !experience.url?.includes("college") &&
    !experience.url?.includes("education");
  const groupType = isWork ? "work" : "education";
  const groupClass = `group/${groupType}`;

  // Calculate opacity: dim if any card is hovered but not this one
  const cardOpacity = isAnyHovered && !isHovered ? 0.5 : 1;

  const content = (
    <motion.div 
      className="group flex flex-row flex-basis relative pb-1 md:grid-cols-8 md:gap-8 lg:gap-4"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      animate={{ opacity: cardOpacity }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Hover background effect */}
      <motion.div 
        className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md lg:-inset-x-6 lg:block bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0.98,
          opacity: isHovered ? 1 : 0
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

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
    </motion.div>
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
