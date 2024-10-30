// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBP2iEwWKkYSU8oifmPJT6eqyPUBnXPJJ0",
  authDomain: "auth-app-d6c5a.firebaseapp.com",
  projectId: "auth-app-d6c5a",
  storageBucket: "auth-app-d6c5a.appspot.com",
  messagingSenderId: "513136252558",
  appId: "1:513136252558:web:04883e007bd40548d79bdf"
};

// Initialize Firebase
let app;

if(!getApps.length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } ;