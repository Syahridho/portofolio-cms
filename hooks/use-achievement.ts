import {
  addUserAchivement,
  deleteUserAchivement,
  getUserAchivement,
  updateUserAchivement,
} from "@/services/home.service";
import { UserAchivement } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAchievements = () => {
  return useQuery({
    queryKey: ["user-achievements"],
    queryFn: getUserAchivement,
  });
};

export const useAddAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: UserAchivement) => addUserAchivement(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-achievements"] });
      toast.success("Penghargaan berhasil ditambahkan");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal menambahkan penghargaan");
    },
  });
};

export const useDeleteAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (achievementToDelete: UserAchivement) =>
      deleteUserAchivement(achievementToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-achievements"] });
      toast.success("Penghargaan berhasil dihapus");
    },
    onError: () => {
      toast.error("Gagal menghapus penghargaan");
    },
  });
};

export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      oldAchievement,
      updatedAchievement,
    }: {
      oldAchievement: UserAchivement;
      updatedAchievement: UserAchivement;
    }) => updateUserAchivement(oldAchievement, updatedAchievement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-achievements"] });
      toast.success("Penghargaan berhasil diperbarui");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal memperbarui penghargaan");
    },
  });
};
