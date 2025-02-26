"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { type Skill } from "@/core/types/skill";
import { mockQualifications } from "@/core/mockData/qualifications";
import { AddSkillDialog } from "./dialogs/add/AddSkillDialog";
import { DeleteSkillDialog } from "./dialogs/delete/DeleteSkillDialog";
import { SectionHeader } from "./SectionHeader";
import { TagListItem } from "./TagListItem";

export function SkillsList() {
  const [skills, setSkills] = useState<Skill[]>(mockQualifications.skills);
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState<Skill | null>(null);

  const handleAdd = () => {
    setIsAddSkillOpen(true);
  };

  const handleDelete = (id: string) => {
    setSkillToDelete(skills.find((skill) => skill.id === id) || null);
  };

  const handleConfirmDelete = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
    setSkillToDelete(null);
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
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Skills"
        icon={<Star className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setIsAddSkillOpen(true)}
      />
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 p-2">
        {skills.map((skill) => (
          <TagListItem key={skill.id} skill={skill} onDelete={handleDelete} />
        ))}
      </div>

      <AddSkillDialog
        open={isAddSkillOpen}
        onOpenChange={setIsAddSkillOpen}
        onSubmit={handleSubmit}
      />

      {skillToDelete && (
        <DeleteSkillDialog
          open={!!skillToDelete}
          onOpenChange={(open) => !open && setSkillToDelete(null)}
          onConfirm={handleConfirmDelete}
          skill={skillToDelete}
        />
      )}
    </div>
  );
}
