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
import type { ResumeExperience } from "@/core/interfaces/";
import { useDeleteResumeExperience } from "../../hooks/use-resume-experience";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface DeleteExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: ResumeExperience;
}

export function DeleteExperienceDialog({
  open,
  onOpenChange,
  experience,
}: DeleteExperienceDialogProps) {
  const t = useTranslations("resumePage.workExperience.dialog.delete");
  const tCommon = useTranslations("common");
  const { mutate: deleteExperience, isPending } = useDeleteResumeExperience();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        deleteExperience(experience.uuid, {
          onSuccess: () => {
            resolve();
          },
          onError: (error) => {
            reject(error);
          },
        });
      });

      setIsDeleting(false);
      onOpenChange(false);
    } catch (_error) {
      setIsDeleting(false);
    }
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
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("descriptionStart")}{" "}
            <span className="font-bold">{experience.job_title}</span>{" "}
            {tCommon("at")}{" "}
            <span className="font-bold">{experience.company_name}</span>.
            <br />
            {t("warning")}
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
