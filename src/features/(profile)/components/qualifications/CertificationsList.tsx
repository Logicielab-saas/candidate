"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Certification } from "@/core/types/certification";
import { mockQualifications } from "@/core/mockData/qualifications";

export function CertificationsList() {
  const [certifications, setCertifications] = useState<Certification[]>(
    mockQualifications.certifications
  );
  const [isAddCertificationOpen, setIsAddCertificationOpen] = useState(false);

  const handleAdd = () => {
    setIsAddCertificationOpen(true);
  };

  const handleEdit = (id: string) => {
    console.log("Edit certification", id);
  };

  const handleDelete = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const handleSubmit = (values: Omit<Certification, "id">) => {
    const newCertification: Certification = {
      ...values,
      id: crypto.randomUUID(),
    };
    setCertifications([newCertification, ...certifications]);
  };

  if (!certifications?.length) {
    return (
      <>
        <div className="text-center text-muted-foreground py-8">
          Aucune certification ajoutée
        </div>
        <button className="hidden" data-add-button onClick={handleAdd} />
      </>
    );
  }

  return (
    <>
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
              <p className="text-sm text-muted-foreground">
                {cert.organization}
              </p>
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(cert.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(cert.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="hidden" data-add-button onClick={handleAdd} />
    </>
  );
}
