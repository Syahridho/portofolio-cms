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
    })
    .eq("id", oldCertificate.id);

  if (error) throw error;
};
