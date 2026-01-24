"use client";

import { EditAchievementDialog } from "@/components/edit-achievement-dialog";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAchievements } from "@/hooks/use-achievement";
import { UserAchivement } from "@/types";

export default function AchievementCard() {
  const { data: apiData, isLoading } = useAchievements();

  if (isLoading) {
    return (
      <Card className="@container/card">
        <CardHeader className="flex-row items-start gap-4">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const achievements: UserAchivement[] = apiData?.items || [];

  return (
    <Card className="@container/card">
      <CardHeader className="flex-row items-start gap-4">
        <CardTitle className="text-2xl font-semibold">Penghargaan</CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-4">
            {achievements.slice(0, 3).map((achievement) => {
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
                <div key={achievement.id} className="flex items-start gap-3">
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
                    <p className="text-xs text-muted-foreground">{date}</p>
                    <h4 className="font-semibold text-foreground mt-1">
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {achievement.organization}
                      {achievement.location && `, ${achievement.location}`}
                    </p>
                    {achievement.category && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {achievement.category}
                      </p>
                    )}
                    {achievement.gallery && achievement.gallery.length > 0 && (
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
          <EditAchievementDialog achievements={achievements} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
