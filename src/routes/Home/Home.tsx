import {
  AppBar,
  Button,
  Typography,
  Toolbar
} from "@mui/material";
import { useFirebaseApp } from "reactfire";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const navigate = useNavigate();

  return (
    <>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography>HOME</Typography>
          <Button
              onClick={async () => {
                await signOut(auth);
                navigate("/");
              }}
            >
              SIGN OUT
            </Button>
          {/* <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography> */}
        </Toolbar>
      </AppBar>
      <pre>
          {auth.currentUser ? JSON.stringify(auth.currentUser, null, 2) : null}
      </pre>
    </>
  );
};
