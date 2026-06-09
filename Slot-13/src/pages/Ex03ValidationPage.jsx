import RegistrationForm from '../components/form/RegistrationForm'
import { FormProvider } from '../context/FormContext'

export default function Ex03ValidationPage() {
  return (
    <FormProvider>
      <RegistrationForm />
    </FormProvider>
  )
}
