"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconX, IconUpload, IconDeviceFloppy } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import type { ProjectItem } from "@/lib/project-data";

interface EditProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project?: ProjectItem | null; // If null, we are adding
  onSave: (project: ProjectItem) => void;
}

export function EditProjectDialog({
  open,
  onOpenChange,
  project,
  onSave,
}: EditProjectDialogProps) {
  const [formData, setFormData] = useState<Partial<ProjectItem>>({
    title: "",
    description: "",
    image: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    technologies: [],
    liveUrl: "",
    githubUrl: "",
  });

  const [techInput, setTechInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        technologies: [],
        liveUrl: "",
        githubUrl: "",
      });
    }
  }, [project, open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      if (!formData.technologies?.includes(techInput.trim())) {
        setFormData({
          ...formData,
          technologies: [...(formData.technologies || []), techInput.trim()],
        });
      }
      setTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((t) => t !== tech),
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) return;

    const newProject: ProjectItem = {
      id: project?.id || Date.now().toString(),
      title: formData.title!,
      description: formData.description!,
      image: formData.image || "",
      month: formData.month!,
      year: formData.year!,
      technologies: formData.technologies || [],
      liveUrl: formData.liveUrl || "",
      githubUrl: formData.githubUrl || "",
    };
    onSave(newProject);
    onOpenChange(false);
  };

  const months = [
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

  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Tambah Project"}
          </DialogTitle>
          <DialogDescription>
            {project
              ? "Perbarui informasi project Anda."
              : "Tambahkan project baru ke portofolio Anda."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label>Gambar Project</Label>
            <div className="flex items-start gap-4">
              <div
                className="w-40 h-28 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors relative overflow-hidden group"
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.image ? (
                  <>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconUpload className="text-white" />
                    </div>
                  </>
                ) : (
                  <div className="text-center p-2">
                    <IconUpload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">
                      Upload Gambar
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-muted-foreground">
                  Format yang didukung: JPG, PNG. Ukuran maksimal: 2MB.
                </p>
                {formData.image && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, image: "" })}
                  >
                    Hapus Gambar
                  </Button>
                )}
              </div>
              <Input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Judul Project</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Contoh: E-Commerce App"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Jelaskan fitur utama dan tujuan project ini..."
              className="min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Bulan Pembuatan</Label>
              <Select
                value={formData.month?.toString()}
                onValueChange={(v) =>
                  setFormData({ ...formData, month: parseInt(v) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Bulan" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value.toString()}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Tahun Pembuatan</Label>
              <Select
                value={formData.year?.toString()}
                onValueChange={(v) =>
                  setFormData({ ...formData, year: parseInt(v) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Tahun" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Teknologi</Label>
            <Input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={handleAddTech}
              placeholder="Ketik nama teknologi lalu tekan Enter (Contoh: React, Node.js)"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technologies?.map((tech, index) => (
                <Badge key={index} variant="secondary" className="gap-1">
                  {tech}
                  <button
                    onClick={() => handleRemoveTech(tech)}
                    className="hover:text-destructive focus:outline-none"
                  >
                    <IconX size={14} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="liveUrl">Live Demo URL (Opsional)</Label>
              <Input
                id="liveUrl"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="githubUrl">GitHub URL (Opsional)</Label>
              <Input
                id="githubUrl"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                placeholder="https://github.com/..."
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.title || !formData.description}
          >
            <IconDeviceFloppy size={18} className="mr-2" />
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
