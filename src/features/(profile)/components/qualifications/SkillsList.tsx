"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { type Skill } from "@/core/types/skill";
import { mockQualifications } from "@/core/mockData/qualifications";

export function SkillsList() {
  const [skills, setSkills] = useState<Skill[]>(mockQualifications.skills);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);

  const handleAdd = () => {
    setIsAddSkillOpen(true);
  };

  const handleEdit = (id: string) => {
    console.log("Edit skill", id);
  };

  const handleDelete = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleSubmit = (values: Omit<Skill, "id">) => {
    const newSkill: Skill = {
      ...values,
      id: crypto.randomUUID(),
    };
    setSkills([newSkill, ...skills]);
  };

  if (!skills?.length) {
    return (
      <>
        <div className="text-center text-muted-foreground py-8">
          Aucune compétence ajoutée
        </div>
        <button className="hidden" data-add-button onClick={handleAdd} />
      </>
    );
  }

  return (
    <>
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="group flex items-center justify-between bg-card hover:bg-accent/50 transition-colors rounded-lg px-3 py-2"
          >
            <span className="font-medium truncate">{skill.name}</span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEdit(skill.id)}
                className="h-7 w-7"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(skill.id)}
                className="h-7 w-7 text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="hidden" data-add-button onClick={handleAdd} />
    </>
  );
}
