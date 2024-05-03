// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLkyEk1Gu222pV_GgFU-q7HZO9Pgu-f5A",
    authDomain: "qho640-dd856.firebaseapp.com",
    projectId: "qho640-dd856",
    storageBucket: "qho640-dd856.appspot.com",
    messagingSenderId: "170477649615",
    appId: "1:170477649615:web:6336170872e3f28ec3c1ba",
    measurementId: "G-PQ7BP402N5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get auth instance
const auth = getAuth(app);

export  {auth, db};
