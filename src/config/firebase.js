import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw18iUAOrt8GcvDRGh_rtK1DP79bT54Y4",
  authDomain: "chat-a86c4.firebaseapp.com",
  projectId: "chat-a86c4",
  storageBucket: "chat-a86c4.appspot.com",
  messagingSenderId: "831782577490",
  appId: "1:831782577490:web:f6ec4605907e767c8a068b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
