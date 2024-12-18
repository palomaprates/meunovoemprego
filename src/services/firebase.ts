// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxeNQYqTcoCcAa1aK-dIpsDnlJgBeJQ6s",
  authDomain: "meu-novo-emprego-c2388.firebaseapp.com",
  projectId: "meu-novo-emprego-c2388",
  storageBucket: "meu-novo-emprego-c2388.firebasestorage.app",
  messagingSenderId: "540218137012",
  appId: "1:540218137012:web:635c2f6bed3b9135ddfae1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const functions = getFunctions(app);

// Crie um callable function

export { db, functions };
