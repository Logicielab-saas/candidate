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
import { useTranslations } from "next-intl";
import { logout } from "@/features/auth/services/logout";

// Dynamic import of DeleteAccountDialog with loading fallback
const DeleteAccountDialog = dynamic(
  () => import("./DeleteAccountDialog").then((mod) => mod.DeleteAccountDialog),
  {
    ssr: false,
  }
);

export function AccountSettings() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { toast } = useToast();
  const t = useTranslations("settings.account.accountSettings");
  const tCommon = useTranslations("common");

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();

      window.location.href = "/login";

      toast({
        variant: "success",
        title: tCommon("toast.success.title"),
        description: tCommon("toast.success.description"),
      });
    } catch (_error) {
      toast({
        variant: "destructive",
        title: tCommon("toast.error.title"),
        description: tCommon("toast.error.description"),
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
            <p className="text-sm font-medium leading-none">
              {tCommon("actions.logout")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("logoutFromAccount")}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full sm:w-auto"
          >
            {isLoggingOut
              ? tCommon("actions.loggingOut")
              : tCommon("actions.logout")}
          </Button>
        </div>

        <Separator />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none text-destructive">
              {t("deleteAccountLabel")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("deleteAccountDescription")}
            </p>
          </div>

          <DeleteAccountDialog />
        </div>
      </div>
    </Card>
  );
}
