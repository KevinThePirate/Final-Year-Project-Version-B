import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBszgv4cVGBGLuZ2sGOJ5q2uYc45VSlV5k",
  authDomain: "todo-crud-a7e7f.firebaseapp.com",
  projectId: "todo-crud-a7e7f",
  storageBucket: "todo-crud-a7e7f.appspot.com",
  messagingSenderId: "790800078854",
  appId: "1:790800078854:web:439c937be5e546d2a04b87",
  measurementId: "G-XR8P5W9ZKZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const authentication = getAuth(app);
export { db, authentication };
