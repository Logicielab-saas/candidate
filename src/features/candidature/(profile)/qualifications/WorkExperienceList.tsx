import { useState } from "react";
import { Briefcase } from "lucide-react";
import { ResumeExperience } from "@/core/interfaces/resume-experience.interface";
import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";

// Dynamically import dialogs with loading states
const AddExperienceDialog = dynamic(
  () =>
    import("./dialogs/add/AddExperienceDialog").then(
      (mod) => mod.AddExperienceDialog
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

const EditExperienceDialog = dynamic(
  () =>
    import("./dialogs/edit/EditExperienceDialog").then(
      (mod) => mod.EditExperienceDialog
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

const DeleteExperienceDialog = dynamic(
  () =>
    import("./dialogs/delete/DeleteExperienceDialog").then(
      (mod) => mod.DeleteExperienceDialog
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

      {dialogOpen && (
        <AddExperienceDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      )}
      {selectedExperience && (
        <>
          {editDialogOpen && (
            <EditExperienceDialog
              open={editDialogOpen}
              onOpenChange={setEditDialogOpen}
              experience={selectedExperience}
            />
          )}
          {deleteDialogOpen && (
            <DeleteExperienceDialog
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              experience={selectedExperience}
            />
          )}
        </>
      )}
    </div>
  );
}
