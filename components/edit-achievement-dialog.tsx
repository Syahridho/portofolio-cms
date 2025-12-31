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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconEdit, IconX, IconPlus, IconTrophy } from "@tabler/icons-react";
import type { AchievementItem } from "@/lib/achievement-data";

interface EditAchievementDialogProps {
  achievements: AchievementItem[];
}

const MONTHS = [
  { value: 1, label: "Januari" },
  { value: 2, label: "Februari" },
  { value: 3, label: "Maret" },
  { value: 4, label: "April" },
  { value: 5, label: "Mei" },
  { value: 6, label: "Juni" },
  { value: 7, label: "Juli" },
  { value: 8, label: "Agustus" },
  { value: 9, label: "September" },
  { value: 10, label: "Oktober" },
  { value: 11, label: "November" },
  { value: 12, label: "Desember" },
];

const YEARS = Array.from(
  { length: 30 },
  (_, i) => new Date().getFullYear() - i
);

export function EditAchievementDialog({
  achievements: initialAchievements,
}: EditAchievementDialogProps) {
  const [achievements, setAchievements] =
    useState<AchievementItem[]>(initialAchievements);
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [achievementToDelete, setAchievementToDelete] =
    useState<AchievementItem | null>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const [newAchievement, setNewAchievement] = useState<
    Partial<AchievementItem>
  >({
    title: "",
    organization: "",
    location: "",
    month: 1,
    year: new Date().getFullYear(),
    category: "",
    gallery: [],
  });

  const handleDeleteClick = (achievement: AchievementItem) => {
    setAchievementToDelete(achievement);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (achievementToDelete) {
      setAchievements(
        achievements.filter((a) => a.id !== achievementToDelete.id)
      );
      setAchievementToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setNewAchievement({ ...newAchievement, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxFiles = 3 - galleryPreviews.length;
    const filesToProcess = files.slice(0, maxFiles);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setGalleryPreviews((prev) => [...prev, result]);
        setNewAchievement((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), result],
        }));
      };
      reader.readAsDataURL(file);
    });

    // Reset input value
    e.target.value = "";
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    setNewAchievement((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index),
    }));
  };

  const clearLogoPreview = () => {
    setLogoPreview(null);
    setNewAchievement({ ...newAchievement, logo: undefined });
    const fileInput = document.getElementById(
      "achievement-logo-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleAddAchievement = () => {
    const achievement: AchievementItem = {
      id: Date.now().toString(),
      title: newAchievement.title || "",
      organization: newAchievement.organization || "",
      location: newAchievement.location || "",
      month: newAchievement.month || 1,
      year: newAchievement.year || new Date().getFullYear(),
      category: newAchievement.category,
      logo: newAchievement.logo,
      gallery: newAchievement.gallery || [],
    };
    setAchievements([achievement, ...achievements]);

    // Reset form
    setNewAchievement({
      title: "",
      organization: "",
      location: "",
      month: 1,
      year: new Date().getFullYear(),
      category: "",
      gallery: [],
    });
    setLogoPreview(null);
    setGalleryPreviews([]);
    setIsAddDialogOpen(false);
  };

  const formatDate = (month: number, year: number) => {
    const monthName = MONTHS.find((m) => m.value === month)?.label || "";
    return `${monthName} ${year}`;
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
                <DialogTitle>Edit Penghargaan</DialogTitle>
                <DialogDescription>
                  Kelola penghargaan dan prestasi yang Anda raih.
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
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                {achievement.logo ? (
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={achievement.logo}
                      alt={achievement.title}
                    />
                    <AvatarFallback>
                      {achievement.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                    <IconTrophy size={24} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(achievement.month, achievement.year)}
                      </p>
                      <h4 className="font-semibold mt-1">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.organization}
                        {achievement.location && `, ${achievement.location}`}
                      </p>
                      {achievement.category && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {achievement.category}
                        </p>
                      )}
                      {achievement.gallery &&
                        achievement.gallery.length > 0 && (
                          <div className="flex gap-2 mt-2">
                            {achievement.gallery.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`Gallery ${idx + 1}`}
                                className="w-20 h-20 object-cover rounded border"
                              />
                            ))}
                          </div>
                        )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDeleteClick(achievement)}
                    >
                      <IconX size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {achievements.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <IconTrophy size={48} className="mx-auto mb-2 opacity-50" />
                <p>Belum ada penghargaan</p>
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

      {/* Add Achievement Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Tambah Penghargaan</DialogTitle>
            <DialogDescription>
              Tambahkan penghargaan atau prestasi yang Anda raih.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]">
            {/* Logo Upload */}
            <div className="grid gap-3">
              <Label htmlFor="achievement-logo-upload">
                Logo/Icon (Opsional)
              </Label>

              {logoPreview && (
                <div className="relative w-24 h-24 mx-auto">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={logoPreview} alt="Logo Preview" />
                    <AvatarFallback>Logo</AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 rounded-full"
                    onClick={clearLogoPreview}
                  >
                    <IconX size={16} />
                  </Button>
                </div>
              )}

              <Input
                id="achievement-logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Upload logo penyelenggara atau icon penghargaan
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="achievement-title">Judul Penghargaan</Label>
              <Input
                id="achievement-title"
                placeholder="Contoh: First Place Winner of DesFast 2024"
                value={newAchievement.title}
                onChange={(e) =>
                  setNewAchievement({
                    ...newAchievement,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="achievement-organization">Penyelenggara</Label>
              <Input
                id="achievement-organization"
                placeholder="Contoh: Event & Community"
                value={newAchievement.organization}
                onChange={(e) =>
                  setNewAchievement({
                    ...newAchievement,
                    organization: e.target.value,
                  })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="achievement-location">Lokasi (Opsional)</Label>
              <Input
                id="achievement-location"
                placeholder="Contoh: Indonesia, Riau"
                value={newAchievement.location}
                onChange={(e) =>
                  setNewAchievement({
                    ...newAchievement,
                    location: e.target.value,
                  })
                }
              />
            </div>

            {/* Date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label>Bulan</Label>
                <Select
                  value={newAchievement.month?.toString()}
                  onValueChange={(value) =>
                    setNewAchievement({
                      ...newAchievement,
                      month: parseInt(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map((month) => (
                      <SelectItem
                        key={month.value}
                        value={month.value.toString()}
                      >
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label>Tahun</Label>
                <Select
                  value={newAchievement.year?.toString()}
                  onValueChange={(value) =>
                    setNewAchievement({
                      ...newAchievement,
                      year: parseInt(value),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Category */}
            <div className="grid gap-3">
              <Label htmlFor="achievement-category">Kategori (Opsional)</Label>
              <Input
                id="achievement-category"
                placeholder="Contoh: Coding competition event"
                value={newAchievement.category}
                onChange={(e) =>
                  setNewAchievement({
                    ...newAchievement,
                    category: e.target.value,
                  })
                }
              />
            </div>

            {/* Gallery Upload */}
            <div className="grid gap-3">
              <Label>Galeri (Maksimal 3 gambar)</Label>

              <div className="grid grid-cols-3 gap-2">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={preview}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover rounded-md border"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => removeGalleryImage(index)}
                    >
                      <IconX size={12} />
                    </Button>
                  </div>
                ))}

                {/* Add Image Button */}
                {galleryPreviews.length < 3 && (
                  <label
                    htmlFor="achievement-gallery-upload"
                    className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-md flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 hover:bg-accent/50 transition-colors"
                  >
                    <IconPlus size={24} className="text-muted-foreground" />
                  </label>
                )}
              </div>

              <Input
                id="achievement-gallery-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">
                {galleryPreviews.length}/3 gambar telah dipilih
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleAddAchievement}
              disabled={!newAchievement.title || !newAchievement.organization}
            >
              Tambah Penghargaan
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
            <AlertDialogTitle>Hapus Penghargaan?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus{" "}
              <strong>{achievementToDelete?.title}</strong>? Tindakan ini tidak
              dapat dibatalkan.
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
