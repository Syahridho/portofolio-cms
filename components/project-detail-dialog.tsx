"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconCalendar } from "@tabler/icons-react";
import { UserProject } from "@/types";
import { useI18n } from "@/hooks/use-i18n";

interface ProjectDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: UserProject | null;
}

const MONTHS = [
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

export function ProjectDetailDialog({
  open,
  onOpenChange,
  project,
}: ProjectDetailDialogProps) {
  const { getContent } = useI18n();

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {getContent(project.title)}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm">
            <IconCalendar size={16} />
            {MONTHS[project.month]} {project.year}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 overflow-y-auto max-h-[60vh]">
          {/* Project Image */}
          {project.image && (
            <div className="w-full h-64 rounded-lg overflow-hidden border bg-muted">
              <img
                src={project.image}
                alt={getContent(project.title)}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Deskripsi</h3>
            <p className="text-muted-foreground leading-relaxed">
              {getContent(project.description)}
            </p>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Teknologi yang Digunakan</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* GitHub Link */}
          {project.githubUrl && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Repository</h3>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => window.open(project.githubUrl, "_blank")}
              >
                <IconBrandGithub className="mr-2 h-4 w-4" />
                Lihat di GitHub
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
