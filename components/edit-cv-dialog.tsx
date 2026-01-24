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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  IconEdit,
  IconX,
  IconPlus,
  IconFileText,
  IconDownload,
} from "@tabler/icons-react";
import { UserCV } from "@/types";
import { useAddCV, useDeleteCV } from "@/hooks/use-cv";
import { userCVSchema } from "@/lib/schemas";
import { uploadPDF } from "@/services/home.service";
import { toast } from "sonner";

type UserCVValues = z.infer<typeof userCVSchema>;

interface EditCVDialogProps {
  cvs: UserCV[];
}

export function EditCVDialog({ cvs: initialCVs }: EditCVDialogProps) {
  const { mutate: addCV, isPending: isAdding } = useAddCV();
  const { mutate: deleteCV, isPending: isDeleting } = useDeleteCV();

  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [cvToDelete, setCVToDelete] = useState<UserCV | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>("");

  const form = useForm<UserCVValues>({
    resolver: zodResolver(userCVSchema),
    defaultValues: {
      language: "",
      fileUrl: "",
      fileName: "",
    },
  });

  const handleDeleteClick = (cv: UserCV) => {
    setCVToDelete(cv);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (cvToDelete) {
      deleteCV(cvToDelete, {
        onSuccess: () => {
          setCVToDelete(null);
          setIsDeleteDialogOpen(false);
        },
      });
    }
  };

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== "application/pdf") {
        toast.error("File harus berformat PDF");
        return;
      }

      // Validate file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error("Ukuran file maksimal 10MB");
        return;
      }

      setPdfFile(file);
      setPdfFileName(file.name);
      form.setValue("fileName", file.name);
    }
  };

  const clearPdfFile = () => {
    setPdfFile(null);
    setPdfFileName("");
    form.setValue("fileName", "");
    const fileInput = document.getElementById("pdf-upload") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = async (values: UserCVValues) => {
    if (!pdfFile) {
      toast.error("Silakan pilih file PDF terlebih dahulu");
      return;
    }

    try {
      setIsUploading(true);
      toast.info("Mengupload PDF...");

      // Upload PDF to Storage
      const fileUrl = await uploadPDF(pdfFile);

      const cv: UserCV = {
        id: Date.now().toString(),
        language: values.language,
        fileUrl: fileUrl,
        fileName: pdfFileName,
      };

      addCV(cv, {
        onSuccess: () => {
          form.reset();
          setPdfFile(null);
          setPdfFileName("");
          setIsAddDialogOpen(false);
          setIsUploading(false);
        },
        onError: () => {
          setIsUploading(false);
        },
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      toast.error("Gagal mengupload PDF");
      setIsUploading(false);
    }
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
                <DialogTitle>Edit Curriculum Vitae</DialogTitle>
                <DialogDescription>
                  Kelola daftar CV Anda dalam berbagai bahasa.
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
            {initialCVs.map((cv) => (
              <div
                key={cv.id}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                  📄
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold">{cv.language}</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {cv.fileName}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={cv.fileUrl}
                    download={cv.fileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors p-2 rounded-full hover:bg-accent"
                    title="Download CV"
                  >
                    <IconDownload size={20} />
                  </a>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => handleDeleteClick(cv)}
                  >
                    <IconX size={16} />
                  </Button>
                </div>
              </div>
            ))}
            {initialCVs.length === 0 && (
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
            <Button type="submit" disabled={isAdding || isDeleting}>
              {isAdding || isDeleting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add CV Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tambah Curriculum Vitae</DialogTitle>
            <DialogDescription>
              Upload CV Anda dalam format PDF (maksimal 10MB).
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bahasa CV</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: Bahasa Indonesia, English"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PDF Upload */}
              <div className="grid gap-3">
                <FormLabel htmlFor="pdf-upload">File PDF</FormLabel>

                {pdfFileName && (
                  <div className="flex items-center gap-3 p-3 border rounded-lg bg-accent/50">
                    <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                      📄
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {pdfFileName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {pdfFile
                          ? `${(pdfFile.size / 1024 / 1024).toFixed(2)} MB`
                          : ""}
                      </p>
                    </div>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="ghost"
                      onClick={clearPdfFile}
                    >
                      <IconX size={16} />
                    </Button>
                  </div>
                )}

                <Input
                  id="pdf-upload"
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handlePDFChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground">
                  Upload file PDF dengan ukuran maksimal 10MB
                </p>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isAdding || isUploading}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isAdding || isUploading}>
                  {isUploading
                    ? "Mengupload..."
                    : isAdding
                      ? "Menambahkan..."
                      : "Tambah CV"}
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
