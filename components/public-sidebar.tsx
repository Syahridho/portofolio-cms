"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconBrandTelegram,
} from "@tabler/icons-react";
import { initialProfile } from "@/lib/profile-data";
import { Separator } from "@/components/ui/separator";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function PublicSidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Project", href: "/projects" },
    { name: "Certificate", href: "/certificates" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <aside className="w-72 bg-background border-r hidden md:block shrink-0">
      <div className="h-50vh sticky top-8 px-6 py-8 overflow-y-auto flex flex-col gap-4">
        {/* Profile Section */}
        <div className="relative flex flex-col items-center text-center space-y-4 border rounded shadow p-4 overflow-hidden">
          {/* FlickeringGrid background - full width behind avatar */}

          <FlickeringGrid
            className="z-0 absolute inset-0 size-full"
            squareSize={4}
            gridGap={6}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={85}
            width={800}
          />
          <div className="relative z-10 rounded-full mt-2">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={initialProfile.avatar}
                alt={initialProfile.name}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {initialProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="relative z-10">
            <h2 className="text-sm font-bold leading-tight">
              {initialProfile.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {initialProfile.role}
            </p>
          </div>
          <div className="absolute top-2 right-2 z-20">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-background backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm">
              <AnimatedThemeToggler className="w-4 cursor-pointer" />
            </div>
          </div>
        </div>

        <Separator />

        {/* Navigation Section */}
        <nav className="flex-1 flex flex-col space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors",
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

        <Separator />

        {/* Social Section */}
        <div className="flex flex-col gap-4">
          <p className="text-xs text-center font-medium text-muted-foreground uppercase tracking-wider">
            Social Media
          </p>
          <div className="flex justify-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <a href={`mailto:${initialProfile.email}`}>
                <IconMail size={20} />
              </a>
            </Button>
            {initialProfile.socials.linkedin && (
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-muted-foreground hover:text-foreground"
              >
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
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-muted-foreground hover:text-foreground"
              >
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
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="text-muted-foreground hover:text-foreground"
              >
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
    </aside>
  );
}
