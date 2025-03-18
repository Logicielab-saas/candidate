"use client";

import { Award } from "lucide-react";
import { AddCertificationDialog } from "./dialogs/add/AddCertificationDialog";
import { EditCertificationDialog } from "./dialogs/edit/EditCertificationDialog";
import { DeleteCertificationDialog } from "./dialogs/delete/DeleteCertificationDialog";
import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";
import { useState } from "react";
import type { ResumeCertifications } from "@/core/interfaces";

interface CertificationsListProps {
  certifications: ResumeCertifications[] | null;
}

export function CertificationsList({
  certifications,
}: CertificationsListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCertification, setSelectedCertification] =
    useState<ResumeCertifications | null>(null);

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Certifications"
        icon={<Award className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setDialogOpen(true)}
      />
      <div className="space-y-0">
        {certifications?.map((cert) => (
          <TimeLineListItem
            key={cert.uuid}
            data={cert}
            onEdit={(certification) => {
              setSelectedCertification(certification as ResumeCertifications);
              setEditDialogOpen(true);
            }}
            onDelete={() => {
              setSelectedCertification(cert);
              setDeleteDialogOpen(true);
            }}
          />
        ))}
        {!certifications?.length && (
          <p className="text-muted-foreground text-center py-4">
            No certifications added yet
          </p>
        )}
      </div>
      <AddCertificationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      {selectedCertification && (
        <>
          <EditCertificationDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            certification={selectedCertification}
          />
          <DeleteCertificationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            certification={selectedCertification}
          />
        </>
      )}
    </div>
  );
}
