"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconMail, IconBrandWhatsapp, IconMapPin } from "@tabler/icons-react";
import { initialProfile } from "@/lib/profile-data";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
        <p className="text-muted-foreground">
          Get in touch with me for collaborations or just a friendly hello.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <IconMail className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href={`mailto:${initialProfile.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {initialProfile.email}
                  </a>
                </div>
              </div>
              <Separator />
              {/* We can add WhatsApp if available in profile data, currently simulated */}
              <div className="flex items-start gap-3">
                <IconBrandWhatsapp className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="font-medium">WhatsApp</h4>
                  <a
                    href="https://wa.me/6281234567890" // Placeholder
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    +62 812-3456-7890
                  </a>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <IconMapPin className="text-primary mt-1" size={20} />
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-sm text-muted-foreground">
                    {initialProfile.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email address"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is this regarding?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
