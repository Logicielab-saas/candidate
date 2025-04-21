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
import { useTranslations } from "next-intl";

export function AccountInfo() {
  const { data: profile, isLoading } = useProfile();
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();
  const t = useTranslations("settings.account.info");
  const tCommon = useTranslations("common");

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

  return (
    <Card className="p-6">
      <h4 className="tracking-tight text-lg font-medium mb-4">{t("title")}</h4>
      <div className="divide-y">
        <InfoItem
          label={t("accountType")}
          value={profile.type_user}
          showChangeButton={false}
        />
        <InfoItem
          label={t("email")}
          value={profile.email}
          changeButton={
            <EmailChangeDialog
              currentEmail={profile.email}
              onEmailChange={handleEmailChange}
              trigger={
                <Button variant="outline" size="sm" disabled={isUpdating}>
                  {tCommon("actions.change")}
                </Button>
              }
            />
          }
        />
        <InfoItem
          label={t("phone")}
          value={profile.phone || t("phoneNotSet")}
          changeButton={
            <PhoneChangeDialog
              currentPhone={profile.phone || ""}
              trigger={
                <Button variant="outline" size="sm" disabled={isUpdating}>
                  {tCommon("actions.change")}
                </Button>
              }
            />
          }
        />
        <InfoItem
          label={tCommon("password")}
          value={tCommon("passwordMask")}
          changeButton={
            <PasswordChangeDialog
              trigger={
                <Button variant="outline" size="sm" disabled={isUpdating}>
                  {tCommon("actions.change")}
                </Button>
              }
            />
          }
        />
      </div>
    </Card>
  );
}
