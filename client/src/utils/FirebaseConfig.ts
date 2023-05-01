// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {collection,getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjZpCst40_q8-JEzJtC7BaG1-JLv9MG88",
  authDomain: "meet-6beba.firebaseapp.com",
  projectId: "meet-6beba",
  storageBucket: "meet-6beba.appspot.com",
  messagingSenderId: "47654018524",
  appId: "1:47654018524:web:9e2e541a70ff6abb808319",
  measurementId: "G-LXHMPWVLP5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

//creation de la BD 
export const userRef = collection(firebaseDB, "users");
export const meetingsRef = collection(firebaseDB, "meetings");