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
import { Badge } from "@/components/ui/badge";
import { IconEdit, IconX, IconPlus } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserSkills } from "@/types";
import { useAddSkill, useDeleteSkill } from "@/hooks/use-skills";
import { userSkillSchema } from "@/lib/schemas";

type UserSkillValues = z.infer<typeof userSkillSchema>;

interface EditSkillsDialogProps {
  skills: UserSkills[];
}

export function EditSkillsDialog({
  skills: initialSkills,
}: EditSkillsDialogProps) {
  const { mutate: addSkill, isPending: isAdding } = useAddSkill();
  const { mutate: deleteSkill, isPending: isDeleting } = useDeleteSkill();

  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<UserSkills | null>(null);

  const form = useForm<UserSkillValues>({
    resolver: zodResolver(userSkillSchema),
    defaultValues: {
      name: "",
      category: "Frontend",
      icons: "",
    },
  });

  const handleDeleteClick = (skill: UserSkills) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (skillToDelete) {
      deleteSkill(skillToDelete, {
        onSuccess: () => {
          setSkillToDelete(null);
          setIsDeleteDialogOpen(false);
        },
      });
    }
  };

  const onSubmit = (values: UserSkillValues) => {
    const skill: UserSkills = {
      id: Date.now().toString(),
      name: values.name,
      category: values.category as UserSkills["category"],
      icons: values.icons,
    };

    addSkill(skill, {
      onSuccess: () => {
        form.reset();
        setIsAddDialogOpen(false);
      },
    });
  };

  const groupedSkills = initialSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, UserSkills[]>,
  );

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
                <DialogTitle>Edit Skill Pemrograman</DialogTitle>
                <DialogDescription>
                  Kelola skill pemrograman Anda. Tambah atau hapus teknologi
                  yang Anda kuasai.
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

          <div className="grid gap-4 py-4 overflow-y-auto max-h-[60vh]">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="outline"
                      className="gap-1 pr-1"
                    >
                      {skill.name}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => handleDeleteClick(skill)}
                      >
                        <IconX size={12} />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
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

      {/* Add Skill Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Tambah Skill Baru</DialogTitle>
            <DialogDescription>
              Tambahkan teknologi baru ke daftar skill Anda.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Teknologi</FormLabel>
                    <FormControl>
                      <Input placeholder="Contoh: React JS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Frontend">Frontend</SelectItem>
                        <SelectItem value="Backend">Backend</SelectItem>
                        <SelectItem value="Mobile">Mobile</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                        <SelectItem value="Tools & Others">
                          Tools & Others
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icons"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Slug Simple Icons
                      <span className="text-xs text-muted-foreground ml-2">
                        (Cari di{" "}
                        <a
                          href="https://simpleicons.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-foreground"
                        >
                          simpleicons.org
                        </a>
                        )
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: react, vuedotjs, docker"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Masukkan slug dari Simple Icons. Contoh: react, nextdotjs,
                      html5
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isAdding}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isAdding}>
                  {isAdding ? "Menambahkan..." : "Tambah Skill"}
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
            <AlertDialogTitle>Hapus Skill?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus{" "}
              <strong>{skillToDelete?.name}</strong> dari daftar skill Anda?
              Tindakan ini tidak dapat dibatalkan.
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
