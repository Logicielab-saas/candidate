/**
 * DeleteAccountDialog - Dialog for account deletion confirmation
 *
 * A client component that provides a confirmation dialog for account deletion,
 * requiring the user to type a specific phrase to confirm the irreversible action.
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DELETE_CONFIRMATION = "SUPPRIMER MON COMPTE";

interface DeleteAccountDialogProps {
  onDelete: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteAccountDialog({
  onDelete,
  isDeleting,
}: DeleteAccountDialogProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showDeleteError, setShowDeleteError] = useState(false);

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== DELETE_CONFIRMATION) {
      setShowDeleteError(true);
      return;
    }

    await onDelete();
  };

  const handleDeleteDialogOpenChange = (open: boolean) => {
    if (!open) {
      setDeleteConfirmation("");
      setShowDeleteError(false);
    }
  };

  return (
    <AlertDialog onOpenChange={handleDeleteDialogOpenChange}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={isDeleting}
          className="w-full sm:w-auto"
        >
          Supprimer le compte
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Êtes-vous sûr de vouloir supprimer votre compte ?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <span className="block">
                Cette action est irréversible. Toutes vos données seront
                définitivement supprimées.
              </span>
              <div className="space-y-2">
                <Label htmlFor="confirmation" className="text-sm font-medium">
                  Pour confirmer, écrivez &quot;{DELETE_CONFIRMATION}&quot;
                  ci-dessous :
                </Label>
                <Input
                  id="confirmation"
                  value={deleteConfirmation}
                  onChange={(e) => {
                    setDeleteConfirmation(e.target.value);
                    setShowDeleteError(false);
                  }}
                  className={showDeleteError ? "border-destructive" : ""}
                  placeholder={DELETE_CONFIRMATION}
                />
                {showDeleteError && (
                  <span className="block text-sm text-destructive">
                    Veuillez écrire exactement &quot;{DELETE_CONFIRMATION}&quot;
                    pour confirmer
                  </span>
                )}
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            className="bg-destructive hover:bg-destructive/90 disabled:opacity-50"
            disabled={isDeleting || deleteConfirmation !== DELETE_CONFIRMATION}
          >
            {isDeleting ? "Suppression..." : "Supprimer définitivement"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
