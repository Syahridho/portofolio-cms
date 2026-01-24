import {
  addUserCarrer,
  deleteUserCarrer,
  getUserCarrer,
  updateUserCarrer,
} from "@/services/home.service";
import { UserCarrer } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCarrers = () => {
  return useQuery({
    queryKey: ["user-carrers"],
    queryFn: getUserCarrer,
  });
};

export const useAddCareer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: UserCarrer) => addUserCarrer(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-carrers"] });
      toast.success("Karir berhasil ditambahkan");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal menambahkan karir");
    },
  });
};

export const useDeleteCareer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (careerToDelete: UserCarrer) =>
      deleteUserCarrer(careerToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-carrers"] });
      toast.success("Karir berhasil dihapus");
    },
    onError: () => {
      toast.error("Gagal menghapus karir");
    },
  });
};

export const useUpdateCareer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      oldCareer,
      updatedCareer,
    }: {
      oldCareer: UserCarrer;
      updatedCareer: UserCarrer;
    }) => updateUserCarrer(oldCareer, updatedCareer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-carrers"] });
      toast.success("Karir berhasil diperbarui");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal memperbarui karir");
    },
  });
};
