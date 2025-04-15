"use client";

/**
 * AccountSettings - Handles critical account operations
 *
 * A client component that provides functionality for logging out
 * and deleting the user account. Uses client-side interactivity
 * for handling these sensitive operations with additional confirmation steps.
 */

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import jsCookie from "js-cookie";
import { useRouter } from "next/navigation";

// Dynamic import of DeleteAccountDialog with loading fallback
const DeleteAccountDialog = dynamic(
  () => import("./DeleteAccountDialog").then((mod) => mod.DeleteAccountDialog),
  {
    ssr: false,
  }
);

export function AccountSettings() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

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

          <DeleteAccountDialog />
        </div>
      </div>
    </Card>
  );
}
