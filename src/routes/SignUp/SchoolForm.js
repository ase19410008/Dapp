import * as React from 'react';
import { Button,
  Typography,
  TextField
} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Autocomplete from '@mui/material/Autocomplete';

const subjects = [
  {label: '国語'}, 
  {label: '数学'}, 
];

export default function Review() {
  return (
    <React.Fragment>
       <div
          className={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
          }}
        >
          <Typography component="h1" variant="h5">
            サインアップ
          </Typography>

          <form
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="school"
              label="学校名"
              name="school"
              autoFocus
            />
            <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={subjects}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="教科名" />}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="club"
              label='部活動'
              placeholder=""
              id="club"
            />
            <TextField
              type="number"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="yow"
              label='勤続年数'
              placeholder="1"
              id="yow"
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">役職</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                <FormControlLabel value="" control={<Radio />} label="担任" />
                <FormControlLabel value="" control={<Radio />} label="学年主任" />
                <FormControlLabel value="" control={<Radio />} label="生活指導" />
              </RadioGroup>
            </FormControl>
          </form>
        </div>
    </React.Fragment>
  );
}