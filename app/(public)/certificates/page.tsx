import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconStarFilled } from "@tabler/icons-react";
import { initialCertificates } from "@/lib/certificate-data";

export const metadata = {
  title: "Certificates | Syahridho Arjuna Syahputra",
  description: "My certifications and achievements",
};

export default function CertificatesPage() {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Certificates</h1>
        <p className="text-muted-foreground">
          Professional certifications and achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialCertificates.map((cert) => (
          <Card
            key={cert.id}
            className="overflow-hidden hover:shadow-md transition-all group"
          >
            <div className="relative aspect-[4/3] w-full bg-muted overflow-hidden">
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {cert.isFeatured && (
                <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-sm">
                  <IconStarFilled size={14} />
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <h3
                className="font-semibold text-lg leading-tight mb-2 line-clamp-2"
                title={cert.name}
              >
                {cert.name}
              </h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Issued: {formatDate(cert.issuedDate)}</p>
                {cert.expirationDate && (
                  <p>Expires: {formatDate(cert.expirationDate)}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
