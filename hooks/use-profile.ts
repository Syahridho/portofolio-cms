import { toast } from "sonner";
import { UserProfile } from "@/types";
import { getUserProfile, updateUserProfile } from "@/services/home.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData: Partial<UserProfile>) => updateUserProfile(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });

      toast.success("Berhasil", {
        description: "Profile anda telah diperbarui",
      });
    },

    onError: (error) => {
      console.error(error);
      toast("Gagal", {
        description: "Terjadi kesalahan saat memperbarui profile",
      });
    },
  });
};
