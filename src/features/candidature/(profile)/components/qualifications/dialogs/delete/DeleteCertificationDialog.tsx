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
import { useToast } from "@/hooks/use-toast";
import type { Certification } from "@/core/interfaces/";

interface DeleteCertificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
  certification: Certification;
}

export function DeleteCertificationDialog({
  open,
  onOpenChange,
  onConfirm,
  certification,
}: DeleteCertificationDialogProps) {
  const { toast } = useToast();

  const handleConfirm = () => {
    onConfirm(certification.id);
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Certification supprimée",
      description: "La certification a été supprimée avec succès.",
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer la certification &quot;
            {certification.name}&quot; . Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
