import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Add your API Key",
  authDomain: "Add your authDomain",
  projectId: "Add your projectId",
  storageBucket: "Add your storageBucket",
  messagingSenderId: "Add your messagingSenderId",
  appId: "Add your appId",
  measurementId: "Add your measurementId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };