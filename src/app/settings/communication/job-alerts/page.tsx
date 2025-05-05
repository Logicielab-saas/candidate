/**
 * JobAlertsPage - Page for managing job alerts
 *
 * Allows users to view, create, edit, and delete their job alerts
 * with preferences for job title, location, and salary.
 */

import { Metadata } from "next";
import { JobAlertsList } from "@/features/settings/communication/components/JobAlertsList";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { GhostLinkStyle } from "@/core/styles/links";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Alertes d'emploi | Paramètres",
  description:
    "Gérez vos alertes d'emploi pour recevoir des notifications sur les nouvelles offres correspondant à vos critères.",
};

export default async function JobAlertsPage() {
  const t = await getTranslations("settings.communication.jobAlerts");
  const tCommon = await getTranslations("common.actions");
  return (
    <div className="space-y-6">
      <div className="shadow rounded-lg p-4 dark:border">
        <Link href="/settings/communication" className={GhostLinkStyle}>
          <ChevronLeft className="h-4 w-4" />
          {tCommon("back")}
        </Link>
        <h2 className="text-2xl font-semibold mb-2">{t("title")}</h2>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <JobAlertsList />
    </div>
  );
}
