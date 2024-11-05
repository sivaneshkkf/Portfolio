import { initializeApp } from "firebase/app";
import {
  getFirestore,
  Timestamp,
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9vzUQDF2NvK4tQfT6JN4WmGsv4ayzktg",
  authDomain: "portfolio-fe47a.firebaseapp.com",
  projectId: "portfolio-fe47a",
  storageBucket: "portfolio-fe47a.firebasestorage.app",
  messagingSenderId: "928609820800",
  appId: "1:928609820800:web:e6b90ae4310d3731f80665",
  databaseURL:
    "https://console.firebase.google.com/u/0/project/portfolio-fe47a/database/portfolio-fe47a-default-rtdb/data/~2F",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export function AddFeedBack(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionRef = collection(db, "feedback");
      const docRef = await addDoc(collectionRef, {
        ...formData,
        createdAt: Timestamp.now(),
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

// location add
export function AddLocationToFirebase(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const locationsCollection = collection(db, "locations");

      // Fetch existing documents
      const existingDocs = await getDocs(locationsCollection);
      const docsArray = existingDocs.docs;

      // Check the number of documents in the collection
      if (docsArray.length >= 10) {
        // Sort documents by creation time (assuming they have a createdAt timestamp)
        const oldestDocs = docsArray
          .sort((a, b) => a.data().createdAt - b.data().createdAt)
          .slice(0, docsArray.length - 9);
        // Delete the oldest documents
        for (const doc of oldestDocs) {
          await deleteDoc(doc.ref);
          //console.log(`Deleted document with ID: ${doc.id}`);
        }
      }

      // Add new location document with createdAt timestamp
      const docRef = await addDoc(locationsCollection, {
        ...data,
        createdAt: new Date(), // Add a timestamp for sorting
      });
      resolve(docRef)

    } catch (error) {
     reject(error)
    }
  });
}

// Custom hook to fetch a Firestore collection
export function UseFetchCollection(fbCollection) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Modify the collection reference to include sorting by 'createdAt' in descending order
    const collectionRef = query(
      collection(db, fbCollection),
      orderBy("createdAt", "desc") // Change "createdAt" to your timestamp field
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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
