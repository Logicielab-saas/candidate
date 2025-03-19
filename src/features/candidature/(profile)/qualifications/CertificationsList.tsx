"use client";

import { Award } from "lucide-react";
import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";
import { useState } from "react";
import type { ResumeCertifications } from "@/core/interfaces";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";

// Dynamically import dialogs with loading states
const AddCertificationDialog = dynamic(
  () =>
    import("./dialogs/add/AddCertificationDialog").then(
      (mod) => mod.AddCertificationDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const EditCertificationDialog = dynamic(
  () =>
    import("./dialogs/edit/EditCertificationDialog").then(
      (mod) => mod.EditCertificationDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const DeleteCertificationDialog = dynamic(
  () =>
    import("./dialogs/delete/DeleteCertificationDialog").then(
      (mod) => mod.DeleteCertificationDialog
    ),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

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
      {dialogOpen && (
        <AddCertificationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
      {selectedCertification && (
        <>
          {editDialogOpen && (
            <EditCertificationDialog
              open={editDialogOpen}
              onOpenChange={setEditDialogOpen}
              certification={selectedCertification}
            />
          )}
          {deleteDialogOpen && (
            <DeleteCertificationDialog
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              certification={selectedCertification}
            />
          )}
        </>
      )}
    </div>
  );
}
