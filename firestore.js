import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD5mtaeGObyhofcwmbfSSX7U-kXSUFa5qQ",
  authDomain: "babylon-blog.firebaseapp.com",
  projectId: "babylon-blog",
  storageBucket: "babylon-blog.appspot.com",
  messagingSenderId: "831451492022",
  appId: "1:831451492022:web:f3498840befeced1c74017"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);