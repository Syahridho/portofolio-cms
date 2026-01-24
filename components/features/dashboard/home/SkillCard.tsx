"use client";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSkills } from "@/hooks/use-skills";
import { TechBadge } from "@/components/tech-badge";
import { EditSkillsDialog } from "@/components/edit-skills-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { UserSkills } from "@/types";

export default function SkillCard() {
  const { data: apiData, isLoading } = useSkills();

  if (isLoading) {
    return (
      <Card className="@container/card">
        <CardHeader className="flex-row items-start gap-4">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-7 w-20" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  // Konversi data API ke format yang dibutuhkan
  const skills: UserSkills[] = apiData?.items || [];

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, UserSkills[]>,
  );

  // Define category order
  const categoryOrder = [
    "Frontend",
    "Backend",
    "Mobile",
    "Database",
    "Tools & Others",
  ];

  return (
    <Card className="@container/card">
      <CardHeader className="flex-row items-start gap-4">
        <CardTitle className="text-2xl font-semibold">
          Skill Pemrograman
        </CardTitle>
        <CardDescription>
          {skills.length === 0 ? (
            <p className="text-muted-foreground">
              Belum ada skill yang ditambahkan. Klik tombol edit untuk menambah
              skill.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {categoryOrder.map((category) => {
                const categorySkills = groupedSkills[category];
                if (!categorySkills || categorySkills.length === 0) return null;

                return (
                  <div key={category}>
                    <h4 className="text-sm font-semibold mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <TechBadge
                          key={skill.id}
                          name={skill.name}
                          slug={skill.icons}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardDescription>

        <CardAction>
          <EditSkillsDialog skills={skills} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
