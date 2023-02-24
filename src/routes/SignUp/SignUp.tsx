import { useContext } from 'react'
import {Box,
  Stepper,
  Step,
  StepLabel,
  Typography } from '@mui/material/'
import AccountForm from './AccountForm'
import PersonalForm from './PersonalForm'
import SchoolForm from './SchoolForm'
import { AppContext } from '../../Context'
import Home from '../Home/Home'

const labels = ['アカウント', '基本情報', '在籍情報']
const handleSteps = (step: number) => {
  switch (step) {
    case 0:
      return <AccountForm />
    case 1:
      return <PersonalForm />
    case 2:
      return <SchoolForm />
    default:
      throw new Error('不明なステップ')
  }
}

export default function SignUp() {
  const { activeStep } = useContext(AppContext)

  return (
    <>
      {activeStep === labels.length ? (
        <Home />
      ) : (
        <>
          <Box sx={{ my: 5 }}>
            <Typography variant='h4' align='center'>
              教師用アカウント登録
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