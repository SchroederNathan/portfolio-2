import Reveal from "@/components/ui/reveal";
import {
  ArrowUpRightIcon,
  DownloadIcon,
  MailIcon,
  CalendarIcon,
} from "@/components/ui/svg-icons";

export default function ResumeAvailabilityCta() {
  return (
    <Reveal delay={0.425}>
      <section
        aria-labelledby="resume-availability-cta"
        className="mb-10 rounded-3xl border border-foreground/10 bg-foreground/[0.03] p-5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.08)] backdrop-blur-sm sm:p-6"
      >
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-500">
                Available for hire
              </p>
            </div>
            <h2
              id="resume-availability-cta"
              className="text-2xl font-semibold text-foreground sm:text-3xl"
            >
              Open to full-time roles &amp; contract work
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
              Currently seeking frontend-heavy or full-stack positions where I
              can ship polished product. Remote-friendly, open to relocation.
            </p>
          </div>
        </div>

        {/* Quick-info pills */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            "React / React Native",
            "Next.js",
            "TypeScript",
            "Full-stack",
            "Remote / Hybrid",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-foreground/10 bg-background/70 px-3 py-1.5 text-sm text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="mailto:nathanschroeder02@gmail.com?subject=Let%27s%20chat%20%E2%80%93%20saw%20your%20portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform duration-200 hover:-translate-y-0.5"
          >
            <MailIcon size={16} />
            Get in touch
          </a>

          <a
            href="/nathan-schroeder-resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/[0.08] px-5 py-3 text-sm font-medium text-primary transition-colors duration-200 hover:border-primary/50 hover:bg-primary/[0.14]"
          >
            <DownloadIcon size={16} />
            Download resume
          </a>

          <a
            href="mailto:nathanschroeder02@gmail.com?subject=Scheduling%20an%20intro%20call"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-foreground/30 hover:bg-foreground/[0.04]"
          >
            <CalendarIcon size={16} />
            Schedule a call
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

        {/* Availability details footer */}
        <div className="mt-6 flex flex-col gap-3 border-t border-foreground/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Availability &amp; preferences
            </p>
            <p className="mt-1 text-sm text-muted">
              Ready to start immediately. Open to full-time, contract, or
              freelance engagements.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <CalendarIcon size={14} />
            <span>Updated March 2026</span>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
