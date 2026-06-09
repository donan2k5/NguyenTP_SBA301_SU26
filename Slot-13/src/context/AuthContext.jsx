import { createContext, useContext, useState } from 'react'
import USERS from '../data/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (email, password) => {
    setLoading(true)
    setError('')

    await new Promise((resolve) => setTimeout(resolve, 800))

    const matchedUser = USERS.find(
      (item) => item.email === email && item.password === password,
    )

    if (matchedUser) {
      setUser({
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
      })
      setLoading(false)
      return true
    }

    setError('Email hoặc mật khẩu không đúng.')
    setLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    setError('')
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth phải dùng trong <AuthProvider>')
  }

  return context
}
