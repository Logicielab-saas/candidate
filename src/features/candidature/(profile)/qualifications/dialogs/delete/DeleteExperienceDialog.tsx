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
import type { ResumeExperience } from "@/core/interfaces/";
import { useDeleteResumeExperience } from "../../hooks/use-resume-experience";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DeleteExperienceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: ResumeExperience;
}

export function DeleteExperienceDialog({
  open,
  onOpenChange,
  experience,
}: DeleteExperienceDialogProps) {
  const { mutate: deleteExperience, isPending } = useDeleteResumeExperience();
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        deleteExperience(experience.uuid, {
          onSuccess: () => {
            resolve();
          },
          onError: (error) => {
            reject(error);
          },
        });
      });

      setIsDeleting(false);
      onOpenChange(false);
    } catch (_error) {
      setIsDeleting(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description:
          _error instanceof Error
            ? _error.message
            : "Une erreur est survenue lors de la suppression de l'expérience.",
      });
    }
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
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de supprimer l&apos;expérience:{" "}
            <span className="font-bold">{experience.job_title}</span> à{" "}
            <span className="font-bold">{experience.company_name}</span>.
            <br />
            Cette action ne peut être annulée.
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
