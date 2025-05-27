
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
// import { getFirestore, type Firestore } from "firebase/firestore"; // Example if you need Firestore

// Hardcoded Firebase configuration based on user input
// IMPORTANT: For actual production deployments outside of a controlled studio environment,
// using environment variables (process.env.NEXT_PUBLIC_FIREBASE_...) is strongly recommended
// for security and flexibility.
const firebaseConfig = {
  apiKey: "AIzaSyDD_cdoCz5zA1K87ZX6YYadF0GfH_VDaFw",
  authDomain: "gleam-marketplace.firebaseapp.com",
  projectId: "gleam-marketplace",
  storageBucket: "gleam-marketplace.firebasestorage.app",
  messagingSenderId: "839613241224",
  appId: "1:839613241224:web:57892f3da714ee7e094c3d",
  // measurementId is optional, add it here if you have one and need it.
  // measurementId: "G-XXXXXXXXXX",
};

// Client-side diagnostic checks for the hardcoded values (for awareness)
if (typeof window !== 'undefined') { // Run only on the client-side
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_FIREBASE_WEB_API_KEY_VALUE" || firebaseConfig.apiKey.length < 10) {
    console.warn(
      "%cFirebase API Key (hardcoded) appears to be missing, a placeholder, or invalid.",
      "color: red; font-weight: bold;",
      "Please ensure it is correctly set in src/lib/firebase.ts or via environment variables for production.",
      "Current value:", firebaseConfig.apiKey
    );
  }
  if (!firebaseConfig.authDomain || firebaseConfig.authDomain === "YOUR_FIREBASE_AUTH_DOMAIN_VALUE") {
    console.warn(
      "%cFirebase Auth Domain (hardcoded) appears to be missing or a placeholder.",
      "color: orange; font-weight: bold;",
      "Please ensure it is correctly set in src/lib/firebase.ts or via environment variables for production.",
      "Current value:", firebaseConfig.authDomain
    );
  }
  if (!firebaseConfig.projectId || firebaseConfig.projectId === "YOUR_FIREBASE_PROJECT_ID_VALUE") {
    console.warn(
      "%cFirebase Project ID (hardcoded) appears to be missing or a placeholder.",
      "color: orange; font-weight: bold;",
      "Please ensure it is correctly set in src/lib/firebase.ts or via environment variables for production.",
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
