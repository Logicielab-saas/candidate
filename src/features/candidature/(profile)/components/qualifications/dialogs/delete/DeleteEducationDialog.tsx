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
import { Education } from "@/core/interfaces/";

interface DeleteEducationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
  education: Education;
}

export function DeleteEducationDialog({
  open,
  onOpenChange,
  onConfirm,
  education,
}: DeleteEducationDialogProps) {
  const { toast } = useToast();

  const handleConfirm = () => {
    onConfirm(education.id);
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Formation supprimée",
      description: "La formation a été supprimée avec succès.",
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer la formation suivante :{" "}
            <span className="font-medium">{education.degree}</span> à{" "}
            <span className="font-medium">{education.school}</span>.
            <br />
            Cette action est irréversible.
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
