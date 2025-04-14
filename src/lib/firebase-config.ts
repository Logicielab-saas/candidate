import * as firebase from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseCloudMessaging = {
  // Check if token exists in localStorage
  tokenInLocalStorage: async () => {
    try {
      return localStorage.getItem("fcmToken");
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  },

  // Initialize Firebase and request permission
  init: async function () {
    if (!firebase.getApps().length) {
      try {
        const app = firebase.initializeApp(firebaseConfig);
        // Only initialize analytics on the client side
        if (typeof window !== "undefined") {
          getAnalytics(app);
        }
      } catch (err) {
        console.error("Firebase initialization error:", err);
        return null;
      }
    }

    try {
      const messaging = getMessaging();
      const tokenInLocalStorage = await this.tokenInLocalStorage();

      // Return existing token if available
      if (tokenInLocalStorage) {
        // Verify the token is still valid
        try {
          await getToken(messaging);
          return tokenInLocalStorage;
        } catch (_error) {
          console.log("Existing token is invalid, requesting new token");
          localStorage.removeItem("fcmToken");
        }
      }

      // Request notification permission
      const status = await Notification.requestPermission();
      if (status === "granted") {
        // Get new token
        const fcmToken = await getToken(messaging);

        if (fcmToken) {
          localStorage.setItem("fcmToken", fcmToken);
          return fcmToken;
        }
      }

      console.log("Notification permission was not granted.");
      return null;
    } catch (error) {
      console.error("An error occurred while initializing Firebase:", error);
      // Clear any invalid tokens
      localStorage.removeItem("fcmToken");
      return null;
    }
  },

  // Set up message handler
  getMessage: async function () {
    if (firebase.getApps().length > 0) {
      try {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
          console.log("Foreground message received:", payload);
          // You can handle the message here if needed
          if (payload.notification && "Notification" in window) {
            const { title, body, image } = payload.notification;
            new Notification(title || "New Notification", {
              body: body || "",
              icon: image || "/favicon.ico",
              badge: "/favicon.ico",
              tag: "notification",
            });
          }
        });
      } catch (error) {
        console.error("Error setting up message handler:", error);
      }
    }
  },
};

export default firebaseCloudMessaging;
