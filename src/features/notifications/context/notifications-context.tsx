/**
 * NotificationsContext - Global notifications state management
 *
 * Handles Firebase Cloud Messaging integration and notification routing
 * Manages foreground notification clicks
 */

"use client";

import React, { createContext, useContext, useEffect } from "react";
import type { Notification, NotificationType } from "../types";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseCloudMessaging from "@/lib/firebase-config";
import { useRouter } from "next/navigation";

interface NotificationsContextType {
  handleNotificationClick: (notification: Notification) => void;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  /**
   * Handle notification click routing
   * Routes to different pages based on notification type:
   * - job: /annonce-details/{slug}
   * - interview: /messages?message/{slug}
   */
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.module) return;

    switch (notification.module.type) {
      case "job":
        router.push(`/annonce-details/${notification.module.slug}`);
        break;
      case "interview":
        router.push(`/messages?message/${notification.module.slug}`);
        break;
      case "resume":
        router.push(`/profile/resume`);
        break;
    }
  };

  useEffect(() => {
    // Initialize Firebase messaging and listen for messages
    const initFirebaseMessaging = async () => {
      try {
        await firebaseCloudMessaging.init();
        const messaging = getMessaging();

        onMessage(messaging, (payload) => {
          console.log("Received foreground message:", payload);

          // Always show notification in foreground
          const notification: Notification = {
            id: Date.now().toString(),
            type: (payload.data?.module_type as NotificationType) || "system",
            title: payload.notification?.title || "New Notification",
            message: payload.notification?.body || "",
            createdAt: new Date().toISOString(),
            isRead: false,
            module: payload.data
              ? {
                  type: payload.data.module_type,
                  slug: payload.data.module_slug,
                }
              : undefined,
          };

          // Show browser notification
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            // Create a unique tag to prevent duplicates
            const tag =
              payload.collapseKey ||
              `${payload.data?.module_type}-${payload.data?.module_slug}`;

            // Close any existing notifications with the same tag
            navigator.serviceWorker.ready.then((registration) => {
              registration.getNotifications({ tag }).then((notifications) => {
                notifications.forEach((notification) => notification.close());
              });
            });

            const browserNotification = new Notification(notification.title, {
              body: notification.message,
              icon: payload.notification?.image || "/favicon.ico",
              badge: "/favicon.ico",
              tag: tag,
              requireInteraction: true,
              silent: false,
              data: {
                targetUrl: notification.module
                  ? `/annonce-details/${notification.module.slug}`
                  : "/notifications",
              },
            });

            // Handle notification click
            browserNotification.onclick = () => {
              window.focus();
              handleNotificationClick(notification);
              browserNotification.close();
            };
          }
        });
      } catch (error) {
        console.error("Error initializing Firebase messaging:", error);
      }
    };

    if (typeof window !== "undefined") {
      initFirebaseMessaging();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        handleNotificationClick,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider"
    );
  }
  return context;
}
