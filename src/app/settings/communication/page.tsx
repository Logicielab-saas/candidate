/**
 * CommunicationSettingsPage - Communication preferences and alert settings
 *
 * Server component that displays various communication settings including
 * job alerts, company alerts, and notification preferences.
 */

import { Separator } from "@/components/ui/separator";
import { AlertSection } from "@/features/settings/communication/components/AlertSection";
import { AlertPreferences } from "@/features/settings/communication/components/AlertPreferences";

export default function CommunicationSettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Paramètres de communication</h1>
        <p className="text-muted-foreground mt-1">
          Gérez les paramètres de communication et vos préférences
          d&apos;alertes.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-medium mb-4">Alertes Configuration</h2>

          <div className="rounded-lg border border-border">
            <AlertSection
              title="Alertes d'emploi"
              description="Recevez des notifications pour les nouveaux emplois correspondant à vos critères."
              href="/settings/communication/job-alerts"
            />
            <Separator />
            <AlertSection
              title="Alertes d'entreprise"
              description="Suivez les mises à jour des entreprises qui vous intéressent."
              href="/settings/communication/company-alerts"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-4">
            Préférences de notification
          </h2>
          <AlertPreferences />
        </div>
      </div>
    </div>
  );
}
