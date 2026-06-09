import { validateField } from '../utils/validators'

export const initialState = {
  values: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  errors: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  touched: {
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  status: 'idle',
}

export default function formReducer(state, action) {
  switch (action.type) {
    case 'CHANGE': {
      const values = { ...state.values, [action.field]: action.value }
      const errors = { ...state.errors }

      if (state.touched[action.field]) {
        errors[action.field] = validateField(action.field, action.value, values)
      }

      if (action.field === 'password' && state.touched.confirmPassword) {
        errors.confirmPassword = validateField(
          'confirmPassword',
          values.confirmPassword,
          values,
        )
      }

      return {
        ...state,
        values,
        errors,
      }
    }

    case 'BLUR': {
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
        errors: {
          ...state.errors,
          [action.field]: validateField(
            action.field,
            state.values[action.field],
            state.values,
          ),
        },
      }
    }

    case 'VALIDATE_ALL': {
      const errors = {
        fullName: validateField('fullName', state.values.fullName, state.values),
        email: validateField('email', state.values.email, state.values),
        password: validateField('password', state.values.password, state.values),
        confirmPassword: validateField(
          'confirmPassword',
          state.values.confirmPassword,
          state.values,
        ),
      }

      const hasError = Object.values(errors).some(Boolean)

      return {
        ...state,
        errors,
        touched: {
          fullName: true,
          email: true,
          password: true,
          confirmPassword: true,
        },
        status: hasError ? 'error' : state.status,
      }
    }

    case 'SET_STATUS':
      return {
        ...state,
        status: action.status,
      }

    case 'RESET':
      return initialState

    default:
      return state
  }
}
