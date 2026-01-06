import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconWorld, IconArrowLeft } from "@tabler/icons-react";
import { initialProjects } from "@/lib/project-data";
import { findProjectBySlug } from "@/lib/utils";
import { ProjectDetailContent } from "./ProjectDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = findProjectBySlug(initialProjects, slug);
  return {
    title: project ? `${project.title} | Projects` : "Project Not Found",
    description: project?.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = findProjectBySlug(initialProjects, slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
