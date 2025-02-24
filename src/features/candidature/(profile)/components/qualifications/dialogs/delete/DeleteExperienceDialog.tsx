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
import { type Experience } from "@/core/types/experience";

interface DeleteExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
  experience: Experience;
}

export function DeleteExperienceDialog({
  open,
  onOpenChange,
  onConfirm,
  experience,
}: DeleteExperienceDialogProps) {
  const { toast } = useToast();

  const handleConfirm = () => {
    onConfirm(experience.id);
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Expérience supprimée",
      description: "L'expérience a été supprimée avec succès.",
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer l&apos;expérience suivante :{" "}
            <span className="font-medium">{experience.title}</span> chez{" "}
            <span className="font-medium">{experience.company}</span>.
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
