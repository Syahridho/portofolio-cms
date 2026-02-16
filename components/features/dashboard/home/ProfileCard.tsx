"use client";

import { useProfile } from "@/hooks/use-profile"; // Hook data Firebase
import { EditProfileDialog } from "@/components/edit-profile-dialog"; // Dialog Edit
import { SocialIconButton } from "@/components/social-icon-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Pastikan sudah install skeleton
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconMail,
} from "@tabler/icons-react";

export default function ProfileCard() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <Card className="@container/card h-full">
        <CardHeader className="flex-row items-start gap-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex flex-col gap-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  const data = profile || {
    name: "Nama Belum Diatur",
    jobTitle: "Pekerjaan Belum Diatur",
    photoURL: "",
    socials: {
      email: "",
      linkedin: "",
      github: "",
      instagram: "",
      whatsapp: "",
    },
  };

  return (
    <Card className="@container/card">
      <CardHeader className="flex-row items-start gap-4">
        {/* AVATAR */}
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={data?.photoURL || "/default-avatar.jpg"}
            alt={data?.name}
            className="object-cover"
          />
        </Avatar>

        <div className="flex flex-1 flex-col gap-1">
          <CardTitle className="text-2xl font-semibold">{data.name}</CardTitle>
          <CardDescription>{data.jobTitle}</CardDescription>

          {/* SOCIAL MEDIA ICONS */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {data.socials?.email && (
              <SocialIconButton
                icon={<IconMail size={16} />}
                href={`mailto:${data.socials.email}`}
                label="Email"
              />
            )}
            {data.socials?.linkedin && (
              <SocialIconButton
                icon={<IconBrandLinkedin size={16} />}
                href={data.socials.linkedin}
                label="LinkedIn"
              />
            )}
            {data.socials?.github && (
              <SocialIconButton
                icon={<IconBrandGithub size={16} />}
                href={data.socials.github}
                label="GitHub"
              />
            )}
            {data.socials?.instagram && (
              <SocialIconButton
                icon={<IconBrandInstagram size={16} />}
                href={data.socials.instagram}
                label="Instagram"
              />
            )}
            {data.socials?.whatsapp && (
              <SocialIconButton
                icon={<IconBrandWhatsapp size={16} />}
                href={data.socials.whatsapp} // Pastikan format https://wa.me/...
                label="WhatsApp"
              />
            )}
          </div>
        </div>

        {/* TOMBOL EDIT (Dialog) */}
        <CardAction>
          <EditProfileDialog
            currentName={data.name}
            currentJobTitle={data.jobTitle}
            currentAvatar={data.photoURL}
            currentEmail={data.socials?.email}
            currentLinkedin={data.socials?.linkedin}
            currentGithub={data.socials?.github}
            currentInstagram={data.socials?.instagram}
            currentWhatsapp={data.socials?.whatsapp}
          />
        </CardAction>
      </CardHeader>
    </Card>
  );
}
