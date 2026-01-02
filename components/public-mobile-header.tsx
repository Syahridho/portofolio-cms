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
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSwitcher } from "@/components/language-switcher";

export function PublicMobileHeader() {
  const [open, setOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Project", href: "/projects" },
    { name: "Certificate", href: "/certificates" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="flex items-center justify-between p-4 border-b bg-background md:hidden sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            setIsImageLoading(true);
            setIsAvatarModalOpen(true);
          }}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={initialProfile.avatar}
              alt={initialProfile.name}
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              {initialProfile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="font-bold text-lg truncate">{initialProfile.name}</div>
      </div>
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <div className="flex items-center justify-center w-9 h-9 rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
          <LanguageSwitcher className="w-4" />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconMenu2 className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] flex flex-col">
            <SheetHeader>
              <SheetTitle className="text-left">
                {initialProfile.name}
              </SheetTitle>
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

                {/* Theme Toggler */}
                <div className="flex justify-center mt-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border bg-background hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm">
                    <AnimatedThemeToggler className="w-4 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Avatar Modal Dialog */}
      <Dialog open={isAvatarModalOpen} onOpenChange={setIsAvatarModalOpen}>
        <DialogContent className="sm:max-w-[500px] pt-12">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
            {isImageLoading && (
              <Skeleton className="absolute inset-0 w-full h-full" />
            )}
            <img
              src={initialProfile.avatar}
              alt={initialProfile.name}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-300",
                isImageLoading ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setIsImageLoading(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
