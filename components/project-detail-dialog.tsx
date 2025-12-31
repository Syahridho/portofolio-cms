"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";
import type { ProjectItem } from "@/lib/project-data";

interface ProjectDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectItem | null;
}

export function ProjectDetailDialog({
  open,
  onOpenChange,
  project,
}: ProjectDetailDialogProps) {
  if (!project) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Project</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          {project.image && (
            <div className="rounded-lg overflow-hidden border">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto object-cover max-h-[300px]"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <span className="text-sm text-muted-foreground">
                {months[project.month]} {project.year}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <Badge key={i} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>

            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            {project.liveUrl && (
              <Button asChild className="flex-1">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWorld className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" className="flex-1">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconBrandGithub className="mr-2 h-4 w-4" />
                  Source Code
                </a>
              </Button>
            )}
            {!project.liveUrl && !project.githubUrl && (
              <p className="text-sm text-muted-foreground italic w-full text-center">
                Tidak ada link tersedia.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
