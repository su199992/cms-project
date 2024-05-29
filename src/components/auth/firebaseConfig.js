import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "cms-project-20b21.firebaseapp.com",
  projectId: "cms-project-20b21",
  storageBucket: "cms-project-20b21.appspot.com",
  messagingSenderId: "397423654782",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
