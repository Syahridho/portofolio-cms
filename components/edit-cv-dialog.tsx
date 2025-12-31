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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  IconEdit,
  IconX,
  IconPlus,
  IconFileText,
  IconDownload,
} from "@tabler/icons-react";
import type { CVItem } from "@/lib/cv-data";

interface EditCVDialogProps {
  cvs: CVItem[];
}

export function EditCVDialog({ cvs: initialCVs }: EditCVDialogProps) {
  const [cvs, setCVs] = useState<CVItem[]>(initialCVs);
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cvToDelete, setCVToDelete] = useState<CVItem | null>(null);

  const [newCV, setNewCV] = useState<Partial<CVItem>>({
    language: "",
    fileUrl: "",
    fileName: "",
  });

  const handleDeleteClick = (cv: CVItem) => {
    setCVToDelete(cv);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (cvToDelete) {
      setCVs(cvs.filter((c) => c.id !== cvToDelete.id));
      setCVToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In real app, you would upload to server and get URL
      // For now, we'll use FileReader to create a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCV({
          ...newCV,
          fileUrl: reader.result as string,
          fileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCV = () => {
    const cv: CVItem = {
      id: Date.now().toString(),
      language: newCV.language || "",
      fileUrl: newCV.fileUrl || "",
      fileName: newCV.fileName || "",
    };
    setCVs([cv, ...cvs]);

    // Reset form
    setNewCV({
      language: "",
      fileUrl: "",
      fileName: "",
    });
    setIsAddDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
        <DialogTrigger asChild>
          <Button size="icon-sm" variant="outline">
            <IconEdit />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="mr-auto">
                <DialogTitle>Edit CV</DialogTitle>
                <DialogDescription>
                  Kelola CV Anda dalam berbagai bahasa.
                </DialogDescription>
              </div>
              <Button
                size="sm"
                onClick={() => setIsAddDialogOpen(true)}
                className="gap-1 ml-4 mr-8"
              >
                <IconPlus size={16} />
                Tambah
              </Button>
            </div>
          </DialogHeader>

          <div className="grid gap-3 py-4 overflow-y-auto max-h-[60vh]">
            {cvs.map((cv) => (
              <div
                key={cv.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                // Added minimal padding and hover for better UX in list management
                // but kept it cleaner than before
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                  <IconFileText size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold">{cv.language}</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {cv.fileName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    className="hover:bg-accent"
                    asChild
                  >
                    <a href={cv.fileUrl} download={cv.fileName}>
                      <IconDownload size={16} />
                    </a>
                  </Button>
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    className="hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleDeleteClick(cv)}
                  >
                    <IconX size={16} />
                  </Button>
                </div>
              </div>
            ))}
            {cvs.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <IconFileText size={48} className="mx-auto mb-2 opacity-50" />
                <p>Belum ada CV</p>
                <p className="text-sm">Klik tombol Tambah untuk menambahkan</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Tutup</Button>
            </DialogClose>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add CV Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tambah CV</DialogTitle>
            <DialogDescription>
              Upload CV Anda dalam bahasa tertentu.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="cv-language">Bahasa</Label>
              <Input
                id="cv-language"
                placeholder="Contoh: Indonesia, English, Mandarin"
                value={newCV.language}
                onChange={(e) =>
                  setNewCV({ ...newCV, language: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="cv-file">File CV (PDF)</Label>
              <Input
                id="cv-file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {newCV.fileName && (
                <p className="text-xs text-muted-foreground">
                  File dipilih: {newCV.fileName}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Upload file CV dalam format PDF
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleAddCV}
              disabled={!newCV.language || !newCV.fileUrl}
            >
              Tambah CV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus CV?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus CV{" "}
              <strong>{cvToDelete?.language}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
