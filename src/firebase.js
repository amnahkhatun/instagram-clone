import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBERTquT94UnDVOCWcOxBRbm9idxBCPJAI",
  authDomain: "instagram-clone-f69ba.firebaseapp.com",
  projectId: "instagram-clone-f69ba",
  storageBucket: "instagram-clone-f69ba.appspot.com",
  messagingSenderId: "485350832717",
  appId: "1:485350832717:web:7aa3a800b9f9a0aa04fa04",
  measurementId: "G-HM5LXSBDT6"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };