import { supabase } from "@/lib/supabase";
import { UserCertificate } from "@/types/index";

// Upload certificate image to Supabase Storage
export const uploadCertificateImage = async (file: File): Promise<string> => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("certificates")
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("certificates").getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading certificate image: ", error);
    throw error;
  }
};

export const MAX_STAR = 5;

// Get the current count of starred (featured) certificates
export const getStarCertificateCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from("user_certificates")
    .select("*", { count: "exact", head: true })
    .eq("is_star", true);

  if (error) return 0;
  return count ?? 0;
};

// Toggle is_star with a MAX_STAR cap enforced before updating
export const toggleStarCertificate = async (
  cert: UserCertificate,
  newValue: boolean,
): Promise<void> => {
  if (newValue) {
    const current = await getStarCertificateCount();
    if (current >= MAX_STAR) {
      throw new Error(
        `Maksimal ${MAX_STAR} sertifikat yang dapat ditampilkan di halaman utama`,
      );
    }
  }

  const { error } = await supabase
    .from("user_certificates")
    .update({ is_star: newValue })
    .eq("id", cert.id);

  if (error) throw error;
};

// Get all user certificates
export const getUserCertificates = async (): Promise<{
  items: UserCertificate[];
} | null> => {
  const { data, error } = await supabase
    .from("user_certificates")
    .select("*");

  if (error) return { items: [] };

  return {
    items: (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      issuer: row.issuer,
      month: row.month,
      year: row.year,
      image: row.image,
      credentialUrl: row.credential_url,
      category: row.category || "Other",
      isStar: row.is_star || false,
    })) as UserCertificate[],
  };
};

export const PAGE_SIZE = 12;

// Get paginated certificates with optional search (server-side)
export const getUserCertificatesPaginated = async ({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<{ items: UserCertificate[]; total: number }> => {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let query = supabase
    .from("user_certificates")
    .select("*", { count: "exact" })
    .order("year", { ascending: false })
    .order("month", { ascending: false })
    .range(from, to);

  // Server-side search on issuer (text) — name is JSONB, filter client-side
  if (search.trim()) {
    query = query.ilike("issuer", `%${search.trim()}%`);
  }

  const { data, error, count } = await query;

  if (error) return { items: [], total: 0 };

  return {
    total: count ?? 0,
    items: (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      issuer: row.issuer,
      month: row.month,
      year: row.year,
      image: row.image,
      credentialUrl: row.credential_url,
      category: row.category || "Other",
      isStar: row.is_star || false,
    })) as UserCertificate[],
  };
};

// Add new certificate
export const addUserCertificate = async (newCertificate: UserCertificate) => {
  const { error } = await supabase.from("user_certificates").insert({
    id: newCertificate.id,
    name: newCertificate.name,
    issuer: newCertificate.issuer,
    month: newCertificate.month,
    year: newCertificate.year,
    image: newCertificate.image,
    credential_url: newCertificate.credentialUrl,
    category: newCertificate.category || "Other",
    is_star: newCertificate.isStar || false,
  });

  if (error) throw error;
};

// Delete certificate
export const deleteUserCertificate = async (
  certificateToDelete: UserCertificate,
) => {
  const { error } = await supabase
    .from("user_certificates")
    .delete()
    .eq("id", certificateToDelete.id);

  if (error) throw error;
};

// Update certificate
export const updateUserCertificate = async (
  oldCertificate: UserCertificate,
  updatedCertificate: UserCertificate,
) => {
  const { error } = await supabase
    .from("user_certificates")
    .update({
      name: updatedCertificate.name,
      issuer: updatedCertificate.issuer,
      month: updatedCertificate.month,
      year: updatedCertificate.year,
      image: updatedCertificate.image,
      credential_url: updatedCertificate.credentialUrl,
      category: updatedCertificate.category || "Other",
      is_star: updatedCertificate.isStar || false,
    })
    .eq("id", oldCertificate.id);

  if (error) throw error;
};
