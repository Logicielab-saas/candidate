"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Experience } from "@/core/types/experience";
import { AddExperienceDialog } from "./dialogs/add/AddExperienceDialog";
import { DeleteExperienceDialog } from "./dialogs/delete/DeleteExperienceDialog";
import { EditExperienceDialog } from "./dialogs/edit/EditExperienceDialog";
import { mockQualifications } from "@/core/mockData/qualifications";

export function ExperienceList() {
  const [experiences, setExperiences] = useState<Experience[]>(
    mockQualifications.experiences
  );
  const [isAddExperienceOpen, setIsAddExperienceOpen] = useState(false);
  const [experienceToDelete, setExperienceToDelete] =
    useState<Experience | null>(null);
  const [experienceToEdit, setExperienceToEdit] = useState<Experience | null>(
    null
  );

  const handleAdd = () => {
    setIsAddExperienceOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setExperienceToEdit(experience);
  };

  const handleDelete = (experience: Experience) => {
    setExperienceToDelete(experience);
  };

  const handleConfirmDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
    setExperienceToDelete(null);
  };

  const handleSubmit = (values: Omit<Experience, "id">) => {
    const newExperience: Experience = {
      ...values,
      id: crypto.randomUUID(),
    };
    setExperiences([newExperience, ...experiences]);
  };

  const handleEditSubmit = (id: string, values: Omit<Experience, "id">) => {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id
          ? {
              ...values,
              id,
            }
          : exp
      )
    );
  };

  return (
    <>
      {!experiences?.length ? (
        <div className="text-center text-muted-foreground py-8">
          Aucune expérience professionnelle ajoutée
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="flex items-start justify-between border rounded-lg p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{experience.title}</h3>
                  {experience.current && (
                    <Badge variant="secondary">En cours</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {experience.company}
                </p>
                <p className="text-sm text-muted-foreground">
                  {experience.startDate} -{" "}
                  {experience.current ? "Présent" : experience.endDate}
                </p>
                <p className="text-sm mt-2">{experience.description}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(experience)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(experience)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button data-add-button onClick={handleAdd} className="sr-only" />

      <AddExperienceDialog
        open={isAddExperienceOpen}
        onOpenChange={setIsAddExperienceOpen}
        onSubmit={handleSubmit}
      />

      {experienceToDelete && (
        <DeleteExperienceDialog
          open={!!experienceToDelete}
          onOpenChange={(open) => !open && setExperienceToDelete(null)}
          onConfirm={handleConfirmDelete}
          experience={experienceToDelete}
        />
      )}

      {experienceToEdit && (
        <EditExperienceDialog
          open={!!experienceToEdit}
          onOpenChange={(open) => !open && setExperienceToEdit(null)}
          onSubmit={handleEditSubmit}
          experience={experienceToEdit}
        />
      )}
    </>
  );
}
