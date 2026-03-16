import { supabase } from "@/lib/supabase";
import { UserProject } from "@/types/index";

// Upload project image to Supabase Storage
export const uploadProjectImage = async (file: File): Promise<string> => {
  try {
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("projects")
      .upload(fileName, file);

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("projects").getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading project image: ", error);
    throw error;
  }
};

// Get all user projects
export const getUserProjects = async (): Promise<{
  items: UserProject[];
} | null> => {
  const { data, error } = await supabase.from("user_projects").select("*");

  if (error) return { items: [] };

  return {
    items: (data || []).map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      image: row.image,
      month: row.month,
      year: row.year,
      technologies: row.technologies,
      githubUrl: row.github_url,
      liveDemoUrl: row.live_demo,
    })) as UserProject[],
  };
};

// Add new project
export const addUserProject = async (newProject: UserProject) => {
  const { error } = await supabase.from("user_projects").insert({
    id: newProject.id,
    title: newProject.title,
    description: newProject.description,
    image: newProject.image,
    month: newProject.month,
    year: newProject.year,
    technologies: newProject.technologies,
    github_url: newProject.githubUrl,
    live_demo: newProject.liveDemoUrl,
  });

  if (error) throw error;
};

// Delete project
export const deleteUserProject = async (projectToDelete: UserProject) => {
  const { error } = await supabase
    .from("user_projects")
    .delete()
    .eq("id", projectToDelete.id);

  if (error) throw error;
};

// Update project
export const updateUserProject = async (
  oldProject: UserProject,
  updatedProject: UserProject,
) => {
  const { error } = await supabase
    .from("user_projects")
    .update({
      title: updatedProject.title,
      description: updatedProject.description,
      image: updatedProject.image,
      month: updatedProject.month,
      year: updatedProject.year,
      technologies: updatedProject.technologies,
      github_url: updatedProject.githubUrl,
      live_demo: updatedProject.liveDemoUrl,
    })
    .eq("id", oldProject.id);

  if (error) throw error;
};
