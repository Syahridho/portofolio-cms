import { supabase } from "@/lib/supabase";

export interface SeoSettings {
  id?: string;
  page_name: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image_url?: string;
  json_ld?: Record<string, unknown> | null;
  updated_at?: string;
}

export const SEO_PAGES = [
  { key: "home", label: "Beranda" },
  { key: "projects", label: "Proyek" },
  { key: "certificates", label: "Sertifikat" },
  { key: "contact", label: "Kontak" },
] as const;

export type SeoPageKey = (typeof SEO_PAGES)[number]["key"];

// Fetch SEO settings for a single page (used in server components / generateMetadata)
export const getSeoByPage = async (
  pageName: string,
): Promise<SeoSettings | null> => {
  const { data, error } = await supabase
    .from("seo_settings")
    .select("*")
    .eq("page_name", pageName)
    .single();

  if (error || !data) return null;
  return data as SeoSettings;
};

// Fetch all SEO settings (used in dashboard)
export const getAllSeoSettings = async (): Promise<SeoSettings[]> => {
  const { data, error } = await supabase
    .from("seo_settings")
    .select("*")
    .order("page_name");

  if (error) return [];
  return (data || []) as SeoSettings[];
};

// Upsert (insert or update) SEO settings for a page
export const upsertSeoSettings = async (
  settings: SeoSettings,
): Promise<void> => {
  const { error } = await supabase.from("seo_settings").upsert(
    {
      ...settings,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "page_name" },
  );

  if (error) throw error;
};
