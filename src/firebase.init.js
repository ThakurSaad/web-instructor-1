// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQIjf_omZZVDCXtCEj1K1MWyqnHnqR8Ek",
  authDomain: "web-instructor-1.firebaseapp.com",
  projectId: "web-instructor-1",
  storageBucket: "web-instructor-1.appspot.com",
  messagingSenderId: "60222907095",
  appId: "1:60222907095:web:70fef0fb046cbfa1e2c692",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
