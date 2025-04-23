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
import type { ResumeLanguage } from "@/core/interfaces";
import { useDeleteResumeLanguage } from "../../hooks/use-resume-language";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface DeleteLanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: ResumeLanguage;
}

export function DeleteLanguageDialog({
  open,
  onOpenChange,
  language,
}: DeleteLanguageDialogProps) {
  const t = useTranslations("resumePage.languages.dialog.delete");
  const tCommon = useTranslations("common");

  const { mutate: deleteLanguage, isPending } =
    useDeleteResumeLanguage(tCommon);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    deleteLanguage(language.uuid, {
      onSuccess: () => {
        setIsDeleting(false);
        onOpenChange(false);
      },
      onError: (_error) => {
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
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("descriptionStart")} &quot;
            <span className="font-bold">{language.name}</span>&quot;{" "}
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
