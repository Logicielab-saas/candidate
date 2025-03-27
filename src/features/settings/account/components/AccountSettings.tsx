"use client";

/**
 * AccountActions - Handles critical account operations
 *
 * A client component that provides functionality for logging out
 * and deleting the user account. Uses client-side interactivity
 * for handling these sensitive operations with additional confirmation steps.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { MOCK_USER } from "@/core/mockData/user";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";

const DELETE_CONFIRMATION = "SUPPRIMER MON COMPTE";

export function AccountActions() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [showDeleteError, setShowDeleteError] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const user = MOCK_USER;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      jsCookie.remove("userRole");
      router.replace("/login");

      toast({
        variant: "success",
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de déconnecter",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== DELETE_CONFIRMATION) {
      setShowDeleteError(true);
      return;
    }

    try {
      setIsDeleting(true);
      setShowDeleteError(false);
      // TODO: Implement actual account deletion logic
      console.log("Deleting account:", user.id);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      toast({
        variant: "success",
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès",
      });
      // TODO: Redirect to logout or home page after successful deletion
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer le compte",
      });
      console.error("Account deletion failed:", error);
    } finally {
      setIsDeleting(false);
      setDeleteConfirmation("");
    }
  };

  const handleDeleteDialogOpenChange = (open: boolean) => {
    if (!open) {
      setDeleteConfirmation("");
      setShowDeleteError(false);
    }
  };

  return (
    <Card className="p-6">
      <h4 className="tracking-tight text-lg font-medium mb-4">
        Actions du compte
      </h4>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Déconnexion</p>
            <p className="text-sm text-muted-foreground">
              Déconnectez-vous de votre compte
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full sm:w-auto"
          >
            {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none text-destructive">
              Supprimer le compte
            </p>
            <p className="text-sm text-muted-foreground">
              Supprimez définitivement votre compte et toutes vos données
            </p>
          </div>

          {/* Delete Account Dialog */}
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
                      <Label
                        htmlFor="confirmation"
                        className="text-sm font-medium"
                      >
                        Pour confirmer, écrivez &quot;{DELETE_CONFIRMATION}
                        &quot; ci-dessous :
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
                          Veuillez écrire exactement &quot;{DELETE_CONFIRMATION}
                          &quot; pour confirmer
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
                  disabled={
                    isDeleting || deleteConfirmation !== DELETE_CONFIRMATION
                  }
                >
                  {isDeleting ? "Suppression..." : "Supprimer définitivement"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}
