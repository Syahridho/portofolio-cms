"use client";

import { cn } from "@/lib/utils";

interface TextHighlightProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function TextHighlight({
  children,
  color = "#ffd1dc",
  className,
}: TextHighlightProps) {
  return (
    <span
      className={cn("relative inline-block px-1", className)}
      style={{
        backgroundImage: `linear-gradient(to right, ${color} 0%, ${color} 100%)`,
        backgroundSize: "100% 40%",
        backgroundPosition: "0 85%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </span>
  );
}
