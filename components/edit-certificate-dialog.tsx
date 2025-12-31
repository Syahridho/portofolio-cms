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
import { Switch } from "@/components/ui/switch";
import { IconUpload, IconDeviceFloppy, IconStar } from "@tabler/icons-react";
import type { CertificateItem } from "@/lib/certificate-data";

interface EditCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificate?: CertificateItem | null;
  onSave: (certificate: CertificateItem) => void;
  existingCertificates?: CertificateItem[];
}

export function EditCertificateDialog({
  open,
  onOpenChange,
  certificate,
  onSave,
  existingCertificates = [],
}: EditCertificateDialogProps) {
  const [formData, setFormData] = useState<Partial<CertificateItem>>({
    name: "",
    issuedDate: "",
    expirationDate: "",
    image: "",
    isFeatured: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Calculate how many *other* certificates are featured
  const otherFeaturedCount = existingCertificates.filter(
    (c) => c.isFeatured && c.id !== certificate?.id
  ).length;

  const isLimitReached = otherFeaturedCount >= 6;

  useEffect(() => {
    if (certificate) {
      setFormData(certificate);
    } else {
      setFormData({
        name: "",
        issuedDate: "",
        expirationDate: "",
        image: "",
        isFeatured: false,
      });
    }
  }, [certificate, open]);

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

  const handleSave = () => {
    if (!formData.name || !formData.issuedDate || !formData.image) return;

    const newCertificate: CertificateItem = {
      id: certificate?.id || Date.now().toString(),
      name: formData.name,
      issuedDate: formData.issuedDate,
      expirationDate: formData.expirationDate || undefined,
      image: formData.image,
      isFeatured: formData.isFeatured || false,
    };
    onSave(newCertificate);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {certificate ? "Edit Sertifikat" : "Tambah Sertifikat"}
          </DialogTitle>
          <DialogDescription>
            {certificate
              ? "Perbarui informasi sertifikat Anda."
              : "Tambahkan sertifikat baru ke portofolio Anda."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label>Gambar Sertifikat</Label>
            <div className="flex items-start gap-4">
              <div
                className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-accent/50 transition-colors relative overflow-hidden group"
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.image ? (
                  <>
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-contain bg-background"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <IconUpload className="text-white h-8 w-8" />
                    </div>
                  </>
                ) : (
                  <div className="text-center p-2">
                    <IconUpload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-xs text-muted-foreground">
                      Upload Gambar (JPG, PNG)
                    </span>
                  </div>
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
            {formData.image && (
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() => setFormData({ ...formData, image: "" })}
              >
                Hapus Gambar
              </Button>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Nama Sertifikat</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Contoh: AWS Certified Cloud Practitioner"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="issuedDate">Tanggal Dapat</Label>
              <Input
                id="issuedDate"
                type="date"
                value={formData.issuedDate}
                onChange={(e) =>
                  setFormData({ ...formData, issuedDate: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expirationDate">Tanggal Expired (Opsional)</Label>
              <Input
                id="expirationDate"
                type="date"
                value={formData.expirationDate || ""}
                onChange={(e) =>
                  setFormData({ ...formData, expirationDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label className="text-base">Sertifikat Unggulan (Star)</Label>
              <div className="text-sm text-muted-foreground">
                {isLimitReached && !formData.isFeatured ? (
                  <span className="text-destructive">
                    Maksimal 6 sertifikat unggulan tercapai.
                  </span>
                ) : (
                  "Tampilkan sertifikat ini di halaman depan (Max 6)."
                )}
              </div>
            </div>
            <Switch
              checked={formData.isFeatured}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isFeatured: checked })
              }
              disabled={isLimitReached && !formData.isFeatured}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.name || !formData.issuedDate || !formData.image}
          >
            <IconDeviceFloppy size={18} className="mr-2" />
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
