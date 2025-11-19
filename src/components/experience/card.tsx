import { ArrowUpRightIcon } from "../ui/svg-icons";

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
  const dateRange = formatDateRange(experience.startDate, experience.endDate);
  const isWork =
    !experience.url?.includes("college") &&
    !experience.url?.includes("education");
  const groupType = isWork ? "work" : "education";
  const groupClass = `group/${groupType}`;

  const content = (
    <div className="group flex flex-row flex-basis relative pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:opacity-100! lg:group-hover/list:opacity-50">
      {/* Hover background effect */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>

      {/* Date header - hidden on small screens */}
      <header className="basis-1/4 max-sm:hidden text-muted z-10">
        {dateRange}
      </header>

      {/* Main content */}
      <main className="sm:basis-3/4 z-10">
        {/* Date - shown on small screens */}
        <p className="sm:hidden block text-muted z-10 mb-3">{dateRange}</p>

        {/* Role/Title and Company */}
        <p className="text-lg text-foreground  flex items-center mb-3">
          {experience.role}
          <span className="text-foreground ms-2">·</span>
          <span className="text-foreground ms-2"> {experience.company}</span>
          <ArrowUpRightIcon
            size={14}
            className="-mb-4 ms-2 text-muted group-hover/work:ms-3 group-hover/education:ms-3 group-hover/work:-mb-3 group-hover/education:-mb-3 transition-all duration-300 group-hover/work:text-foreground group-hover/education:text-foreground"
          />
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
