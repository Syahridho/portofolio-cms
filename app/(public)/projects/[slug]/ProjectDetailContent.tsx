"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandFigma, IconWorld, IconArrowLeft } from "@tabler/icons-react";
import { ProjectItem } from "@/lib/project-data";
import { useLocale } from "@/lib/i18n-simple";
import Link from "next/link";

interface ProjectDetailContentProps {
  project: ProjectItem;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  const { t } = useLocale();

  const months = [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <IconArrowLeft className="mr-2 h-4 w-4" />
          {t.projects.backToProjects}
        </Link>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
          <p className="text-muted-foreground">
            {months[project.month]} {project.year}
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        {project.image && (
          <div className="rounded-xl overflow-hidden border shadow-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {t.projects.description}
          </h2>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {t.projects.technologies}
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, i) => (
              <Badge key={i} variant="secondary" className="text-sm">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6 border-t">
          {project.liveUrl && (
            <Button asChild size="lg" className="flex-1">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWorld className="mr-2 h-5 w-5" />
                {t.projects.liveDemo}
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline" size="lg" className="flex-1">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandGithub className="mr-2 h-5 w-5" />
                {t.projects.sourceCode}
              </a>
            </Button>
          )}
          {project.figmaUrl && (
            <Button asChild variant="outline" size="lg" className="flex-1">
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconBrandFigma className="mr-2 h-5 w-5" />
                Figma
              </a>
            </Button>
          )}
          {!project.liveUrl && !project.githubUrl && !project.figmaUrl && (
            <p className="text-muted-foreground italic w-full text-center">
              {t.projects.noLinks}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
