import React, { useState } from "react";
import { Education } from "@/core/types/education";
import { Briefcase } from "lucide-react";
import { AddEducationDialog } from "./dialogs/add/AddEducationDialog";
import { EditEducationDialog } from "./dialogs/edit/EditEducationDialog";
import { DeleteEducationDialog } from "./dialogs/delete/DeleteEducationDialog";
import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";
import { mockQualifications } from "@/core/mockData/qualifications";

export function EducationList() {
  const [educations, setEducations] = useState<Education[]>(
    mockQualifications.education
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(
    null
  );

  const handleAddEducation = (newEducation: Omit<Education, "id">) => {
    const newId = (educations.length + 1).toString(); // Simple ID generation
    const educationToAdd = { ...newEducation, id: newId };
    setEducations((prev) => [...prev, educationToAdd]);
  };

  const handleEditEducation = (
    id: string,
    updatedEducation: Omit<Education, "id">
  ) => {
    setEducations((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, ...updatedEducation } : edu))
    );
  };

  const handleDeleteEducation = (id: string) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id));
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Éducation"
        icon={<Briefcase className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setDialogOpen(true)}
      />
      <div className="space-y-0">
        {educations.map((edu) => (
          <TimeLineListItem
            key={edu.id}
            data={edu}
            onEdit={(education) => {
              setSelectedEducation(education as Education);
              setEditDialogOpen(true);
            }}
            onDelete={(_id) => {
              setSelectedEducation(edu);
              setDeleteDialogOpen(true);
            }}
          />
        ))}
      </div>
      <AddEducationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddEducation}
      />
      <EditEducationDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditEducation}
        education={selectedEducation as Education}
      />
      {deleteDialogOpen && selectedEducation && (
        <DeleteEducationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteEducation}
          education={selectedEducation}
        />
      )}
    </div>
  );
}
