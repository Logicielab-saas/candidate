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
import { useState } from "react";
import { useDeleteSentApplication } from "../hooks/use-my-applied-jobs";
import { useTranslations } from "next-intl";

interface RemoveApplyEmploiProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  emploi_uuid: string;
  emploi_title: string;
}

export function RemoveApplyEmploi({
  open,
  onOpenChange,
  emploi_uuid,
  emploi_title,
}: RemoveApplyEmploiProps) {
  const t = useTranslations("myJobsPage.removeApplyDialog");
  const tCommon = useTranslations("common");

  const { mutate: deleteApplied, isPending } = useDeleteSentApplication();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        deleteApplied(emploi_uuid, {
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
            {t("description")}
            <span className="font-bold text-primaryHex-700">
              &quot;{emploi_title}&quot;
            </span>
            {t("description2")}
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
              : tCommon("actions.removeApply")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
