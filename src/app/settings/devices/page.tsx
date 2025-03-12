/**
 * DevicesPage - Page for managing connected devices
 *
 * Server component that displays a list of devices
 * connected to the user's account with their details.
 */

import { DevicesList } from "@/features/settings/devices/components/DevicesList";

export default function DevicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Appareils connectés</h1>
        <p className="text-muted-foreground mt-1">
          Gérez les appareils connectés à votre compte et leurs accès.
        </p>
      </div>

      <DevicesList />
    </div>
  );
}
