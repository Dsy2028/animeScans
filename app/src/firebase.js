// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTmDDItGqyqg1Oz66dRYQWw6jfgfjLBkg",
  authDomain: "scansite-e2d02.firebaseapp.com",
  databaseURL: "https://scansite-e2d02-default-rtdb.firebaseio.com",
  projectId: "scansite-e2d02",
  storageBucket: "scansite-e2d02.appspot.com",
  messagingSenderId: "736833395407",
  appId: "1:736833395407:web:3d3b3b0a4ad6e98178f5ba",
  measurementId: "G-3XFM4NCPYF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);