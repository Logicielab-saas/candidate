/**
 * DeleteAccountDialog - Dialog for account deletion confirmation
 *
 * A client component that provides a confirmation dialog for account deletion,
 * requiring password verification and confirmation phrase before deletion.
 * Handles the complete deletion flow including verification, deletion, and redirect.
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
import { useVerifyPassword } from "../hooks/use-verify-password";
import { useDeleteAccount } from "../hooks/use-delete-account";
import { logout } from "@/features/auth/services/logout";
import { useToast } from "@/hooks/use-toast";

const DELETE_CONFIRMATION = "SUPPRIMER MON COMPTE";

export function DeleteAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [showDeleteError, setShowDeleteError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();
  const { mutateAsync: verifyPassword, isPending: isVerifying } =
    useVerifyPassword();
  const { deleteAccount, isPending: isDeletingAccount } = useDeleteAccount();

  const handleDeleteAccount = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (deleteConfirmation !== DELETE_CONFIRMATION) {
      setShowDeleteError(true);
      return;
    }

    if (!password.trim()) {
      setShowPasswordError(true);
      return;
    }

    try {
      setIsDeleting(true);

      // First verify the password
      await verifyPassword(password);

      // If password verification succeeds, proceed with account deletion
      deleteAccount({
        password,
        email: "", // This will be filled from the backend context
        token_device: "", // This will be handled by the backend
      });

      toast({
        variant: "success",
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès",
      });

      // Use the auth service's logout function to handle cleanup and redirect
      await logout();
    } catch (error) {
      console.error("Failed to delete account:", error);
      // Error handling is managed by the hooks, but we'll reset the deleting state
      setIsDeleting(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    // Prevent closing if we're in the middle of an operation
    if (isVerifying || isDeletingAccount || isDeleting) {
      return;
    }

    setIsOpen(open);
    if (!open) {
      setDeleteConfirmation("");
      setPassword("");
      setShowDeleteError(false);
      setShowPasswordError(false);
    }
  };

  const isLoading = isVerifying || isDeletingAccount || isDeleting;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full sm:w-auto">
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
                <Label htmlFor="password" className="text-sm font-medium">
                  Entrez votre mot de passe pour confirmer :
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setShowPasswordError(false);
                  }}
                  className={showPasswordError ? "border-destructive" : ""}
                  placeholder="Votre mot de passe"
                  disabled={isLoading}
                />
                {showPasswordError && (
                  <span className="block text-sm text-destructive">
                    Veuillez entrer votre mot de passe
                  </span>
                )}
              </div>
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
                  disabled={isLoading}
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
          <AlertDialogCancel disabled={isLoading}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            className="bg-destructive hover:bg-destructive/90 disabled:opacity-50"
            disabled={
              isLoading ||
              deleteConfirmation !== DELETE_CONFIRMATION ||
              !password.trim()
            }
          >
            {isLoading ? "Suppression..." : "Supprimer définitivement"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
