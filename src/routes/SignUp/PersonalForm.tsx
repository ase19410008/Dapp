import React, { useCallback, useContext, useState } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import { AppContext } from '../../Context';
import { doc, setDoc } from '@firebase/firestore';
import { ref, uploadBytes } from '@firebase/storage';
import { useFirestore, useStorage, useUser } from 'reactfire';
import { file } from '@babel/types';

export default function PersonalForm() {
  const { formValues, handleChange, handleNext, handleBack } = React.useContext(AppContext);
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

    // setDoc(doc(db, 'teacher', user!.uid as string), {
    //   name: formValues.firstName.value,
    //   dob: formValues.dob.value,
    //   gender: formValues.gender.value
    // });

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
    const storageRef = ref(storage, 'images/' + file.name);

    uploadBytes(storageRef, file);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        基本情報
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
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
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="dob"
        label='生年月日'
        placeholder="2000/08/28"
        id="dob"
        onChange={handleChange}
        value={dob.value}
        error={!!dob.error}
      />
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
    </React.Fragment>
  );
}