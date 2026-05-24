"use client";

import {
  IconDownload,
  IconBrandGithub,
  IconCode,
  IconTrophy,
  IconBriefcase,
} from "@tabler/icons-react";
import { useLocale } from "@/lib/i18n-simple";
import { TextHighlight } from "@/components/ui/text-highlight";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { Marquee } from "@/components/ui/marquee";
import { TechBadge } from "@/components/tech-badge";
import { GithubContribution } from "@/components/github-contribution";
import AchievementSection from "@/components/achievement-section";
import { ClientOnly } from "@/components/ui/client-only";
import ExperienceSection from "@/components/experience-section";
import { Skeleton } from "@/components/ui/skeleton";
import { useCVs } from "@/hooks/use-cv";

// Import hooks
import { useProfile } from "@/hooks/use-profile";
import { useDescription } from "@/hooks/use-description";
import { useSkills } from "@/hooks/use-skills";
import { useAchievements } from "@/hooks/use-achievement";
import { useCareers } from "@/hooks/use-career";
import { getLocalizedContent } from "@/lib/i18n-helpers";
import type { SeoSettings } from "@/services/seo.service";

interface HomeClientProps {
  seoData?: SeoSettings | null;
}

export default function HomeClient({ seoData }: HomeClientProps) {
  const { t, locale } = useLocale();

  // Fetch data using hooks
  const { data: profile, isLoading: isLoadingProfile } = useProfile();
  const { data: description, isLoading: isLoadingDescription } =
    useDescription();
  const { data: skillsData, isLoading: isLoadingSkills } = useSkills();
  const { data: achievementsData, isLoading: isLoadingAchievements } =
    useAchievements();

  const { data: careersData, isLoading: isLoadingCareers } = useCareers();
  const { data: cvsData } = useCVs();

  // Extract items from response
  const skills = skillsData?.items || [];
  const achievements = achievementsData?.items || [];
  const careers = careersData?.items || [];
  const cvs = cvsData?.items || [];

  return (
    <div className="space-y-12">
      {/* JSON-LD structured data (dynamic from DB) */}
      {seoData?.json_ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.json_ld) }}
        />
      )}

      {/* Hero Section */}
      <section className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            {isLoadingProfile ? (
              <Skeleton className="h-8 w-64" />
            ) : (
              <h1 className="text-2xl font-bold tracking-tight">
                {t.home.greeting}{" "}
                <TextHighlight color={"#e94c71"}>
                  {profile?.name || "User"}
                </TextHighlight>
              </h1>
            )}
          </div>
          {cvs.length > 0 && (
            <ClientOnly
              fallback={
                <RainbowButton
                  size="sm"
                  className="gap-2 rounded-full"
                  disabled
                >
                  {t.common.downloadCV}
                  <IconDownload size={16} />
                </RainbowButton>
              }
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <RainbowButton size="sm" className="gap-2 rounded-full">
                    {t.common.downloadCV}
                    <IconDownload size={16} />
                  </RainbowButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[180px]">
                  {cvs.map((cv) => (
                    <DropdownMenuItem key={cv.id} asChild>
                      <a
                        href={cv.fileUrl}
                        download={cv.fileName}
                        target="__blank"
                        className="cursor-pointer flex items-center gap-2"
                      >
                        <IconDownload size={16} />
                        <span>CV {cv.language}</span>
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </ClientOnly>
          )}
        </div>

        {isLoadingDescription ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-3xl" />
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-full max-w-xl" />
          </div>
        ) : (
          <p className="text-base text-justify text-muted-foreground max-w-3xl">
            {description?.description
              ? getLocalizedContent(description.description, locale)
              : t.home.bio}
          </p>
        )}
      </section>

      {/* Skills Section */}
      <section className="space-y-2 animate-in slide-in-from-bottom-4 duration-700 delay-100">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-primary">
            <IconCode size={24} />
          </span>
          {t.home.skills}
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{t.home.mySkills}</p>

          {isLoadingSkills ? (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-28" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ) : skills && skills.length > 0 ? (
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              {/* First Row */}
              <Marquee pauseOnHover className="[--duration:25s]">
                {skills.slice(0, Math.ceil(skills.length / 3)).map((skill) => (
                  <TechBadge
                    key={skill.id}
                    name={skill.name}
                    slug={skill.icons}
                  />
                ))}
              </Marquee>

              {/* Second Row */}
              <Marquee pauseOnHover className="[--duration:25s]">
                {skills
                  .slice(
                    Math.ceil(skills.length / 3),
                    Math.ceil((skills.length / 3) * 2),
                  )
                  .map((skill) => (
                    <TechBadge
                      key={skill.id}
                      name={skill.name}
                      slug={skill.icons}
                    />
                  ))}
              </Marquee>

              {/* Third Row */}
              <Marquee pauseOnHover className="[--duration:25s]">
                {skills
                  .slice(Math.ceil((skills.length / 3) * 2))
                  .map((skill) => (
                    <TechBadge
                      key={skill.id}
                      name={skill.name}
                      slug={skill.icons}
                    />
                  ))}
              </Marquee>

              {/* Gradient Fade Effects */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Belum ada skill yang ditambahkan
            </p>
          )}
        </div>
      </section>

      {/* Contribution Section */}
      <section className="space-y-2 animate-in slide-in-from-bottom-4 duration-700 delay-200">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-primary">
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

      {/* Achievement Section */}
      <section className="space-y-2 animate-in slide-in-from-bottom-4 duration-700 delay-200">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-primary">
            <IconTrophy size={24} />
          </span>
          {t.home.achievements}
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {t.home.myAchievements}
          </p>
          {isLoadingAchievements ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3 p-4 border rounded-lg">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : achievements && achievements.length > 0 ? (
            <AchievementSection
              achievements={achievements.map((item: any) => ({
                id: item.id,
                title: getLocalizedContent(item.title, locale),
                location: getLocalizedContent(item.location, locale),
                description: item.description
                  ? getLocalizedContent(item.description, locale)
                  : "",
                date: `${item.month}/${item.year}`,
                image: item.logo || "",
                initial: item.organization.charAt(0).toUpperCase(),
                gallerys: item.gallery || [],
              }))}
            />
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Belum ada achievement yang ditambahkan
            </p>
          )}
        </div>
      </section>

      {/* Career/Experience Section */}
      <section className="space-y-2 animate-in slide-in-from-bottom-4 duration-700 delay-200">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span className="text-primary">
            <IconBriefcase size={24} />
          </span>
          {t.home.experience}
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{t.home.myExperience}</p>
          {isLoadingCareers ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3 p-4 border rounded-lg">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          ) : careers && careers.length > 0 ? (
            <ExperienceSection
              experiences={careers.map((item: any) => ({
                id: item.id,
                title: item.company,
                date: `${item.startMonth}/${item.startYear} - ${
                  item.endMonth
                    ? `${item.endMonth}/${item.endYear}`
                    : "Sekarang"
                }`,
                location: getLocalizedContent(item.location, locale),
                description: item.description
                  ? getLocalizedContent(item.description, locale)
                  : "",
                image: item.logo || "",
                initial: item.company.charAt(0).toUpperCase(),
                gallerys: item.gallery || [],
              }))}
            />
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Belum ada pengalaman yang ditambahkan
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
