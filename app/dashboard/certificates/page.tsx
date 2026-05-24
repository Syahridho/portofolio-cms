"use client";

import { useState, useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
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
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconExternalLink,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";
import { UserCertificate } from "@/types";
import {
  useCertificatesPaginated,
  useDeleteCertificate,
  useStarCount,
  useToggleStar,
} from "@/hooks/use-certificate";
import { EditCertificateDialog } from "@/components/edit-certificate-dialog";
import { useI18n } from "@/hooks/use-i18n";
import { MAX_STAR, PAGE_SIZE } from "@/services/certificate.service";

export default function Page() {
  const { getContent } = useI18n();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 whenever search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const { data, isLoading, isFetching } = useCertificatesPaginated({
    page: currentPage,
    search: searchQuery,
  });
  const { data: starCount = 0 } = useStarCount();
  const { mutate: toggleStar, isPending: isTogglingstar } = useToggleStar();
  const { mutate: deleteCertificate, isPending: isDeleting } =
    useDeleteCertificate();

  const starSlotFull = starCount >= MAX_STAR;

  // Dialog states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<UserCertificate | null>(null);

  const certificates = data?.items || [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const handleDeleteCertificate = () => {
    if (selectedCertificate) {
      deleteCertificate(selectedCertificate, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setSelectedCertificate(null);
          // If last item on page > 1, go back
          if (certificates.length === 1 && currentPage > 1) {
            setCurrentPage((p) => p - 1);
          }
        },
      });
    }
  };

  const openEdit = (cert: UserCertificate) => {
    setSelectedCertificate(cert);
    setIsEditOpen(true);
  };

  const openDelete = (cert: UserCertificate) => {
    setSelectedCertificate(cert);
    setIsDeleteOpen(true);
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "Sertifikat", href: "/dashboard/certificates" },
  ];

  const months = [
    "",
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];

  // Build visible page numbers (max 5 shown)
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 5];
    if (currentPage >= totalPages - 2)
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  const pageNumbers = getPageNumbers();
  const showStartEllipsis = totalPages > 5 && pageNumbers[0] > 1;
  const showEndEllipsis = totalPages > 5 && pageNumbers[pageNumbers.length - 1] < totalPages;

  const startItem = total === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, total);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbs={breadcrumbs} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                      Sertifikat
                    </h1>
                    <p className="text-muted-foreground">
                      Kelola koleksi sertifikat dan penghargaan Anda.
                    </p>
                  </div>
                  <Button onClick={() => setIsAddOpen(true)}>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Tambah Sertifikat
                  </Button>
                </div>

                {/* Search + Count + Star Slot Badge */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="relative w-full max-w-sm">
                    <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari sertifikat..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    {!isLoading && (
                      <p className="text-sm text-muted-foreground shrink-0">
                        {total > 0
                          ? `Menampilkan ${startItem}–${endItem} dari ${total} sertifikat`
                          : "Tidak ada sertifikat"}
                      </p>
                    )}
                    <Badge
                      variant={starSlotFull ? "destructive" : "secondary"}
                      className="shrink-0 gap-1"
                    >
                      <IconStarFilled className="h-3 w-3" />
                      {starCount}/{MAX_STAR} slot
                      {starSlotFull ? " penuh" : " terisi"}
                    </Badge>
                  </div>
                </div>

                {/* Grid */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-200 ${
                    isFetching && !isLoading ? "opacity-60" : "opacity-100"
                  }`}
                >
                  {isLoading ? (
                    <>
                      {[...Array(PAGE_SIZE)].map((_, i) => (
                        <div
                          key={i}
                          className="flex flex-col gap-2 rounded-lg border bg-card overflow-hidden"
                        >
                          <Skeleton className="aspect-[4/3] w-full" />
                          <div className="p-4 pt-2 flex flex-col gap-2">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                          </div>
                        </div>
                      ))}
                    </>
                  ) : certificates.length > 0 ? (
                    certificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="group relative flex flex-col gap-2 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
                      >
                        {/* Image with hover actions */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                          {cert.image ? (
                            <img
                              src={cert.image}
                              alt={cert.name.id}
                              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-50"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
                              No Image
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="h-9"
                              onClick={() => openEdit(cert)}
                            >
                              <IconPencil className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="h-9"
                              onClick={() => openDelete(cert)}
                            >
                              <IconTrash className="mr-2 h-4 w-4" />
                              Hapus
                            </Button>
                          </div>
                          {/* Quick star toggle — top-right corner */}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() =>
                                    toggleStar({ cert, value: !cert.isStar })
                                  }
                                  disabled={
                                    isTogglingstar ||
                                    (starSlotFull && !cert.isStar)
                                  }
                                  className={`absolute top-2 right-2 z-10 p-1.5 rounded-full transition-all
                                    ${
                                      cert.isStar
                                        ? "bg-yellow-500/90 text-white hover:bg-yellow-400"
                                        : starSlotFull
                                          ? "bg-muted/60 text-muted-foreground cursor-not-allowed opacity-50"
                                          : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-yellow-400"
                                    }`}
                                  aria-label={cert.isStar ? "Hapus dari halaman utama" : "Tampilkan di halaman utama"}
                                >
                                  {cert.isStar ? (
                                    <IconStarFilled className="h-3.5 w-3.5" />
                                  ) : (
                                    <IconStar className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="left" className="text-xs">
                                {cert.isStar
                                  ? "Hapus dari halaman utama"
                                  : starSlotFull
                                    ? `Slot penuh (${MAX_STAR}/${MAX_STAR})`
                                    : "Tampilkan di halaman utama"}
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>

                        {/* Info */}
                        <div className="p-4 pt-2 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5">
                            {cert.isStar && (
                              <IconStarFilled className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
                            )}
                            <h3
                              className="font-semibold leading-tight line-clamp-2"
                              title={getContent(cert.name)}
                            >
                              {getContent(cert.name)}
                            </h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground">
                              {months[cert.month]} {cert.year}
                            </p>
                            {cert.category && cert.category !== "Other" && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1 py-0 h-4"
                              >
                                {cert.category}
                              </Badge>
                            )}
                          </div>
                          {cert.credentialUrl && (
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs justify-start"
                              onClick={() =>
                                window.open(cert.credentialUrl, "_blank")
                              }
                            >
                              <IconExternalLink className="mr-1 h-3 w-3" />
                              Lihat Kredensial
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full h-32 flex items-center justify-center text-muted-foreground">
                      Tidak ada sertifikat ditemukan.
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      Halaman {currentPage} dari {totalPages}
                    </p>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              setCurrentPage((p) => Math.max(1, p - 1))
                            }
                            aria-disabled={currentPage === 1}
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {showStartEllipsis && (
                          <>
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => setCurrentPage(1)}
                                className="cursor-pointer"
                              >
                                1
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          </>
                        )}

                        {pageNumbers.map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        {showEndEllipsis && (
                          <>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink
                                onClick={() => setCurrentPage(totalPages)}
                                className="cursor-pointer"
                              >
                                {totalPages}
                              </PaginationLink>
                            </PaginationItem>
                          </>
                        )}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              setCurrentPage((p) =>
                                Math.min(totalPages, p + 1),
                              )
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Dialogs */}
      <EditCertificateDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        mode="add"
        starCount={starCount}
      />

      <EditCertificateDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        certificate={selectedCertificate}
        mode="edit"
        starCount={starCount}
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Sertifikat{" "}
              <strong>
                {selectedCertificate && getContent(selectedCertificate.name)}
              </strong>{" "}
              akan dihapus permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCertificate}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  );
}
