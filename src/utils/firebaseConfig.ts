import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBaf-pdTdMYfRzpueNdR5MbDEiVntlmPKQ",
    authDomain: "gengis-d52f0.firebaseapp.com",
    projectId: "gengis-d52f0",
    storageBucket: "gengis-d52f0.appspot.com",
    messagingSenderId: "304948925638",
    appId: "1:304948925638:web:5690ce13e593d4822673c7",
};

export const APP = initializeApp(firebaseConfig);
export const AUTH = getAuth(APP);
export const DB = getFirestore(APP);
export const STORAGE = getStorage(APP);
