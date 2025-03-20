/**
 * SkillsList - Component for displaying and managing user's skills
 *
 * Displays a list of skills with their proficiency levels
 * and allows adding, editing, and deleting skills.
 */

"use client";

import { Zap } from "lucide-react";
import { useState } from "react";
import type { ResumeSkill } from "@/core/interfaces";
import { SectionHeader } from "./SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";
import {
  getProficiencyLabel,
  isValidProficiencyLevel,
  type SkillProficiencyLevel,
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

  const handleAdd = () => {
    setIsAddSkillOpen(true);
  };

  const handleEdit = (uuid: string) => {
    setSkillToEdit(resumeSkills?.find((skill) => skill.uuid === uuid) || null);
  };

  const handleDelete = (uuid: string) => {
    setSkillToDelete(
      resumeSkills?.find((skill) => skill.uuid === uuid) || null
    );
  };

  if (!resumeSkills?.length) {
    return (
      <>
        <div className="text-center text-muted-foreground py-8">
          No skills added yet
        </div>
        <button className="hidden" data-add-button onClick={handleAdd} />
      </>
    );
  }

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Skills"
        icon={<Zap className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setIsAddSkillOpen(true)}
      />
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-2">
        {resumeSkills.map((skill) => {
          const level = Number(skill.resumeskill_level);
          const isValidLevel = isValidProficiencyLevel(level);

          return (
            <div
              key={skill.uuid}
              className="group flex items-start justify-between hover:bg-accent/50 transition-colors px-3 py-2 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100 rounded-lg"
            >
              <div className="flex flex-col gap-1 min-w-0">
                <span className="font-medium truncate max-w-[150px]">
                  {skill.resumeskill_name}
                </span>
                {skill.resumeskill_level && isValidLevel && (
                  <Badge
                    variant="secondary"
                    className={cn(
                      "w-fit text-xs",
                      level === 5 &&
                        "bg-primary/20 text-primary hover:bg-primary/30",
                      level === 4 &&
                        "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30",
                      level === 3 &&
                        "bg-green-500/20 text-green-600 hover:bg-green-500/30",
                      level === 2 &&
                        "bg-orange-500/20 text-orange-600 hover:bg-orange-500/30",
                      level === 1 &&
                        "bg-red-500/20 text-red-600 hover:bg-red-500/30"
                    )}
                  >
                    {getProficiencyLabel(level as SkillProficiencyLevel)}
                  </Badge>
                )}
              </div>
              <div className="flex gap-1 ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(skill.uuid)}
                  className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primaryHex-100"
                >
                  <Pencil className="h-3.5 w-3.5 text-primaryHex-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(skill.uuid)}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5 text-destructive" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

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
