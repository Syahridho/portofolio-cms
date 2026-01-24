"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userProfileSchema } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IconEdit, IconX } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateProfile } from "@/hooks/use-profile";
import { uploadAvatar } from "@/services/home.service";

type UserProfileValues = z.infer<typeof userProfileSchema>;

interface EditProfileDialogProps {
  currentName: string;
  currentJobTitle: string;
  currentAvatar: string;
  currentEmail: string;
  currentLinkedin: string;
  currentGithub: string;
  currentInstagram: string;
  currentWhatsapp: string;
}

export function EditProfileDialog({
  currentName,
  currentJobTitle,
  currentAvatar,
  currentEmail,
  currentLinkedin,
  currentGithub,
  currentInstagram,
  currentWhatsapp,
}: EditProfileDialogProps) {
  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();
  const [open, setOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<UserProfileValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: currentName || "",
      jobTitle: currentJobTitle || "",
      photoURL: currentAvatar || "",
      socials: {
        email: currentEmail || "",
        linkedin: currentLinkedin || "",
        github: currentGithub || "",
        instagram: currentInstagram || "",
        whatsapp: currentWhatsapp || "",
      },
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAvatarPreview = () => {
    setAvatarPreview(null);
    setSelectedFile(null);
    const fileInput = document.getElementById(
      "avatar-input",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    form.setValue("photoURL", currentAvatar || "");
  };

  const onSubmit = async (values: UserProfileValues) => {
    try {
      let finalPhotoURL = values.photoURL;

      if (selectedFile) {
        setIsUploading(true);
        finalPhotoURL = await uploadAvatar(selectedFile);
        setIsUploading(false);
      }

      updateProfile(
        { ...values, photoURL: finalPhotoURL },
        {
          onSuccess: () => {
            setOpen(false);
            form.reset({ ...values, photoURL: finalPhotoURL });
            setSelectedFile(null);
            setAvatarPreview(null);
          },
        },
      );
    } catch (error) {
      console.error(error);
      setIsUploading(false);
    }
  };

  const isLoading = isUploading || isSaving;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon-sm" variant="outline">
          <IconEdit />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Edit Profil</DialogTitle>
          <DialogDescription>Perbarui informasi profil Anda.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex-1 overflow-hidden flex flex-col"
          >
            <div className="grid gap-4 py-4 overflow-y-auto px-1 flex-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Stack Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-3">
                <FormLabel>Foto Profil</FormLabel>
                {(avatarPreview || currentAvatar) && (
                  <div className="relative w-32 h-32 mx-auto mb-2">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={avatarPreview || currentAvatar} />
                      <AvatarFallback>IMG</AvatarFallback>
                    </Avatar>

                    {avatarPreview && (
                      <Button
                        type="button"
                        size="icon-sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 rounded-full"
                        onClick={clearAvatarPreview}
                      >
                        <IconX size={16} />
                      </Button>
                    )}
                  </div>
                )}

                <Input
                  id="avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={isLoading}
                />

                <FormField
                  control={form.control}
                  name="photoURL"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4 border-t space-y-4">
                <h4 className="text-sm font-semibold">
                  Media Sosial (URL Lengkap)
                </h4>

                <FormField
                  control={form.control}
                  name="socials.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email@anda.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socials.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socials.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socials.instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://instagram.com/..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="socials.whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://wa.me/628..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline" type="button" disabled={isLoading}>
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isUploading
                  ? "Mengunggah Gambar..."
                  : isSaving
                    ? "Menyimpan..."
                    : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
