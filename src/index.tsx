import ReactDOM from 'react-dom/client';

import { FirebaseAppProvider } from 'reactfire';
import { FirebaseComponents } from './FirebaseComponents';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as HTMLElement);

const firebaseConfig = {
  apiKey: "AIzaSyD9-42e2sc27GTi7aZFxQza2ZsB5D6IUJc",
  authDomain: "react-auth-2ed3c.firebaseapp.com",
  projectId: "react-auth-2ed3c",
  storageBucket: "react-auth-2ed3c.appspot.com",
  messagingSenderId: "578714896507",
  appId: "1:578714896507:web:6ba40719f983c76b75fade"
};

root.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <FirebaseComponents />
  </FirebaseAppProvider>
);
