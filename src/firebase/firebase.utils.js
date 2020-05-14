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
  measurementId: "G-XZMLFRHMFN",
};

firebase.initializeApp(config);

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

//To convert collections snapshot into a hash map(table)
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  //console.log(transformedCollection);
  //This converts the transformedCollection(an array of objects) to hash object
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


//To move shopData to firebase backend - handled in App.js because I need
//to perform this action once. Can be used to make new collections anytime.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  //console.log(collectionRef);

  //This a batch write: which groups or batches all the data objects and
  //adds all as documents to the collection; since .set() can only run one
  //at a time in firestore
  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc(); //creates a new document ref and randomly generates an id
    //console.log(newDocRef);
    batch.set(newDocRef, obj);
  });

  //.commit is a Promise, if it succeeds it resolves a void(null) value;
  //so .then(s) can be chained and errors handled
  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
