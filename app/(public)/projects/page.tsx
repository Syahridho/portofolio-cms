import { initialProjects } from "@/lib/project-data";
import { ProjectsList } from "@/components/projects-list";

export const metadata = {
  title: "Proyek | Syahridho Arjuna Syahputra",
  description: "Pameran proyek-proyek saya",
};

export default function ProjectsPage() {
  return <ProjectsList projects={initialProjects} />;
}
