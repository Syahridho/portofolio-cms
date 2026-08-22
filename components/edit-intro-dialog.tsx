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
import { Textarea } from "@/components/ui/textarea";
import { IconEdit } from "@tabler/icons-react";
import { userDescriptionSchema } from "@/lib/schemas";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useUpdateDescription } from "@/hooks/use-description";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocalizedContent } from "@/types";

type UserDescriptionValues = z.infer<typeof userDescriptionSchema>;

interface EditIntroDialogProps {
  currentName: string;
  currentDescription: LocalizedContent;
}

export function EditIntroDialog({
  currentName,
  currentDescription,
}: EditIntroDialogProps) {
  const { mutate: updateDescription, isPending: isSaving } =
    useUpdateDescription();
  const [open, setOpen] = useState(false);

  const form = useForm<UserDescriptionValues>({
    resolver: zodResolver(userDescriptionSchema),
    defaultValues: {
      name: currentName || "",
      description_en: currentDescription?.en || "",
      description_id: currentDescription?.id || "",
    },
  });

  const onSubmit = async (values: UserDescriptionValues) => {
    try {
      // Convert form values to LocalizedContent format
      const descriptionData = {
        name: values.name,
        description: {
          en: values.description_en,
          id: values.description_id,
        },
      };

      updateDescription(descriptionData, {
        onSuccess: () => {
          form.reset(values);
          setOpen(false);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon-sm" variant="outline">
          <IconEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Intro</DialogTitle>
              <DialogDescription>
                Perbarui nama dan deskripsi Anda yang akan ditampilkan di
                halaman utama.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama Lengkap" {...field} />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Nama ini akan ditampilkan sebagai "Hi there! I'm [Nama Anda]"
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tabs untuk Multi-bahasa */}
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
                              placeholder="Deskripsi dalam bahasa Indonesia"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">
                            Deskripsi singkat tentang Anda (Bahasa Indonesia)
                          </p>
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
                              placeholder="Description in English"
                              rows={4}
                              {...field}
                            />
                          </FormControl>
                          <p className="text-xs text-muted-foreground">
                            Brief description about you (English)
                          </p>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Menyimpan" : "Simpan Perubahan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
