// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4NmLI7QKGZOPPMAcbmyWDy9kon17XrqE",
  authDomain: "ecohub-707c9.firebaseapp.com",
  projectId: "ecohub-707c9",
  storageBucket: "ecohub-707c9.appspot.com",
  messagingSenderId: "456800598427",
  appId: "1:456800598427:web:ac58acc10964db30fac93e",
};

// Initialize Firebase
let app;

if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
