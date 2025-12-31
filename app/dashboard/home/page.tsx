import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import {
  IconTrendingDown,
  IconTrendingUp,
  IconEdit,
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
              <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-2">
                <Card className="@container/card">
                  <CardHeader>
                     <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>Sas</AvatarFallback>
                      </Avatar>
                      div
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                     
                    </CardTitle>
                    <CardDescription>
                      Syahridho Arjuna Syahputra
                    </CardDescription>
                    <CardAction>
                      <Dialog>
                        <form>
                          <DialogTrigger asChild>
                            <Button size="icon-sm" variant="outline">
                              <IconEdit />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Edit profile</DialogTitle>
                              <DialogDescription>
                                Make changes to your profile here. Click save
                                when you&apos;re done.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                              <div className="grid gap-3">
                                <Label htmlFor="name-1">Name</Label>
                                <Input
                                  id="name-1"
                                  name="name"
                                  defaultValue="Pedro Duarte"
                                />
                              </div>
                              <div className="grid gap-3">
                                <Label htmlFor="username-1">Username</Label>
                                <Input
                                  id="username-1"
                                  name="username"
                                  defaultValue="@peduarte"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </form>
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
