import { supabase } from "@/lib/supabase";
import { UserContact } from "@/types/index";

// Add new contact message
export const addContactMessage = async (
  contactData: Omit<UserContact, "id">,
) => {
  const { data, error } = await supabase
    .from("contacts")
    .insert({
      name: contactData.name,
      email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
    })
    .select("id")
    .single();

  if (error) throw error;

  return data.id;
};

// Get all contact messages
export const getContactMessages = async (): Promise<UserContact[]> => {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];

  return (data || []).map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
  })) as UserContact[];
};
