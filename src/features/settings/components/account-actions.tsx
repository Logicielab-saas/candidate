"use client";

/**
 * AccountActions - Handles critical account operations
 *
 * A client component that provides functionality for logging out
 * and deleting the user account. Uses client-side interactivity
 * for handling these sensitive operations.
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
import { MOCK_USER } from "@/core/mockData/user";

export function AccountActions() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const user = MOCK_USER;

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      // TODO: Implement actual logout logic
      console.log("Logging out user:", user.id);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      // TODO: Implement actual account deletion logic
      console.log("Deleting account:", user.id);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
    } catch (error) {
      console.error("Account deletion failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="p-6">
      <h4 className="text-sm font-medium mb-4">Actions du compte</h4>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
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
          >
            {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none text-destructive">
              Supprimer le compte
            </p>
            <p className="text-sm text-muted-foreground">
              Supprimez définitivement votre compte et toutes vos données
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={isDeleting}>
                Supprimer le compte
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Êtes-vous sûr de vouloir supprimer votre compte ?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action est irréversible. Toutes vos données seront
                  définitivement supprimées.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive hover:bg-destructive/90"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Suppression..." : "Supprimer"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
}
