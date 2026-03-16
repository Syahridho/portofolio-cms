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
import { Textarea } from "@/components/ui/textarea";
import { IconX, IconPlus } from "@tabler/icons-react";
import { UserProject } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAddProject, useUpdateProject } from "@/hooks/use-project";
import { userProjectSchema } from "@/lib/schemas";
import { uploadProjectImage } from "@/services/project.service";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

type UserProjectValues = z.infer<typeof userProjectSchema>;

interface EditProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: UserProject | null;
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

export function EditProjectDialog({
  open,
  onOpenChange,
  project,
  mode,
}: EditProjectDialogProps) {
  const { mutate: addProject, isPending: isAdding } = useAddProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();

  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);

  const form = useForm<UserProjectValues>({
    resolver: zodResolver(userProjectSchema),
    defaultValues: {
      title_en: "",
      title_id: "",
      description_en: "",
      description_id: "",
      image: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      technologies: [],
      githubUrl: "",
      liveDemoUrl: "",
    },
  });

  // Load project data when editing
  useEffect(() => {
    if (mode === "edit" && project) {
      form.reset({
        title_en:
          typeof project.title === "string"
            ? project.title
            : project.title?.en || "",
        title_id:
          typeof project.title === "string"
            ? project.title
            : project.title?.id || "",
        description_en:
          typeof project.description === "string"
            ? project.description
            : project.description?.en || "",
        description_id:
          typeof project.description === "string"
            ? project.description
            : project.description?.id || "",
        image: project.image || "",
        month: project.month,
        year: project.year,
        technologies: project.technologies,
        githubUrl: project.githubUrl || "",
        liveDemoUrl: project.liveDemoUrl || "",
      });
      setTechnologies(project.technologies);
      if (project.image) {
        setImagePreview(project.image);
      }
    } else if (mode === "add") {
      resetForm();
    }
  }, [mode, project, open]);

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

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      const newTechs = [...technologies, techInput.trim()];
      setTechnologies(newTechs);
      form.setValue("technologies", newTechs);
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    const newTechs = technologies.filter((t) => t !== tech);
    setTechnologies(newTechs);
    form.setValue("technologies", newTechs);
  };

  const onSubmit = async (values: UserProjectValues) => {
    try {
      setIsUploading(true);

      // Upload image if new file exists
      let imageUrl = values.image || "";
      if (imageFile) {
        toast.info("Mengupload gambar...");
        imageUrl = await uploadProjectImage(imageFile);
      }

      // Build project object
      const projectData: UserProject = {
        id: mode === "edit" && project ? project.id : Date.now().toString(),
        title: {
          en: values.title_en,
          id: values.title_id,
        },
        description: {
          en: values.description_en,
          id: values.description_id,
        },
        month: values.month,
        year: values.year,
        technologies: values.technologies,
        image: imageUrl,
        githubUrl: values.githubUrl || "",
        liveDemoUrl: values.liveDemoUrl || "",
      };

      if (mode === "edit" && project) {
        // Update existing project
        updateProject(
          { oldProject: project, updatedProject: projectData },
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
        // Add new project
        addProject(projectData, {
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
      title_en: "",
      title_id: "",
      description_en: "",
      description_id: "",
      image: "",
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      technologies: [],
      githubUrl: "",
      liveDemoUrl: "",
    });
    setImagePreview(null);
    setImageFile(null);
    setTechnologies([]);
    setTechInput("");
    setIsUploading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Project" : "Tambah Project"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Perbarui informasi project Anda."
              : "Tambahkan project baru ke portofolio Anda."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]"
          >
            {/* Image Upload */}
            <div className="grid gap-3">
              <FormLabel htmlFor="image-upload">Gambar Project</FormLabel>

              {imagePreview && (
                <div className="relative w-full h-48 mx-auto">
                  <img
                    src={imagePreview}
                    alt="Project Preview"
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
                Upload gambar project (JPG, PNG, atau WebP)
              </p>
            </div>

            {/* Title dengan Tabs Multi-bahasa */}
            <div className="space-y-2">
              <FormLabel>Judul Project</FormLabel>
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
                            placeholder="Contoh: Website E-Commerce"
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
                            placeholder="Example: E-Commerce Website"
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

            {/* Description dengan Tabs Multi-bahasa */}
            <div className="space-y-2">
              <FormLabel>Deskripsi</FormLabel>
              <Tabs defaultValue="id" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
                  <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                </TabsList>

                <TabsContent value="id" className="space-y-2">
                  <FormField
                    control={form.control}
                    name="description_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Ceritakan tentang project Anda..."
                            {...field}
                            rows={4}
                            className="resize-none"
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
                    name="description_en"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Tell about your project..."
                            {...field}
                            rows={4}
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* Technologies */}
            <div className="grid gap-3">
              <FormLabel>Teknologi yang Digunakan</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="Contoh: React, Node.js"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTechnology();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={addTechnology}
                  size="icon"
                  variant="outline"
                >
                  <IconPlus size={16} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="ml-1 hover:text-destructive"
                    >
                      <IconX size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
              {form.formState.errors.technologies && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.technologies.message}
                </p>
              )}
            </div>

            {/* Links Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="githubUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub URL (Opsional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://github.com/username/repo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="liveDemoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Demo URL (Opsional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      : "Perbarui Project"
                    : isAdding
                      ? "Menambahkan..."
                      : "Tambah Project"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
