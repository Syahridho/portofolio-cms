"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconEdit,
  IconX,
  IconPlus,
  IconBriefcase,
  IconTrash,
} from "@tabler/icons-react";
import { Checkbox } from "@/components/ui/checkbox";
import { UserCarrer } from "@/types";
import {
  useAddCareer,
  useDeleteCareer,
  useUpdateCareer,
} from "@/hooks/use-carrer";
import { userCareerSchema } from "@/lib/schemas";
import { uploadAvatar, uploadMultipleGalleries } from "@/services/home.service";
import { toast } from "sonner";

type UserCareerValues = z.infer<typeof userCareerSchema>;

interface EditCareerDialogProps {
  careers: UserCarrer[];
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
  (_, i) => new Date().getFullYear() - i,
);

export function EditCareerDialog({
  careers: initialCareers,
}: EditCareerDialogProps) {
  const { mutate: addCareer, isPending: isAdding } = useAddCareer();
  const { mutate: deleteCareer, isPending: isDeleting } = useDeleteCareer();
  const { mutate: updateCareer, isPending: isUpdating } = useUpdateCareer();

  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState<UserCarrer | null>(null);
  const [isCurrentJob, setIsCurrentJob] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // Edit mode states
  const [editMode, setEditMode] = useState<"add" | "edit">("add");
  const [careerToEdit, setCareerToEdit] = useState<UserCarrer | null>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]);

  const form = useForm<UserCareerValues>({
    resolver: zodResolver(userCareerSchema),
    defaultValues: {
      company: "",
      position: "",
      location: "",
      startMonth: 1,
      startYear: new Date().getFullYear(),
      endMonth: null,
      endYear: null,
      description: "",
      logo: "",
      gallery: [],
    },
  });

  const handleEditClick = (career: UserCarrer) => {
    setEditMode("edit");
    setCareerToEdit(career);

    // Pre-fill form with existing data
    form.reset({
      company: career.company,
      position: career.position,
      location: career.location,
      startMonth: career.startMonth,
      startYear: career.startYear,
      endMonth: career.endMonth,
      endYear: career.endYear,
      description: career.description || "",
      logo: career.logo || "",
      gallery: career.gallery || [],
    });

    // Set current job status
    setIsCurrentJob(!career.endMonth && !career.endYear);

    // Set logo preview if exists
    if (career.logo) {
      setLogoPreview(career.logo);
    }

    // Set gallery previews if exists
    if (career.gallery && career.gallery.length > 0) {
      setGalleryPreviews(career.gallery);
      setExistingGalleryUrls(career.gallery);
    }

    setIsAddDialogOpen(true);
  };

  const handleDeleteClick = (career: UserCarrer) => {
    setCareerToDelete(career);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (careerToDelete) {
      deleteCareer(careerToDelete, {
        onSuccess: () => {
          setCareerToDelete(null);
          setIsDeleteDialogOpen(false);
        },
      });
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxFiles = 5 - galleryPreviews.length;
    const filesToProcess = files.slice(0, maxFiles);

    // Add new files to galleryFiles
    setGalleryFiles((prev) => [...prev, ...filesToProcess]);

    // Create preview for new files
    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setGalleryPreviews((prev) => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  const removeGalleryImage = (index: number) => {
    const previewToRemove = galleryPreviews[index];

    // Remove from previews
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));

    // If it's an existing URL (starts with http), remove from existingGalleryUrls
    if (previewToRemove.startsWith("http")) {
      setExistingGalleryUrls((prev) =>
        prev.filter((url) => url !== previewToRemove),
      );
    } else {
      // If it's a new file (data:image), find and remove from galleryFiles
      // Count how many existing URLs are before this index
      const existingUrlsBeforeIndex = galleryPreviews
        .slice(0, index)
        .filter((url) => url.startsWith("http")).length;

      // The file index is the preview index minus existing URLs before it
      const fileIndex = index - existingUrlsBeforeIndex;
      setGalleryFiles((prev) => prev.filter((_, i) => i !== fileIndex));
    }
  };

  const clearLogoPreview = () => {
    setLogoPreview(null);
    setLogoFile(null);
    const fileInput = document.getElementById(
      "logo-upload",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (values: UserCareerValues) => {
    try {
      setIsUploading(true);

      // Upload logo to Storage if new file exists
      let logoUrl = values.logo || "";
      if (logoFile) {
        toast.info("Mengupload logo...");
        logoUrl = await uploadAvatar(logoFile);
      }

      // Upload gallery images to Storage if new files exist
      let galleryUrls: string[] = [];

      // Start with existing URLs that weren't removed
      galleryUrls = [...existingGalleryUrls];

      // Upload new files and add their URLs
      if (galleryFiles.length > 0) {
        toast.info(`Mengupload ${galleryFiles.length} gambar galeri...`);
        const newGalleryUrls = await uploadMultipleGalleries(galleryFiles);
        galleryUrls = [...galleryUrls, ...newGalleryUrls];
      }

      // Build career object without undefined values
      const career: UserCarrer = {
        id:
          editMode === "edit" && careerToEdit
            ? careerToEdit.id
            : Date.now().toString(),
        company: values.company,
        position: values.position,
        location: values.location,
        startMonth: values.startMonth,
        startYear: values.startYear,
        endMonth: isCurrentJob ? null : values.endMonth,
        endYear: isCurrentJob ? null : values.endYear,
        description: values.description || "",
      };

      // Only add optional fields if they have values
      if (logoUrl) {
        career.logo = logoUrl;
      }
      if (galleryUrls.length > 0) {
        career.gallery = galleryUrls;
      }

      if (editMode === "edit" && careerToEdit) {
        // Update existing career
        updateCareer(
          { oldCareer: careerToEdit, updatedCareer: career },
          {
            onSuccess: () => {
              resetForm();
            },
            onError: () => {
              setIsUploading(false);
            },
          },
        );
      } else {
        // Add new career
        addCareer(career, {
          onSuccess: () => {
            resetForm();
          },
          onError: () => {
            setIsUploading(false);
          },
        });
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Gagal mengupload gambar");
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    form.reset({
      company: "",
      position: "",
      location: "",
      startMonth: 1,
      startYear: new Date().getFullYear(),
      endMonth: null,
      endYear: null,
      description: "",
      logo: "",
      gallery: [],
    });
    setIsCurrentJob(true);
    setLogoPreview(null);
    setLogoFile(null);
    setGalleryPreviews([]);
    setGalleryFiles([]);
    setExistingGalleryUrls([]);
    setIsAddDialogOpen(false);
    setIsUploading(false);
    setEditMode("add");
    setCareerToEdit(null);
  };

  const formatPeriod = (
    startMonth: number,
    startYear: number,
    endMonth: number | null,
    endYear: number | null,
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
                onClick={() => {
                  setEditMode("add");
                  setCareerToEdit(null);
                  form.reset({
                    company: "",
                    position: "",
                    location: "",
                    startMonth: 1,
                    startYear: new Date().getFullYear(),
                    endMonth: null,
                    endYear: null,
                    description: "",
                    logo: "",
                    gallery: [],
                  });
                  setLogoPreview(null);
                  setLogoFile(null);
                  setGalleryPreviews([]);
                  setGalleryFiles([]);
                  setExistingGalleryUrls([]);
                  setIsCurrentJob(true);
                  setIsAddDialogOpen(true);
                }}
                className="gap-1 ml-4 mr-8"
              >
                <IconPlus size={16} />
                Tambah
              </Button>
            </div>
          </DialogHeader>

          <div className="grid gap-3 py-4 overflow-y-auto max-h-[60vh]">
            {initialCareers.map((career) => (
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
                          career.endYear,
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
                      className="h-8 w-8 hover:bg-secondary"
                      onClick={() => handleEditClick(career)}
                    >
                      <IconEdit size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 hover:bg-destructive/30 hover:text-destructive-foreground/50 "
                      onClick={() => handleDeleteClick(career)}
                    >
                      <IconTrash size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {initialCareers.length === 0 && (
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
            <Button type="submit" disabled={isAdding || isDeleting}>
              {isAdding || isDeleting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Career Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editMode === "edit"
                ? "Edit Pengalaman Karir"
                : "Tambah Pengalaman Karir"}
            </DialogTitle>
            <DialogDescription>
              {editMode === "edit"
                ? "Perbarui informasi pengalaman kerja atau pendidikan Anda."
                : "Tambahkan pengalaman kerja atau pendidikan baru."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]"
            >
              {/* Logo Upload */}
              <div className="grid gap-3">
                <FormLabel htmlFor="logo-upload">Logo Perusahaan</FormLabel>

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

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Perusahaan/Institusi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Google Indonesia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Posisi/Jabatan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Software Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokasi</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Indonesia, Jakarta"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Start Date */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="startMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bulan Mulai</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun Mulai</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {YEARS.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* End Date */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="endMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bulan Selesai</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value?.toString() || ""}
                        disabled={isCurrentJob}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih bulan" />
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun Selesai</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value?.toString() || ""}
                        disabled={isCurrentJob}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih tahun" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {YEARS.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="current"
                  checked={isCurrentJob}
                  onCheckedChange={(checked) => {
                    setIsCurrentJob(checked as boolean);
                    if (checked) {
                      form.setValue("endMonth", null);
                      form.setValue("endYear", null);
                    }
                  }}
                />
                <FormLabel htmlFor="current" className="cursor-pointer">
                  Saya masih bekerja/belajar di sini
                </FormLabel>
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ceritakan tentang pekerjaan atau pengalaman Anda di sini..."
                        {...field}
                        rows={4}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gallery Upload */}
              <div className="grid gap-3">
                <FormLabel>Galeri (Maksimal 5 gambar)</FormLabel>

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

              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    resetForm();
                  }}
                  disabled={isAdding || isUpdating || isUploading}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isAdding || isUpdating || isUploading}
                >
                  {isUploading
                    ? "Mengupload..."
                    : editMode === "edit"
                      ? isUpdating
                        ? "Memperbarui..."
                        : "Perbarui Karir"
                      : isAdding
                        ? "Menambahkan..."
                        : "Tambah Karir"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
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
