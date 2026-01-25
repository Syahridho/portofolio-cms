"use client";

import { useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  IconPlus,
  IconDots,
  IconPencil,
  IconTrash,
  IconEye,
  IconSearch,
} from "@tabler/icons-react";
import { UserProject } from "@/types";
import { useProjects, useDeleteProject } from "@/hooks/use-project";
import { EditProjectDialog } from "@/components/edit-project-dialog";
import { ProjectDetailDialog } from "@/components/project-detail-dialog";
import { useI18n } from "@/hooks/use-i18n";

export default function Page() {
  const { data, isLoading } = useProjects();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const { getContent } = useI18n();

  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<UserProject | null>(
    null,
  );

  const projects = data?.items || [];

  // Filter projects based on search
  const filteredProjects = projects.filter(
    (p) =>
      getContent(p.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getContent(p.description)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      p.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const handleDeleteProject = () => {
    if (selectedProject) {
      deleteProject(selectedProject, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setSelectedProject(null);
        },
      });
    }
  };

  const openEdit = (project: UserProject) => {
    setSelectedProject(project);
    setIsEditOpen(true);
  };

  const openDetail = (project: UserProject) => {
    setSelectedProject(project);
    setIsDetailOpen(true);
  };

  const openDelete = (project: UserProject) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
    },
  ];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbs={breadcrumbs} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                      Proyek
                    </h1>
                    <p className="text-muted-foreground">
                      Kelola daftar proyek portofolio Anda di sini.
                    </p>
                  </div>
                  <Button onClick={() => setIsAddOpen(true)}>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Tambah Project
                  </Button>
                </div>

                <div className="flex items-center py-4">
                  <div className="relative w-full max-w-sm">
                    <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari project..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="rounded-md border bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead>Project Info</TableHead>
                        <TableHead>Technologies</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            Loading...
                          </TableCell>
                        </TableRow>
                      ) : filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                          <TableRow key={project.id}>
                            <TableCell>
                              <div className="w-12 h-12 rounded-md overflow-hidden bg-muted">
                                {project.image ? (
                                  <img
                                    src={project.image}
                                    alt={getContent(project.title)}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                                    No IMG
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-semibold">
                                  {getContent(project.title)}
                                </span>
                                <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {getContent(project.description)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {project.technologies
                                  .slice(0, 3)
                                  .map((tech, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="text-[10px] px-1 py-0 h-5"
                                    >
                                      {tech}
                                    </Badge>
                                  ))}
                                {project.technologies.length > 3 && (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] px-1 py-0 h-5"
                                  >
                                    +{project.technologies.length - 3}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {months[project.month]} {project.year}
                              </span>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <span className="sr-only">Open menu</span>
                                    <IconDots className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => openDetail(project)}
                                  >
                                    <IconEye className="mr-2 h-4 w-4" />
                                    View Detail
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => openEdit(project)}
                                  >
                                    <IconPencil className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => openDelete(project)}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <IconTrash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={5} className="h-24 text-center">
                            Tidak ada project ditemukan.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Dialogs */}
      <EditProjectDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        mode="add"
      />

      <EditProjectDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        project={selectedProject}
        mode="edit"
      />

      <ProjectDetailDialog
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        project={selectedProject}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Project{" "}
              <strong>
                {selectedProject && getContent(selectedProject.title)}
              </strong>{" "}
              akan dihapus permanen dari portofolio Anda.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
