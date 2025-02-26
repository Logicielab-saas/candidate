import React, { useState } from "react";
import { Experience } from "@/core/types/experience";
import { Briefcase, Plus, Trash, PencilIcon } from "lucide-react";
import { AddExperienceDialog } from "./dialogs/add/AddExperienceDialog";
import { EditExperienceDialog } from "./dialogs/edit/EditExperienceDialog";
import { DeleteExperienceDialog } from "./dialogs/delete/DeleteExperienceDialog";
import { Button } from "@/components/ui/button";

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
      <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
        <span className="flex items-center">
          <Briefcase className="mr-2 text-primaryHex-400 w-6 h-6" />
          Expériences professionnelles
        </span>
        <span
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="w-5 h-5" />
        </span>
      </h2>
      <div className="space-y-0">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="relative flex flex-col items-start w-full pl-2"
          >
            <div
              className="absolute w-4 h-4 bg-primaryHex-500 rounded-full"
              style={{ left: "0.5px" }}
            ></div>
            <div className="border-l-2 border-primaryHex-400 pl-5 w-full mt-2">
              <h4 className="text-base font-bold flex justify-between items-center">
                {exp.title}
                <div className="flex ">
                  <Button
                    variant="ghost"
                    className="cursor-pointer text-primaryHex-600 hover:bg-primaryHex-100 hover:text-primaryHex-600"
                    onClick={() => {
                      setSelectedExperience(exp);
                      setEditDialogOpen(true);
                    }}
                  >
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    className="cursor-pointer text-red-600 hover:bg-red-100 hover:text-red-600"
                    onClick={() => {
                      setSelectedExperience(exp);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </h4>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-500">
                {exp.startDate} - {exp.endDate ? exp.endDate : "Present"}
              </p>
              <p className="mt-2">{exp.description}</p>
            </div>
          </div>
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
