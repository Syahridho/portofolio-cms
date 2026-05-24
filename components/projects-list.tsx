"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { IconBrandGithub, IconBrandFigma, IconWorld } from "@tabler/icons-react";
import { ProjectItem } from "@/lib/project-data";
import { generateProjectSlug } from "@/lib/utils";
import { useLocale } from "@/lib/i18n-simple";
import Link from "next/link";

const ITEMS_PER_PAGE = 4;

interface ProjectsListProps {
  projects: ProjectItem[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const { t } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);

  const totalProjects = projects.length;
  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Generate page numbers to display (simple version, show all pages)
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const showingText = t.projects.showing
    .replace("{start}", (startIndex + 1).toString())
    .replace("{end}", Math.min(endIndex, totalProjects).toString())
    .replace("{total}", totalProjects.toString());

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t.projects.title}
        </h1>
        <p className="text-muted-foreground">{t.projects.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentProjects.map((project) => {
          const slug = generateProjectSlug(project.title, project.id);
          return (
            <Card
              key={project.id}
              className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Link
                href={`/projects/${slug}`}
                className="flex-1 flex flex-col cursor-pointer"
              >
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      {t.projects.noImage}
                    </div>
                  )}
                </div>
                <CardHeader className="pt-4">
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
              </Link>
              <CardFooter className="flex gap-2 pt-0">
                {project.liveUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t.projects.demo}
                      aria-label={t.projects.demo}
                    >
                      <IconWorld size={18} />
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="default"
                    size="icon"
                    asChild
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={t.projects.code}
                      aria-label={t.projects.code}
                    >
                      <IconBrandGithub size={18} />
                    </a>
                  </Button>
                )}
                {project.figmaUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Figma"
                      aria-label="Figma"
                    >
                      <IconBrandFigma size={18} />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
          <div className="text-sm text-muted-foreground">{showingText}</div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {pageNumbers.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
