import { useState } from "react";
import { GraduationCap } from "lucide-react";
import TimeLineListItem from "./TimeLineListItem";
import { SectionHeader } from "./SectionHeader";
import type { ResumeEducation } from "@/core/interfaces/";
import dynamic from "next/dynamic";
import LoaderOne from "@/components/ui/loader-one";
import { useTranslations } from "next-intl";

// Dynamically import dialogs with loading states
const AddEducationDialog = dynamic(
  () =>
    import("./dialogs/add/AddEducationDialog").then(
      (mod) => mod.AddEducationDialog
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

const EditEducationDialog = dynamic(
  () =>
    import("./dialogs/edit/EditEducationDialog").then(
      (mod) => mod.EditEducationDialog
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

const DeleteEducationDialog = dynamic(
  () =>
    import("./dialogs/delete/DeleteEducationDialog").then(
      (mod) => mod.DeleteEducationDialog
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

interface EducationListProps {
  educations: ResumeEducation[] | null;
}

export function EducationList({ educations }: EducationListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEducation, setSelectedEducation] =
    useState<ResumeEducation | null>(null);

  const t = useTranslations("resumePage.education");

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <SectionHeader
        title={t("title")}
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
          <p className="text-muted-foreground text-center py-4">{t("empty")}</p>
        )}
      </div>

      {dialogOpen && (
        <AddEducationDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      )}
      {selectedEducation && (
        <>
          {editDialogOpen && (
            <EditEducationDialog
              open={editDialogOpen}
              onOpenChange={setEditDialogOpen}
              education={selectedEducation}
            />
          )}
          {deleteDialogOpen && (
            <DeleteEducationDialog
              open={deleteDialogOpen}
              onOpenChange={setDeleteDialogOpen}
              education={selectedEducation}
            />
          )}
        </>
      )}
    </div>
  );
}
