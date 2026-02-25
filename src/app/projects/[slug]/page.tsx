import { ProjectUrl } from "@/components/projects/project-url";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/data/projects";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — Nathan Schroeder`,
      description: project.description,
      images: [project.image],
    },
  };
}

const mdxComponents = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2
      className="text-xl  text-foreground mt-12 mb-4"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="text-muted leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="text-muted leading-relaxed mb-4 space-y-2 ml-4" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol
      className="text-muted leading-relaxed mb-4 space-y-2 ml-4 list-decimal"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="text-muted leading-relaxed pl-1" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (

    <strong className="text-foreground font-semibold font-exposure italic"
      style={{ fontFamily: "Exposure-30" }} {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a
      className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote
      className="border-l-2 border-primary/40 pl-4 my-4 text-muted italic"
      {...props}
    />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code
      className="bg-foreground/5 text-foreground px-1.5 py-0.5 rounded text-sm"
      {...props}
    />
  ),
};

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const mdxPath = path.join(
    process.cwd(),
    "src",
    "content",
    "projects",
    `${slug}.mdx`
  );

  let mdxSource: string;
  try {
    mdxSource = fs.readFileSync(mdxPath, "utf-8");
  } catch {
    notFound();
  }

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl py-16 sm:py-32">
        {/* Back link */}
        <Reveal delay={0}>
          <Link
            href="/projects"
            className="group flex items-center gap-3 mb-12"
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
            <span className="text-muted group-hover:text-foreground transition-colors duration-200 text-sm">
              All Projects
            </span>
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal delay={0.1}>
          <h1 className="text-4xl font-exposure text-foreground font-black mb-3">
            {project.title}
          </h1>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-muted text-lg mb-4">{project.description}</p>
        </Reveal>

        {/* Tags */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs text-muted rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.1)] drop-shadow-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        {/* External URL */}
        {project.url && (
          <Reveal delay={0.25}>
            <ProjectUrl url={project.url} />
          </Reveal>
        )}

        {/* Hero image */}
        <Reveal delay={0.3}>
          <div className="relative w-full rounded-lg bg-foreground/5 shadow-[inset_0_1px_0.25px_0.25px_rgba(255,255,255,0.05)] drop-shadow-lg p-px mb-12 overflow-hidden aspect-video">
            <div className="relative w-full h-full rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title} — ${project.description}`}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </Reveal>

        {/* MDX content */}
        <Reveal delay={0.35}>
          <div className="mdx-content">
            <MDXRemote source={mdxSource} components={mdxComponents} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
