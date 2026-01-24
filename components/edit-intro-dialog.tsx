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
import { Label } from "@/components/ui/label";
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

type UserDescriptionValues = z.infer<typeof userDescriptionSchema>;

interface EditIntroDialogProps {
  currentName: string;
  currentDescription: string;
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
      description: currentDescription || "",
    },
  });

  const onSubmit = async (values: UserDescriptionValues) => {
    try {
      updateDescription(values, {
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
                      Nama ini akan ditampilkan sebagai "Hi, I'm [Nama Anda]"
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Deskripsi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
