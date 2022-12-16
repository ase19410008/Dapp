import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';

export default function PersonalForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        基本情報
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <form
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              value=""
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="fullname"
              label='氏名'
              placeholder="佐久間　雄大"
              name="fullname"
              autoComplete="fullname"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="dob"
              label='生年月日'
              placeholder="2000/08/28"
              id="dob"
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">性別</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                <FormControlLabel value="female" control={<Radio />} label="女性" />
                <FormControlLabel value="male" control={<Radio />} label="男性" />
              </RadioGroup>
            </FormControl>
            <Typography>プロフィール画像</Typography>
            <Button variant="contained" component="label">
              アップロード
              <input hidden accept="image/*" multiple type="file" />
            </Button>
          </form>
          </Box>
    </React.Fragment>
  );
}