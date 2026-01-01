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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { IconEdit, IconX, IconPlus } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Skill {
  id: string;
  name: string;
  category: string;
  slug: string;
}

interface EditSkillsDialogProps {
  skills: Skill[];
}

export function EditSkillsDialog({
  skills: initialSkills,
}: EditSkillsDialogProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "Frontend",
    slug: "",
  });

  const handleDeleteClick = (skill: Skill) => {
    setSkillToDelete(skill);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (skillToDelete) {
      setSkills(skills.filter((s) => s.id !== skillToDelete.id));
      setSkillToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleAddSkill = () => {
    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      category: newSkill.category,
      slug: newSkill.slug,
    };
    setSkills([...skills, skill]);
    setNewSkill({ name: "", category: "Frontend", slug: "" });
    setIsAddDialogOpen(false);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

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
            <Button type="submit">Simpan Perubahan</Button>
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

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="skill-name">Nama Teknologi</Label>
              <Input
                id="skill-name"
                placeholder="Contoh: React JS"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="skill-category">Kategori</Label>
              <Select
                value={newSkill.category}
                onValueChange={(value) =>
                  setNewSkill({ ...newSkill, category: value })
                }
              >
                <SelectTrigger id="skill-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
                  <SelectItem value="Mobile">Mobile</SelectItem>
                  <SelectItem value="Database">Database</SelectItem>
                  <SelectItem value="Tools & Others">Tools & Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="skill-slug">
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
              </Label>
              <Input
                id="skill-slug"
                placeholder="Contoh: react, vuedotjs, docker"
                value={newSkill.slug}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, slug: e.target.value })
                }
              />
              <p className="text-xs text-muted-foreground">
                Masukkan slug dari Simple Icons. Contoh: react, nextdotjs, html5
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleAddSkill}
              disabled={!newSkill.name || !newSkill.slug}
            >
              Tambah Skill
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
