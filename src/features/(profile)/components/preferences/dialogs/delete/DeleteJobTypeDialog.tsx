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

  const handleConfirm = () => {
    onConfirm(jobType.id);
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Type de poste supprimé",
      description: "Le type de poste a été supprimé avec succès.",
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action ne peut pas être annulée. Ce type de poste sera
            supprimé définitivement de votre profil.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            onClick={handleConfirm}
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
