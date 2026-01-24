import { db } from "@/lib/firebase";
import { storage } from "@/lib/firebase";
import { UserCertificate } from "@/types/index";
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

// Upload certificate image to Firebase Storage
export const uploadCertificateImage = async (file: File): Promise<string> => {
  try {
    const fileName = `certificates/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, fileName);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading certificate image: ", error);
    throw error;
  }
};

// Get all user certificates
export const getUserCertificates = async (): Promise<{
  items: UserCertificate[];
} | null> => {
  const docRef = doc(db, "userProfile", "certificates");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return { items: data.items || [] };
  } else {
    return { items: [] };
  }
};

// Add new certificate
export const addUserCertificate = async (newCertificate: UserCertificate) => {
  const docRef = doc(db, "userProfile", "certificates");
  const cleanedCertificate = removeUndefined(newCertificate);

  await setDoc(
    docRef,
    {
      items: arrayUnion(cleanedCertificate),
    },
    { merge: true },
  );
};

// Delete certificate
export const deleteUserCertificate = async (
  certificateToDelete: UserCertificate,
) => {
  const docRef = doc(db, "userProfile", "certificates");

  await updateDoc(docRef, {
    items: arrayRemove(certificateToDelete),
  });
};

// Update certificate
export const updateUserCertificate = async (
  oldCertificate: UserCertificate,
  updatedCertificate: UserCertificate,
) => {
  const docRef = doc(db, "userProfile", "certificates");
  const cleanedCertificate = removeUndefined(updatedCertificate);

  // Remove old certificate and add updated one
  await updateDoc(docRef, {
    items: arrayRemove(oldCertificate),
  });

  await updateDoc(docRef, {
    items: arrayUnion(cleanedCertificate),
  });
};
