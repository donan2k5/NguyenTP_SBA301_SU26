import { useFormContext } from '../../context/FormContext'

export default function FormField({ name, label, type = 'text', placeholder }) {
  const { state, dispatch } = useFormContext()
  const value = state.values[name]
  const error = state.errors[name]
  const touched = state.touched[name]

  let borderColor = '#ced4da'
  if (touched && error) borderColor = 'red'
  if (touched && !error) borderColor = 'green'

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          dispatch({ type: 'CHANGE', field: name, value: event.target.value })
        }
        onBlur={() => dispatch({ type: 'BLUR', field: name })}
        style={{ borderColor }}
      />
      {touched && error ? <p>{error}</p> : null}
    </div>
  )
}
