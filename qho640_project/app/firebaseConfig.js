import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Move to dotenv for security reason
const firebaseConfig = {
    apiKey: "AIzaSyBLkyEk1Gu222pV_GgFU-q7HZO9Pgu-f5A",
    authDomain: "qho640-dd856.firebaseapp.com",
    projectId: "qho640-dd856",
    storageBucket: "qho640-dd856.appspot.com",
    messagingSenderId: "170477649615",
    appId: "1:170477649615:web:6336170872e3f28ec3c1ba",
    measurementId: "G-PQ7BP402N5"
};


initializeApp(firebaseConfig); // Initialize Firebase


const db = getFirestore();   // Get a Firestore instance
const auth = getAuth();     // Get an Auth instance

export { auth, db};

