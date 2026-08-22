"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TechIconProps {
  name: string;
  slug: string;
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function TechIcon({
  name,
  slug,
  className,
  variant = "outline",
}: TechIconProps) {
  const [imageError, setImageError] = useState(false);
  const iconUrl = `https://cdn.simpleicons.org/${slug}`;

  return (
    <>
      {!imageError && (
        <img
          src={iconUrl}
          alt={name}
          className="w-4 h-4"
          loading="eager"
          onError={() => {
            setImageError(true);
          }}
          
        />
      )}
    </>
  );
}
