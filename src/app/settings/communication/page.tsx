/**
 * CommunicationSettingsPage - Communication preferences and alert settings
 *
 * Server component that displays various communication settings including
 * job alerts, company alerts, and notification preferences.
 */

import { Separator } from "@/components/ui/separator";
import { AlertSection } from "@/features/settings/communication/components/AlertSection";
import { AlertPreferences } from "@/features/settings/communication/components/AlertPreferences";
import { PrivacyPreferences } from "@/features/settings/communication/components/PrivacyPreferences";
import { getTranslations } from "next-intl/server";

export default async function CommunicationSettingsPage() {
  const t = await getTranslations("settings.communication");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t("page.title")}</h1>
        <p className="text-muted-foreground mt-1">{t("page.description")}</p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium mb-4">{t("alerts.title")}</h2>

          <div className="rounded-lg border border-border">
            <AlertSection
              title={t("alerts.jobAlerts.title")}
              description={t("alerts.jobAlerts.description")}
              href="/settings/communication/job-alerts"
            />
            <Separator />
            <AlertSection
              title={t("alerts.companyAlerts.title")}
              description={t("alerts.companyAlerts.description")}
              href="/settings/communication/company-alerts"
            />
          </div>
        </div>

        <Separator className="my-6" />

        <div>
          <h2 className="text-xl font-medium mb-4">
            {t("notificationPreferences.title")}
          </h2>
          <AlertPreferences />
        </div>

        <Separator className="my-6" />

        <div>
          <h2 className="text-xl font-medium mb-4">{t("privacy.title")}</h2>
          <PrivacyPreferences />
        </div>
      </div>
    </div>
  );
}
