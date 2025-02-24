"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Education } from "@/core/types/education";
import { mockQualifications } from "@/core/mockData/qualifications";
import { AddEducationDialog } from "./dialogs/add/AddEducationDialog";

export function EducationList() {
  const [education, setEducation] = useState<Education[]>(
    mockQualifications.education
  );
  const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);

  const handleAdd = () => {
    setIsAddEducationOpen(true);
  };

  const handleEdit = (id: string) => {
    console.log("Edit education", id);
  };

  const handleDelete = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const handleSubmit = (values: Omit<Education, "id">) => {
    const newEducation: Education = {
      ...values,
      id: crypto.randomUUID(),
    };
    setEducation([newEducation, ...education]);
  };

  return (
    <>
      {!education?.length ? (
        <div className="text-center text-muted-foreground py-8">
          Aucune formation ajoutée
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="flex items-start justify-between border rounded-lg p-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{edu.degree}</h3>
                  {edu.current && <Badge variant="secondary">En cours</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {edu.school} • {edu.location}
                </p>
                <p className="text-sm text-muted-foreground">{edu.field}</p>
                <p className="text-sm text-muted-foreground">
                  {edu.startDate} - {edu.current ? "Présent" : edu.endDate}
                </p>
                {edu.description && (
                  <p className="text-sm mt-2">{edu.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(edu.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(edu.id)}
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

      <AddEducationDialog
        open={isAddEducationOpen}
        onOpenChange={setIsAddEducationOpen}
        onSubmit={handleSubmit}
      />
    </>
  );
}
