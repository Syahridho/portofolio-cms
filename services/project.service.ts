import { db } from "@/lib/firebase";
import { storage } from "@/lib/firebase";
import { UserProject } from "@/types/index";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Helper function to remove undefined values from objects
const removeUndefined = <T extends Record<string, any>>(obj: T): T => {
  const cleaned = { ...obj };
  Object.keys(cleaned).forEach((key) => {
    if (cleaned[key] === undefined) {
      delete cleaned[key];
    }
  });
  return cleaned;
};

// Upload project image to Firebase Storage
export const uploadProjectImage = async (file: File): Promise<string> => {
  try {
    const fileName = `projects/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading project image: ", error);
    throw error;
  }
};

// Get all user projects
export const getUserProjects = async (): Promise<{
  items: UserProject[];
} | null> => {
  const docRef = doc(db, "userProfile", "projects");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return { items: data.items || [] };
  } else {
    return { items: [] };
  }
};

// Add new project
export const addUserProject = async (newProject: UserProject) => {
  const docRef = doc(db, "userProfile", "projects");
  const cleanedProject = removeUndefined(newProject);

  await setDoc(
    docRef,
    {
      items: arrayUnion(cleanedProject),
    },
    { merge: true }
  );
};

// Delete project
export const deleteUserProject = async (projectToDelete: UserProject) => {
  const docRef = doc(db, "userProfile", "projects");

  await updateDoc(docRef, {
    items: arrayRemove(projectToDelete),
  });
};

// Update project
export const updateUserProject = async (
  oldProject: UserProject,
  updatedProject: UserProject
) => {
  const docRef = doc(db, "userProfile", "projects");
  const cleanedProject = removeUndefined(updatedProject);

  // Remove old project and add updated one
  await updateDoc(docRef, {
    items: arrayRemove(oldProject),
  });

  await updateDoc(docRef, {
    items: arrayUnion(cleanedProject),
  });
};
