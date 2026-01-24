import {
  addUserSkill,
  deleteUserSkill,
  getUserSkills,
} from "@/services/home.service";
import { UserSkills } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSkills = () => {
  return useQuery({
    queryKey: ["user-skills"],
    queryFn: getUserSkills,
  });
};

export const useAddSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: UserSkills) => addUserSkill(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-skills"] });
      toast.success("Skill berhasil ditambahkan");
    },
    onError: () => {
      toast.error("Gagal menambahkan skill");
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillToDelete: UserSkills) => deleteUserSkill(skillToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-skills"] });
      toast.success("Skill berhasil dihapus");
    },
    onError: () => {
      toast.error("Gagal menghapus skill");
    },
  });
};
