import * as React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Form } from 'react-router-dom';

export default function AccountForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        アカウント登録
      </Typography>
      <Form
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label='メールアドレス'
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label='パスワード'
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password_confirm"
              label='再確認用パスワード'
              type="password"
              id="password_confirm"
              autoComplete="current-password"
            />
          </Form>
    </React.Fragment>
  );
}