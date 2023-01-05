import ReactDOM from 'react-dom/client';

import { FirebaseAppProvider } from 'reactfire';
import { FirebaseComponents } from './FirebaseComponents';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLElement);

const firebaseConfig = {
  // apiKey: "AIzaSyD9-42e2sc27GTi7aZFxQza2ZsB5D6IUJc",
  // authDomain: "react-auth-2ed3c.firebaseapp.com",
  // projectId: "react-auth-2ed3c",
  // storageBucket: "react-auth-2ed3c.appspot.com",
  // messagingSenderId: "578714896507",
  // appId: "1:578714896507:web:6ba40719f983c76b75fade"
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <FirebaseComponents />
  </FirebaseAppProvider>
);
