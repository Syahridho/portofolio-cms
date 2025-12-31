import { ReactNode } from "react";

interface SocialIconButtonProps {
  icon: ReactNode;
  href?: string;
  label: string;
}

export function SocialIconButton({ icon, href, label }: SocialIconButtonProps) {
  const content = (
    <div className="border rounded-full p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
      {icon}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
      >
        {content}
      </a>
    );
  }

  return content;
}
