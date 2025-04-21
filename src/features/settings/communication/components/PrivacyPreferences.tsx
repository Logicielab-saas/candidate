/**
 * PrivacyPreferences - Component for managing privacy settings
 *
 * Displays privacy settings with toggle switches for
 * controlling online status visibility and read receipts.
 */

"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { privacyPreferences as initialPrivacySettings } from "@/core/mockData/user-alerts";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from 'next-intl';

export function PrivacyPreferences() {
  const [privacySettings, setPrivacySettings] = useState(
    initialPrivacySettings
  );
  const { toast } = useToast();
  const t = useTranslations('settings.communication.privacy');
  const tCommon = useTranslations('common.actions');

  const handleToggleSetting = (id: string, isEnabled: boolean) => {
    setPrivacySettings(
      privacySettings.map((setting) =>
        setting.id === id ? { ...setting, isEnabled } : setting
      )
    );

    toast({
      variant: "success",
      title: t('toast.toggle.title'),
      description: t('toast.toggle.description'),
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          {privacySettings.map((setting, index) => (
            <React.Fragment key={setting.id}>
              <div
                key={setting.id}
                className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
              >
                <div>
                  <h3 className="font-medium">{setting.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {setting.description}
                  </p>
                </div>
                <Switch
                  checked={setting.isEnabled}
                  onCheckedChange={(checked) =>
                    handleToggleSetting(setting.id, checked)
                  }
                  aria-label={t('switch.ariaLabel', {
                    action: setting.isEnabled ? tCommon('disable') : tCommon('enable'),
                    setting: setting.title
                  })}
                />
              </div>
              {index < privacySettings.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
