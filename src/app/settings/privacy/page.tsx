/**
 * PrivacySettingsPage - Page for managing privacy settings
 *
 * Server component that displays various privacy settings and
 * data management options for the user's account.
 */

import { Separator } from "@/components/ui/separator";
import { PrivacyContent } from "@/features/settings/privacy/components/PrivacyContent";
import { useTranslations } from "next-intl";

export default function PrivacySettingsPage() {
  const t = useTranslations("settings.privacyPage");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold"> {t("title")} </h1>
        <p className="text-muted-foreground mt-1"> {t("description")} </p>
      </div>

      <Separator className="my-6" />

      <PrivacyContent />
    </div>
  );
}
