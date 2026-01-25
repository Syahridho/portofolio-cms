"use client";

import { EditCareerDialog } from "@/components/edit-career-dialog";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCarrers } from "@/hooks/use-carrer";
import { UserCareer } from "@/types";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { useI18n } from "@/hooks/use-i18n";

export default function CarrerCard() {
  const { data: apiData, isLoading } = useCarrers();
  const { getContent } = useI18n();

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

  const carrers: UserCareer[] = apiData?.items || [];

  return (
    <Card className="@container/card">
      <CardHeader className="flex-row items-start gap-4">
        <CardTitle className="text-2xl font-semibold">Karir</CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-6">
            {carrers.slice(0, 3).map((career) => {
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
              const period = `${startMonthName} ${career.startYear} - ${
                isCurrent ? "Sekarang" : `${endMonthName} ${career.endYear}`
              }`;
              const initial = career.company.substring(0, 2).toUpperCase();

              return (
                <div key={career.id} className="flex items-start gap-4">
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
                      {getContent(career.position)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {career.location} • {period}
                    </p>
                    {career.description && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {getContent(career.description)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardDescription>

        <CardAction>
          <EditCareerDialog careers={carrers} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
