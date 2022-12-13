import { Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// import { useIntl } from 'react-intl'
import { useTheme } from '@mui/material/styles'

const Edit = ({ redirectTo = '/' }) => {
  // const intl = useIntl()
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const [username, setUsername] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
        <div >
          <form
            style={{ marginTop: theme.spacing(1) }}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label='学校名'
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name=""
              label='創立念'
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="addr"
              label='住所'
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label='最寄駅'
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="tel"
              label='電話番号'
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="mailaddr"
              label="メールアドレス"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name=""
              label="URL"
              id=""
            />
            <Button variant="contained" component="label"
              style={{ margin: theme.spacing(3, 0, 2) }}>
              学校写真アップロード
              <input hidden accept="image/*" multiple type="file" />
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: theme.spacing(3, 0, 2) }}
            >
              更新
            </Button>
          </form>
        </div>
  )
}

export default Edit