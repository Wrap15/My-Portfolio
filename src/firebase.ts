import { initializeApp } from 'firebase/app';
import { getFirestore, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

export const submitContactForm = async (data: { name: string; email: string; message: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding document: ', error);
    // As per guidelines, throw context-aware error
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      operationType: 'create',
      path: 'contactMessages',
      authInfo: {
        userId: null, // Public form, no auth
        email: null,
      }
    };
    throw new Error(JSON.stringify(errInfo));
  }
};
