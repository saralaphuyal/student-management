
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCgoQtvIyqJpTYsLGv3nxdkP-P7vE-aLnU",
  authDomain: "student-management-ebf10.firebaseapp.com",
  projectId: "student-management-ebf10",
  storageBucket: "student-management-ebf10.appspot.com",
  messagingSenderId: "429302032510",
  appId: "1:429302032510:web:4075b7a553950b9b00d02f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };