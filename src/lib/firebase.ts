
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
// import { getFirestore, type Firestore } from "firebase/firestore"; // Example if you need Firestore

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

// Client-side diagnostic checks
if (typeof window !== 'undefined') { // Run only on the client-side
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_") || firebaseConfig.apiKey.length < 10) {
    console.warn(
      "%cFirebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) appears to be missing, a placeholder, or invalid.",
      "color: red; font-weight: bold;",
      "Please ensure it is correctly set in your Firebase Studio project's environment variable settings.",
      "Current value:", firebaseConfig.apiKey
    );
  }
  if (!firebaseConfig.authDomain || firebaseConfig.authDomain.includes("YOUR_")) {
    console.warn(
      "%cFirebase Auth Domain (NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) appears to be missing or a placeholder.",
      "color: orange; font-weight: bold;",
      "Please ensure it is correctly set in your Firebase Studio project's environment variable settings.",
      "Current value:", firebaseConfig.authDomain
    );
  }
  if (!firebaseConfig.projectId || firebaseConfig.projectId.includes("YOUR_")) {
    console.warn(
      "%cFirebase Project ID (NEXT_PUBLIC_FIREBASE_PROJECT_ID) appears to be missing or a placeholder.",
      "color: orange; font-weight: bold;",
      "Please ensure it is correctly set in your Firebase Studio project's environment variable settings.",
      "Current value:", firebaseConfig.projectId
    );
  }
}

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app);
// const db: Firestore = getFirestore(app); // Example if you need Firestore

export { app, auth /*, db */ };
