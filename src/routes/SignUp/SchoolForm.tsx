import React, { useCallback, useContext } from 'react'
import {Typography,
  Box,
  TextField,
  Button,
  MenuItem } from '@mui/material';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { AppContext } from '../../Context';
// import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useFirestore, useUser } from 'reactfire';

const schools = [
  {
    value: '学校法人朴沢学園仙台大学附属明成高等学校',
    label: '学校法人朴沢学園仙台大学附属明成高等学校',
  },
  {
    value: '東北学院中学校・高等学校',
    label: '東北学院中学校・高等学校',
  },
  {
    value: '宮城学院中学校高等学校',
    label: '宮城学院中学校高等学校',
  },
  {
    value: '仙台城南高等学校',
    label: '仙台城南高等学校',
  },
  {
    value: '聖ドミニコ学院高等学校',
    label: '聖ドミニコ学院高等学校',
  },
  {
    value: '学校法人南光学園東北高等学校',
    label: '学校法人南光学園東北高等学校',
  },
  {
    value: '仙台育英学園高等学校',
    label: '仙台育英学園高等学校',
  },
  {
    value: '学校法人三島学園東北生活文化大学高等学校',
    label: '学校法人三島学園東北生活文化大学高等学校',
  },
  {
    value: '聖和学園高等学校',
    label: '聖和学園高等学校',
  },
  {
    value: '仙台白百合学園高等学校',
    label: '仙台白百合学園高等学校',
  },
  {
    value: '常盤木学園高等学校',
    label: '常盤木学園高等学校',
  },
  {
    value: '東北学院榴ケ岡高等学校',
    label: '東北学院榴ケ岡高等学校',
  },
  {
    value: '尚絅学院高等学校',
    label: '尚絅学院高等学校',
  },
];

const subjects = [
  {
    value: '国語',
    label: '国語',
  },
  {
    value: '数学',
    label: '数学',
  },
  {
    value: '英語',
    label: '英語',
  },
  {
    value: '理科',
    label: '理科',
  },
  {
    value: '社会',
    label: '社会',
  },
];

export default function SchoolForm() {
  const { formValues, handleChange, handleNext, handleBack} = React.useContext(AppContext);
  const { school, subject, years, position } = formValues;

  const handleSubmit = () => {
    let form = {}

    Object.keys(formValues).map((name) => {
      form = {
        school,
        years,
        subject,
        position,
        [name]: formValues[name].value
      }
      return form
    })

    handleNext();
  };

  // Check if all values are not empty and if there are some errors
  const isError = useCallback(
    () =>
      Object.keys({ school, years, subject, position }).some(
        (name) => (formValues[name].required && !formValues[name].value) || formValues[name].error
      ),
    [formValues, school, years, subject, position]
  )

  return (
    <>
      <Typography variant="h6" gutterBottom>
        在籍情報
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="school"
        label='学校名'
        placeholder="FSG"
        name="school"
        value={school.value}
        error={!!school.error}
        autoComplete="firstName"
        autoFocus
        select
        onChange={handleChange}
        defaultValue="仙台城南高等学校"
      >
        {schools.map((school) => (
            <MenuItem key={school.value} value={school.value}>
              {school.label}
            </MenuItem>
          ))}
      </TextField>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="subject"
        label='教科'
        placeholder="国語"
        id="subject"
        select
        defaultValue="国語"
        onChange={handleChange}
        value={subject.value}
        error={!!subject.error}
      >
        {subjects.map((subject) => (
            <MenuItem key={subject.value} value={subject.value}>
              {subject.label}
            </MenuItem>
          ))}
      </TextField>
      <TextField
        fullWidth
        select
        SelectProps={{
          native: true
        }}
        label="職位"
        name="position"
        value={position.value}
        onChange={handleChange}
        error={!!position.error}
        helperText={position.error}
        required={true}
      >
        <option value="担任">担任</option>
        <option value="学年主任">学年主任</option>
          </TextField>
        <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="years"
        label='勤続年数'
        id="years"
        onChange={handleChange}
        value={years.value}
        error={!!years.error}
      />
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