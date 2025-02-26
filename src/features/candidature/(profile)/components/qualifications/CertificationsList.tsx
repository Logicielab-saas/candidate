"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Certification } from "@/core/types/certification";
import { mockQualifications } from "@/core/mockData/qualifications";
import { AddCertificationDialog } from "./dialogs/add/AddCertificationDialog";
import { DeleteCertificationDialog } from "./dialogs/delete/DeleteCertificationDialog";
import { EditCertificationDialog } from "./dialogs/edit/EditCertificationDialog";

export function CertificationsList() {
  const [certifications, setCertifications] = useState<Certification[]>(
    mockQualifications.certifications
  );
  const [isAddCertificationOpen, setIsAddCertificationOpen] = useState(false);
  const [certificationToEdit, setCertificationToEdit] =
    useState<Certification | null>(null);
  const [certificationToDelete, setCertificationToDelete] =
    useState<Certification | null>(null);

  const handleAdd = () => {
    setIsAddCertificationOpen(true);
  };

  const handleEdit = (certification: Certification) => {
    setCertificationToEdit(certification);
  };

  const handleDelete = (certification: Certification) => {
    setCertificationToDelete(certification);
  };

  const handleConfirmDelete = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
    setCertificationToDelete(null);
  };

  const handleSubmit = (values: Omit<Certification, "id">) => {
    const newCertification: Certification = {
      ...values,
      id: crypto.randomUUID(),
    };
    setCertifications([newCertification, ...certifications]);
  };

  const handleEditSubmit = (id: string, values: Omit<Certification, "id">) => {
    setCertifications(
      certifications.map((cert) =>
        cert.id === id
          ? {
              ...values,
              id,
            }
          : cert
      )
    );
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
              <p className="text-sm text-muted-foreground">{cert.name}</p>
              <p className="text-sm text-muted-foreground">
                {cert.description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(cert)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(cert)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="hidden" data-add-button onClick={handleAdd} />

      <AddCertificationDialog
        open={isAddCertificationOpen}
        onOpenChange={setIsAddCertificationOpen}
        onSubmit={handleSubmit}
      />

      {certificationToEdit && (
        <EditCertificationDialog
          open={!!certificationToEdit}
          onOpenChange={(open) => !open && setCertificationToEdit(null)}
          onSubmit={handleEditSubmit}
          certification={certificationToEdit}
        />
      )}

      {certificationToDelete && (
        <DeleteCertificationDialog
          open={!!certificationToDelete}
          onOpenChange={(open) => !open && setCertificationToDelete(null)}
          onConfirm={handleConfirmDelete}
          certification={certificationToDelete}
        />
      )}
    </>
  );
}
