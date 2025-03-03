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
import { type Message } from "@/core/mockData/messages-data";

interface DeleteMessageDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  messageToDelete: Message | null;
  onConfirm: () => void;
}

export function DeleteMessageDialog({
  isOpen,
  onOpenChange,
  messageToDelete,
  onConfirm,
}: DeleteMessageDialogProps) {
  if (!messageToDelete) return null;

  const recruiter = messageToDelete.participants.find(
    (p) => p.role === "Recruteur"
  );

  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer la conversation</AlertDialogTitle>
          <AlertDialogDescription>
            Êtes-vous sûr de vouloir supprimer cette conversation avec{" "}
            <span className="font-medium">{messageToDelete.company.name}</span>
            {recruiter && (
              <>
                {" "}
                concernant le poste de{" "}
                <span className="font-medium">
                  {messageToDelete.job.name}
                </span>{" "}
                ?
              </>
            )}
            <br />
            <br />
            Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
