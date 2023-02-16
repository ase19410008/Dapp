import React, { useCallback, useContext } from 'react'
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppContext } from '../../Context';
import { addDoc, collection, doc, setDoc } from '@firebase/firestore';
import { useFirestore, useUser } from 'reactfire';

export default function SchoolForm() {
  const { formValues, handleChange, handleNext } = React.useContext(AppContext);
  const { school, subject, years, position } = formValues;
  const { status, data: user} = useUser();
  const db = useFirestore();

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

    setDoc(doc(db, 'teachers', user!.uid as string), {
      school: formValues.school.value,
      years: formValues.years.value,
      subject: formValues.subject.value,
      position: formValues.position.value,
    }, {
      merge: true
    });

    console.log("test");
    const ref = doc(db, 'schools/国際情報工科自動車大学校/');
    const ref2 = collection(ref, 'teachers');
    console.log(ref2);
    console.log("here");

    /*addDoc(ref2, {
      name: formValues.firstName.value
    });*/
    setDoc(doc(db, 'schools/国際情報工科自動車大学校/teachers', user!.uid), {
      name: formValues.firstName.value
    });
    // handleNext();
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
    <React.Fragment>
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
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="subject"
        label='教科'
        placeholder="国語"
        id="subject"
        onChange={handleChange}
        value={subject.value}
        error={!!subject.error}
      />
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
        required={position.required}
      >
        <option value=""> </option>
        <option value="A">担任</option>
        <option value="B">学年主任</option>
          </TextField>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant='contained'
          sx={{ mt: 3, ml: 1 }}
          disabled={isError()}
          color='primary'
          onClick={!isError() ? handleSubmit : () => null}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}

// https://zenn.dev/isosa/articles/037ed47ee3dfe5