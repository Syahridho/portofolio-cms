"use client";

import { useDescription } from "@/hooks/use-description";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { EditIntroDialog } from "@/components/edit-intro-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/hooks/use-i18n";

export default function DescriptionCard() {
  const { data: apiData, isLoading } = useDescription();
  const { getContent } = useI18n();

  if (isLoading) {
    return (
      <Card className="@container/card h-full">
        <CardHeader className="flex-row items-start gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const data = apiData || {
    name: "Nama belum di atur",
    description: {
      id: "Deskripsi belum diatur",
      en: "Description not set yet",
    },
  };

  return (
    <Card className="@container/card">
      <CardHeader className="flex-row items-start gap-4">
        <CardTitle className="text-2xl font-semibold">
          Hi there! I'm {data.name}
        </CardTitle>
        <CardDescription>{getContent(data.description)}</CardDescription>

        <CardAction>
          <EditIntroDialog
            currentName={data.name}
            currentDescription={data.description}
          />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
