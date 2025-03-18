import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { AddEducationDialog } from "./dialogs/add/AddEducationDialog";
import { EditEducationDialog } from "./dialogs/edit/EditEducationDialog";
import { DeleteEducationDialog } from "./dialogs/delete/DeleteEducationDialog";
import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";
import type { ResumeEducation } from "@/core/interfaces/resume-education.interface";

interface EducationListProps {
  educations: ResumeEducation[] | null;
}

export function EducationList({ educations }: EducationListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] =
    useState<ResumeEducation | null>(null);

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Education"
        icon={<GraduationCap className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setDialogOpen(true)}
      />
      <div className="space-y-0">
        {educations?.map((edu) => (
          <TimeLineListItem
            key={edu.uuid}
            data={edu}
            onEdit={() => {
              setSelectedEducation(edu);
              setEditDialogOpen(true);
            }}
            onDelete={() => {
              setSelectedEducation(edu);
              setDeleteDialogOpen(true);
            }}
          />
        ))}
        {!educations?.length && (
          <p className="text-muted-foreground text-center py-4">
            No education added yet
          </p>
        )}
      </div>

      <AddEducationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      {selectedEducation && (
        <>
          <EditEducationDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            education={selectedEducation}
          />
          <DeleteEducationDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            education={selectedEducation}
          />
        </>
      )}
    </div>
  );
}
