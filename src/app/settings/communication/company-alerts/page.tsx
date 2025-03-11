/**
 * CompanyAlertsPage - Company alerts settings and management
 *
 * Server component that displays company alert preferences and settings.
 * Users can manage their company alert criteria and notification preferences.
 */

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function CompanyAlertsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link
            href="/settings/communication"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour
          </Link>
        </Button>
        <h2 className="text-2xl font-semibold">Alertes d&apos;entreprise</h2>
      </div>

      <div className="rounded-lg border border-border p-6">
        <p className="text-muted-foreground mb-4">
          Configurez vos préférences pour les alertes d&apos;entreprise. Vous
          recevrez des notifications lorsque de nouvelles informations sont
          disponibles pour les entreprises qui vous intéressent.
        </p>

        {/* Add company alert settings here */}
      </div>
    </div>
  );
}
