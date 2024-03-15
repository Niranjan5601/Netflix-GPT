// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0-29Abs1NrKfCF6HCGtVPYCBGStjRJrk",
  authDomain: "netflixgpt-a2f00.firebaseapp.com",
  projectId: "netflixgpt-a2f00",
  storageBucket: "netflixgpt-a2f00.appspot.com",
  messagingSenderId: "955700696435",
  appId: "1:955700696435:web:a605bd3602542c5b1f6106",
  measurementId: "G-S35SF35RNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();