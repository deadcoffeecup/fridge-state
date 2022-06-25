// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFSXRBjfNbKGI0S2crViwXzjWwo9AXiMA',
  authDomain: 'fridge-state-171b8.firebaseapp.com',
  databaseURL:
    'https://fridge-state-171b8-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'fridge-state-171b8',
  storageBucket: 'fridge-state-171b8.appspot.com',
  messagingSenderId: '306293354819',
  appId: '1:306293354819:web:552c4a0ae73d970d87bff6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
