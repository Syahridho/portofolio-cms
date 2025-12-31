"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { IconMenu2 } from "@tabler/icons-react";
import { initialProfile } from "@/lib/profile-data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
} from "@tabler/icons-react";

export function PublicMobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Project", href: "/projects" },
    { name: "Certificate", href: "/certificates" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background md:hidden sticky top-0 z-50">
      <div className="font-bold text-lg truncate pr-4">
        {initialProfile.name}
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <IconMenu2 className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] flex flex-col">
          <SheetHeader>
            <SheetTitle className="text-left">{initialProfile.name}</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col flex-1 gap-8 py-8">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-muted text-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto">
              <p className="text-xs text-center font-medium text-muted-foreground uppercase tracking-wider mb-4">
                Social Media
              </p>
              <div className="flex justify-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${initialProfile.email}`}>
                    <IconMail size={20} />
                  </a>
                </Button>
                {initialProfile.socials.linkedin && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={initialProfile.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandLinkedin size={20} />
                    </a>
                  </Button>
                )}
                {initialProfile.socials.github && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={initialProfile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandGithub size={20} />
                    </a>
                  </Button>
                )}
                {initialProfile.socials.instagram && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={initialProfile.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconBrandInstagram size={20} />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
