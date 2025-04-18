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
import { ContractType } from "@/core/enums/contract-type.enum";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface DeleteJobTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
  jobType: {
    id: string;
    type: ContractType;
  };
}

export function DeleteJobTypeDialog({
  open,
  onOpenChange,
  onConfirm,
  jobType,
}: DeleteJobTypeDialogProps) {
  const { toast } = useToast();
  const tCommon = useTranslations("common");

  const handleConfirm = () => {
    onConfirm(jobType.id);
    onOpenChange(false);
    toast({
      variant: "success",
      title: tCommon("preferences.sections.jobTypes.dialog.delete.title"),
      description: tCommon(
        "preferences.sections.jobTypes.dialog.delete.description"
      ),
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {tCommon("dialogs.confirmation.title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {tCommon("preferences.sections.jobTypes.dialog.delete.description")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tCommon("actions.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={handleConfirm}
          >
            {tCommon("actions.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
