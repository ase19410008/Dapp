import { useCallback, useContext } from 'react'
import {Box,
  TextField,
  Button } from '@mui/material'
import { AppContext } from '../../Context'

export default function AccountForm() {
  const { formValues, handleChange, handleNext } = useContext(AppContext)
  const { email, password } = formValues

  const handleSubmit = () => {
    let form = {}

    Object.keys(formValues).map((name) => {
      form = {
        email,
        password,
        [name]: formValues[name].value
      }
      return form
    })
    // Show last component or success message
    handleNext()
  }

  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ email, password }).some(
        (name) => (formValues[name].required && !formValues[name].value) || formValues[name].error
      ),
    [formValues, email, password]
  )

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
          <Box component="form" onSubmit={handleNext} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required={email.required}
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              value={email.value}
              error={!!email.error}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required={password.required}
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password.value}
              error={!!password.error}
              onChange={handleChange}
            />
          </Box>
        </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          sx={{ mt: 3, ml: 1 }}
          disabled={isError()}
          color='primary'
          onClick={!isError() ? handleSubmit : () => null}
        >
          次へ
        </Button>
      </Box>
    </>
  )
}