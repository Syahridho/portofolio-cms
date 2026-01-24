import {
  getUserDescription,
  updateUserDescription,
} from "@/services/home.service";
import { UserDescription } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDescription = () => {
  return useQuery({
    queryKey: ["user-description"],
    queryFn: getUserDescription,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateDescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData: Partial<UserDescription>) =>
      updateUserDescription(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-description"],
      });

      toast.success("Berhasil", {
        description: "Deskripsi anda telah diperbarui",
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal", {
        description: "Terjadi kesalahan saat memperbarui deskripsi",
      });
    },
  });
};
