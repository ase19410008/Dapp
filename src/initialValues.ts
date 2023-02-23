import { ValidationSchema } from './Context'

export const initialValues: ValidationSchema = {
  firstName: {
    value: '',
    error: '',
    required: true,
    minLength: 2,
    maxLength: 20,
    helperText: 'Custom error message'
  },
  lastName: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 20
  },
  email: {
    value: '',
    error: '',
    required: true,
    validate: 'email'
  },
  gender: {
    value: '',
    error: '',
    validate: 'select'
  },
  date: {
    value: '',
    error: ''
  },
  dob: {
    value: '',
    error: ''
  },
  city: {
    value: '',
    error: '',
    validate: 'text',
    minLength: 3,
    maxLength: 20
  },
  agreenemt: {
    value: false,
    error: '',
    required: true,
    validate: 'checkbox',
    helperText: 'Please accept our terms and conditions'
  },
  phone: {
    value: '',
    error: '',
    validate: 'phone',
    maxLength: 15
  },
  password: {
    value: '',
    error: '',
    required: true,
  },
  school: {
    value: '',
    error: '',
    required: true,
    helperText: '学校名を入れてください。'
  },
  years: {
    value: '',
    error: '',
    required: true,
    validate: 'number',
    helperText: '勤続年数を入れてください。'
  },
  subject: {
    value: '',
    error: '',
    required: true,
    helperText: '教科名を入れてください。'
  },
  position: {
    value: '',
    error: '',
    validate: 'select',
    required: true,
  },
}