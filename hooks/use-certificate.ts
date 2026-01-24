import {
  addUserCertificate,
  deleteUserCertificate,
  getUserCertificates,
  updateUserCertificate,
} from "@/services/certificate.service";
import { UserCertificate } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCertificates = () => {
  return useQuery({
    queryKey: ["user-certificates"],
    queryFn: getUserCertificates,
  });
};

export const useAddCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: UserCertificate) => addUserCertificate(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-certificates"] });
      toast.success("Sertifikat berhasil ditambahkan");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal menambahkan sertifikat");
    },
  });
};

export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (certificateToDelete: UserCertificate) =>
      deleteUserCertificate(certificateToDelete),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-certificates"] });
      toast.success("Sertifikat berhasil dihapus");
    },
    onError: () => {
      toast.error("Gagal menghapus sertifikat");
    },
  });
};

export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      oldCertificate,
      updatedCertificate,
    }: {
      oldCertificate: UserCertificate;
      updatedCertificate: UserCertificate;
    }) => updateUserCertificate(oldCertificate, updatedCertificate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-certificates"] });
      toast.success("Sertifikat berhasil diperbarui");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal memperbarui sertifikat");
    },
  });
};
