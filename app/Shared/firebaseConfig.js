// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUWO3Ax8Vu7udmQZApXSXYFziTRMt8MP0",
  authDomain: "givedu-db0f9.firebaseapp.com",
  databaseURL: "https://givedu-db0f9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "givedu-db0f9",
  storageBucket: "givedu-db0f9.firebasestorage.app",
  messagingSenderId: "725096119878",
  appId: "1:725096119878:web:57fd8a980cdf98f4871447",
  measurementId: "G-DQYYXBRF67"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 
export default app;