import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD8d8Ui4J71oszp6LQ7kokfw2dI0kJNcXM",
  authDomain: "gold-afrique-db.firebaseapp.com",
  databaseURL: "https://gold-afrique-db.firebaseio.com",
  projectId: "gold-afrique-db",
  storageBucket: "gold-afrique-db.appspot.com",
  messagingSenderId: "974817508908",
  appId: "1:974817508908:web:63534881a84f5bf5981b89",
  measurementId: "G-XZMLFRHMFN"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
