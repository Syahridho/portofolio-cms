import {
  addUserCertificate,
  deleteUserCertificate,
  getUserCertificates,
  getUserCertificatesPaginated,
  getStarCertificateCount,
  toggleStarCertificate,
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

export const useCertificatesPaginated = ({
  page,
  search,
}: {
  page: number;
  search: string;
}) => {
  return useQuery({
    queryKey: ["user-certificates-paginated", page, search],
    queryFn: () => getUserCertificatesPaginated({ page, search }),
    placeholderData: (prev) => prev, // keep previous data while loading next page
  });
};

// Lightweight query — only the star count, no items
export const useStarCount = () => {
  return useQuery({
    queryKey: ["user-certificates-star-count"],
    queryFn: getStarCertificateCount,
    staleTime: 0, // always fresh after mutations
  });
};

export const useToggleStar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cert, value }: { cert: UserCertificate; value: boolean }) =>
      toggleStarCertificate(cert, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-certificates-paginated"] });
      queryClient.invalidateQueries({ queryKey: ["user-certificates-star-count"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal mengubah status tampilan sertifikat");
    },
  });
};

export const useAddCertificate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: UserCertificate) => addUserCertificate(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["user-certificates-paginated"] });
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
      queryClient.invalidateQueries({ queryKey: ["user-certificates-paginated"] });
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
      queryClient.invalidateQueries({ queryKey: ["user-certificates-paginated"] });
      toast.success("Sertifikat berhasil diperbarui");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal memperbarui sertifikat");
    },
  });
};
