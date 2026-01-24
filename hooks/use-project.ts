import {
  addUserProject,
  deleteUserProject,
  getUserProjects,
  updateUserProject,
} from "@/services/project.service";
import { UserProject } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useProjects = () => {
  return useQuery({
    queryKey: ["user-projects"],
    queryFn: getUserProjects,
  });
};

export const useAddProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: UserProject) => addUserProject(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
      toast.success("Project berhasil ditambahkan");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal menambahkan project");
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectToDelete: UserProject) =>
      deleteUserProject(projectToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
      toast.success("Project berhasil dihapus");
    },
    onError: () => {
      toast.error("Gagal menghapus project");
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      oldProject,
      updatedProject,
    }: {
      oldProject: UserProject;
      updatedProject: UserProject;
    }) => updateUserProject(oldProject, updatedProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-projects"] });
      toast.success("Project berhasil diperbarui");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal memperbarui project");
    },
  });
};
