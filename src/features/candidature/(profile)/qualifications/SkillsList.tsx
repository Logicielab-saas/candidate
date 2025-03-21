/**
 * SkillsList - Component for displaying and managing user's skills
 *
 * Displays a list of skills with their proficiency levels
 * and allows adding, editing, and deleting skills.
 */

"use client";

import { Zap, Pencil, X } from "lucide-react";
import { useState } from "react";
import type { ResumeSkill } from "@/core/interfaces";
import { SectionHeader } from "./SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getSkillBadgeStyle,
  getSkillLevelBadgeStyle,
} from "@/core/styles/skill-badge.style";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";
import {
  getProficiencyLabel,
  isValidProficiencyLevel,
} from "./constants/skill-proficiency";
import { cn } from "@/lib/utils";

// Dynamically import dialogs with loading states
const AddSkillDialog = dynamic(
  () =>
    import("./dialogs/add/AddSkillDialog").then((mod) => mod.AddSkillDialog),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const EditSkillDialog = dynamic(
  () =>
    import("./dialogs/edit/EditSkillDialog").then((mod) => mod.EditSkillDialog),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <LoaderOne />
      </div>
    ),
    ssr: false,
  }
);

const DeleteSkillDialog = dynamic(
  () =>
    import("./dialogs/delete/DeleteSkillDialog").then(
      (mod) => mod.DeleteSkillDialog
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

interface SkillsListProps {
  resumeSkills: ResumeSkill[] | null;
}

export function SkillsList({ resumeSkills }: SkillsListProps) {
  const [isAddSkillOpen, setIsAddSkillOpen] = useState(false);
  const [skillToEdit, setSkillToEdit] = useState<ResumeSkill | null>(null);
  const [skillToDelete, setSkillToDelete] = useState<ResumeSkill | null>(null);

  const handleEdit = (uuid: string) => {
    setSkillToEdit(resumeSkills?.find((skill) => skill.uuid === uuid) || null);
  };

  const handleDelete = (uuid: string) => {
    setSkillToDelete(
      resumeSkills?.find((skill) => skill.uuid === uuid) || null
    );
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Skills"
        icon={<Zap className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setIsAddSkillOpen(true)}
      />
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-2">
        {resumeSkills &&
          resumeSkills.length > 0 &&
          resumeSkills.map((skill) => {
            const level = Number(skill.resumeskill_level);
            const isValidLevel = isValidProficiencyLevel(level);
            const proficiencyLabel = isValidLevel
              ? getProficiencyLabel(level)
              : "N/A";

            return (
              <div key={skill.uuid} className={cn(getSkillBadgeStyle())}>
                <div className="flex flex-col gap-1 min-w-0 ">
                  <span className="font-medium truncate max-w-[150px]">
                    {skill.resumeskill_name}
                  </span>
                  <Badge
                    variant="secondary"
                    className={getSkillLevelBadgeStyle(level)}
                  >
                    {proficiencyLabel}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => handleEdit(skill.uuid)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDelete(skill.uuid)}
                  >
                    <X className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
            );
          })}
      </div>

      {resumeSkills && resumeSkills.length === 0 && (
        <p className="text-muted-foreground text-center py-4">
          No skills added yet
        </p>
      )}

      {isAddSkillOpen && (
        <AddSkillDialog
          open={isAddSkillOpen}
          onOpenChange={setIsAddSkillOpen}
        />
      )}

      {skillToEdit && (
        <EditSkillDialog
          open={!!skillToEdit}
          onOpenChange={(open) => !open && setSkillToEdit(null)}
          skill={{
            skill_uuid: skillToEdit.skill_uuid,
            uuid: skillToEdit.uuid,
            resumeskill_name: skillToEdit.resumeskill_name,
            resumeskill_level: skillToEdit.resumeskill_level || null,
          }}
        />
      )}

      {skillToDelete && (
        <DeleteSkillDialog
          open={!!skillToDelete}
          onOpenChange={(open) => !open && setSkillToDelete(null)}
          skill={{
            uuid: skillToDelete.uuid,
            skill_uuid: skillToDelete.skill_uuid,
            resumeskill_name: skillToDelete.resumeskill_name,
            resumeskill_level: skillToDelete.resumeskill_level || null,
          }}
        />
      )}
    </div>
  );
}
