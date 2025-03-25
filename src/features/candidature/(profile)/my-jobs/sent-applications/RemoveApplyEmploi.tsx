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
import { useState } from "react";
import { useDeleteSentApplication } from "../hooks/use-my-applied-jobs";

interface RemoveApplyEmploiProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  emploi_uuid: string;
  emploi_title: string;
}

export function RemoveApplyEmploi({
  open,
  onOpenChange,
  emploi_uuid,
  emploi_title,
}: RemoveApplyEmploiProps) {
  const { mutate: deleteApplied, isPending } = useDeleteSentApplication();
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

  const handleConfirm = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      await new Promise<void>((resolve, reject) => {
        deleteApplied(emploi_uuid, {
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
          "Une erreur est survenue lors de la suppression de la candidature.",
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
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir retirer votre candidature ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Vous êtes sur le point de retirer votre candidature pour &quot;
            <span className="font-bold text-primaryHex-700">
              {emploi_title}
            </span>
            &quot;. Cette action est irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive hover:bg-destructive/90"
            disabled={isLoading}
          >
            {isLoading ? "Suppression..." : "Retirer la candidature"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
