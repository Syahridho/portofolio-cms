import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SocialIconButton } from "@/components/social-icon-button";
import { EditProfileDialog } from "@/components/edit-profile-dialog";

import {
  IconTrendingDown,
  IconTrendingUp,
  IconEdit,
  IconMail,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Dashboard",
  description: "Dashboard home page",
};

export default function Page() {
  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Home",
      href: "/dashboard/home",
    },
  ];

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader breadcrumbs={breadcrumbs} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-4 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-1 @5xl/main:grid-cols-2">
                <Card className="@container/card">
                  <CardHeader className="flex-row items-start">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>SAS</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-1 flex-col gap-1">
                      <CardTitle className="text-2xl font-semibold">
                        Syahridho Arjuna Syahputra
                      </CardTitle>
                      <CardDescription>Full Stack Developer</CardDescription>
                      <div className="flex gap-2 mt-3">
                        <SocialIconButton
                          icon={<IconMail size={16} />}
                          href="mailto:your@email.com"
                          label="Email"
                        />
                        <SocialIconButton
                          icon={<IconBrandLinkedin size={16} />}
                          href="https://linkedin.com/in/yourprofile"
                          label="LinkedIn"
                        />
                        <SocialIconButton
                          icon={<IconBrandGithub size={16} />}
                          href="https://github.com/yourusername"
                          label="GitHub"
                        />
                        <SocialIconButton
                          icon={<IconBrandInstagram size={16} />}
                          href="https://instagram.com/yourusername"
                          label="Instagram"
                        />
                        <SocialIconButton
                          icon={<IconBrandWhatsapp size={16} />}
                          href="https://wa.me/yourphonenumber"
                          label="WhatsApp"
                        />
                      </div>
                    </div>

                    <CardAction>
                      <EditProfileDialog
                        currentName="Syahridho Arjuna Syahputra"
                        currentJobTitle="Full Stack Developer"
                        currentAvatar="https://github.com/shadcn.png"
                        currentEmail="your@email.com"
                        currentLinkedin="https://linkedin.com/in/yourprofile"
                        currentGithub="https://github.com/yourusername"
                        currentInstagram="https://instagram.com/yourusername"
                        currentWhatsapp="628123456789"
                      />
                    </CardAction>
                  </CardHeader>
                </Card>
                <Card className="@container/card">
                  <CardHeader className="flex-row items-start gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>SAS</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-1 flex-col gap-1">
                      <CardTitle className="text-2xl font-semibold">
                        Syahridho Arjuna Syahputra
                      </CardTitle>
                      <CardDescription>Full Stack Developer</CardDescription>
                    </div>

                    <CardAction>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="icon-sm" variant="outline">
                            <IconEdit />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <form>
                            <DialogHeader>
                              <DialogTitle>Edit Profile</DialogTitle>
                              <DialogDescription>
                                Make changes to your profile here. Click save
                                when you&apos;re done.
                              </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-4">
                              <div className="grid gap-3">
                                <Label htmlFor="name-1">Name</Label>
                                <Input
                                  id="name-1"
                                  name="name"
                                  defaultValue="Syahridho Arjuna Syahputra"
                                />
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="username-1">Job Title</Label>
                                <Input
                                  id="username-1"
                                  name="username"
                                  defaultValue="Full Stack Developer"
                                />
                              </div>
                            </div>

                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardAction>
                  </CardHeader>

                  <CardFooter className="flex-col items-start gap-1.5 text-sm"></CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
