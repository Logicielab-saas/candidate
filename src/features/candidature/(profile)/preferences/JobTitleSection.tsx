"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const AddJobTitleDialog = dynamic(
  () => import("./dialogs/add/AddJobTitleDialog"),
  { ssr: false }
);

const EditJobTitleDialog = dynamic(
  () => import("./dialogs/edit/EditJobTitleDialog"),
  { ssr: false }
);

const DeleteJobTitleDialog = dynamic(
  () => import("./dialogs/delete/DeleteJobTitleDialog"),
  { ssr: false }
);

export interface JobTitle {
  id: string;
  title: string;
}

export function JobTitleSection() {
  const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [jobTitleToEdit, setJobTitleToEdit] = useState<JobTitle | null>(null);
  const [jobTitleToDelete, setJobTitleToDelete] = useState<JobTitle | null>(
    null
  );
  const tCommon = useTranslations("common");

  const handleAdd = () => {
    setIsAddOpen(true);
  };

  const handleEdit = (jobTitle: JobTitle) => {
    setJobTitleToEdit(jobTitle);
  };

  const handleDelete = (jobTitle: JobTitle) => {
    setJobTitleToDelete(jobTitle);
  };

  const handleSubmit = (values: { title: string }) => {
    const newJobTitle: JobTitle = {
      id: crypto.randomUUID(),
      title: values.title,
    };
    setJobTitles([...jobTitles, newJobTitle]);
  };

  const handleEditSubmit = (id: string, values: Omit<JobTitle, "id">) => {
    setJobTitles(
      jobTitles.map((jobTitle) =>
        jobTitle.id === id
          ? {
              ...values,
              id,
            }
          : jobTitle
      )
    );
    setJobTitleToEdit(null);
  };

  const handleConfirmDelete = (id: string) => {
    setJobTitles(jobTitles.filter((title) => title.id !== id));
    setJobTitleToDelete(null);
  };

  return (
    <>
      {!jobTitles?.length ? (
        <div className="text-center text-muted-foreground py-8">
          {tCommon("preferences.sections.jobTitles.empty")}
        </div>
      ) : (
        <div className="rounded-lg border divide-y">
          {jobTitles.map((jobTitle) => (
            <div
              key={jobTitle.id}
              className="flex items-center justify-between p-4 group hover:bg-accent/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <p className="font-medium">{jobTitle.title}</p>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(jobTitle)}
                >
                  <Pencil className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleDelete(jobTitle)}
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
        onClick={handleAdd}
        aria-label={tCommon("preferences.sections.jobTitles.add")}
      />
      {isAddOpen && (
        <AddJobTitleDialog
          open={isAddOpen}
          onOpenChange={setIsAddOpen}
          onSubmit={handleSubmit}
        />
      )}

      {jobTitleToEdit && (
        <EditJobTitleDialog
          open={!!jobTitleToEdit}
          onOpenChange={(open) => !open && setJobTitleToEdit(null)}
          onSubmit={handleEditSubmit}
          jobTitle={jobTitleToEdit}
        />
      )}

      {jobTitleToDelete && (
        <DeleteJobTitleDialog
          open={!!jobTitleToDelete}
          onOpenChange={(open) => !open && setJobTitleToDelete(null)}
          onConfirm={handleConfirmDelete}
          jobTitle={jobTitleToDelete}
        />
      )}
    </>
  );
}
