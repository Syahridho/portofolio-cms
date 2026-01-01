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

import {
  IconTrendingDown,
  IconTrendingUp,
  IconEdit,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
                <Card className="@container/card">
                  <CardHeader className="flex-row items-start">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>SAS</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-1 flex-col gap-1">
                      <CardTitle className="text-2xl font-semibold">
                        Syahridho Arjuna Syahputra
                      </CardTitle>
                      <CardDescription>Full Stack Developer</CardDescription>
                      <div className="flex gap-2 mt-3">
                        <SocialIconButton
                          icon={<IconMail size={16} />}
                          href="mailto:your@email.com"
                          label="Email"
                        />
                        <SocialIconButton
                          icon={<IconBrandLinkedin size={16} />}
                          href="https://linkedin.com/in/yourprofile"
                          label="LinkedIn"
                        />
                        <SocialIconButton
                          icon={<IconBrandGithub size={16} />}
                          href="https://github.com/yourusername"
                          label="GitHub"
                        />
                        <SocialIconButton
                          icon={<IconBrandInstagram size={16} />}
                          href="https://instagram.com/yourusername"
                          label="Instagram"
                        />
                        <SocialIconButton
                          icon={<IconBrandWhatsapp size={16} />}
                          href="https://wa.me/yourphonenumber"
                          label="WhatsApp"
                        />
                      </div>
                    </div>

                    <CardAction>
                      <EditProfileDialog
                        currentName="Syahridho Arjuna Syahputra"
                        currentJobTitle="Full Stack Developer"
                        currentAvatar="https://github.com/shadcn.png"
                        currentEmail="your@email.com"
                        currentLinkedin="https://linkedin.com/in/yourprofile"
                        currentGithub="https://github.com/yourusername"
                        currentInstagram="https://instagram.com/yourusername"
                        currentWhatsapp="628123456789"
                      />
                    </CardAction>
                  </CardHeader>
                </Card>
                <Card className="@container/card">
                  <CardHeader className="flex-row items-start gap-4">
                    <CardTitle className="text-2xl font-semibold">
                      Hi, I'm Syahridho Arjuna Syahputra
                    </CardTitle>
                    <CardDescription>
                      I am a Programmer with a focus on creating aesthetically
                      pleasing and responsive user interfaces. With skills
                      focusing on Bootstrap, Tailwind, PHP, React JS, Next JS
                      and Laravel. I have developed a variety of projects,
                      ranging from business websites to interactive web
                      applications.
                    </CardDescription>

                    <CardAction>
                      <EditIntroDialog
                        currentName="Syahridho Arjuna Syahputra"
                        currentDescription="I am a Programmer with a focus on creating aesthetically pleasing and responsive user interfaces. With skills focusing on Bootstrap, Tailwind, PHP, React JS, Next JS and Laravel. I have developed a variety of projects, ranging from business websites to interactive web applications."
                      />
                    </CardAction>
                  </CardHeader>
                </Card>
                <Card className="@container/card">
                  <CardHeader className="flex-row items-start gap-4">
                    <CardTitle className="text-2xl font-semibold">
                      Skill Pemrograman
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-col gap-4">
                        {/* Frontend */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2">
                            Frontend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {initialSkills
                              .filter((skill) => skill.category === "Frontend")
                              .map((skill) => (
                                <TechBadge
                                  key={skill.id}
                                  name={skill.name}
                                  slug={skill.slug}
                                />
                              ))}
                          </div>
                        </div>

                        {/* Backend */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2">
                            Backend
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {initialSkills
                              .filter((skill) => skill.category === "Backend")
                              .map((skill) => (
                                <TechBadge
                                  key={skill.id}
                                  name={skill.name}
                                  slug={skill.slug}
                                />
                              ))}
                          </div>
                        </div>

                        {/* Mobile */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Mobile</h4>
                          <div className="flex flex-wrap gap-2">
                            {initialSkills
                              .filter((skill) => skill.category === "Mobile")
                              .map((skill) => (
                                <TechBadge
                                  key={skill.id}
                                  name={skill.name}
                                  slug={skill.slug}
                                />
                              ))}
                          </div>
                        </div>

                        {/* Database */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2">
                            Database
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {initialSkills
                              .filter((skill) => skill.category === "Database")
                              .map((skill) => (
                                <TechBadge
                                  key={skill.id}
                                  name={skill.name}
                                  slug={skill.slug}
                                />
                              ))}
                          </div>
                        </div>

                        {/* Tools & Others */}
                        <div>
                          <h4 className="text-sm font-semibold mb-2">
                            Tools & Others
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {initialSkills
                              .filter(
                                (skill) => skill.category === "Tools & Others"
                              )
                              .map((skill) => (
                                <TechBadge
                                  key={skill.id}
                                  name={skill.name}
                                  slug={skill.slug}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </CardDescription>

                    <CardAction>
                      <EditSkillsDialog skills={initialSkills} />
                    </CardAction>
                  </CardHeader>
                </Card>
                <Card className="@container/card">
                  <CardHeader className="flex-row items-start gap-4">
                    <CardTitle className="text-2xl font-semibold">
                      Karir
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-col gap-6">
                        {initialCareer.slice(0, 3).map((career) => {
                          const MONTHS = [
                            "",
                            "Januari",
                            "Februari",
                            "Maret",
                            "April",
                            "Mei",
                            "Juni",
                            "Juli",
                            "Agustus",
                            "September",
                            "Oktober",
                            "November",
                            "Desember",
                          ];
                          const startMonthName = MONTHS[career.startMonth];
                          const endMonthName = career.endMonth
                            ? MONTHS[career.endMonth]
                            : "";
                          const isCurrent = !career.endYear;
                          const period = `${startMonthName} ${
                            career.startYear
                          } - ${
                            isCurrent
                              ? "Sekarang"
                              : `${endMonthName} ${career.endYear}`
                          }`;
                          const initial = career.company
                            .substring(0, 2)
                            .toUpperCase();

                          return (
                            <div
                              key={career.id}
                              className="flex items-start gap-4"
                            >
                              {career.logo ? (
                                <img
                                  src={career.logo}
                                  alt={career.company}
                                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                />
                              ) : (
                                <Avatar className="h-12 w-12 flex-shrink-0">
                                  <AvatarFallback className="bg-primary text-primary-foreground">
                                    {initial}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground">
                                  {career.company}
                                </h4>
                                <p className="text-sm text-foreground/80">
                                  {career.position}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {career.location} • {period}
                                </p>
                                {career.description && (
                                  <p className="text-xs text-muted-foreground mt-2">
                                    {career.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardDescription>

                    <CardAction>
                      <EditCareerDialog careers={initialCareer} />
                    </CardAction>
                  </CardHeader>
                </Card>
                <Card className="@container/card">
                  <CardHeader className="flex-row items-start gap-4">
                    <CardTitle className="text-2xl font-semibold">
                      Penghargaan
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-col gap-4">
                        {initialAchievements.slice(0, 3).map((achievement) => {
                          const MONTHS = [
                            "",
                            "Januari",
                            "Februari",
                            "Maret",
                            "April",
                            "Mei",
                            "Juni",
                            "Juli",
                            "Agustus",
                            "September",
                            "Oktober",
                            "November",
                            "Desember",
                          ];
                          const monthName = MONTHS[achievement.month];
                          const date = `${monthName} ${achievement.year}`;

                          return (
                            <div
                              key={achievement.id}
                              className="flex items-start gap-3"
                            >
                              {achievement.logo ? (
                                <img
                                  src={achievement.logo}
                                  alt={achievement.title}
                                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                                  🏆
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-muted-foreground">
                                  {date}
                                </p>
                                <h4 className="font-semibold text-foreground mt-1">
                                  {achievement.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {achievement.organization}
                                  {achievement.location &&
                                    `, ${achievement.location}`}
                                </p>
                                {achievement.category && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {achievement.category}
                                  </p>
                                )}
                                {achievement.gallery &&
                                  achievement.gallery.length > 0 && (
                                    <div className="flex gap-2 mt-2">
                                      {achievement.gallery.map((img, idx) => (
                                        <img
                                          key={idx}
                                          src={img}
                                          alt={`Gallery ${idx + 1}`}
                                          className="w-20 h-20 object-cover rounded border"
                                        />
                                      ))}
                                    </div>
                                  )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardDescription>

                    <CardAction>
                      <EditAchievementDialog
                        achievements={initialAchievements}
                      />
                    </CardAction>
                  </CardHeader>
                </Card>
                <Card className="@container/card">
                  <CardHeader className="flex-row items-start gap-4">
                    <CardTitle className="text-2xl font-semibold">
                      Curriculum Vitae
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-col gap-4">
                        {initialCVs.slice(0, 3).map((cv) => (
                          <div key={cv.id} className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0">
                              📄
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-foreground">
                                {cv.language}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {cv.fileName}
                              </p>
                            </div>
                            <a
                              href={cv.fileUrl}
                              download={cv.fileName}
                              className="text-primary hover:text-primary/80 transition-colors p-2 rounded-full hover:bg-accent"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                              </svg>
                            </a>
                          </div>
                        ))}
                      </div>
                    </CardDescription>

                    <CardAction>
                      <EditCVDialog cvs={initialCVs} />
                    </CardAction>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
