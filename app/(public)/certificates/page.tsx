"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useLocale } from "@/lib/i18n-simple";
import { useCertificates } from "@/hooks/use-certificate";

export default function CertificatesPage() {
  const { t } = useLocale();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useCertificates();

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Show only starred certificates on the main page (max 6)
  const certificates = (data?.items || [])
    .filter(cert => cert.isStar === true)
    .slice(0, 6)
    .map(cert => ({
      id: cert.id,
      name: typeof cert.name === "string" 
        ? cert.name 
        : cert.name?.id || cert.name?.en || "",
      image: cert.image || "https://placehold.co/600x400/png?text=No+Image"
    }));

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t.certificates.title}
        </h1>
        <p className="text-muted-foreground">{t.certificates.subtitle}</p>
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
          : certificates.map((cert) => (
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
                </div>
              </div>
            ))}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/certificates/all">{t.certificates.showAll}</Link>
        </Button>
      </div>

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
