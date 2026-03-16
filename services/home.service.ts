import { supabase } from "@/lib/supabase";
import {
  UserSkills,
  UserDescription,
  UserProfile,
  UserCareer,
  UserAchievement,
  UserCV,
} from "@/types/index";

// ============================================================
// Service User Profile
// ============================================================
export const getUserProfile = async (): Promise<UserProfile | null> => {
  const { data, error } = await supabase
    .from("user_profile")
    .select("*")
    .eq("id", "general")
    .single();

  if (error || !data) return null;

  return {
    name: data.name,
    jobTitle: data.job_title,
    photoURL: data.photo_url,
    socials: data.socials,
  } as UserProfile;
};

export const updateUserProfile = async (data: Partial<UserProfile>) => {
  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.jobTitle !== undefined) updateData.job_title = data.jobTitle;
  if (data.photoURL !== undefined) updateData.photo_url = data.photoURL;
  if (data.socials !== undefined) updateData.socials = data.socials;

  const { error } = await supabase
    .from("user_profile")
    .upsert({ id: "general", ...updateData });

  if (error) throw error;
};

export const uploadAvatar = async (file: File): Promise<string> => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading avatar: ", error);
    throw error;
  }
};

// ============================================================
// Service Description
// ============================================================
export const getUserDescription = async (): Promise<UserDescription | null> => {
  const { data, error } = await supabase
    .from("user_description")
    .select("*")
    .eq("id", "description")
    .single();

  if (error || !data) return null;

  return {
    name: data.name,
    description: data.description,
  } as UserDescription;
};

export const updateUserDescription = async (
  data: Partial<UserDescription>,
) => {
  const updateData: Record<string, unknown> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;

  const { error } = await supabase
    .from("user_description")
    .upsert({ id: "description", ...updateData });

  if (error) throw error;
};

// ============================================================
// Service Skills
// ============================================================
export const getUserSkills = async (): Promise<{
  items: UserSkills[];
} | null> => {
  const { data, error } = await supabase.from("user_skills").select("*");

  if (error) return { items: [] };

  return {
    items: (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      category: row.category,
      icons: row.icons,
    })) as UserSkills[],
  };
};

export const addUserSkill = async (newSkill: UserSkills) => {
  const { error } = await supabase.from("user_skills").insert({
    id: newSkill.id,
    name: newSkill.name,
    category: newSkill.category,
    icons: newSkill.icons,
  });

  if (error) throw error;
};

export const deleteUserSkill = async (skillToDelete: UserSkills) => {
  const { error } = await supabase
    .from("user_skills")
    .delete()
    .eq("id", skillToDelete.id);

  if (error) throw error;
};

// ============================================================
// Service Career
// ============================================================
export const getUserCarrer = async (): Promise<{
  items: UserCareer[];
} | null> => {
  const { data, error } = await supabase.from("user_career").select("*");

  if (error) return { items: [] };

  return {
    items: (data || []).map((row) => ({
      id: row.id,
      logo: row.logo,
      company: row.company,
      position: row.position,
      location: row.location,
      startMonth: row.start_month,
      startYear: row.start_year,
      endMonth: row.end_month,
      endYear: row.end_year,
      description: row.description,
      gallery: row.gallery,
    })) as UserCareer[],
  };
};

export const addUserCarrer = async (newCarrer: UserCareer) => {
  const { error } = await supabase.from("user_career").insert({
    id: newCarrer.id,
    logo: newCarrer.logo,
    company: newCarrer.company,
    position: newCarrer.position,
    location: newCarrer.location,
    start_month: newCarrer.startMonth,
    start_year: newCarrer.startYear,
    end_month: newCarrer.endMonth,
    end_year: newCarrer.endYear,
    description: newCarrer.description,
    gallery: newCarrer.gallery || [],
  });

  if (error) throw error;
};

export const deleteUserCarrer = async (carrerToDelete: UserCareer) => {
  const { error } = await supabase
    .from("user_career")
    .delete()
    .eq("id", carrerToDelete.id);

  if (error) throw error;
};

export const updateUserCarrer = async (
  oldCareer: UserCareer,
  updatedCareer: UserCareer,
) => {
  const { error } = await supabase
    .from("user_career")
    .update({
      logo: updatedCareer.logo,
      company: updatedCareer.company,
      position: updatedCareer.position,
      location: updatedCareer.location,
      start_month: updatedCareer.startMonth,
      start_year: updatedCareer.startYear,
      end_month: updatedCareer.endMonth,
      end_year: updatedCareer.endYear,
      description: updatedCareer.description,
      gallery: updatedCareer.gallery || [],
    })
    .eq("id", oldCareer.id);

  if (error) throw error;
};

export const uploadMultipleGalleries = async (
  files: File[],
): Promise<string[]> => {
  try {
    const uploadPromises = files.map((file) => uploadAvatar(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Error uploading multiple galleries: ", error);
    throw error;
  }
};

// ============================================================
// Service Achievement
// ============================================================
export const getUserAchivement = async (): Promise<{
  items: UserAchievement[];
} | null> => {
  const { data, error } = await supabase
    .from("user_achievements")
    .select("*");

  if (error) return { items: [] };

  return {
    items: (data || []).map((row) => ({
      id: row.id,
      title: row.title,
      organization: row.organization,
      location: row.location,
      month: row.month,
      year: row.year,
      category: row.category,
      logo: row.logo,
      gallery: row.gallery,
    })) as UserAchievement[],
  };
};

export const addUserAchivement = async (newAchivement: UserAchievement) => {
  const { error } = await supabase.from("user_achievements").insert({
    id: newAchivement.id,
    title: newAchivement.title,
    organization: newAchivement.organization,
    location: newAchivement.location,
    month: newAchivement.month,
    year: newAchivement.year,
    category: newAchivement.category,
    logo: newAchivement.logo,
    gallery: newAchivement.gallery || [],
  });

  if (error) throw error;
};

export const deleteUserAchivement = async (
  achivementToDelete: UserAchievement,
) => {
  const { error } = await supabase
    .from("user_achievements")
    .delete()
    .eq("id", achivementToDelete.id);

  if (error) throw error;
};

export const updateUserAchivement = async (
  oldAchievement: UserAchievement,
  updatedAchievement: UserAchievement,
) => {
  const { error } = await supabase
    .from("user_achievements")
    .update({
      title: updatedAchievement.title,
      organization: updatedAchievement.organization,
      location: updatedAchievement.location,
      month: updatedAchievement.month,
      year: updatedAchievement.year,
      category: updatedAchievement.category,
      logo: updatedAchievement.logo,
      gallery: updatedAchievement.gallery || [],
    })
    .eq("id", oldAchievement.id);

  if (error) throw error;
};

// ============================================================
// Upload PDF to Supabase Storage
// ============================================================
export const uploadPDF = async (file: File): Promise<string> => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from("cvs").upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("cvs").getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading PDF: ", error);
    throw error;
  }
};

// ============================================================
// Service CV
// ============================================================
export const getUserCV = async (): Promise<{
  items: UserCV[];
} | null> => {
  const { data, error } = await supabase.from("user_cv").select("*");

  if (error) return { items: [] };

  return {
    items: (data || []).map((row) => ({
      id: row.id,
      language: row.language,
      fileUrl: row.file_url,
      fileName: row.file_name,
    })) as UserCV[],
  };
};

export const addUserCV = async (newCV: UserCV) => {
  const { error } = await supabase.from("user_cv").insert({
    id: newCV.id,
    language: newCV.language,
    file_url: newCV.fileUrl,
    file_name: newCV.fileName,
  });

  if (error) throw error;
};

export const deleteUserCV = async (cvToDelete: UserCV) => {
  const { error } = await supabase
    .from("user_cv")
    .delete()
    .eq("id", cvToDelete.id);

  if (error) throw error;
};
