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
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Feedback add
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

// message add
export function AddMessage(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const collectionRef = collection(db, "messages");
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

//Add DashBoard Details
export function AddDashboardDetails(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, "dashboard", "dashboard123"); // Specify the ID here
      await setDoc(docRef, {
        ...data,
        createdAt: Timestamp.now(),
      }); // Set the document data with the specified ID
      resolve(docRef);
    } catch (e) {
      reject(e);
    }
  });
}

// Add pre Dashboard Details
export function AddPreDashboardDetails(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const docRef = doc(db, "dashboardPreData", "dashboardPreData123"); // Specify the ID here
      await setDoc(docRef, {
        ...data,
        createdAt: Timestamp.now(),
      }); // Set the document data with the specified ID
      resolve(docRef);
    } catch (e) {
      reject(e);
    }
  });
}

// location add
const MAX_LOCATION_DOCS = 300;

export function AddLocationToFirebase(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const locationsCollection = collection(db, "locations");

      // Fetch existing documents
      const existingDocs = await getDocs(locationsCollection);
      const docsArray = existingDocs.docs;

      // Check the number of documents in the collection
      if (docsArray.length >= MAX_LOCATION_DOCS) {
        // Sort documents by creation time (assuming they have a createdAt timestamp)
        const oldestDocs = docsArray
          .sort((a, b) => a.data().createdAt - b.data().createdAt)
          .slice(0, docsArray.length - (MAX_LOCATION_DOCS - 1));
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
      resolve(docRef);
    } catch (error) {
      reject(error);
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

// delete feedback

export async function deleteDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId); // Reference to the document
    await deleteDoc(docRef); // Deletes the document
    console.log("Deleted document with ID:", docId);
  } catch (error) {
    console.error("Error deleting document:", error);
  }
}
