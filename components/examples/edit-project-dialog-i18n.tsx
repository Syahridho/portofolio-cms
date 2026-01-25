"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LocalizedContent } from "@/types";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18nTranslations } from "@/hooks/use-i18n";

// Schema untuk validasi multi-bahasa
const projectFormSchema = z.object({
  title_en: z.string().min(3, "Title must be at least 3 characters"),
  title_id: z.string().min(3, "Judul minimal 3 karakter"),
  description_en: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  description_id: z.string().min(10, "Deskripsi minimal 10 karakter"),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  month: z.number().min(1).max(12),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 10),
  technologies: z.array(z.string()).min(1, "At least 1 technology required"),
  github_url: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

interface EditProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    title: LocalizedContent;
    description: LocalizedContent;
    image?: string;
    month: number;
    year: number;
    technologies: string[];
    github_url?: string;
  }) => void;
  initialData?: {
    title: LocalizedContent;
    description: LocalizedContent;
    image?: string;
    month: number;
    year: number;
    technologies: string[];
    github_url?: string;
  };
}

export function EditProjectDialogExample({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: EditProjectDialogProps) {
  const t = useI18nTranslations("projects");
  const [activeTab, setActiveTab] = useState("en");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title_en: initialData?.title.en || "",
      title_id: initialData?.title.id || "",
      description_en: initialData?.description.en || "",
      description_id: initialData?.description.id || "",
      image: initialData?.image || "",
      month: initialData?.month || new Date().getMonth() + 1,
      year: initialData?.year || new Date().getFullYear(),
      technologies: initialData?.technologies || [],
      github_url: initialData?.github_url || "",
    },
  });

  const handleSubmit = (values: ProjectFormValues) => {
    const projectData = {
      title: {
        en: values.title_en,
        id: values.title_id,
      },
      description: {
        en: values.description_en,
        id: values.description_id,
      },
      image: values.image,
      month: values.month,
      year: values.year,
      technologies: values.technologies,
      github_url: values.github_url,
    };

    onSubmit(projectData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? t("editProject") : t("addProject")}
          </DialogTitle>
          <DialogDescription>
            Fill in the project details in both languages
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Multi-language fields with Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
                <TabsTrigger value="id">🇮🇩 Indonesia</TabsTrigger>
              </TabsList>

              <TabsContent value="en" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (English)</FormLabel>
                      <FormControl>
                        <Input placeholder="Project title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (English)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Project description"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="id" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul (Indonesia)</FormLabel>
                      <FormControl>
                        <Input placeholder="Judul proyek" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi (Indonesia)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Deskripsi proyek"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            {/* Common fields (no translation needed) */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("image")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Month</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={12}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1900}
                        max={new Date().getFullYear() + 10}
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="github_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("githubUrl")}</FormLabel>
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

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                {t("cancel")}
              </Button>
              <Button type="submit">{t("save")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
