import firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAtMmIW01bGegLlssQ77GWRiXEDUxOppco",
    authDomain: "tima-auth.firebaseapp.com",
    databaseURL: "https://tima-auth.firebaseio.com",
    projectId: "tima-auth",
    storageBucket: "tima-auth.appspot.com",
    messagingSenderId: "161665245575",
    appId: "1:161665245575:web:23757447efdfbf40c33322",
    measurementId: "G-E2NWE9PHP3"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;