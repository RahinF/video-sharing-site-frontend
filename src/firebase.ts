// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "video-sharing-app-cc813.firebaseapp.com",
  projectId: "video-sharing-app-cc813",
  storageBucket: "video-sharing-app-cc813.appspot.com",
  messagingSenderId: "239887816255",
  appId: "1:239887816255:web:30e389986dae3454d94a8a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
