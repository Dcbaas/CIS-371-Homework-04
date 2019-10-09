import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBG-67zxziN5giW8EYMv9AR7KW6vr9ztRw",
  authDomain: "cis371-hw4.firebaseapp.com",
  databaseURL: "https://cis371-hw4.firebaseio.com",
  projectId: "cis371-hw4",
  storageBucket: "",
  messagingSenderId: "748176684520",
  appId: "1:748176684520:web:116a552a1331ca886d605d",
  measurementId: "G-LBHZ4Z9C18"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppDB = firebase.database();
export { AppDB }; // Make this name available to other modules

