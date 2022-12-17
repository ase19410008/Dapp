import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

import {
  RouterProvider,
} from "react-router-dom";

import routes from "./routes/routes";

import { getAuth } from 'firebase/auth'; // Firebase v9+
import { getDatabase } from 'firebase/database'; // Firebase v9+

import { DatabaseProvider, AuthProvider, useFirebaseApp } from 'reactfire';

export function FirebaseComponents({ children }) {
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const database = getDatabase(app);
  const auth = getAuth(app);

  // any child components will be able to use `useUser`, `useDatabaseObjectData`, etc
  return (
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={routes} />
        </ThemeProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}