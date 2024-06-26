// Import the functions you need from the SDKs you need

import { initializeApp, firebase } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//test
// const firebaseConfig = {
//   apiKey: "AIzaSyAUQGNPxVcqHCA5U8-1U8kqJQaLqnbm9Uo",
//   authDomain: "authun-d9140.firebaseapp.com",
//   projectId: "authun-d9140",
//   storageBucket: "authun-d9140.appspot.com",
//   messagingSenderId: "498040987179",
//   appId: "1:498040987179:web:03980700e6090b7009546e",
//   measurementId: "G-Q4XENH4C4X"
// };


const firebaseConfig = {
  apiKey: "AIzaSyAUQGNPxVcqHCA5U8-1U8kqJQaLqnbm9Uo",
  authDomain: "authun-d9140.firebaseapp.com",
  projectId: "authun-d9140",
  storageBucket: "authun-d9140.appspot.com",
  messagingSenderId: "498040987179",
  appId: "1:498040987179:web:03980700e6090b7009546e",
  measurementId: "G-Q4XENH4C4X"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth, app };
