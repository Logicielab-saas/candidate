import React, { useState } from "react";
import { Experience } from "@/core/types/experience";
import { Briefcase, Plus } from "lucide-react";
import { AddExperienceDialog } from "./dialogs/add/AddExperienceDialog";

interface WorkExperienceListProps {
  initialExperiences: Experience[];
}

export function WorkExperienceList({
  initialExperiences,
}: WorkExperienceListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);

  const handleAddExperience = (newExperience: Omit<Experience, "id">) => {
    const newId = (experiences.length + 1).toString(); // Simple ID generation
    const experienceToAdd = { ...newExperience, id: newId };
    setExperiences((prev) => [...prev, experienceToAdd]);
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
        <span className="flex items-center">
          <Briefcase className="mr-2 text-primaryHex-400 w-5 h-5" />
          Expériences professionnelles
        </span>
        <span
          className="text-primaryHex-600 font-bold rounded-full p-2 bg-primaryHex-100 hover:bg-primaryHex-200 cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="w-5 h-5" />
        </span>
      </h2>
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative flex items-start pl-2">
            <div
              className="absolute w-4 h-4 bg-primaryHex-500 rounded-full"
              style={{ left: "0.5px" }}
            ></div>
            <div className="border-l-2 border-primaryHex-400 pl-5">
              <h4 className="text-base font-bold">{exp.title}</h4>
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
    </div>
  );
}
