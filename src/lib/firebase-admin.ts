
import type { App } from 'firebase-admin/app';
import admin from 'firebase-admin';

let adminApp: App | null = null;

function initializeAdminApp() {
  if (admin.apps.length > 0) {
    adminApp = admin.app();
    return adminApp;
  }

  const serviceAccountKeyJson = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_JSON;

  if (!serviceAccountKeyJson) {
    console.error(
      'Firebase Admin SDK: FIREBASE_SERVICE_ACCOUNT_KEY_JSON environment variable is not set. Admin features requiring backend access will not work.'
    );
    return null;
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountKeyJson);
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      // Optionally add your databaseURL if not automatically inferred and using Realtime Database
      // databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });
    console.log('Firebase Admin SDK initialized successfully.');
    return adminApp;
  } catch (error: any) {
    console.error('Firebase Admin SDK: Error initializing app with service account JSON:', error.message);
    if (error.message.includes('Unexpected token') || error.message.includes('Invalid JSON')) {
      console.error('Firebase Admin SDK: The FIREBASE_SERVICE_ACCOUNT_KEY_JSON might not be a valid JSON string. Ensure it is properly formatted and escaped if necessary when setting it as an environment variable.');
    }
    return null;
  }
}

export function getAdminApp(): App {
  if (!adminApp) {
    const initializedApp = initializeAdminApp();
    if (!initializedApp) {
      // This case should ideally not be reached if environment variable is mandatory for operations.
      // However, to prevent crashing, we throw a more specific error if someone tries to use it uninitialized.
      throw new Error("Firebase Admin SDK is not initialized. Check server logs for configuration errors.");
    }
    return initializedApp;
  }
  return adminApp;
}

// Optionally, export firestore and auth instances directly if preferred
// export const adminAuth = () => getAdminApp().auth();
// export const adminFirestore = () => getAdminApp().firestore();
