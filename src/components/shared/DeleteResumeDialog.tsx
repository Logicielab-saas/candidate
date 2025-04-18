/**
 * DeleteResumeDialog - Dialog for confirming resume file deletion
 *
 * Features:
 * - Confirmation dialog for deleting resume files
 * - Loading states
 * - Error handling
 * - Supports both profile and qualifications resume files
 */

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
import type { ResumeFile, Files } from "@/core/interfaces";
import { useDeleteResumeFiles } from "../../features/candidature/(profile)/qualifications/hooks/use-resume-files";
import { useState } from "react";
import { ProfileFiles } from "@/features/candidature/(profile)/common/interface";
import { useTranslations } from "next-intl";

interface DeleteResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: ResumeFile | Files | ProfileFiles;
  source?: "profile" | "qualifications";
}

export function DeleteResumeDialog({
  open,
  onOpenChange,
  file,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  source = "qualifications",
}: DeleteResumeDialogProps) {
  const { mutate: deleteFile, isPending } = useDeleteResumeFiles();
  const [isDeleting, setIsDeleting] = useState(false);
  const tCommon = useTranslations("common");

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    deleteFile(file.uuid, {
      onSuccess: () => {
        setIsDeleting(false);
        onOpenChange(false);
      },
      onError: () => {
        setIsDeleting(false);
      },
    });
  };

  const isLoading = isPending || isDeleting;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!isLoading) {
          onOpenChange(newOpen);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {tCommon("dialogs.confirmation.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {tCommon("warnings.irreversibleAction")}{" "}
            {tCommon("warnings.permanentDelete.resume")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>
            {tCommon("actions.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading
              ? tCommon("actions.deleting")
              : tCommon("actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
