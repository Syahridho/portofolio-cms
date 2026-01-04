"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useLocale } from "@/lib/i18n-simple";

export const metadata = {
  title: "Kontak | Syahridho Arjuna Syahputra",
  description: "Hubungi saya melalui form kontak",
};

export default function ContactPage() {
  const { t } = useLocale();

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t.contact.title}</h1>
        <p className="text-muted-foreground">{t.contact.subtitle}</p>
      </div>

      {/* Contact Form - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle>{t.contact.sendMessage}</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input id="name" placeholder={t.contact.namePlaceholder} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.contact.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">{t.contact.subject}</Label>
              <Input id="subject" placeholder={t.contact.subjectPlaceholder} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t.contact.message}</Label>
              <Textarea
                id="message"
                placeholder={t.contact.messagePlaceholder}
                className="min-h-[150px]"
              />
            </div>
            <div className="flex justify-end">
              <InteractiveHoverButton type="submit">
                {t.contact.sendButton}
              </InteractiveHoverButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
