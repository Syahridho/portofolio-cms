"use client";

import { useState, useEffect } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconDeviceFloppy, IconSearch, IconExternalLink } from "@tabler/icons-react";
import { useAllSeoSettings, useUpsertSeo } from "@/hooks/use-seo";
import { SEO_PAGES, type SeoPageKey, type SeoSettings } from "@/services/seo.service";
import { toast } from "sonner";

const EMPTY_FORM: Omit<SeoSettings, "id" | "updated_at"> = {
  page_name: "",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  og_title: "",
  og_description: "",
  og_image_url: "",
  json_ld: null,
};

export default function SeoPage() {
  const { data: allSettings = [], isLoading } = useAllSeoSettings();
  const { mutate: upsertSeo, isPending: isSaving } = useUpsertSeo();

  const [activeTab, setActiveTab] = useState<SeoPageKey>("home");
  const [forms, setForms] = useState<
    Record<SeoPageKey, Omit<SeoSettings, "id" | "updated_at">>
  >({
    home: { ...EMPTY_FORM, page_name: "home" },
    projects: { ...EMPTY_FORM, page_name: "projects" },
    certificates: { ...EMPTY_FORM, page_name: "certificates" },
    contact: { ...EMPTY_FORM, page_name: "contact" },
  });

  const [jsonLdText, setJsonLdText] = useState<Record<SeoPageKey, string>>({
    home: "",
    projects: "",
    certificates: "",
    contact: "",
  });
  const [jsonLdError, setJsonLdError] = useState<Record<SeoPageKey, string>>({
    home: "",
    projects: "",
    certificates: "",
    contact: "",
  });

  // Populate forms from fetched data
  useEffect(() => {
    if (!allSettings.length) return;
    const updated = { ...forms };
    const updatedJsonLd = { ...jsonLdText };

    SEO_PAGES.forEach(({ key }) => {
      const existing = allSettings.find((s) => s.page_name === key);
      if (existing) {
        updated[key] = {
          page_name: key,
          meta_title: existing.meta_title || "",
          meta_description: existing.meta_description || "",
          meta_keywords: existing.meta_keywords || "",
          og_title: existing.og_title || "",
          og_description: existing.og_description || "",
          og_image_url: existing.og_image_url || "",
          json_ld: existing.json_ld ?? null,
        };
        updatedJsonLd[key] = existing.json_ld
          ? JSON.stringify(existing.json_ld, null, 2)
          : "";
      }
    });
    setForms(updated);
    setJsonLdText(updatedJsonLd);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSettings]);

  const updateField = (
    page: SeoPageKey,
    field: keyof Omit<SeoSettings, "id" | "updated_at" | "json_ld">,
    value: string,
  ) => {
    setForms((prev) => ({
      ...prev,
      [page]: { ...prev[page], [field]: value },
    }));
  };

  const handleJsonLdChange = (page: SeoPageKey, value: string) => {
    setJsonLdText((prev) => ({ ...prev, [page]: value }));
    if (!value.trim()) {
      setJsonLdError((prev) => ({ ...prev, [page]: "" }));
      return;
    }
    try {
      JSON.parse(value);
      setJsonLdError((prev) => ({ ...prev, [page]: "" }));
    } catch {
      setJsonLdError((prev) => ({ ...prev, [page]: "JSON tidak valid" }));
    }
  };

  const handleSave = (page: SeoPageKey) => {
    // Validate JSON-LD if provided
    let parsedJsonLd: Record<string, unknown> | null = null;
    if (jsonLdText[page].trim()) {
      try {
        parsedJsonLd = JSON.parse(jsonLdText[page]);
      } catch {
        toast.error("JSON-LD tidak valid, harap periksa formatnya");
        return;
      }
    }

    upsertSeo({
      ...forms[page],
      json_ld: parsedJsonLd,
    });
  };

  const breadcrumbs = [
    { title: "Dashboard", href: "/dashboard" },
    { title: "SEO Settings", href: "/dashboard/seo" },
  ];

  const getLastUpdated = (page: SeoPageKey) => {
    const s = allSettings.find((x) => x.page_name === page);
    if (!s?.updated_at) return null;
    return new Date(s.updated_at).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderForm = (page: SeoPageKey) => {
    const form = forms[page];
    const lastUpdated = getLastUpdated(page);

    return (
      <div className="space-y-6">
        {lastUpdated && (
          <p className="text-xs text-muted-foreground">
            Terakhir diperbarui: {lastUpdated}
          </p>
        )}

        {/* Meta Tags */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <IconSearch className="h-4 w-4" />
              Meta Tags
            </CardTitle>
            <CardDescription>
              Informasi dasar yang dibaca mesin pencari
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${page}-meta-title`}>
                Meta Title{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (maks. 60 karakter)
                </span>
              </Label>
              <Input
                id={`${page}-meta-title`}
                value={form.meta_title || ""}
                onChange={(e) => updateField(page, "meta_title", e.target.value)}
                placeholder="Contoh: Syahridho — Full Stack Developer"
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground text-right">
                {(form.meta_title || "").length}/60
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${page}-meta-desc`}>
                Meta Description{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (maks. 160 karakter)
                </span>
              </Label>
              <Textarea
                id={`${page}-meta-desc`}
                value={form.meta_description || ""}
                onChange={(e) =>
                  updateField(page, "meta_description", e.target.value)
                }
                placeholder="Deskripsi singkat halaman untuk mesin pencari..."
                maxLength={160}
                rows={3}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {(form.meta_description || "").length}/160
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${page}-meta-keywords`}>Meta Keywords</Label>
              <Input
                id={`${page}-meta-keywords`}
                value={form.meta_keywords || ""}
                onChange={(e) =>
                  updateField(page, "meta_keywords", e.target.value)
                }
                placeholder="next.js, portfolio, developer, typescript"
              />
              <p className="text-xs text-muted-foreground">
                Pisahkan dengan koma
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Open Graph */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <IconExternalLink className="h-4 w-4" />
              Open Graph (OG Tags)
            </CardTitle>
            <CardDescription>
              Tampilan saat link dibagikan di media sosial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${page}-og-title`}>OG Title</Label>
              <Input
                id={`${page}-og-title`}
                value={form.og_title || ""}
                onChange={(e) => updateField(page, "og_title", e.target.value)}
                placeholder="Sama seperti Meta Title jika dikosongkan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${page}-og-desc`}>OG Description</Label>
              <Textarea
                id={`${page}-og-desc`}
                value={form.og_description || ""}
                onChange={(e) =>
                  updateField(page, "og_description", e.target.value)
                }
                placeholder="Deskripsi untuk preview media sosial..."
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${page}-og-image`}>OG Image URL</Label>
              <Input
                id={`${page}-og-image`}
                value={form.og_image_url || ""}
                onChange={(e) =>
                  updateField(page, "og_image_url", e.target.value)
                }
                placeholder="https://example.com/og-image.jpg (1200×630px)"
              />
              {form.og_image_url && (
                <div className="mt-2 rounded-md overflow-hidden border w-full max-w-xs">
                  <img
                    src={form.og_image_url}
                    alt="OG preview"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* JSON-LD */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              JSON-LD Structured Data
            </CardTitle>
            <CardDescription>
              Schema.org data terstruktur untuk rich results di Google
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Textarea
              value={jsonLdText[page]}
              onChange={(e) => handleJsonLdChange(page, e.target.value)}
              placeholder={`{\n  "@context": "https://schema.org",\n  "@type": "Person",\n  "name": "Syahridho Arjuna Syahputra"\n}`}
              rows={8}
              className={`font-mono text-xs resize-none ${
                jsonLdError[page] ? "border-destructive" : ""
              }`}
            />
            {jsonLdError[page] ? (
              <p className="text-xs text-destructive">{jsonLdError[page]}</p>
            ) : jsonLdText[page] ? (
              <p className="text-xs text-green-600 dark:text-green-400">
                ✓ JSON valid
              </p>
            ) : null}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={() => handleSave(page)}
            disabled={isSaving || !!jsonLdError[page]}
            className="gap-2"
          >
            <IconDeviceFloppy className="h-4 w-4" />
            {isSaving ? "Menyimpan..." : "Simpan SEO"}
          </Button>
        </div>
      </div>
    );
  };

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
          <div className="flex flex-col gap-4 py-4 px-4 lg:px-6 md:gap-6 md:py-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  SEO Settings
                </h1>
                <p className="text-muted-foreground">
                  Kelola meta title, deskripsi, Open Graph, dan structured data
                  untuk setiap halaman.
                </p>
              </div>
              <Badge variant="outline" className="text-xs gap-1 mt-1">
                <IconSearch className="h-3 w-3" />
                {allSettings.length}/{SEO_PAGES.length} halaman dikonfigurasi
              </Badge>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-lg" />
                ))}
              </div>
            ) : (
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as SeoPageKey)}
              >
                <TabsList className="grid w-full grid-cols-4">
                  {SEO_PAGES.map(({ key, label }) => {
                    const hasData = allSettings.some(
                      (s) => s.page_name === key && s.meta_title,
                    );
                    return (
                      <TabsTrigger
                        key={key}
                        value={key}
                        className="gap-1.5 text-xs sm:text-sm"
                      >
                        {label}
                        {hasData && (
                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        )}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {SEO_PAGES.map(({ key }) => (
                  <TabsContent key={key} value={key} className="mt-6">
                    {renderForm(key)}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
