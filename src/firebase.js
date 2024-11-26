import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAe9JyoEH-I9tXCMqn1SE1pB-t5vj9lsOg",
  authDomain: "sahil-s-chatapp.firebaseapp.com",
  projectId: "sahil-s-chatapp",
  storageBucket: "sahil-s-chatapp.firebasestorage.app",
  messagingSenderId: "1076703283092",
  appId: "1:1076703283092:web:a9e672ffab394d75f87181"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);