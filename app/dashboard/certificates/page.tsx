"use client";

import { useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
  IconPlus,
  IconSearch,
  IconPencil,
  IconTrash,
  IconExternalLink,
} from "@tabler/icons-react";
import { UserCertificate } from "@/types";
import { useCertificates, useDeleteCertificate } from "@/hooks/use-certificate";
import { EditCertificateDialog } from "@/components/edit-certificate-dialog";

export default function Page() {
  const { data, isLoading } = useCertificates();
  const { mutate: deleteCertificate, isPending: isDeleting } =
    useDeleteCertificate();

  const [searchQuery, setSearchQuery] = useState("");

  // Dialog states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<UserCertificate | null>(null);

  const certificates = data?.items || [];

  // Filter certificates based on search
  const filteredCertificates = certificates.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleDeleteCertificate = () => {
    if (selectedCertificate) {
      deleteCertificate(selectedCertificate, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setSelectedCertificate(null);
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
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Sertifikat",
      href: "/dashboard/certificates",
    },
  ];

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

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

                <div className="flex items-center py-4">
                  <div className="relative w-full max-w-sm">
                    <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari sertifikat..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                {/* Grid with Skeleton Loading */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {isLoading ? (
                    // Skeleton Loading
                    <>
                      {[...Array(8)].map((_, i) => (
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
                  ) : filteredCertificates.length > 0 ? (
                    filteredCertificates.map((cert) => (
                      <div
                        key={cert.id}
                        className="group relative flex flex-col gap-2 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden"
                      >
                        {/* Image Container with Hover Effects */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                          {cert.image ? (
                            <img
                              src={cert.image}
                              alt={cert.name}
                              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-50"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
                              No Image
                            </div>
                          )}

                          {/* Hover Actions - Center */}
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
                        </div>

                        {/* Content Info */}
                        <div className="p-4 pt-2 flex flex-col gap-1">
                          <h3
                            className="font-semibold leading-tight line-clamp-2"
                            title={cert.name}
                          >
                            {cert.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {cert.issuer}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {months[cert.month]} {cert.year}
                          </p>
                          {cert.credential_url && (
                            <Button
                              variant="link"
                              size="sm"
                              className="h-auto p-0 text-xs justify-start"
                              onClick={() =>
                                window.open(cert.credential_url, "_blank")
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
      />

      <EditCertificateDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        certificate={selectedCertificate}
        mode="edit"
      />

      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Sertifikat{" "}
              <strong>{selectedCertificate?.name}</strong> akan dihapus
              permanen.
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
