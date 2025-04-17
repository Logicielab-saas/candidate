import firebaseCloudMessaging from "./firebase-config";

export async function requestPermission() {
  try {
    const token = await firebaseCloudMessaging.init();
    if (token) {
      // Configure message handler
      firebaseCloudMessaging.getMessage();
      return token;
    }
    return null;
  } catch (error) {
    console.error("An error occurred while getting token:", error);
    return null;
  }
}
