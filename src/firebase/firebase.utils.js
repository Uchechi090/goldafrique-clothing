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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  //console.log(snapShot);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
