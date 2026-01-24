"use client";

import { EditCVDialog } from "@/components/edit-cv-dialog";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCVs } from "@/hooks/use-cv";
import { UserCV } from "@/types";
import { IconDownload } from "@tabler/icons-react";

export default function CVCard() {
  const { data: apiData, isLoading } = useCVs();

  if (isLoading) {
    return (
      <Card className="@container/card">
        <CardHeader className="flex-row items-start gap-4">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const cvs: UserCV[] = apiData?.items || [];

  return (
    <Card className="@container/card">
      <CardHeader className="flex-row items-start gap-4">
        <CardTitle className="text-2xl font-semibold">
          Curriculum Vitae
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-4">
            {cvs.slice(0, 3).map((cv) => (
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
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors p-2 rounded-full hover:bg-accent"
                  title="Download CV"
                >
                  <IconDownload size={20} />
                </a>
              </div>
            ))}
          </div>
        </CardDescription>

        <CardAction>
          <EditCVDialog cvs={cvs} />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
