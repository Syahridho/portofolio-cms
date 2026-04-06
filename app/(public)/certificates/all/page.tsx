"use client";

import { useState, useMemo } from "react";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocale } from "@/lib/i18n-simple";
import { IconArrowLeft } from "@tabler/icons-react";
import { useCertificates } from "@/hooks/use-certificate";

const ITEMS_PER_PAGE = 9;

export default function AllCertificatesPage() {
  const { t } = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useCertificates();

  const certificates = useMemo(
    () =>
      (data?.items || []).map((cert) => {
        const name =
          typeof cert.name === "string"
            ? cert.name
            : cert.name?.id || cert.name?.en || "";

        return {
          id: cert.id,
          name,
          image: cert.image || "https://placehold.co/600x400/png?text=No+Image",
          month: cert.month,
          year: cert.year,
          category: cert.category || "Other",
        };
      }),
    [data],
  );

  const categoryOptions = useMemo(() => {
    const counts: Record<string, number> = {};
    certificates.forEach((cert) => {
      counts[cert.category] = (counts[cert.category] || 0) + 1;
    });
    const options = Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([cat, count]) => ({ key: cat, label: `${cat} ${count}` }));
    return [
      {
        key: "all",
        label: `${t.certificates.roleAll} ${certificates.length}`,
      },
      ...options,
    ];
  }, [certificates, t]);

  const filteredCertificates = useMemo(
    () =>
      certificates.filter((cert) => {
        if (selectedCategory === "all") return true;
        return cert.category === selectedCategory;
      }),
    [certificates, selectedCategory],
  );

  // Reset ke halaman 1 setiap kali filter berubah
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCertificates.length / ITEMS_PER_PAGE);

  const paginatedCertificates = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCertificates.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCertificates, currentPage]);

  // Generate page numbers dengan ellipsis
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("ellipsis");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("ellipsis");

    pages.push(totalPages);

    return pages;
  };

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-4">
        <div className="flex flex-col sm:items-start justify-between gap-4">
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

          <div className="flex items-center justify-between gap-2">
            <label className="text-sm font-medium whitespace-nowrap">
              {t.certificates.filterByRole}:
            </label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder={t.certificates.roleAll} />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((opt) => (
                  <SelectItem key={opt.key} value={opt.key}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
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
          : paginatedCertificates.map((cert) => (
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
                    {cert.month && cert.year
                      ? `${cert.month}/${cert.year}`
                      : cert.year}
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col items-center gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  aria-disabled={currentPage === 1}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((page, idx) =>
                page === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => setCurrentPage(page)}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  aria-disabled={currentPage === totalPages}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <p className="text-xs text-muted-foreground">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(
              currentPage * ITEMS_PER_PAGE,
              filteredCertificates.length,
            )}{" "}
            of {filteredCertificates.length} certificates
          </p>
        </div>
      )}

      {/* Modal for certificate preview */}
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden border-none">
          <VisuallyHidden>
            <DialogTitle>Certificate preview</DialogTitle>
          </VisuallyHidden>
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
