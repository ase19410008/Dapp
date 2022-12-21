import React, { useContext } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import AccountForm from './AccountForm'
import PersonalForm from './PersonalForm'
import SchoolForm from './SchoolForm'
import { AppContext } from '../../Context'

// Step titles
const labels = ['First Step', 'Second Step', 'Confirmation']
const handleSteps = (step: number) => {
  switch (step) {
    case 0:
      return <AccountForm />
    case 1:
      return <PersonalForm />
    case 2:
      return <SchoolForm />
    default:
      throw new Error('Unknown step')
  }
}

export default function SignUp() {
  const { activeStep } = useContext(AppContext)

  return (
    <>
      {activeStep === labels.length ? (
        <AccountForm />
      ) : (
        <>
          <Box sx={{ my: 5 }}>
            <Typography variant='h4' align='center'>
              Multi Step Form
            </Typography>
            <Typography variant='subtitle2' align='center' sx={{ mt: 2 }}>
              React Material UI multi step form with basic form validation logic.
            </Typography>
          </Box>
          <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
            {labels.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {handleSteps(activeStep)}
        </>
      )}
    </>
  )
}