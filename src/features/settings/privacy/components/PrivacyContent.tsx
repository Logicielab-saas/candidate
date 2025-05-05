/**
 * PrivacyContent - Component for displaying all privacy sections
 *
 * Server component that combines all privacy-related sections
 * into a single cohesive view.
 */

import { Button } from "@/components/ui/button";
import { PrivacySection } from "./PrivacySection";
import { FileDown, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export function PrivacyContent() {
  const t = useTranslations("settings.privacyPage");

  return (
    <div className="space-y-6">
      <PrivacySection title={t("dataTypes.title")}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("dataTypes.description")}
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>{t("dataTypes.items.profile")}</li>
            <li>{t("dataTypes.items.resume")}</li>
            <li>{t("dataTypes.items.preferences")}</li>
            <li>{t("dataTypes.items.history")}</li>
          </ul>
        </div>
      </PrivacySection>

      <PrivacySection title={t("dataUsage.title")}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("dataUsage.description")}
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>{t("dataUsage.items.personalization")}</li>
            <li>{t("dataUsage.items.improvement")}</li>
            <li>{t("dataUsage.items.communication")}</li>
          </ul>
        </div>
      </PrivacySection>

      <PrivacySection title={t("cookies.title")}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("cookies.description")}
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>{t("cookies.items.session")}</li>
            <li>{t("cookies.items.preferences")}</li>
            <li>{t("cookies.items.analytics")}</li>
          </ul>
        </div>
      </PrivacySection>

      <PrivacySection title={t("dataAccess.title")}>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {t("dataAccess.description")}
          </p>
          <div className="flex gap-4">
            <Button variant="outline" size="sm">
              <FileDown className="h-4 w-4 mr-2" />
              {t("dataAccess.actions.download")}
            </Button>
            <Button variant="destructive" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              {t("dataAccess.actions.delete")}
            </Button>
          </div>
        </div>
      </PrivacySection>
    </div>
  );
}
