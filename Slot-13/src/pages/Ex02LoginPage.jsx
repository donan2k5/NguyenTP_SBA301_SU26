import AuthNavbar from '../components/auth/AuthNavbar'
import Dashboard from '../components/auth/Dashboard'
import LoginForm from '../components/auth/LoginForm'
import { AuthProvider, useAuth } from '../context/AuthContext'

function PageContent() {
  const { user } = useAuth()

  return (
    <div>
      <AuthNavbar />
      {user ? <Dashboard /> : <LoginForm />}
    </div>
  )
}

export default function Ex02LoginPage() {
  return (
    <AuthProvider>
      <PageContent />
    </AuthProvider>
  )
}
