"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconEdit, IconX } from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearAvatarPreview = () => {
    setAvatarPreview(null);
    // Reset the file input
    const fileInput = document.getElementById("avatar") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon-sm" variant="outline">
          <IconEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
        <form>
          <DialogHeader>
            <DialogTitle>Edit Profil</DialogTitle>
            <DialogDescription>
              Perbarui informasi profil dan tautan media sosial Anda.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]">
            {/* Basic Info */}
            <div className="grid gap-3">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                placeholder="Masukkan nama lengkap Anda"
                defaultValue={currentName}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="job-title">Jabatan</Label>
              <Input
                id="job-title"
                name="jobTitle"
                placeholder="Contoh: Full Stack Developer"
                defaultValue={currentJobTitle}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="avatar">Foto Profil</Label>

              {/* Preview Section */}
              {avatarPreview && (
                <div className="relative w-32 h-32 mx-auto">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={avatarPreview} alt="Preview" />
                    <AvatarFallback>Preview</AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 rounded-full"
                    onClick={clearAvatarPreview}
                  >
                    <IconX size={16} />
                  </Button>
                </div>
              )}

              <Input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={handleAvatarChange}
              />
              <p className="text-xs text-muted-foreground">
                Unggah foto profil (JPG, PNG, atau WebP)
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3">
                Tautan Media Sosial
              </h4>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@anda.com"
                  defaultValue={currentEmail}
                />
              </div>

              <div className="grid gap-3 mt-3">
                <Label htmlFor="linkedin">Profil LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/profilanda"
                  defaultValue={currentLinkedin}
                />
              </div>

              <div className="grid gap-3 mt-3">
                <Label htmlFor="github">Profil GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  placeholder="https://github.com/usernameanda"
                  defaultValue={currentGithub}
                />
              </div>

              <div className="grid gap-3 mt-3">
                <Label htmlFor="instagram">Profil Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  type="url"
                  placeholder="https://instagram.com/usernameanda"
                  defaultValue={currentInstagram}
                />
              </div>

              <div className="grid gap-3 mt-3">
                <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="628123456789 (tanpa +)"
                  defaultValue={currentWhatsapp}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
