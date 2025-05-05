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
import type { ResumeEducation } from "@/core/interfaces/";
import { useDeleteResumeEducation } from "../../hooks/use-resume-education";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface DeleteEducationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  education: ResumeEducation;
}

export function DeleteEducationDialog({
  open,
  onOpenChange,
  education,
}: DeleteEducationDialogProps) {
  const t = useTranslations("resumePage.education.dialog.delete");
  const tCommon = useTranslations("common");

  const { mutate: deleteEducation, isPending } =
    useDeleteResumeEducation(tCommon);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        deleteEducation(education.uuid, {
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
            {t("descriptionStart")}:{" "}
            <span className="font-bold">{education.degree}</span>{" "}
            {tCommon("at")} <span className="font-bold">{education.title}</span>
            .
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
