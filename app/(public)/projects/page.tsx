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
import { IconBrandGithub, IconWorld } from "@tabler/icons-react";
import { initialProjects } from "@/lib/project-data";

export const metadata = {
  title: "Projects | Syahridho Arjuna Syahputra",
  description: "Showcase of my projects",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          A showcase of my projects, ranging from web applications to
          experiments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialProjects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
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
                  No Image
                </div>
              )}
            </div>
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {/* Format date simply */}
                  {project.month}/{project.year}
                </span>
              </div>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 pt-0">
              {project.liveUrl && (
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconWorld size={16} className="mr-2" />
                    Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="default" size="sm" asChild className="flex-1">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconBrandGithub size={16} className="mr-2" />
                    Code
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
