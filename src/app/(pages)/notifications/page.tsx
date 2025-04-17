/**
 * NotificationsPage - Main notifications page
 *
 * Displays all notifications for the current user
 * Uses NotificationsList component to handle data fetching and display
 */

import { NotificationsList } from "@/features/notifications/components/NotificationsList";
import { Suspense } from "react";
import LoaderOne from "@/components/ui/loader-one";

export default function NotificationsPage() {
  return (
    <Suspense fallback={<LoaderOne />}>
      <div className="container py-6">
        <h1 className="mb-8 text-3xl font-bold">Notifications</h1>
        <NotificationsList />
      </div>
    </Suspense>
  );
}
