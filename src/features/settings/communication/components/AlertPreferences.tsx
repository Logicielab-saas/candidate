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

export function AlertPreferences() {
  const [preferences, setPreferences] =
    useState<UserAlertPreferences[]>(initialPreferences);
  const { toast } = useToast();

  const handleTogglePreference = (id: string, isEnabled: boolean) => {
    setPreferences(
      preferences.map((pref) =>
        pref.id === id ? { ...pref, isEnabled } : pref
      )
    );

    toast({
      variant: "success",
      title: isEnabled ? "Notification activée" : "Notification désactivée",
      description: `Les notifications ont été ${
        isEnabled ? "activées" : "désactivées"
      } avec succès.`,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          {preferences.map((preference) => (
            <div
              key={preference.id}
              className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
            >
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
                aria-label={
                  preference.isEnabled
                    ? `Désactiver ${preference.title}`
                    : `Activer ${preference.title}`
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
