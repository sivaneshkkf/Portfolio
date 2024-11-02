import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, collection, addDoc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9vzUQDF2NvK4tQfT6JN4WmGsv4ayzktg",
  authDomain: "portfolio-fe47a.firebaseapp.com",
  projectId: "portfolio-fe47a",
  storageBucket: "portfolio-fe47a.firebasestorage.app",
  messagingSenderId: "928609820800",
  appId: "1:928609820800:web:e6b90ae4310d3731f80665",
  databaseURL: "https://console.firebase.google.com/u/0/project/portfolio-fe47a/database/portfolio-fe47a-default-rtdb/data/~2F"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export function AddFeedBack(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionRef = collection(db, "feedback");
      const docRef = await addDoc(collectionRef, {
        ...formData,
        time: Timestamp.now()
      });
      resolve(docRef);
    } catch (e) {
      reject(e);
    }
  });
}

export function AddDashboardDetails(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, "dashboard", "dashboard123"); // Specify the ID here
      await setDoc(docRef, data); // Set the document data with the specified ID
      resolve(docRef);
    } catch (e) {
      reject(e);
    }
  });
}

// Custom hook to fetch a Firestore collection
export function UseFetchCollection(fbCollection) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, fbCollection);

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDocuments(results);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [fbCollection]);

  return documents;
}




const auth = getAuth(app);

export function logInFirebase(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        reject(errorMessage);
      });
  });
}

