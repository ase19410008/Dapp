import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import {
  RouterProvider,
} from "react-router-dom";

import routes from "./routes/routes";

import { getAuth } from 'firebase/auth'; // Firebase v9+

import { AuthProvider, FirestoreProvider, useFirebaseApp } from 'reactfire';
import { ReactElement } from 'react';
import { StepsProvider } from './Context';
import { getFirestore } from 'firebase/firestore';

export function FirebaseComponents({ children }: any ): ReactElement {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

  // initialize Firestore and Auth with the normal Firebase SDK functions
  const firestore = getFirestore(app);
  const auth = getAuth(app);

  // any child components will be able to use `useUser`, `useDatabaseObjectData`, etc
  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StepsProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={routes} />
          </ThemeProvider>,
        </StepsProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}