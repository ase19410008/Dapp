import { useCallback, useContext, useState } from 'react'
import {
  Typography,
  Box,
  TextField,
  FormControlLabel,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
  Stack
} from '@mui/material';
import { AppContext } from '../../Context';
import { doc, setDoc } from '@firebase/firestore';
import { ref, uploadBytes } from '@firebase/storage';
import { useFirestore, useStorage, useUser } from 'reactfire';

import moment, { Moment } from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function PersonalForm() {
  const { formValues, handleChange, handleNext, handleBack } = useContext(AppContext);
  const { firstName, dob, gender } = formValues;
  const { status, data: user} = useUser();
  const storage = useStorage();
  const db = useFirestore();

  const handleSubmit = () => {
    let form = {}

    Object.keys(formValues).map((name) => {
      form = {
        firstName,
        dob,
        gender,
        [name]: formValues[name].value
      }
      return form
    })

    handleNext();
  };

  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ firstName, dob }).some(
        (name) => (formValues[name].required && !formValues[name].value) || formValues[name].error
      ),
    [formValues, firstName, dob, gender]
  )

  const fileUpload = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    /*const storageRef = ref(storage, 'images/' + file.name);

    uploadBytes(storageRef, file);*/
  }

  const [date, setDate] = useState<Date | null>(null);

  const handlePicker = (newValue: Date | null) => {
    setDate(newValue);
  };


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
          <Box component="form" onSubmit={handleNext} sx={{ mt: 1 }}></Box>
      <Typography variant="h6" gutterBottom>
        基本情報
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        id="firstName"
        label='氏名'
        placeholder="佐久間　雄大"
        name="firstName"
        value={firstName.value}
        error={!!firstName.error}
        autoComplete="firstName"
        autoFocus
        onChange={handleChange}
      />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Stack spacing={1}>
          <DesktopDatePicker
            label="生年月日"
            inputFormat="YYYY/MM/DD"
            value={date}
            onChange={handlePicker}
            renderInput={(params) => <TextField {...params} />}
          />
          </Stack>
        </LocalizationProvider>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">性別</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
          >
            <FormControlLabel value="male" control={<Radio />} label="男性" />
            <FormControlLabel value="female" control={<Radio />} label="女性" />
            <FormControlLabel value="other" control={<Radio />} label="その他" />
        </RadioGroup>
      </FormControl>
      <Typography>プロフィール画像</Typography>
      <Button variant="contained" component="label">
        アップロード
        <input hidden accept="image/*" type="file"
        onChange={fileUpload}
        />
      </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button
          variant='contained'
          sx={{ mt: 3, ml: 1 }}
          disabled={isError()}
          color='primary'
          onClick={handleBack}
        >
          戻る
        </Button>
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
  );
}