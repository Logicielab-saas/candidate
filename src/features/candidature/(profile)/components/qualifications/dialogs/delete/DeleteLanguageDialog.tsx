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
import type { Language } from "@/core/interfaces/";

interface DeleteLanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => void;
  language: Language;
}

export function DeleteLanguageDialog({
  open,
  onOpenChange,
  onConfirm,
  language,
}: DeleteLanguageDialogProps) {
  const { toast } = useToast();

  const handleConfirm = () => {
    onConfirm(language.id);
    onOpenChange(false);
    toast({
      variant: "success",
      title: "Langue supprimée",
      description: "La langue a été supprimée avec succès.",
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer la langue &quot;{language.name}
            &quot;. Cette action est irréversible.
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
