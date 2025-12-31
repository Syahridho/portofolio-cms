import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconDownload, IconBrandGithub } from "@tabler/icons-react";
import { initialProfile } from "@/lib/profile-data";
import { initialSkills } from "@/lib/skills-data";
import { initialCVs } from "@/lib/cv-data";

export const metadata = {
  title: "Home | Syahridho Arjuna Syahputra",
  description: "Personal portfolio of Syahridho Arjuna Syahputra",
};

export default function HomePage() {
  // Get the primary CV (e.g., English version or first available)
  const primaryCV =
    initialCVs.find((cv) => cv.language === "English") || initialCVs[0];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Hi, I'm {initialProfile.name}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>{initialProfile.role}</span>
              <span>•</span>
              <span>{initialProfile.location}</span>
            </div>
          </div>
          {primaryCV && (
            <Button
              asChild
              className="rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <a
                href={primaryCV.fileUrl}
                download={primaryCV.fileName}
                className="gap-2"
              >
                Download CV
                <IconDownload size={18} />
              </a>
            </Button>
          )}
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
          {initialProfile.bio}
        </p>
      </section>

      {/* Skills Section */}
      <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
        <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
          <span className="bg-primary/10 p-1 rounded-md text-primary">💻</span>
          Skills
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">My Coding Skills</p>
          <div className="flex flex-wrap gap-2">
            {initialSkills.map((skill) => (
              <Badge
                key={skill.id}
                variant="secondary"
                className="px-3 py-1 text-sm bg-white dark:bg-zinc-900 border shadow-sm hover:scale-105 transition-transform cursor-default"
              >
                {/* We could dynamically map icons here if we had the component map available */}
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Section (Placeholder) */}
      <section className="space-y-6 animate-in slide-in-from-bottom-4 duration-700 delay-200">
        <h2 className="text-2xl font-bold border-b pb-2 flex items-center gap-2">
          <span className="bg-primary/10 p-1 rounded-md text-primary">
            <IconBrandGithub size={24} />
          </span>
          Contribution
        </h2>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            My Contribution in GitHub
          </p>
          <div className="w-full overflow-x-auto p-4 border rounded-xl bg-card">
            {/* Simple visual mock of contribution graph */}
            <div className="flex gap-1 min-w-[600px]">
              {Array.from({ length: 53 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    // Randomize contribution level for visual effect
                    const level =
                      Math.random() > 0.7
                        ? Math.random() > 0.5
                          ? "bg-green-500"
                          : "bg-green-300"
                        : "bg-muted";
                    return (
                      <div
                        key={dayIndex}
                        className={`w-3 h-3 rounded-sm ${level}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-2 text-xs text-muted-foreground flex justify-end gap-2 items-center">
              <span>Less</span>
              <div className="w-3 h-3 bg-muted rounded-sm"></div>
              <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span>More</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
