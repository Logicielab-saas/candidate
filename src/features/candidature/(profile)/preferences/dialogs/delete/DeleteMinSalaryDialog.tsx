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
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { type MinSalary } from "../../MinSalarySection";
import { useTranslations } from "next-intl";

interface DeleteMinSalaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
  minSalary: MinSalary;
}

export default function DeleteMinSalaryDialog({
  open,
  onOpenChange,
  onConfirm,
  minSalary,
}: DeleteMinSalaryDialogProps) {
  const tCommon = useTranslations("common");

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {tCommon("dialogs.confirmation.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {tCommon(
              "preferences.sections.minSalary.dialog.delete.description"
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tCommon("actions.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={() => onConfirm(minSalary.id)}
          >
            {tCommon("actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
