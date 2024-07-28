import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "anime-surf.firebaseapp.com",
  projectId: "anime-surf",
  storageBucket: "anime-surf.appspot.com",
  messagingSenderId: "443422152997",
  appId: "1:443422152997:web:498b2c74751b0237e022cc"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);