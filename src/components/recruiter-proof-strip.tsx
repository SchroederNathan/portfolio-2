import Reveal from "@/components/ui/reveal";
import { ArrowUpRightIcon } from "@/components/ui/svg-icons";

const stats = [
  {
    value: "130k+",
    label: "monthly active users supported across shipped mobile products",
  },
  {
    value: "5+",
    label: "production apps and internal tools shipped across mobile and web",
  },
  {
    value: "4 yrs",
    label: "of building with React Native, Next.js, APIs, and product-focused UI",
  },
];

const organizations = ["Red Piston", "Movati Athletic", "FocusGrid", "St. Clair College"];

export default function RecruiterProofStrip() {
  return (
    <Reveal delay={0.325}>
      <section
        aria-labelledby="recruiter-proof-strip"
        className="mb-10 rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.08)] backdrop-blur-sm sm:p-6"
      >
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              Recruiter snapshot
            </p>
            <h2 id="recruiter-proof-strip" className="text-2xl font-semibold text-foreground sm:text-3xl">
              Product-minded engineer with shipped work, real users, and strong frontend taste.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
              I build polished mobile and web experiences end-to-end — from UI systems and frontend architecture to API integration, performance, and delivery.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:nathanschroeder02@gmail.com?subject=Portfolio%20inquiry"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5"
            >
              Book an intro call
              <ArrowUpRightIcon size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/nathan-schroeder-a40aa2210/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-foreground/30 hover:bg-foreground/[0.04]"
            >
              View LinkedIn
              <ArrowUpRightIcon size={14} />
            </a>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-foreground/10 bg-background/70 p-4"
            >
              <p className="text-2xl font-semibold text-foreground sm:text-3xl">{stat.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-foreground/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Selected employers / products</p>
            <p className="mt-1 text-sm text-muted">
              Experience across agency, product, and education environments.
            </p>
          </div>

          <ul className="flex flex-wrap gap-2">
            {organizations.map((organization) => (
              <li
                key={organization}
                className="rounded-full border border-foreground/10 px-3 py-1.5 text-sm text-muted"
              >
                {organization}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Reveal>
  );
}
