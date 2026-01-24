"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  IconUsers,
  IconMail,
  IconBriefcase,
  IconTrophy,
  IconCertificate,
  IconFolder,
} from "@tabler/icons-react";
import { useContacts } from "@/hooks/use-contact";
import { useProjects } from "@/hooks/use-project";
import { useCertificates } from "@/hooks/use-certificate";
import { useCareers } from "@/hooks/use-career";
import { useAchievements } from "@/hooks/use-achievement";

export function DashboardContent() {
  const { data: contacts, isLoading: loadingContacts } = useContacts();
  const { data: projects, isLoading: loadingProjects } = useProjects();
  const { data: certificates, isLoading: loadingCertificates } =
    useCertificates();
  const { data: careers, isLoading: loadingCareers } = useCareers();
  const { data: achievements, isLoading: loadingAchievements } =
    useAchievements();

  const stats = [
    {
      title: "Total Pesan",
      value: contacts?.length || 0,
      icon: IconMail,
      description: "Pesan dari contact form",
      isLoading: loadingContacts,
      color: "text-blue-500",
    },
    {
      title: "Projects",
      value: projects?.items?.length || 0,
      icon: IconFolder,
      description: "Total project portofolio",
      isLoading: loadingProjects,
      color: "text-green-500",
    },
    {
      title: "Sertifikat",
      value: certificates?.items?.length || 0,
      icon: IconCertificate,
      description: "Sertifikat yang dimiliki",
      isLoading: loadingCertificates,
      color: "text-yellow-500",
    },
    {
      title: "Pengalaman Kerja",
      value: careers?.items?.length || 0,
      icon: IconBriefcase,
      description: "Riwayat karir",
      isLoading: loadingCareers,
      color: "text-purple-500",
    },
    {
      title: "Penghargaan",
      value: achievements?.items?.length || 0,
      icon: IconTrophy,
      description: "Achievement & awards",
      isLoading: loadingAchievements,
      color: "text-orange-500",
    },
    {
      title: "Unique Emails",
      value: contacts ? new Set(contacts.map((c: any) => c.email)).size : 0,
      icon: IconUsers,
      description: "Email unik dari contact",
      isLoading: loadingContacts,
      color: "text-pink-500",
    },
  ];

  return (
    <div className="flex flex-col gap-6 py-4 px-4 lg:px-6 md:py-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Ringkasan data portofolio dan statistik website Anda.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              {stat.isLoading ? (
                <>
                  <Skeleton className="h-8 w-20 mb-1" />
                  <Skeleton className="h-4 w-full" />
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>Pesan terbaru dari contact form</CardDescription>
        </CardHeader>
        <CardContent>
          {loadingContacts ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : contacts && contacts.length > 0 ? (
            <div className="space-y-4">
              {contacts.slice(0, 5).map((contact: any) => (
                <div
                  key={contact.id}
                  className="flex items-start space-x-4 pb-4 border-b last:border-0"
                >
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <IconMail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {contact.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {contact.email}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {contact.subject}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Belum ada pesan masuk
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
