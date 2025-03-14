"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AddJobTypeDialog } from "./dialogs/add/AddJobTypeDialog";
import { EditJobTypeDialog } from "./dialogs/edit/EditJobTypeDialog";
import { DeleteJobTypeDialog } from "./dialogs/delete/DeleteJobTypeDialog";
import { ContractType } from "@/core/enums/contract-type.enum";

export interface JobType {
  id: string;
  type: ContractType;
}

export function JobTypesSection() {
  const [jobTypes, setJobTypes] = useState<JobType[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [jobTypeToEdit, setJobTypeToEdit] = useState<JobType | null>(null);
  const [jobTypeToDelete, setJobTypeToDelete] = useState<JobType | null>(null);

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleEdit = (jobType: JobType) => {
    setJobTypeToEdit(jobType);
  };

  const handleDelete = (jobType: JobType) => {
    setJobTypeToDelete(jobType);
  };

  const handleSubmit = (values: { type: ContractType }) => {
    const newJobType: JobType = {
      id: crypto.randomUUID(),
      type: values.type,
    };
    setJobTypes([...jobTypes, newJobType]);
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
          Aucun type de poste ajouté
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
                >
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDelete(jobType)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="hidden" data-add-button onClick={handleAdd} />

      <AddJobTypeDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubmit={handleSubmit}
        selectedTypes={jobTypes.map((jt) => jt.type)}
      />

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
