import {
  getAllSeoSettings,
  getSeoByPage,
  upsertSeoSettings,
  type SeoSettings,
} from "@/services/seo.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAllSeoSettings = () => {
  return useQuery({
    queryKey: ["seo-settings"],
    queryFn: getAllSeoSettings,
  });
};

export const useSeoByPage = (pageName: string) => {
  return useQuery({
    queryKey: ["seo-settings", pageName],
    queryFn: () => getSeoByPage(pageName),
    enabled: !!pageName,
  });
};

export const useUpsertSeo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: SeoSettings) => upsertSeoSettings(settings),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["seo-settings"] });
      queryClient.invalidateQueries({
        queryKey: ["seo-settings", variables.page_name],
      });
      toast.success("Pengaturan SEO berhasil disimpan");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal menyimpan pengaturan SEO");
    },
  });
};
