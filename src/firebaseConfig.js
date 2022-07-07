import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getMessaging } from 'firebase/messaging';

import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
// export const messaging = getMessaging(app);
