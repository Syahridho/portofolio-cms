"use client";

import { useState, useMemo } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { IconSearch, IconMail, IconUser } from "@tabler/icons-react";
import { useContacts } from "@/hooks/use-contact";

export default function Page() {
  const { data: contacts, isLoading } = useContacts();
  const [searchQuery, setSearchQuery] = useState("");

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Contact",
      href: "/dashboard/contact",
    },
  ];

  // Fast search algorithm using useMemo
  const filteredContacts = useMemo(() => {
    if (!contacts) return [];

    if (!searchQuery.trim()) return contacts;

    const query = searchQuery.toLowerCase();
    return contacts.filter((contact) =>
      contact.email.toLowerCase().includes(query),
    );
  }, [contacts, searchQuery]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "-";

    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    } catch (error) {
      return "-";
    }
  };

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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
              {/* Header */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                      Pesan Kontak
                    </h1>
                    <p className="text-muted-foreground">
                      Kelola pesan yang masuk dari form kontak.
                    </p>
                  </div>
                  {!isLoading && (
                    <Badge variant="secondary" className="text-sm">
                      {filteredContacts.length} Pesan
                    </Badge>
                  )}
                </div>

                {/* Search */}
                <div className="flex items-center py-4">
                  <div className="relative w-full max-w-sm">
                    <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari berdasarkan email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Table with Skeleton Loading */}
                <div className="rounded-md border bg-card">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Nama</TableHead>
                        <TableHead className="w-[200px]">Email</TableHead>
                        <TableHead className="w-[180px]">Subject</TableHead>
                        <TableHead>Pesan</TableHead>
                        <TableHead className="w-[150px]">Tanggal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {isLoading ? (
                        // Skeleton Loading
                        <>
                          {[...Array(5)].map((_, i) => (
                            <TableRow key={i}>
                              <TableCell>
                                <Skeleton className="h-5 w-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-5 w-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-5 w-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-5 w-full" />
                              </TableCell>
                              <TableCell>
                                <Skeleton className="h-5 w-full" />
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ) : filteredContacts.length > 0 ? (
                        filteredContacts.map((contact: any) => (
                          <TableRow key={contact.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <IconUser className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">
                                  {contact.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <IconMail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm">{contact.email}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm font-medium">
                                {contact.subject}
                              </span>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm text-muted-foreground line-clamp-2 max-w-[300px]">
                                {contact.message}
                              </p>
                            </TableCell>
                            <TableCell>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(contact.createdAt)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="h-24 text-center text-muted-foreground"
                          >
                            {searchQuery
                              ? "Tidak ada pesan dengan email tersebut."
                              : "Belum ada pesan masuk."}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
