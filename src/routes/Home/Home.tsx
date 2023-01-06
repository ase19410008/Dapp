import {
  AppBar,
  Button,
  Typography,
  Toolbar,
  Card,
  Box,
  Stack,
  Avatar,
  IconButton
} from "@mui/material";
import { useFirebaseApp } from "reactfire";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, getStorage, ref } from "@firebase/storage";
import { useState } from "react";

export default function Home() {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  const navigate = useNavigate();
  const storage = getStorage();
  const pathRef = ref(storage, 'images/' + auth.currentUser!.uid + "jpeg");
  const [imageUrl, setImageUrl] = useState("");
  
  getDownloadURL(pathRef).then(function (url) {
    console.log(url);
    setImageUrl(url);
  });
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
      {/* <pre>
          {auth.currentUser ? JSON.stringify(auth.currentUser, null, 2) : null}
      </pre> */}

      <Card>
        <Box sx={{ p: 2, display: 'flex' }}>
          <Avatar variant="rounded" 
            src={imageUrl} />
          <Stack spacing={0.5}>
            <Typography fontWeight={700}>{auth.currentUser!.displayName}</Typography>
          </Stack>
          {/* <IconButton>
            <Edit sx={{ fontSize: 14 }} />
          </IconButton> */}
        </Box>
        {/* <Divider />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1, bgcolor: 'background.default' }}
        >
          <Chip>Active account</Chip>
          <Switch />
        </Stack> */}
      </Card>
    </>
  );
};
