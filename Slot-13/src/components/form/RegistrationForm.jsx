import { useFormContext } from '../../context/FormContext'
import { validateField } from '../../utils/validators'
import FormField from './FormField'

export default function RegistrationForm() {
  const { state, dispatch } = useFormContext()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch({ type: 'VALIDATE_ALL' })

    const hasError = Object.entries(state.values).some(([field, value]) => {
      return validateField(field, value, state.values) !== ''
    })

    if (hasError) {
      return
    }

    dispatch({ type: 'SET_STATUS', status: 'submitting' })
    await new Promise((resolve) => setTimeout(resolve, 1000))
    dispatch({ type: 'SET_STATUS', status: 'success' })
  }

  if (state.status === 'success') {
    return (
      <div>
        <p>Đăng ký thành công.</p>
        <button onClick={() => dispatch({ type: 'RESET' })}>Đăng ký lại</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField name="fullName" label="Họ và tên" />
      <FormField name="email" label="Email" type="email" />
      <FormField name="password" label="Mật khẩu" type="password" />
      <FormField
        name="confirmPassword"
        label="Xác nhận mật khẩu"
        type="password"
      />

      {state.status === 'error' ? <p>Form có lỗi. Vui lòng kiểm tra lại.</p> : null}

      <button type="submit" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Đang xử lý...' : 'Đăng ký'}
      </button>
    </form>
  )
}
