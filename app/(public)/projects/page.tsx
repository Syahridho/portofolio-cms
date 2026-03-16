"use client";

import { ProjectsList } from "@/components/projects-list";
import { useProjects } from "@/hooks/use-project";
import { ProjectItem } from "@/lib/project-data";

export default function ProjectsPage() {
  const { data, isLoading } = useProjects();

  const projects: ProjectItem[] = (data?.items || []).map((p) => ({
    id: p.id,
    title: typeof p.title === "string" ? p.title : p.title?.id || p.title?.en || "",
    description:
      typeof p.description === "string"
        ? p.description
        : p.description?.id || p.description?.en || "",
    image: p.image,
    month: p.month,
    year: p.year,
    technologies: p.technologies,
    githubUrl: p.githubUrl,
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return <ProjectsList projects={projects} />;
}
