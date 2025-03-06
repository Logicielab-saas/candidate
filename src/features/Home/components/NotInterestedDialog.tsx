/**
 * NotInterestedDialog - Alert dialog for confirming "Not Interested" action
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

interface NotInterestedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  onConfirm: (jobId: string) => void;
}

export function NotInterestedDialog({
  open,
  onOpenChange,
  jobId,
  onConfirm,
}: NotInterestedDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmer votre choix</AlertDialogTitle>
          <AlertDialogDescription>
            Cette offre ne sera plus visible dans votre flux principal. Vous
            pouvez toujours la retrouver dans vos paramètres.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm(jobId)}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
