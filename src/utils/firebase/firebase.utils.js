import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpdwp9fmvwcis59rEweV7maqXIhRhLfEs",
  authDomain: "crwn-clothing-db-84bb7.firebaseapp.com",
  projectId: "crwn-clothing-db-84bb7",
  storageBucket: "crwn-clothing-db-84bb7.appspot.com",
  messagingSenderId: "908711204379",
  appId: "1:908711204379:web:c90da4331afc79e54acabe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  // IF THE USER DATA DOES NOT EXISTS THEN CREAT IT
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("Error Creating the User ", error.message);
    }
  }
  // IF THE USER DATA EXISTS
  return userDocRef;
};
