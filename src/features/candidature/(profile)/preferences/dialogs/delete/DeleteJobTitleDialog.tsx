"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { type JobTitle } from "../../JobTitleSection";
import { useTranslations } from "next-intl";

interface DeleteJobTitleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
  jobTitle: JobTitle;
}

export default function DeleteJobTitleDialog({
  open,
  onOpenChange,
  onConfirm,
  jobTitle,
}: DeleteJobTitleDialogProps) {
  const tCommon = useTranslations("common");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {tCommon("preferences.sections.jobTitles.dialog.delete.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {tCommon(
              "preferences.sections.jobTitles.dialog.delete.description"
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tCommon("actions.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            onClick={() => onConfirm(jobTitle.id)}
          >
            {tCommon("preferences.sections.jobTitles.dialog.delete.action")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
