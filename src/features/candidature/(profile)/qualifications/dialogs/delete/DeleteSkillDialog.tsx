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
import type { ResumeSkill } from "@/core/interfaces/";
import { useDeleteResumeSkill } from "../../hooks/use-resume-skill";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface DeleteSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  skill: ResumeSkill;
}

export function DeleteSkillDialog({
  open,
  onOpenChange,
  skill,
}: DeleteSkillDialogProps) {
  const t = useTranslations("resumePage.skills.dialog.delete");
  const tCommon = useTranslations("common");

  const { mutate: deleteSkill, isPending } = useDeleteResumeSkill(tCommon);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        deleteSkill(skill.uuid, {
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
            {t("descriptionStart")} &quot;
            <span className="font-bold">{skill.resumeskill_name}</span>
            &quot; {t("warning")}
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
