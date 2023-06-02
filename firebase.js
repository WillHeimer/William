import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Changed here

const firebaseConfig = {
  apiKey: "AIzaSyBYxcblyAXR5oBmJA0fMYLWWx6x3UGVC3g",
  authDomain: "builders-72426.firebaseapp.com",
  projectId: "builders-72426",
  storageBucket: "builders-72426.appspot.com",
  messagingSenderId: "628545606555",
  appId: "1:628545606555:web:0900e16eb37936c1cbc73e",
  measurementId: "G-0L0YFHGMX8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Added here

export { auth, db }; // Export db here
