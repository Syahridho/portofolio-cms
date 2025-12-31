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
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information and social media links.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]">
            {/* Basic Info */}
            <div className="grid gap-3">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                defaultValue={currentName}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                name="jobTitle"
                placeholder="e.g. Full Stack Developer"
                defaultValue={currentJobTitle}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="avatar">Avatar Photo</Label>

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
                Upload a profile photo (JPG, PNG, or WebP)
              </p>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-semibold mb-3">Social Media Links</h4>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  defaultValue={currentEmail}
                />
              </div>

              <div className="grid gap-3 mt-3">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  defaultValue={currentLinkedin}
                />
              </div>

              <div className="grid gap-3 mt-3">
                <Label htmlFor="github">GitHub Profile</Label>
                <Input
                  id="github"
                  name="github"
                  type="url"
                  placeholder="https://github.com/yourusername"
                  defaultValue={currentGithub}
                />
              </div>

              <div className="grid gap-3 mt-3">
                <Label htmlFor="instagram">Instagram Profile</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  type="url"
                  placeholder="https://instagram.com/yourusername"
                  defaultValue={currentInstagram}
                />
              </div>

              <div className="grid gap-3 mt-3">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="628123456789 (without +)"
                  defaultValue={currentWhatsapp}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
