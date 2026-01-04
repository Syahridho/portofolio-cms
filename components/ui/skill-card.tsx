"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  name: string;
  slug: string;
  className?: string;
}

export function SkillCard({ name, slug, className }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const iconUrl = `https://cdn.simpleicons.org/${slug}`;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group",
        "min-w-[120px] max-w-[140px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-12 h-12 flex items-center justify-center">
        <img
          src={iconUrl}
          alt={name}
          className={cn(
            "w-full h-full object-contain transition-transform duration-500",
            isHovered && "rotate-[360deg] scale-110"
          )}
          onError={(e) => {
            // Fallback if icon not found
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              name
            )}&background=random`;
          }}
        />
      </div>
      <span className="text-sm font-medium text-center line-clamp-2">
        {name}
      </span>
    </div>
  );
}
