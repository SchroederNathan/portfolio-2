import { getAllCaseStudies, getCaseStudyBySlug } from "@/data/case-studies";
import { ArrowUpRightIcon, LinkIcon } from "@/components/ui/svg-icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllCaseStudies().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} Case Study`,
      description: project.summary,
      images: [project.image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} Case Study`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = project.nextProjectSlug
    ? getCaseStudyBySlug(project.nextProjectSlug)
    : null;

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-5xl py-16 sm:py-24 lg:py-28">
        <Link href="/projects" className="group mb-10 inline-flex items-center gap-3 text-sm text-muted">
          <span className="transition-colors duration-200 group-hover:text-foreground">← Back to projects</span>
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.24em] text-primary">{project.eyebrow}</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={project.url ?? "/projects"}
                target={project.url ? "_blank" : undefined}
                rel={project.url ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-85"
              >
                Visit live project
                <ArrowUpRightIcon size={14} />
              </Link>
              <Link
                href="#screenshots"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/5 px-5 py-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-foreground/10"
              >
                Jump to screenshots
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)]">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Role</p>
              <p className="mt-2 text-sm font-medium text-foreground">{project.role}</p>
            </div>
            <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)]">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Timeline</p>
              <p className="mt-2 text-sm font-medium text-foreground">{project.timeline}</p>
            </div>
            <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)]">
              <p className="text-xs uppercase tracking-[0.2em] text-muted">Stack</p>
              <p className="mt-2 text-sm font-medium text-foreground">{project.techStack.slice(0, 3).join(" · ")}</p>
            </div>
          </div>
        </section>

        <section className="mt-10 overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/5 p-2 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.08)]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.6rem]">
            <Image
              src={project.image}
              alt={`Hero screenshot for ${project.title}`}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-3xl border border-foreground/10 bg-background/80 p-5 backdrop-blur-sm"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-muted">{metric.label}</p>
              <p className="mt-3 text-2xl font-semibold text-foreground">{metric.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">The challenge</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              Turning a strong idea into a product that feels obvious to use.
            </h2>
          </div>
          <div className="space-y-4">
            {project.challenge.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-foreground/10 bg-foreground/5 p-5 text-sm leading-7 text-muted"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Process</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              How I approached the work from product thinking through delivery.
            </h2>
          </div>
          <div className="space-y-5">
            {project.process.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-foreground/10 bg-background/80 p-6 backdrop-blur-sm"
              >
                <p className="text-xs uppercase tracking-[0.22em] text-muted">Step {index + 1}</p>
                <h3 className="mt-3 text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Tech stack</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              A practical stack chosen for speed, maintainability, and polish.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm text-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section id="screenshots" className="mt-16">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Screenshots</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              Key moments from the shipped experience.
            </h2>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {project.screenshots.map((shot) => (
              <figure
                key={shot.title}
                className="overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-foreground/5 p-2"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-background/60">
                  <Image
                    src={shot.image}
                    alt={`${project.title} screenshot: ${shot.title}`}
                    fill
                    className="object-cover"
                    style={{ objectPosition: shot.objectPosition ?? "center" }}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                <figcaption className="px-2 pb-2 pt-4">
                  <p className="text-base font-medium text-foreground">{shot.title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{shot.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Outcome</p>
            <h2 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
              What changed once the product shipped.
            </h2>
          </div>
          <div className="rounded-[2rem] border border-foreground/10 bg-foreground/5 p-6 sm:p-8">
            <p className="text-base leading-8 text-muted">{project.outcome}</p>
            {project.url && (
              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
              >
                Visit the live project
                <LinkIcon size={14} />
              </Link>
            )}
          </div>
        </section>

        {nextProject && (
          <section className="mt-20 rounded-[2rem] border border-foreground/10 bg-background/70 p-6 backdrop-blur-sm sm:p-8">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Next case study</p>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-foreground">{nextProject.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">{nextProject.summary}</p>
              </div>
              <Link
                href={`/projects/${nextProject.slug}`}
                className="inline-flex items-center gap-2 self-start rounded-full border border-foreground/10 bg-foreground/5 px-5 py-3 text-sm font-medium text-foreground"
              >
                Read next case study
                <ArrowUpRightIcon size={14} />
              </Link>
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
