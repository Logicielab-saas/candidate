/**
 * AlertPreferences - Component for managing notification preferences
 *
 * Displays a list of alert preferences with toggle switches
 * for enabling/disabling different types of notifications.
 */

"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { UserAlertPreferences } from "@/core/interfaces/user-alert.interface";
import { userAlertsPreferences as initialPreferences } from "@/core/mockData/user-alerts";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useTranslations } from "next-intl";

export function AlertPreferences() {
  const [preferences, setPreferences] =
    useState<UserAlertPreferences[]>(initialPreferences);
  const { toast } = useToast();
  const t = useTranslations("settings.communication.notifications");
  const tCommon = useTranslations("common.actions");

  const handleTogglePreference = (id: string, isEnabled: boolean) => {
    setPreferences(
      preferences.map((pref) =>
        pref.id === id ? { ...pref, isEnabled } : pref
      )
    );

    toast({
      variant: "success",
      title: t("toast.toggle.title", {
        state: isEnabled ? tCommon("enabled") : tCommon("disabled"),
      }),
      description: t("toast.toggle.description", {
        state: isEnabled ? tCommon("enabled") : tCommon("disabled"),
      }),
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          {preferences.map((preference, index) => (
            <React.Fragment key={preference.id}>
              <div className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                <div>
                  <h3 className="font-medium">{preference.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {preference.description}
                  </p>
                </div>
                <Switch
                  checked={preference.isEnabled}
                  onCheckedChange={(checked) =>
                    handleTogglePreference(preference.id, checked)
                  }
                  aria-label={t("switch.ariaLabel", {
                    action: preference.isEnabled
                      ? tCommon("disable")
                      : tCommon("enable"),
                    preference: preference.title,
                  })}
                />
              </div>
              {index < preferences.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
