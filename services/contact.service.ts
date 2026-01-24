import { db } from "@/lib/firebase";
import { UserContact } from "@/types/index";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

// Add new contact message
export const addContactMessage = async (
  contactData: Omit<UserContact, "id">,
) => {
  const contactsRef = collection(db, "contacts");

  const docRef = await addDoc(contactsRef, {
    ...contactData,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

// Get all contact messages
export const getContactMessages = async (): Promise<UserContact[]> => {
  const contactsRef = collection(db, "contacts");
  const q = query(contactsRef, orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);

  const contacts: UserContact[] = [];
  querySnapshot.forEach((doc) => {
    contacts.push({
      id: doc.id,
      ...doc.data(),
    } as UserContact);
  });

  return contacts;
};
