import React, { useState } from "react";
import { Experience } from "@/core/types/experience";
import { Briefcase } from "lucide-react";
import { AddExperienceDialog } from "./dialogs/add/AddExperienceDialog";
import { EditExperienceDialog } from "./dialogs/edit/EditExperienceDialog";
import { DeleteExperienceDialog } from "./dialogs/delete/DeleteExperienceDialog";

import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";

interface WorkExperienceListProps {
  initialExperiences: Experience[];
}

export function WorkExperienceList({
  initialExperiences,
}: WorkExperienceListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  const handleAddExperience = (newExperience: Omit<Experience, "id">) => {
    const newId = (experiences.length + 1).toString(); // Simple ID generation
    const experienceToAdd = { ...newExperience, id: newId };
    setExperiences((prev) => [...prev, experienceToAdd]);
  };

  const handleEditExperience = (
    id: string,
    updatedExperience: Omit<Experience, "id">
  ) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, ...updatedExperience } : exp
      )
    );
  };

  const handleDeleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Expériences professionnelles"
        icon={<Briefcase className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setDialogOpen(true)}
      />
      <div className="space-y-0">
        {experiences.map((exp) => (
          <TimeLineListItem
            key={exp.id}
            experience={exp}
            onEdit={(experience) => {
              setSelectedExperience(experience);
              setEditDialogOpen(true);
            }}
            onDelete={(_id) => {
              setSelectedExperience(exp);
              setDeleteDialogOpen(true);
            }}
          />
        ))}
      </div>
      <AddExperienceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddExperience}
      />
      <EditExperienceDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleEditExperience}
        experience={selectedExperience as Experience}
      />
      {deleteDialogOpen && selectedExperience && (
        <DeleteExperienceDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirm={handleDeleteExperience}
          experience={selectedExperience}
        />
      )}
    </div>
  );
}
