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
    navigate('home')
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
            サインイン
          </Typography>
          <Box component="form" onSubmit={(handleSubmit(onSubmit))} noValidate sx={{ mt: 1 }}>
            {signIn && <Alert severity="error">
              <AlertTitle>サインインに失敗しました。</AlertTitle></Alert>}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'メールアドレスが未入力です。',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "メールアドレスの形式ではありません"
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
                  label="メールアドレス"
                  type="email"
                  placeholder='example@mail.com'
                  error={!!error?.message}
                  onChange={onChange}
                  helperText={error?.message} />)}/>

            <Controller
              name='password'
              control={control}
              rules={{
                required: 'パスワードが未入力です。',
                minLength: {
                  value: 4,
                  message: 'パスワードは4文字以上です。'
                }
              }}
              render={({ field, fieldState }) => (
                <TextField
                {...field}
              margin="normal"
              fullWidth
              label="パスワード"
              type="password"
              id="password"
              error={!!fieldState.error?.message}
              helperText={fieldState.error?.message}
              autoComplete= "current-password"
            />
              )}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              サインイン
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">
                  パスワードを変更
                </Link>
              </Grid>
              <Grid item>
                <Link to="signup">{"サインアップ"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}