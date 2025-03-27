/**
 * AccountInfo - Displays user account information with modification options
 *
 * A server component that renders user account details including account type,
 * email, phone number, and password, with buttons to modify each field.
 */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { InfoItem } from "./InfoItem";
import { useProfile } from "@/features/candidature/(profile)/hooks/use-profile";
import { EmailChangeDialog } from "./EmailChangeDialog";
import { PhoneChangeDialog } from "./PhoneChangeDialog";
import { PasswordChangeDialog } from "./PasswordChangeDialog";
import { AccountInfoSkeleton } from "../skeletons/AccountInfoSkeleton";

export function AccountInfo() {
  const { data: profile, isLoading } = useProfile();
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  if (isLoading) {
    return <AccountInfoSkeleton />;
  }

  if (!profile) {
    return null;
  }

  const handleEmailChange = async (newEmail: string) => {
    try {
      setIsUpdating(true);
      // TODO: Implement actual email change logic
      console.log("Changing email to:", newEmail);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      toast({
        variant: "success",
        title: "Adresse email modifiée avec succès",
        description: "Votre adresse email a été modifiée avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Échec de la modification de l'email",
        description:
          "Une erreur est survenue lors de la modification de votre adresse email",
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = async (_newPassword: string) => {
    try {
      setIsUpdating(true);
      // TODO: Implement actual password change logic
      console.log("Changing password...");
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay
      toast({
        variant: "success",
        title: "Mot de passe modifié avec succès",
        description: "Votre mot de passe a été modifié avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Échec de la modification du mot de passe",
        description:
          "Une erreur est survenue lors de la modification de votre mot de passe",
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card className="p-6">
      <h4 className="tracking-tight text-lg font-medium mb-4">
        Informations du compte
      </h4>
      <div className="divide-y">
        <InfoItem
          label="Type de compte"
          value="Employee"
          showChangeButton={false}
        />
        <InfoItem
          label="Email"
          value={profile.email}
          changeButton={
            <EmailChangeDialog
              currentEmail={profile.email}
              onEmailChange={handleEmailChange}
              trigger={
                <Button variant="outline" size="sm" disabled={isUpdating}>
                  Changer
                </Button>
              }
            />
          }
        />
        <InfoItem
          label="Numéro de téléphone"
          value={profile.phone || "Non renseigné"}
          changeButton={
            <PhoneChangeDialog
              currentPhone={profile.phone || ""}
              trigger={
                <Button variant="outline" size="sm" disabled={isUpdating}>
                  Changer
                </Button>
              }
            />
          }
        />
        <InfoItem
          label="Mot de passe"
          value="••••••••"
          changeButton={
            <PasswordChangeDialog
              onPasswordChange={handlePasswordChange}
              trigger={
                <Button variant="outline" size="sm" disabled={isUpdating}>
                  Changer
                </Button>
              }
            />
          }
        />
      </div>
    </Card>
  );
}
