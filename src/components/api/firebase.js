// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/database'
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmo4-GjC0ZzIJcD2tLrDbOlsv0dDjLBZs",
    authDomain: "werkeninde.firebaseapp.com",
    projectId: "werkeninde",
    storageBucket: "werkeninde.appspot.com",
    messagingSenderId: "997397924147",
    appId: "1:997397924147:web:ec36cc53e9a134caca1646",
    measurementId: "G-NMXG3RW3JT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };