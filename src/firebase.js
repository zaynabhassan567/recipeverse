// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO8Vpu-qiINzTJLLq9ucnE8CX28JhZih4",
  authDomain: "recipeverse-c3d04.firebaseapp.com",
  projectId: "recipeverse-c3d04",
  storageBucket: "recipeverse-c3d04.appspot.com",
  messagingSenderId: "785157832188",
  appId: "1:785157832188:web:146338ee96b6698a95c679",
  measurementId: "G-X6EEKV2PJQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
export default app; 
