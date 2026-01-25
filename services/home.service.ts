import { db } from "@/lib/firebase";
import { storage } from "@/lib/firebase";
import {
  UserSkills,
  UserDescription,
  UserProfile,
  UserCareer,
  UserAchievement,
  UserCV,
} from "@/types/index";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
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

// Service User Profile
export const getUserProfile = async (): Promise<UserProfile | null> => {
  const docRef = doc(db, "userProfile", "general");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  } else {
    return null;
  }
};

export const updateUserProfile = async (data: Partial<UserProfile>) => {
  const docRef = doc(db, "userProfile", "general");
  await setDoc(docRef, data, { merge: true });
};

export const uploadAvatar = async (file: File): Promise<string> => {
  try {
    const fileName = `avatars/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading avatar: ", error);
    throw error;
  }
};

// Service Description
export const getUserDescription = async (): Promise<UserDescription | null> => {
  const docRef = doc(db, "userProfile", "description");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserDescription;
  } else {
    return null;
  }
};

export const updateUserDescription = async (data: Partial<UserDescription>) => {
  const docRef = doc(db, "userProfile", "description");
  await setDoc(docRef, data, { merge: true });
};

// Service Skills
export const getUserSkills = async (): Promise<{
  items: UserSkills[];
} | null> => {
  const docRef = doc(db, "userProfile", "skills");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return { items: data.items || [] };
  } else {
    return { items: [] };
  }
};

export const addUserSkill = async (newSkill: UserSkills) => {
  const docRef = doc(db, "userProfile", "skills");
  const cleanedSkill = removeUndefined(newSkill);

  await setDoc(
    docRef,
    {
      items: arrayUnion(cleanedSkill),
    },
    { merge: true },
  );
};

export const deleteUserSkill = async (skillToDelete: UserSkills) => {
  const docRef = doc(db, "userProfile", "skills");

  await updateDoc(docRef, {
    items: arrayRemove(skillToDelete),
  });
};

// Service Carrer
export const getUserCarrer = async (): Promise<{
  items: UserCareer[];
} | null> => {
  const docRef = doc(db, "userProfile", "carrer");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return { items: data.items || [] };
  } else {
    return { items: [] };
  }
};

export const addUserCarrer = async (newCarrer: UserCareer) => {
  const docRef = doc(db, "userProfile", "carrer");
  const cleanedCarrer = removeUndefined(newCarrer);

  await setDoc(
    docRef,
    {
      items: arrayUnion(cleanedCarrer),
    },
    { merge: true },
  );
};

export const deleteUserCarrer = async (carrerToDelete: UserCareer) => {
  const docRef = doc(db, "userProfile", "carrer");

  await updateDoc(docRef, {
    items: arrayRemove(carrerToDelete),
  });
};

export const updateUserCarrer = async (
  oldCareer: UserCareer,
  updatedCareer: UserCareer,
) => {
  const docRef = doc(db, "userProfile", "carrer");
  const cleanedCareer = removeUndefined(updatedCareer);

  // Remove old career and add updated one
  await updateDoc(docRef, {
    items: arrayRemove(oldCareer),
  });

  await updateDoc(docRef, {
    items: arrayUnion(cleanedCareer),
  });
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

// Service Achievement
export const getUserAchivement = async (): Promise<{
  items: UserAchievement[];
} | null> => {
  const docRef = doc(db, "userProfile", "achivement");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return { items: data.items || [] };
  } else {
    return { items: [] };
  }
};

export const addUserAchivement = async (newAchivement: UserAchievement) => {
  const docRef = doc(db, "userProfile", "achivement");
  const cleanedAchivement = removeUndefined(newAchivement);

  await setDoc(
    docRef,
    {
      items: arrayUnion(cleanedAchivement),
    },
    { merge: true },
  );
};

export const deleteUserAchivement = async (
  achivementToDelete: UserAchievement,
) => {
  const docRef = doc(db, "userProfile", "achivement");

  await updateDoc(docRef, {
    items: arrayRemove(achivementToDelete),
  });
};

export const updateUserAchivement = async (
  oldAchievement: UserAchievement,
  updatedAchievement: UserAchievement,
) => {
  const docRef = doc(db, "userProfile", "achivement");
  const cleanedAchievement = removeUndefined(updatedAchievement);

  // Remove old achievement and add updated one
  await updateDoc(docRef, {
    items: arrayRemove(oldAchievement),
  });

  await updateDoc(docRef, {
    items: arrayUnion(cleanedAchievement),
  });
};

// Upload PDF to Firebase Storage
export const uploadPDF = async (file: File): Promise<string> => {
  try {
    const fileName = `cvs/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading PDF: ", error);
    throw error;
  }
};

// Service CV
export const getUserCV = async (): Promise<{
  items: UserCV[];
} | null> => {
  const docRef = doc(db, "userProfile", "cv");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return { items: data.items || [] };
  } else {
    return { items: [] };
  }
};

export const addUserCV = async (newCV: UserCV) => {
  const docRef = doc(db, "userProfile", "cv");
  const cleanedCV = removeUndefined(newCV);

  await setDoc(
    docRef,
    {
      items: arrayUnion(cleanedCV),
    },
    { merge: true },
  );
};

export const deleteUserCV = async (cvToDelete: UserCV) => {
  const docRef = doc(db, "userProfile", "cv");

  await updateDoc(docRef, {
    items: arrayRemove(cvToDelete),
  });
};
