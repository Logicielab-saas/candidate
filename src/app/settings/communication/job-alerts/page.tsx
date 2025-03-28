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

export const metadata: Metadata = {
  title: "Alertes d'emploi | Paramètres",
  description:
    "Gérez vos alertes d'emploi pour recevoir des notifications sur les nouvelles offres correspondant à vos critères.",
};

export default function JobAlertsPage() {
  return (
    <div className="space-y-6">
      <div className="shadow rounded-lg p-4 dark:border">
        <Link href="/settings/communication" className={GhostLinkStyle}>
          <ChevronLeft className="h-4 w-4" />
          Retour
        </Link>
        <h2 className="text-2xl font-semibold mb-2">Alertes d&apos;emploi</h2>
        <p className="text-muted-foreground">
          Configurez vos alertes d&apos;emploi pour recevoir des notifications
          lorsque de nouvelles offres correspondant à vos critères sont
          publiées.
        </p>
      </div>

      <JobAlertsList />
    </div>
  );
}
