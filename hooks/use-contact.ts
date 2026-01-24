import {
  addContactMessage,
  getContactMessages,
} from "@/services/contact.service";
import { UserContact } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useContacts = () => {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: getContactMessages,
  });
};

export const useAddContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newData: Omit<UserContact, "id">) =>
      addContactMessage(newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Pesan berhasil dikirim!");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
    },
  });
};
