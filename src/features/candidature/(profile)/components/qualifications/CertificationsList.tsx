import React, { useState } from "react";
import type { Certification } from "@/core/interfaces/";
import { Award } from "lucide-react";
import { AddCertificationDialog } from "./dialogs/add/AddCertificationDialog";
import { EditCertificationDialog } from "./dialogs/edit/EditCertificationDialog";
import { DeleteCertificationDialog } from "./dialogs/delete/DeleteCertificationDialog";
import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";
import { mockQualifications } from "@/core/mockData/qualifications";

export function CertificationsList() {
  const [certifications, setCertifications] = useState<Certification[]>(
    mockQualifications.certifications
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] =
    useState<Certification | null>(null);

  const handleAddCertification = (
    newCertification: Omit<Certification, "id">
  ) => {
    const newId = (certifications.length + 1).toString(); // Simple ID generation
    const certificationToAdd = { ...newCertification, id: newId };
    setCertifications((prev) => [...prev, certificationToAdd]);
  };

  const handleEditCertification = (
    id: string,
    updatedCertification: Omit<Certification, "id">
  ) => {
    setCertifications((prev) =>
      prev.map((cert) =>
        cert.id === id ? { ...cert, ...updatedCertification } : cert
      )
    );
  };

  const handleDeleteCertification = (id: string) => {
    setCertifications((prev) => prev.filter((cert) => cert.id !== id));
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Certifications"
        icon={<Award className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setDialogOpen(true)}
      />
      <div className="space-y-0">
        {certifications.map((cert) => (
          <TimeLineListItem
            key={cert.id}
            data={cert}
            onEdit={(certification) => {
              setSelectedCertification(certification as Certification);
              setEditDialogOpen(true);
            }}
            onDelete={(_id) => {
              setSelectedCertification(cert);
              setDeleteDialogOpen(true);
            }}
          />
        ))}
      </div>
      <AddCertificationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddCertification}
      />
      <EditCertificationDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditCertification}
        certification={selectedCertification as Certification}
      />
      {deleteDialogOpen && selectedCertification && (
        <DeleteCertificationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteCertification}
          certification={selectedCertification}
        />
      )}
    </div>
  );
}
