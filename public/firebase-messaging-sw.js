importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCLthyDdi1h-Ys75B3ns0UpqfN3OGsn6kw",
  authDomain: "postuly-app.firebaseapp.com",
  databaseURL: "https://postuly-app-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "postuly-app",
  storageBucket: "postuly-app.firebasestorage.app",
  messagingSenderId: "440504765928",
  appId: "1:440504765928:web:9b887215dc1fac5458e85d",
  measurementId: "G-GK17S05SC7"
});

const messaging = firebase.messaging();

// Keep track of the last notification data
let _lastNotificationData = null;

/**
 * Handle push events explicitly
 */
self.addEventListener('push', function(event) {
  console.log('[firebase-messaging-sw.js] Push event received', event);

  if (event.custom) return;

  // Keep the service worker alive until we show the notification
  event.waitUntil(
    // Store the push data for processing in onBackgroundMessage
    Promise.resolve().then(() => {
      if (event.data) {
        lastNotificationData = event.data.json();
      }
    })
  );
});

/**
 * Handle background messages and show notifications
 */
messaging.onBackgroundMessage(function(payload) {
  console.log("[firebase-messaging-sw.js] Background message received:", payload);

  // Create and show the notification
  const showNotification = async () => {
    try {
      // Determine target URL based on module type
      let targetUrl;
      switch (payload.data?.module_type) {
        case 'job':
          targetUrl = `/annonce-details/${payload.data.module_slug}`;
          break;
        case 'interview':
          targetUrl = `/messages?message/${payload.data.module_slug}`;
          break;
        case 'resume':
          targetUrl = `/profile/resume`;
          break;
        default:
          targetUrl = '/notifications';
      }

      // Use notification object if available, fallback to data
      const notificationTitle = payload.notification?.title || payload.data?.title || "New Notification";
      const notificationBody = payload.notification?.body || payload.data?.body || "";
      const notificationImage = payload.notification?.image || payload.data?.image || "/favicon.ico";

      // Create a unique tag to prevent duplicates
      const tag = payload.collapseKey || `${payload.data?.module_type}-${payload.data?.module_slug}`;

      console.log('[firebase-messaging-sw.js] Preparing to show notification:', {
        title: notificationTitle,
        body: notificationBody,
        tag: tag
      });

      // Force close any existing notifications with the same tag
      const existingNotifications = await self.registration.getNotifications({ tag: tag });
      existingNotifications.forEach(notification => notification.close());

      // Show the new notification
      await self.registration.showNotification(notificationTitle, {
        body: notificationBody,
        icon: notificationImage,
        badge: "/favicon.ico",
        tag: tag,
        data: { targetUrl },
        requireInteraction: true,
        actions: [
          {
            action: 'open',
            title: 'Ouvrir'
          }
        ],
        timestamp: Date.now(),
        silent: false,
        vibrate: [200, 100, 200] // Add vibration for more noticeable notifications
      });

      console.log('[firebase-messaging-sw.js] Notification shown successfully');
      return Promise.resolve();
    } catch (error) {
      console.error('[firebase-messaging-sw.js] Error showing notification:', error);
      return Promise.reject(error);
    }
  };

  // Keep the service worker alive until notification is shown
  return new Promise((resolve, reject) => {
    showNotification()
      .then(resolve)
      .catch(reject);
  });
});

/**
 * Handle notification click events
 */
self.addEventListener("notificationclick", function(event) {
  console.log('[firebase-messaging-sw.js] Notification clicked:', event);

  event.notification.close();

  const targetUrl = event.notification.data?.targetUrl;
  if (!targetUrl) {
    console.warn('[firebase-messaging-sw.js] No target URL found in notification');
    return;
  }

  // Focus or open window and navigate
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then(function(clientList) {
      // Try to find a client that's already open
      const matchingClient = clientList.find(client =>
        client.url.includes(self.registration.scope)
      );

      if (matchingClient) {
        // If we have a matching client, focus it and navigate
        return matchingClient.focus().then(() => {
          return matchingClient.navigate(targetUrl);
        });
      } else {
        // If no matching client, open new window
        return clients.openWindow(targetUrl);
      }
    }).catch((error) => {
      console.error('[firebase-messaging-sw.js] Error handling notification click:', error);
    })
  );
});
