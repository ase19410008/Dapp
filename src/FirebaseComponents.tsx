import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import {
  RouterProvider,
} from "react-router-dom";

import routes from "./routes/routes";

import { getAuth } from 'firebase/auth'; // Firebase v9+

import { AuthProvider, FirestoreProvider, StorageProvider, useFirebaseApp } from 'reactfire';
import { ReactElement } from 'react';
import { StepsProvider } from './Context';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from '@firebase/storage';

export function FirebaseComponents({ children }: any ): ReactElement {
  const app = useFirebaseApp();

  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>
          <StepsProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <RouterProvider router={routes} />
            </ThemeProvider>
          </StepsProvider>
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}