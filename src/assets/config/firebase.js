// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA8x06gdSRY200n_UDs63p68G49trWuo7A",
  authDomain: "e-commerce-d1b63.firebaseapp.com",
  databaseURL: "https://e-commerce-d1b63-default-rtdb.firebaseio.com",
  projectId: "e-commerce-d1b63",
  storageBucket: "e-commerce-d1b63.appspot.com",
  messagingSenderId: "673287279466",
  appId: "1:673287279466:web:e89dce7d17e7f8a2390b13",
  measurementId: "G-SDB8T8LSNQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(getAuth(app), email, password);
}

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
}