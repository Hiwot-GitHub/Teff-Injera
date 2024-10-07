// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_GUnAxBTb8mSSR_AkB-eL9Cf3waX7yjk",
  authDomain: "teff-injera-b80d0.firebaseapp.com",
  projectId: "teff-injera-b80d0",
  storageBucket: "teff-injera-b80d0.appspot.com",
  messagingSenderId: "126771756790",
  appId: "1:126771756790:web:a28d592f03ca5bd3e036d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and export it
export const messaging = getMessaging(app);