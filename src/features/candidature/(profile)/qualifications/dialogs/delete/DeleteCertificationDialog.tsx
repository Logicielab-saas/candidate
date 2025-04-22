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
import type { ResumeCertifications } from "@/core/interfaces";
import { useDeleteResumeCertification } from "../../hooks/use-resume-certification";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface DeleteCertificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certification: ResumeCertifications;
}

export function DeleteCertificationDialog({
  open,
  onOpenChange,
  certification,
}: DeleteCertificationDialogProps) {
  const { mutate: deleteCertification, isPending } =
    useDeleteResumeCertification();
  const [isDeleting, setIsDeleting] = useState(false);

  const t = useTranslations("resumePage.certifications.dialog.delete");
  const tCommon = useTranslations("common");

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        deleteCertification(certification.uuid, {
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

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("descriptionStart")}:{" "}
            <span className="font-bold">{certification.name}</span>{" "}
            {t("warning")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>
            {tCommon("actions.cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isPending || isDeleting}
          >
            {isDeleting
              ? tCommon("actions.deleting")
              : tCommon("actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
