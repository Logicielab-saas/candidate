import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

interface CertificationsListProps {
  certifications: Certification[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function CertificationsList({
  certifications,
  onEdit,
  onDelete,
}: CertificationsListProps) {
  if (!certifications?.length) {
    return (
      <div className="text-center text-muted-foreground py-8">
        Aucune certification ajoutée
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {certifications.map((cert) => (
        <div
          key={cert.id}
          className="flex items-start justify-between border rounded-lg p-4"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{cert.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{cert.organization}</p>
            <p className="text-sm text-muted-foreground">
              Délivré le: {cert.issueDate}
              {cert.expiryDate && ` • Expire le: ${cert.expiryDate}`}
            </p>
            {cert.credentialId && (
              <p className="text-sm text-muted-foreground">
                ID: {cert.credentialId}
              </p>
            )}
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                Voir le certificat
              </a>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(cert.id)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(cert.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
