import type { Metadata } from "next";
import { playgroundItems } from "@/data/playground";
import PlaygroundPageContent from "@/components/playground/playground-page-content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return playgroundItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = playgroundItems.find((i) => i.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
  };
}

export default async function PlaygroundExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = playgroundItems.find((i) => i.slug === slug);
  if (!item) notFound();
  return <PlaygroundPageContent slug={slug} />;
}
