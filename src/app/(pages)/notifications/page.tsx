/**
 * NotificationsPage - Main notifications page
 *
 * Displays all notifications for the current user
 * Uses NotificationsList component to handle data fetching and display
 */

import { NotificationsList } from "@/features/notifications/components/NotificationsList";
import { Suspense } from "react";
import LoaderOne from "@/components/ui/loader-one";
import { getTranslations } from "next-intl/server";

export default async function NotificationsPage() {
  const t = await getTranslations("notifications");

  return (
    <Suspense fallback={<LoaderOne />}>
      <div className="container py-6">
        <h1 className="mb-8 text-3xl font-bold">{t("page.title")}</h1>
        <NotificationsList />
      </div>
    </Suspense>
  );
}
