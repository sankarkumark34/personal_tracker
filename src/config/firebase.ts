import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration - Environment variables use pannalam
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDCJ73M8ojrOnlajg5qhLTP4-JDnYn10zI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "personal-tracker-001.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ||  "personal-tracker-001",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "personal-tracker-001.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "718641439752",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:718641439752:web:76ed9906aa2f3495f25dbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

export default app; 