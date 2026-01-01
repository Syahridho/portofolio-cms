"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TechBadgeProps {
  name: string;
  slug: string;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function TechBadge({
  name,
  slug,
  className,
  variant = "outline",
}: TechBadgeProps) {
  const [imageError, setImageError] = useState(false);
  const iconUrl = `https://cdn.simpleicons.org/${slug}`;

  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1.5 bg-white dark:bg-zinc-900 text-black dark:text-white border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors",
        className
      )}
    >
      {!imageError && (
        <img
          src={iconUrl}
          alt={name}
          className="w-4 h-4"
          loading="lazy"
          onError={() => {
            setImageError(true);
          }}
        />
      )}
      <span className="font-medium">{name}</span>
    </Badge>
  );
}
