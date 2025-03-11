/**
 * CommunicationSettingsPage - Communication preferences and alert settings
 *
 * Server component that displays various communication settings including
 * job alerts and company alerts.
 */

import { AlertSection } from "@/features/settings/communication/components/AlertSection";

export default function CommunicationSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-6">
          Paramètres de communication
        </h2>

        <div className="space-y-4">
          <AlertSection
            title="Alertes d'emploi"
            href="/settings/communication/job-alerts"
          />

          <AlertSection
            title="Alertes d'entreprise"
            href="/settings/communication/company-alerts"
          />
        </div>
      </div>
    </div>
  );
}
