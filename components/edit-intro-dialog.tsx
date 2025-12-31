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
import { Textarea } from "@/components/ui/textarea";
import { IconEdit } from "@tabler/icons-react";

interface EditIntroDialogProps {
  currentName: string;
  currentDescription: string;
}

export function EditIntroDialog({
  currentName,
  currentDescription,
}: EditIntroDialogProps) {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const maxDescriptionLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log({ name, description });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon-sm" variant="outline">
          <IconEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Intro</DialogTitle>
            <DialogDescription>
              Perbarui nama dan deskripsi Anda yang akan ditampilkan di halaman
              utama.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="intro-name">Nama Lengkap</Label>
              <Input
                id="intro-name"
                name="name"
                placeholder="Masukkan nama lengkap Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Nama ini akan ditampilkan sebagai "Hi, I'm [Nama Anda]"
              </p>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="intro-description">Deskripsi</Label>
                <span className="text-xs text-muted-foreground">
                  {description.length}/{maxDescriptionLength}
                </span>
              </div>
              <Textarea
                id="intro-description"
                name="description"
                placeholder="Ceritakan tentang diri Anda, keahlian, dan pengalaman..."
                value={description}
                onChange={(e) => {
                  if (e.target.value.length <= maxDescriptionLength) {
                    setDescription(e.target.value);
                  }
                }}
                rows={6}
                required
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Deskripsi singkat tentang Anda sebagai programmer
              </p>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Batal
              </Button>
            </DialogClose>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
