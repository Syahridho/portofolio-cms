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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconEdit,
  IconX,
  IconPlus,
  IconBriefcase,
  IconUpload,
} from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";
import type { CareerItem } from "@/lib/career-data";

interface EditCareerDialogProps {
  careers: CareerItem[];
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

export function EditCareerDialog({
  careers: initialCareers,
}: EditCareerDialogProps) {
  const [careers, setCareers] = useState<CareerItem[]>(initialCareers);
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState<CareerItem | null>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const [newCareer, setNewCareer] = useState<Partial<CareerItem>>({
    company: "",
    position: "",
    location: "",
    startMonth: 1,
    startYear: new Date().getFullYear(),
    endMonth: null,
    endYear: null,
    description: "",
    gallery: [],
  });
  const [isCurrentJob, setIsCurrentJob] = useState(true);

  const handleDeleteClick = (career: CareerItem) => {
    setCareerToDelete(career);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (careerToDelete) {
      setCareers(careers.filter((c) => c.id !== careerToDelete.id));
      setCareerToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        setNewCareer({ ...newCareer, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxFiles = 5 - galleryPreviews.length;
    const filesToProcess = files.slice(0, maxFiles);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setGalleryPreviews((prev) => [...prev, result]);
        setNewCareer((prev) => ({
          ...prev,
          gallery: [...(prev.gallery || []), result],
        }));
      };
      reader.readAsDataURL(file);
    });

    // Reset input value to allow selecting the same file again or adding more files
    e.target.value = "";
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    setNewCareer((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== index),
    }));
  };

  const clearLogoPreview = () => {
    setLogoPreview(null);
    setNewCareer({ ...newCareer, logo: undefined });
    const fileInput = document.getElementById(
      "logo-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const handleAddCareer = () => {
    const career: CareerItem = {
      id: Date.now().toString(),
      company: newCareer.company || "",
      position: newCareer.position || "",
      location: newCareer.location || "",
      startMonth: newCareer.startMonth || 1,
      startYear: newCareer.startYear || new Date().getFullYear(),
      endMonth: isCurrentJob ? null : newCareer.endMonth || null,
      endYear: isCurrentJob ? null : newCareer.endYear || null,
      logo: newCareer.logo,
      description: newCareer.description,
      gallery: newCareer.gallery || [],
    };
    setCareers([career, ...careers]);

    // Reset form
    setNewCareer({
      company: "",
      position: "",
      location: "",
      startMonth: 1,
      startYear: new Date().getFullYear(),
      endMonth: null,
      endYear: null,
      description: "",
      gallery: [],
    });
    setIsCurrentJob(true);
    setLogoPreview(null);
    setGalleryPreviews([]);
    setIsAddDialogOpen(false);
  };

  const formatPeriod = (
    startMonth: number,
    startYear: number,
    endMonth: number | null,
    endYear: number | null
  ) => {
    const startMonthName =
      MONTHS.find((m) => m.value === startMonth)?.label || "";
    if (!endMonth || !endYear) {
      return `${startMonthName} ${startYear} - Sekarang`;
    }
    const endMonthName = MONTHS.find((m) => m.value === endMonth)?.label || "";
    return `${startMonthName} ${startYear} - ${endMonthName} ${endYear}`;
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
                <DialogTitle>Edit Karir</DialogTitle>
                <DialogDescription>
                  Kelola riwayat karir dan pengalaman kerja Anda.
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
            {careers.map((career) => (
              <div
                key={career.id}
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                {career.logo ? (
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={career.logo} alt={career.company} />
                    <AvatarFallback>{career.company.charAt(0)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                    {career.company.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-semibold">{career.company}</h4>
                      <p className="text-sm text-muted-foreground">
                        {career.position}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {career.location} •{" "}
                        {formatPeriod(
                          career.startMonth,
                          career.startYear,
                          career.endMonth,
                          career.endYear
                        )}
                      </p>
                      {career.description && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {career.description}
                        </p>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => handleDeleteClick(career)}
                    >
                      <IconX size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {careers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <IconBriefcase size={48} className="mx-auto mb-2 opacity-50" />
                <p>Belum ada riwayat karir</p>
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

      {/* Add Career Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Tambah Pengalaman Karir</DialogTitle>
            <DialogDescription>
              Tambahkan pengalaman kerja atau pendidikan baru.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]">
            {/* Logo Upload */}
            <div className="grid gap-3">
              <Label htmlFor="logo-upload">Logo Perusahaan</Label>

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
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Upload logo perusahaan (JPG, PNG, atau WebP)
              </p>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="company">Nama Perusahaan/Institusi</Label>
              <Input
                id="company"
                placeholder="Contoh: Google Indonesia"
                value={newCareer.company}
                onChange={(e) =>
                  setNewCareer({ ...newCareer, company: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="position">Posisi/Jabatan</Label>
              <Input
                id="position"
                placeholder="Contoh: Software Engineer"
                value={newCareer.position}
                onChange={(e) =>
                  setNewCareer({ ...newCareer, position: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                placeholder="Contoh: Indonesia, Jakarta"
                value={newCareer.location}
                onChange={(e) =>
                  setNewCareer({ ...newCareer, location: e.target.value })
                }
              />
            </div>

            {/* Start Date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label>Bulan Mulai</Label>
                <Select
                  value={newCareer.startMonth?.toString()}
                  onValueChange={(value) =>
                    setNewCareer({ ...newCareer, startMonth: parseInt(value) })
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
                <Label>Tahun Mulai</Label>
                <Select
                  value={newCareer.startYear?.toString()}
                  onValueChange={(value) =>
                    setNewCareer({ ...newCareer, startYear: parseInt(value) })
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

            {/* End Date */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label>Bulan Selesai</Label>
                <Select
                  value={newCareer.endMonth?.toString() || ""}
                  onValueChange={(value) =>
                    setNewCareer({ ...newCareer, endMonth: parseInt(value) })
                  }
                  disabled={isCurrentJob}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih bulan" />
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
                <Label>Tahun Selesai</Label>
                <Select
                  value={newCareer.endYear?.toString() || ""}
                  onValueChange={(value) =>
                    setNewCareer({ ...newCareer, endYear: parseInt(value) })
                  }
                  disabled={isCurrentJob}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tahun" />
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                checked={isCurrentJob}
                onCheckedChange={(checked) => {
                  setIsCurrentJob(checked as boolean);
                  if (checked) {
                    setNewCareer({
                      ...newCareer,
                      endMonth: null,
                      endYear: null,
                    });
                  }
                }}
              />
              <Label htmlFor="current" className="cursor-pointer">
                Saya masih bekerja/belajar di sini
              </Label>
            </div>

            {/* Description */}
            <div className="grid gap-3">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                placeholder="Ceritakan tentang pekerjaan atau pengalaman Anda di sini..."
                value={newCareer.description}
                onChange={(e) =>
                  setNewCareer({ ...newCareer, description: e.target.value })
                }
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Gallery Upload */}
            <div className="grid gap-3">
              <Label>Galeri (Maksimal 5 gambar)</Label>

              <div className="grid grid-cols-5 gap-2">
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
                {galleryPreviews.length < 5 && (
                  <label
                    htmlFor="gallery-upload"
                    className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-md flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 hover:bg-accent/50 transition-colors"
                  >
                    <IconPlus size={24} className="text-muted-foreground" />
                  </label>
                )}
              </div>

              <Input
                id="gallery-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground">
                {galleryPreviews.length}/5 gambar telah dipilih
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleAddCareer}
              disabled={!newCareer.company || !newCareer.position}
            >
              Tambah Karir
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
            <AlertDialogTitle>Hapus Pengalaman Karir?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus{" "}
              <strong>{careerToDelete?.company}</strong> dari riwayat karir
              Anda? Tindakan ini tidak dapat dibatalkan.
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
