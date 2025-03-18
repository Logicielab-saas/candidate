import { useState } from "react";
import { Briefcase } from "lucide-react";
import { ResumeExperience } from "@/core/interfaces/resume-experience.interface";
import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";
import { AddExperienceDialog } from "./dialogs/add/AddExperienceDialog";
import { EditExperienceDialog } from "./dialogs/edit/EditExperienceDialog";
import { DeleteExperienceDialog } from "./dialogs/delete/DeleteExperienceDialog";

interface WorkExperienceListProps {
  experiences: ResumeExperience[] | null;
}

export function WorkExperienceList({ experiences }: WorkExperienceListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<ResumeExperience | null>(null);

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title="Work Experience"
        icon={<Briefcase className="w-6 h-6 text-primaryHex-400 mr-2" />}
        onAdd={() => setDialogOpen(true)}
      />
      <div className="space-y-0">
        {experiences?.map((exp) => (
          <TimeLineListItem
            key={exp.uuid}
            data={exp}
            onEdit={() => {
              setSelectedExperience(exp);
              setEditDialogOpen(true);
            }}
            onDelete={() => {
              setSelectedExperience(exp);
              setDeleteDialogOpen(true);
            }}
          />
        ))}
        {!experiences?.length && (
          <p className="text-muted-foreground text-center py-4">
            No work experience added yet
          </p>
        )}
      </div>

      <AddExperienceDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      {selectedExperience && (
        <>
          <EditExperienceDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            experience={selectedExperience}
          />
          <DeleteExperienceDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            experience={selectedExperience}
          />
        </>
      )}
    </div>
  );
}
