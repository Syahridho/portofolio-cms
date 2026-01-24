"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IconX } from "@tabler/icons-react";
import { UserCertificate } from "@/types";
import {
  useAddCertificate,
  useUpdateCertificate,
} from "@/hooks/use-certificate";
import { userCertificateSchema } from "@/lib/schemas";
import { uploadCertificateImage } from "@/services/certificate.service";
import { toast } from "sonner";

type UserCertificateValues = z.infer<typeof userCertificateSchema>;

interface EditCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate?: UserCertificate | null;
  mode: "add" | "edit";
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

export function EditCertificateDialog({
  open,
  onOpenChange,
  certificate,
  mode,
}: EditCertificateDialogProps) {
  const { mutate: addCertificate, isPending: isAdding } = useAddCertificate();
  const { mutate: updateCertificate, isPending: isUpdating } =
    useUpdateCertificate();

  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<UserCertificateValues>({
    resolver: zodResolver(userCertificateSchema),
    defaultValues: {
      name: "",
      issuer: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      image: "",
      credential_url: "",
    },
  });

  // Load certificate data when editing
  useEffect(() => {
    if (mode === "edit" && certificate) {
      form.reset({
        name: certificate.name,
        issuer: certificate.issuer,
        month: certificate.month,
        year: certificate.year,
        image: certificate.image || "",
        credential_url: certificate.credential_url || "",
      });
      if (certificate.image) {
        setImagePreview(certificate.image);
      }
    } else if (mode === "add") {
      resetForm();
    }
  }, [mode, certificate, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImagePreview = () => {
    setImagePreview(null);
    setImageFile(null);
    const fileInput = document.getElementById(
      "image-upload",
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (values: UserCertificateValues) => {
    try {
      setIsUploading(true);

      // Upload image if new file exists
      let imageUrl = values.image || "";
      if (imageFile) {
        toast.info("Mengupload gambar...");
        imageUrl = await uploadCertificateImage(imageFile);
      }

      // Build certificate object without undefined values
      const certificateData: UserCertificate = {
        id:
          mode === "edit" && certificate
            ? certificate.id
            : Date.now().toString(),
        name: values.name,
        issuer: values.issuer,
        month: values.month,
        year: values.year,
      };

      // Only add optional fields if they have values
      if (imageUrl) {
        certificateData.image = imageUrl;
      }
      if (values.credential_url) {
        certificateData.credential_url = values.credential_url;
      }

      if (mode === "edit" && certificate) {
        // Update existing certificate
        updateCertificate(
          { oldCertificate: certificate, updatedCertificate: certificateData },
          {
            onSuccess: () => {
              resetForm();
              onOpenChange(false);
            },
            onError: () => {
              setIsUploading(false);
            },
          },
        );
      } else {
        // Add new certificate
        addCertificate(certificateData, {
          onSuccess: () => {
            resetForm();
            onOpenChange(false);
          },
          onError: () => {
            setIsUploading(false);
          },
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal mengupload gambar");
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    form.reset({
      name: "",
      issuer: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      image: "",
      credential_url: "",
    });
    setImagePreview(null);
    setImageFile(null);
    setIsUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Sertifikat" : "Tambah Sertifikat"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Perbarui informasi sertifikat Anda."
              : "Tambahkan sertifikat baru ke koleksi Anda."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]"
          >
            {/* Image Upload */}
            <div className="grid gap-3">
              <FormLabel htmlFor="image-upload">Gambar Sertifikat</FormLabel>

              {imagePreview && (
                <div className="relative w-full h-48 mx-auto">
                  <img
                    src={imagePreview}
                    alt="Certificate Preview"
                    className="w-full h-full object-cover rounded-md border"
                  />
                  <Button
                    type="button"
                    size="icon-sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 rounded-full"
                    onClick={clearImagePreview}
                  >
                    <IconX size={16} />
                  </Button>
                </div>
              )}

              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-muted-foreground">
                Upload gambar sertifikat (JPG, PNG, atau WebP)
              </p>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Sertifikat</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: AWS Certified Solutions Architect"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="issuer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Penerbit</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: Amazon Web Services"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date */}
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bulan</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
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
                      onValueChange={(value) => field.onChange(parseInt(value))}
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

            <FormField
              control={form.control}
              name="credential_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credential URL (Opsional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.credly.com/badges/..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  onOpenChange(false);
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
                  : mode === "edit"
                    ? isUpdating
                      ? "Memperbarui..."
                      : "Perbarui Sertifikat"
                    : isAdding
                      ? "Menambahkan..."
                      : "Tambah Sertifikat"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
