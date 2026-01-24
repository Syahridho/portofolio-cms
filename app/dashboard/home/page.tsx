import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SocialIconButton } from "@/components/social-icon-button";
import { EditProfileDialog } from "@/components/edit-profile-dialog";
import { EditSkillsDialog } from "@/components/edit-skills-dialog";
import { EditIntroDialog } from "@/components/edit-intro-dialog";
import { EditCareerDialog } from "@/components/edit-career-dialog";
import { EditAchievementDialog } from "@/components/edit-achievement-dialog";
import { EditCVDialog } from "@/components/edit-cv-dialog";
import { TechBadge } from "@/components/tech-badge";
import { initialSkills } from "@/lib/skills-data";
import { initialCareer } from "@/lib/career-data";
import { initialAchievements } from "@/lib/achievement-data";
import { initialCVs } from "@/lib/cv-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import ProfileCard from "@/components/features/dashboard/home/ProfileCard";
import DescriptionCard from "@/components/features/dashboard/home/DescriptionCard";
import SkillCard from "@/components/features/dashboard/home/SkillCard";
import CarrerCard from "@/components/features/dashboard/home/CareerCard";
import AchievementCard from "@/components/features/dashboard/home/AchievementCard";
import CVCard from "@/components/features/dashboard/home/CVCard";

export const metadata: Metadata = {
  title: "Beranda - Dashboard",
  description: "Halaman beranda dashboard",
};

export default function Page() {
  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Beranda",
      href: "/dashboard/home",
    },
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
          <div className="@container/main flex flex-4 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-1 @5xl/main:grid-cols-2">
                <ProfileCard />
                <DescriptionCard />
                <SkillCard />
                <CarrerCard />
                <AchievementCard />
                <CVCard />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
