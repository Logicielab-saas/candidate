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
import type { ResumeLanguage } from "@/core/interfaces";
import { useDeleteResumeLanguage } from "../../hooks/use-resume-language";
import { useState } from "react";

interface DeleteLanguageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: ResumeLanguage;
}

export function DeleteLanguageDialog({
  open,
  onOpenChange,
  language,
}: DeleteLanguageDialogProps) {
  const { mutate: deleteLanguage, isPending } = useDeleteResumeLanguage();
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    deleteLanguage(language.uuid, {
      onSuccess: () => {
        setIsDeleting(false);
        onOpenChange(false);
        toast({
          variant: "success",
          title: "Langue supprimée",
          description: "La langue a été supprimée avec succès.",
        });
      },
      onError: (error) => {
        setIsDeleting(false);
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            error instanceof Error
              ? error.message
              : "La langue n'a pas été supprimée.",
        });
      },
    });
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
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer la langue &quot;
            {language.name}&quot;. Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
