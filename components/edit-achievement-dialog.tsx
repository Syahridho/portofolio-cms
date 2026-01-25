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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconEdit,
  IconX,
  IconPlus,
  IconTrophy,
  IconTrash,
} from "@tabler/icons-react";
import { UserAchievement, LocalizedContent } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAddAchievement,
  useDeleteAchievement,
  useUpdateAchievement,
} from "@/hooks/use-achievement";
import { userAchievementSchema } from "@/lib/schemas";
import { uploadAvatar, uploadMultipleGalleries } from "@/services/home.service";
import { toast } from "sonner";

type UserAchievementValues = z.infer<typeof userAchievementSchema>;

interface EditAchievementDialogProps {
  achievements: UserAchievement[];
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

export function EditAchievementDialog({
  achievements: initialAchievements,
}: EditAchievementDialogProps) {
  const { mutate: addAchievement, isPending: isAdding } = useAddAchievement();
  const { mutate: deleteAchievement, isPending: isDeleting } =
    useDeleteAchievement();
  const { mutate: updateAchievement, isPending: isUpdating } =
    useUpdateAchievement();

  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [achievementToDelete, setAchievementToDelete] =
    useState<UserAchievement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Edit mode states
  const [editMode, setEditMode] = useState<"add" | "edit">("add");
  const [achievementToEdit, setAchievementToEdit] =
    useState<UserAchievement | null>(null);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]);

  const form = useForm<UserAchievementValues>({
    resolver: zodResolver(userAchievementSchema),
    defaultValues: {
      title_en: "",
      title_id: "",
      organization: "",
      location: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      category_en: "",
      category_id: "",
      logo: "",
      gallery: [],
    },
  });

  const handleEditClick = (achievement: UserAchievement) => {
    setEditMode("edit");
    setAchievementToEdit(achievement);

    // Pre-fill form with existing data
    form.reset({
      title_en:
        typeof achievement.title === "string"
          ? achievement.title
          : achievement.title?.en || "",
      title_id:
        typeof achievement.title === "string"
          ? achievement.title
          : achievement.title?.id || "",
      organization: achievement.organization,
      location: achievement.location,
      month: achievement.month,
      year: achievement.year,
      category_en:
        typeof achievement.category === "string"
          ? achievement.category
          : achievement.category?.en || "",
      category_id:
        typeof achievement.category === "string"
          ? achievement.category
          : achievement.category?.id || "",
      logo: achievement.logo || "",
      gallery: achievement.gallery || [],
    });

    // Set logo preview if exists
    if (achievement.logo) {
      setLogoPreview(achievement.logo);
    }

    // Set gallery previews if exists
    if (achievement.gallery && achievement.gallery.length > 0) {
      setGalleryPreviews(achievement.gallery);
      setExistingGalleryUrls(achievement.gallery);
    }

    setIsAddDialogOpen(true);
  };

  const handleDeleteClick = (achievement: UserAchievement) => {
    setAchievementToDelete(achievement);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (achievementToDelete) {
      deleteAchievement(achievementToDelete, {
        onSuccess: () => {
          setAchievementToDelete(null);
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

    setGalleryFiles((prev) => [...prev, ...filesToProcess]);

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
      // If it's a new file (data:image), calculate correct file index
      const existingUrlsBeforeIndex = galleryPreviews
        .slice(0, index)
        .filter((url) => url.startsWith("http")).length;

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

  const onSubmit = async (values: UserAchievementValues) => {
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

      // Build achievement object without undefined values
      const achievement: UserAchievement = {
        id:
          editMode === "edit" && achievementToEdit
            ? achievementToEdit.id
            : Date.now().toString(),
        title: {
          en: values.title_en,
          id: values.title_id,
        },
        organization: values.organization,
        location: values.location,
        month: values.month,
        year: values.year,
        category: {
          en: values.category_en,
          id: values.category_id,
        },
      };

      // Only add optional fields if they have values
      if (logoUrl) {
        achievement.logo = logoUrl;
      }
      if (galleryUrls.length > 0) {
        achievement.gallery = galleryUrls;
      }

      if (editMode === "edit" && achievementToEdit) {
        // Update existing achievement
        updateAchievement(
          {
            oldAchievement: achievementToEdit,
            updatedAchievement: achievement,
          },
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
        // Add new achievement
        addAchievement(achievement, {
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
      title_en: "",
      title_id: "",
      organization: "",
      location: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      category_en: "",
      category_id: "",
      logo: "",
      gallery: [],
    });
    setLogoPreview(null);
    setLogoFile(null);
    setGalleryPreviews([]);
    setGalleryFiles([]);
    setExistingGalleryUrls([]);
    setIsAddDialogOpen(false);
    setIsUploading(false);
    setEditMode("add");
    setAchievementToEdit(null);
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
                  Kelola daftar penghargaan dan prestasi Anda.
                </DialogDescription>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  setEditMode("add");
                  setAchievementToEdit(null);
                  form.reset({
                    title_en: "",
                    title_id: "",
                    organization: "",
                    location: "",
                    month: new Date().getMonth() + 1,
                    year: new Date().getFullYear(),
                    category_en: "",
                    category_id: "",
                    logo: "",
                    gallery: [],
                  });
                  setLogoPreview(null);
                  setLogoFile(null);
                  setGalleryPreviews([]);
                  setGalleryFiles([]);
                  setExistingGalleryUrls([]);
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
            {initialAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                {achievement.logo ? (
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={achievement.logo}
                      alt={achievement.title.id}
                    />
                    <AvatarFallback>🏆</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                    🏆
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(achievement.month, achievement.year)}
                      </p>
                      <h4 className="font-semibold mt-1">
                        {achievement.title.id}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {achievement.organization}
                        {achievement.location && `, ${achievement.location}`}
                      </p>
                      {achievement.category && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {achievement.category.id}
                        </p>
                      )}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 hover:bg-secondary"
                      onClick={() => handleEditClick(achievement)}
                    >
                      <IconEdit size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 hover:bg-destructive/30 hover:text-destructive-foreground/50"
                      onClick={() => handleDeleteClick(achievement)}
                    >
                      <IconX size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {initialAchievements.length === 0 && (
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
            <Button
              type="submit"
              disabled={isAdding || isUpdating || isDeleting}
            >
              {isAdding || isUpdating || isDeleting
                ? "Menyimpan..."
                : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Achievement Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editMode === "edit" ? "Edit Penghargaan" : "Tambah Penghargaan"}
            </DialogTitle>
            <DialogDescription>
              {editMode === "edit"
                ? "Perbarui informasi penghargaan atau prestasi Anda."
                : "Tambahkan penghargaan atau prestasi baru."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]"
            >
              {/* Logo Upload */}
              <div className="grid gap-3">
                <FormLabel htmlFor="logo-upload">Logo/Badge</FormLabel>

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
                  Upload logo atau badge penghargaan (JPG, PNG, atau WebP)
                </p>
              </div>

              {/* Title dengan Tabs Multi-bahasa */}
              <div className="space-y-2">
                <FormLabel>Judul Penghargaan</FormLabel>
                <Tabs defaultValue="id" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
                    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                  </TabsList>

                  <TabsContent value="id" className="space-y-2">
                    <FormField
                      control={form.control}
                      name="title_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Contoh: Juara 1 Hackathon"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="en" className="space-y-2">
                    <FormField
                      control={form.control}
                      name="title_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Example: 1st Place Hackathon"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organisasi Penyelenggara</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Google Developer"
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
                        placeholder="Contoh: Jakarta, Indonesia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category dengan Tabs Multi-bahasa */}
              <div className="space-y-2">
                <FormLabel>Kategori</FormLabel>
                <Tabs defaultValue="id" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
                    <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                  </TabsList>

                  <TabsContent value="id" className="space-y-2">
                    <FormField
                      control={form.control}
                      name="category_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Contoh: Teknologi, Sains, Olahraga"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>

                  <TabsContent value="en" className="space-y-2">
                    <FormField
                      control={form.control}
                      name="category_en"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Example: Technology, Science, Sports"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Date */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bulan</FormLabel>
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
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tahun</FormLabel>
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
                        : "Perbarui Penghargaan"
                      : isAdding
                        ? "Menambahkan..."
                        : "Tambah Penghargaan"}
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
            <AlertDialogTitle>Hapus Penghargaan?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus{" "}
              <strong>{achievementToDelete?.title.id}</strong> dari daftar
              penghargaan Anda? Tindakan ini tidak dapat dibatalkan.
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
