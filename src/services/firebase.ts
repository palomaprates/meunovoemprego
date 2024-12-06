// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaDVruBJH5f3Yo3s_dG1ExiKIX58MMaa4",
  authDomain: "meu-novo-emprego-97af7.firebaseapp.com",
  projectId: "meu-novo-emprego-97af7",
  storageBucket: "meu-novo-emprego-97af7.firebasestorage.app",
  messagingSenderId: "682203103466",
  appId: "1:682203103466:web:fbcdd66395d93e10ddd793",
  measurementId: "G-BLB13L1MQZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
