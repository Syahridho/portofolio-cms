"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useLocale } from "@/lib/i18n-simple";
import { useAddContact } from "@/hooks/use-contact";
import { toast } from "sonner";

export default function ContactClient() {
  const { t } = useLocale();
  const { mutate: addContact, isPending } = useAddContact();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Semua field harus diisi!");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email tidak valid!");
      return;
    }

    // Submit to Firestore
    addContact(formData, {
      onSuccess: () => {
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t.contact.title}</h1>
        <p className="text-muted-foreground">{t.contact.subtitle}</p>
      </div>

      {/* Contact Form - Full Width */}
      <Card className="border-none shadow-none p-0">
        <CardContent className="px-0">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.contact.name}</Label>
                <Input
                  id="name"
                  placeholder={t.contact.namePlaceholder}
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.contact.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isPending}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">{t.contact.subject}</Label>
              <Input
                id="subject"
                placeholder={t.contact.subjectPlaceholder}
                value={formData.subject}
                onChange={handleChange}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t.contact.message}</Label>
              <Textarea
                id="message"
                placeholder={t.contact.messagePlaceholder}
                className="min-h-[150px]"
                value={formData.message}
                onChange={handleChange}
                disabled={isPending}
              />
            </div>
            <div className="flex justify-end">
              <InteractiveHoverButton type="submit" disabled={isPending}>
                {isPending ? "Mengirim..." : t.contact.sendButton}
              </InteractiveHoverButton>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
