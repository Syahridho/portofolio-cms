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
import { TechIcon } from "@/components/tech-icon";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 4;

interface ProjectsListProps {
  projects: ProjectItem[];
}

// Komponen kecil khusus buat handle blur-to-clear per gambar
function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-muted">
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out",
          "hover:scale-105",
          isLoaded
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-md scale-105"
        )}
      />
    </div>
  );
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
        {currentProjects.map((project: any) => {
          const slug = generateProjectSlug(project.title, project.id);
          return (
            <Link
              key={slug}
              href={`/projects/${slug}`}
              className="flex-1 flex flex-col"
            >
              <Card className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow rounded-sm cursor-pointer gap-2">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  {project.image ? (
                    <ProjectImage src={project.image} alt={project.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      {t.projects.noImage}
                    </div>
                  )}
                </div>
                <CardHeader className="pt-4">
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>

                <CardFooter className="flex gap-2 pt-0">
                  {project.technologies?.map((technology: any, id: number) => {
                    return (
                      <TechIcon key={id} name={technology} slug={technology} />
                    );
                  })}
                </CardFooter>
              </Card>
            </Link>
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