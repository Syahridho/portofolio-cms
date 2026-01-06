"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/lib/i18n-simple";
import { initialCertificates, CertificateItem } from "@/lib/certificate-data";
import { IconArrowLeft } from "@tabler/icons-react";

type RoleFilter = "all" | "frontend" | "backend" | "cloud" | "other";

export default function AllCertificatesPage() {
  const { t } = useLocale();
  const [selectedRole, setSelectedRole] = useState<RoleFilter>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCertificates = initialCertificates.filter((cert) => {
    if (selectedRole === "all") return true;
    return cert.role === selectedRole;
  });

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const roles: { key: RoleFilter; label: string }[] = [
    { key: "all", label: t.certificates.roleAll },
    { key: "frontend", label: t.certificates.roleFrontend },
    { key: "backend", label: t.certificates.roleBackend },
    { key: "cloud", label: t.certificates.roleCloud },
    { key: "other", label: t.certificates.roleOther },
  ];

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                <Link href="/certificates">
                  <IconArrowLeft size={18} />
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">
                {t.certificates.all}
              </h1>
            </div>
            <p className="text-muted-foreground">{t.certificates.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium whitespace-nowrap">
              {t.certificates.filterByRole}:
            </label>
            <Select
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value as RoleFilter)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.certificates.roleAll} />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.key} value={role.key}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </Card>
            ))
          : filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="group relative cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openModal(cert.image)}
              >
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-semibold line-clamp-1">
                    {cert.name}
                  </p>
                  <p className="text-xs">
                    {new Date(cert.issuedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Modal for certificate preview */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden border-none">
          <VisuallyHidden>
            <DialogTitle>Certificate preview</DialogTitle>
          </VisuallyHidden>
          {/* Hide the default close button */}
          <style jsx global>{`
            [data-radix-dialog-content] button[aria-label="Close"] {
              display: none !important;
            }
          `}</style>
          <div className="relative w-full h-full flex items-center justify-center bg-black/5">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Certificate preview"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
