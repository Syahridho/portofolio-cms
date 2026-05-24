import { notFound } from "next/navigation";
import { getUserProjects } from "@/services/project.service";
import { findProjectBySlug } from "@/lib/utils";
import { ProjectItem } from "@/lib/project-data";
import { ProjectDetailContent } from "./ProjectDetailContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getProjectItems(): Promise<ProjectItem[]> {
  const data = await getUserProjects();
  return (data?.items || []).map((p) => ({
    id: p.id,
    title:
      typeof p.title === "string"
        ? p.title
        : (p.title as { id?: string; en?: string })?.id ||
          (p.title as { id?: string; en?: string })?.en ||
          "",
    description:
      typeof p.description === "string"
        ? p.description
        : (p.description as { id?: string; en?: string })?.id ||
          (p.description as { id?: string; en?: string })?.en ||
          "",
    image: p.image,
    month: p.month,
    year: p.year,
    technologies: p.technologies,
    githubUrl: p.githubUrl,
    liveUrl: p.liveDemoUrl,
    figmaUrl: p.figmaUrl,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const projects = await getProjectItems();
  const project = findProjectBySlug(projects, slug);
  return {
    title: project ? `${project.title} | Projects` : "Project Not Found",
    description: project?.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projects = await getProjectItems();
  const project = findProjectBySlug(projects, slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
