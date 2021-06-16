import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnmpoSatKuZISnQbJXuLP728SeUBIutSk",
  authDomain: "crown-db-b8bed.firebaseapp.com",
  projectId: "crown-db-b8bed",
  storageBucket: "crown-db-b8bed.appspot.com",
  messagingSenderId: "448155553932",
  appId: "1:448155553932:web:6920650ac6061b24dd6ba9",
  measurementId: "G-1NZF177349",
};

// getting userAuth data and add it to the db

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(firebaseConfig);

//   exporting firebase auth and firestore to be used in other modules.

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// implementing google auth provider.

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
