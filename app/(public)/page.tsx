"use client";

import { Badge } from "@/components/ui/badge";
import { IconDownload, IconBrandGithub } from "@tabler/icons-react";
import { initialProfile } from "@/lib/profile-data";
import { initialSkills } from "@/lib/skills-data";
import { initialCVs } from "@/lib/cv-data";
import { useLocale } from "@/lib/i18n-simple";
import { TextHighlight } from "@/components/ui/text-highlight";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Marquee } from "@/components/ui/marquee";
import { TechBadge } from "@/components/tech-badge";
import { GithubContribution } from "@/components/github-contribution";

export default function HomePage() {
  const { t, locale } = useLocale();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {t.home.greeting}{" "}
              <TextHighlight color={locale === "id" ? "#ffd1dc" : "#a7f3d0"}>
                {initialProfile.name}
              </TextHighlight>
            </h1>
          </div>
          {initialCVs.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <RainbowButton size="sm" className="gap-2 rounded-full">
                  {t.common.downloadCV}
                  <IconDownload size={16} />
                </RainbowButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[180px]">
                {initialCVs.map((cv) => (
                  <DropdownMenuItem key={cv.id} asChild>
                    <a
                      href={cv.fileUrl}
                      download={cv.fileName}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <IconDownload size={16} />
                      <span>CV {cv.language}</span>
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <p className="text-base text-justify text-muted-foreground max-w-3xl">
          {t.home.bio}
        </p>
      </section>

      {/* Skills Section */}
      <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
        <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
          <span className="bg-primary/10 p-1 rounded-md text-primary">💻</span>
          {t.home.skills}
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{t.home.mySkills}</p>

          {/* Marquee Container with Gradient Fade */}
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            {/* First Row - Moving Right */}
            <Marquee pauseOnHover className="[--duration:25s]">
              {initialSkills
                .slice(0, Math.ceil(initialSkills.length / 3))
                .map((skill) => (
                  <TechBadge
                    key={skill.id}
                    name={skill.name}
                    slug={skill.slug}
                  />
                ))}
            </Marquee>

            {/* Second Row - Moving Right */}
            <Marquee pauseOnHover className="[--duration:25s]">
              {initialSkills
                .slice(
                  Math.ceil(initialSkills.length / 3),
                  Math.ceil((initialSkills.length / 3) * 2)
                )
                .map((skill) => (
                  <TechBadge
                    key={skill.id}
                    name={skill.name}
                    slug={skill.slug}
                  />
                ))}
            </Marquee>

            {/* Third Row - Moving Right */}
            <Marquee pauseOnHover className="[--duration:25s]">
              {initialSkills
                .slice(Math.ceil((initialSkills.length / 3) * 2))
                .map((skill) => (
                  <TechBadge
                    key={skill.id}
                    name={skill.name}
                    slug={skill.slug}
                  />
                ))}
            </Marquee>

            {/* Gradient Fade Effects */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
          </div>
        </div>
      </section>

      {/* Contribution Section (Placeholder) */}
      <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 delay-200">
        <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
          <span className="bg-primary/10 p-1 rounded-md text-primary">
            <IconBrandGithub size={24} />
          </span>
          {t.home.contribution}
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {t.home.myContribution}
          </p>
          <GithubContribution />
        </div>
      </section>
    </div>
  );
}
