import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

import { 
  useAuth, 
} from 'reactfire';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

const theme = createTheme();

type FormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { handleSubmit, control, formState: { errors} } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onChange"
  });

  const auth = useAuth();
  const navigate = useNavigate();
  const [signIn, setsignIn] = React.useState(false);

  const onSubmit: SubmitHandler<FormValues> = data => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
      })
      .catch((e) => {
        // const errorCode = e.code;
        // const errorMessage = e.message;
        // alert(errorCode + errorMessage);
        setsignIn(true);
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ???????????????
          </Typography>
          <Box component="form" onSubmit={(handleSubmit(onSubmit))} noValidate sx={{ mt: 1 }}>
            {signIn && <Alert severity="error">
              <AlertTitle>???????????????????????????????????????</AlertTitle></Alert>}
            <Controller
              name="email"
              control={control}
              rules={{
                required: '??????????????????????????????????????????',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "???????????????????????????????????????????????????"
                }
              }}
              render={({ field: { onChange,
                onBlur,
                value,
                name, ref },
              fieldState: { isTouched,
                isDirty,
                error} }) => (<TextField value={value}
                  fullWidth
                  label="?????????????????????"
                  type="email"
                  placeholder='example@mail.com'
                  error={!!error?.message}
                  onChange={onChange}
                  helperText={error?.message} />)}/>

            <Controller
              name='password'
              control={control}
              rules={{
                required: '????????????????????????????????????',
                minLength: {
                  value: 4,
                  message: '??????????????????4?????????????????????'
                }
              }}
              render={({ field, fieldState }) => (
                <TextField
                {...field}
              margin="normal"
              fullWidth
              label="???????????????"
              type="password"
              id="password"
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
              autoComplete= "current-password"
            />
              )}/>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="?????????????????????????????????"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ???????????????
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">
                  ????????????????????????
                </Link>
              </Grid>
              <Grid item>
                <Link to="signup">{"??????????????????"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}