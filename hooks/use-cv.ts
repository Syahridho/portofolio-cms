import { addUserCV, deleteUserCV, getUserCV } from "@/services/home.service";
import { UserCV } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCVs = () => {
  return useQuery({
    queryKey: ["user-cvs"],
    queryFn: getUserCV,
  });
};

export const useAddCV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: UserCV) => addUserCV(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cvs"] });
      toast.success("CV berhasil ditambahkan");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal menambahkan CV");
    },
  });
};

export const useDeleteCV = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cvToDelete: UserCV) => deleteUserCV(cvToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-cvs"] });
      toast.success("CV berhasil dihapus");
    },
    onError: () => {
      toast.error("Gagal menghapus CV");
    },
  });
};
