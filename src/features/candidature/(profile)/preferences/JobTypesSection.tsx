"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditJobTypeDialog } from "./dialogs/edit/EditJobTypeDialog";
import { DeleteJobTypeDialog } from "./dialogs/delete/DeleteJobTypeDialog";
import { ContractType } from "@/core/enums/contract-type.enum";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const AddJobTypeDialog = dynamic(
  () => import("./dialogs/add/AddJobTypeDialog"),
  { ssr: false }
);

export interface JobType {
  id: string;
  type: ContractType;
}

export function JobTypesSection() {
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [jobTypeToEdit, setJobTypeToEdit] = useState<JobType | null>(null);
  const [jobTypeToDelete, setJobTypeToDelete] = useState<JobType | null>(null);
  const tCommon = useTranslations("common");

  const handleEdit = (jobType: JobType) => {
    setJobTypeToEdit(jobType);
  };

  const handleDelete = (jobType: JobType) => {
    setJobTypeToDelete(jobType);
  };

  const handleEditSubmit = (id: string, values: { type: ContractType }) => {
    setJobTypes(
      jobTypes.map((jobType) =>
        jobType.id === id
          ? {
              ...jobType,
              ...values,
            }
          : jobType
      )
    );
    setJobTypeToEdit(null);
  };

  const handleConfirmDelete = (id: string) => {
    setJobTypes(jobTypes.filter((type) => type.id !== id));
    setJobTypeToDelete(null);
  };

  return (
    <>
      {!jobTypes?.length ? (
        <div className="text-center text-muted-foreground py-8">
          {tCommon("preferences.sections.jobTypes.empty")}
        </div>
      ) : (
        <div className="rounded-lg border">
          {jobTypes.map((jobType) => (
            <div
              key={jobType.id}
              className="flex items-center justify-between p-4 group hover:bg-accent/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <p className="font-medium">{jobType.type}</p>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(jobType)}
                  aria-label={tCommon("actions.edit")}
                >
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDelete(jobType)}
                  aria-label={tCommon("actions.delete")}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        className="hidden"
        data-add-button
        onClick={() => setIsAddOpen(true)}
        aria-label={tCommon("actions.add")}
      />

      {isAddOpen && (
        <AddJobTypeDialog open={isAddOpen} onOpenChange={setIsAddOpen} />
      )}

      {jobTypeToEdit && (
        <EditJobTypeDialog
          open={!!jobTypeToEdit}
          onOpenChange={(open) => !open && setJobTypeToEdit(null)}
          onSubmit={handleEditSubmit}
          jobType={jobTypeToEdit}
          selectedTypes={jobTypes.map((jt) => jt.type)}
        />
      )}

      {jobTypeToDelete && (
        <DeleteJobTypeDialog
          open={!!jobTypeToDelete}
          onOpenChange={(open) => !open && setJobTypeToDelete(null)}
          onConfirm={handleConfirmDelete}
          jobType={jobTypeToDelete}
        />
      )}
    </>
  );
}
