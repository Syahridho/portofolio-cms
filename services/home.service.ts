import { db } from "@/lib/firebase";
import { storage } from "@/lib/firebase";
import {
  UserSkills,
  UserDescription,
  UserProfile,
  UserCarrer,
  UserAchivement,
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

  await setDoc(
    docRef,
    {
      items: arrayUnion(newSkill),
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
  items: UserCarrer[];
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

export const addUserCarrer = async (newCarrer: UserCarrer) => {
  const docRef = doc(db, "userProfile", "carrer");

  await setDoc(
    docRef,
    {
      items: arrayUnion(newCarrer),
    },
    { merge: true },
  );
};

export const deleteUserCarrer = async (carrerToDelete: UserCarrer) => {
  const docRef = doc(db, "userProfile", "carrer");

  await updateDoc(docRef, {
    items: arrayRemove(carrerToDelete),
  });
};

export const updateUserCarrer = async (
  oldCareer: UserCarrer,
  updatedCareer: UserCarrer,
) => {
  const docRef = doc(db, "userProfile", "carrer");

  // Remove old career and add updated one
  await updateDoc(docRef, {
    items: arrayRemove(oldCareer),
  });

  await updateDoc(docRef, {
    items: arrayUnion(updatedCareer),
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
  items: UserAchivement[];
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

export const addUserAchivement = async (newAchivement: UserAchivement) => {
  const docRef = doc(db, "userProfile", "achivement");

  await setDoc(
    docRef,
    {
      items: arrayUnion(newAchivement),
    },
    { merge: true },
  );
};

export const deleteUserAchivement = async (
  achivementToDelete: UserAchivement,
) => {
  const docRef = doc(db, "userProfile", "achivement");

  await updateDoc(docRef, {
    items: arrayRemove(achivementToDelete),
  });
};

export const updateUserAchivement = async (
  oldAchievement: UserAchivement,
  updatedAchievement: UserAchivement,
) => {
  const docRef = doc(db, "userProfile", "achivement");

  // Remove old achievement and add updated one
  await updateDoc(docRef, {
    items: arrayRemove(oldAchievement),
  });

  await updateDoc(docRef, {
    items: arrayUnion(updatedAchievement),
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

  await setDoc(
    docRef,
    {
      items: arrayUnion(newCV),
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
