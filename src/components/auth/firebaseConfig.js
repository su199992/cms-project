import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // 여기에 복사한 Firebase 앱 구성을 붙여넣습니다.
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: "cms-project-3b03e.firebaseapp.com",
  projectId: "cms-project-3b03e",
  storageBucket: "cms-project-3b03e.appspot.com",
  messagingSenderId: "401791024748",
  appId: "1:401791024748:web:75648d8e3fbc83d6ed2249",
  measurementId: "G-3TV0ZQTEVN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };