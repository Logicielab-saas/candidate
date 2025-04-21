/**
 * DevicesPage - Page for managing connected devices
 *
 * Server component that displays a list of devices
 * connected to the user's account with their details.
 */

import { Separator } from "@/components/ui/separator";
import { DevicesList } from "@/features/settings/devices/components/DevicesList";
import { getTranslations } from "next-intl/server";

export default async function DevicesPage() {
  const t = await getTranslations("settings.devices");
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1">{t("description")}</p>
      </div>

      <Separator className="my-6" />

      <DevicesList />
    </div>
  );
}
