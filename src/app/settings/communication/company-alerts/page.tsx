/**
 * CompanyAlertsPage - Company alerts settings and management
 *
 * Server component that displays company alert preferences and settings.
 * Users can manage their company alert criteria and notification preferences.
 */

import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CompanyAlertsList } from "@/features/settings/communication/components/CompanyAlertsList";
import { GhostLinkStyle } from "@/core/styles/links";

export const metadata: Metadata = {
  title: "Alertes d'entreprise | Paramètres",
  description:
    "Gérez vos alertes d'entreprise pour recevoir des notifications sur les nouvelles opportunités dans les entreprises qui vous intéressent.",
};

export default function CompanyAlertsPage() {
  return (
    <div className="space-y-6">
      <div className="shadow rounded-lg p-4 dark:border">
        <Link href="/settings/communication" className={GhostLinkStyle}>
          <ChevronLeft className="h-4 w-4" />
          Retour
        </Link>
        <h2 className="text-2xl font-semibold mb-2">
          Alertes d&apos;entreprise
        </h2>
        <p className="text-muted-foreground">
          Configurez vos alertes d&apos;entreprise pour recevoir des
          notifications lorsque de nouvelles opportunités sont disponibles dans
          les entreprises qui vous intéressent.
        </p>
      </div>

      <CompanyAlertsList />
    </div>
  );
}
