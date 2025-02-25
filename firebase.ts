import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA0OZ7kZJRfPN8pCDAUh1UeNGc1KpvKeB4",
    authDomain: "notion-clone-ca5fe.firebaseapp.com",
    projectId: "notion-clone-ca5fe",
    storageBucket: "notion-clone-ca5fe.firebasestorage.app",
    messagingSenderId: "537972111328",
    appId: "1:537972111328:web:befff5415c7301ae869d85",
    measurementId: "G-SQZMYRZWGQ"
  };

const app=getApps.length===0?initializeApp(firebaseConfig):getApp();
const db=getFirestore(app);

export {db};    