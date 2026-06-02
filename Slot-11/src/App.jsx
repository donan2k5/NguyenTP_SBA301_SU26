import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Ex01_BasicCounter    from './pages/Ex01_BasicCounter'
import Ex02_CounterWithStep from './pages/Ex02_CounterWithStep'
import Ex03_TodoList        from './pages/Ex03_TodoList'
import Ex04_ShoppingCart    from './pages/Ex04_ShoppingCart'
import Ex05_FormValidation  from './pages/Ex05_FormValidation'
import Ex06_LoginForm       from './pages/Ex06_LoginForm'

function Home({ currentUser }) {
  return (
    <Container className="py-5 text-center">
      <h1>useReducer – Bài tập thực hành</h1>
      <p className="text-muted">
        Xin chao, {currentUser.fullName || currentUser.username}. Chon bai tap tu thanh dieu huong phia tren
      </p>
    </Container>
  )
}

function LoginPage({ onLoginSuccess, isAuthenticated }) {
  const navigate = useNavigate()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  function handleLoginSuccess(user) {
    onLoginSuccess(user)
    navigate('/', { replace: true })
  }

  return <Ex06_LoginForm onLoginSuccess={handleLoginSuccess} />
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <BrowserRouter>
      {currentUser && (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={NavLink} to="/">useReducer</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav className="ms-auto">
                <Nav.Link as={NavLink} to="/ex01">Bài 1 – Counter</Nav.Link>
                <Nav.Link as={NavLink} to="/ex02">Bài 2 – Step</Nav.Link>
                <Nav.Link as={NavLink} to="/ex03">Bài 3 – Todo</Nav.Link>
                <Nav.Link as={NavLink} to="/ex04">Bài 4 – Cart</Nav.Link>
                <Nav.Link as={NavLink} to="/ex05">Bài 5 – Form</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}

      <Container className="py-4">
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
                isAuthenticated={!!currentUser}
                onLoginSuccess={setCurrentUser}
              />
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={!!currentUser}>
                <Home currentUser={currentUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ex01"
            element={
              <ProtectedRoute isAuthenticated={!!currentUser}>
                <Ex01_BasicCounter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ex02"
            element={
              <ProtectedRoute isAuthenticated={!!currentUser}>
                <Ex02_CounterWithStep />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ex03"
            element={
              <ProtectedRoute isAuthenticated={!!currentUser}>
                <Ex03_TodoList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ex04"
            element={
              <ProtectedRoute isAuthenticated={!!currentUser}>
                <Ex04_ShoppingCart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ex05"
            element={
              <ProtectedRoute isAuthenticated={!!currentUser}>
                <Ex05_FormValidation />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={currentUser ? '/' : '/login'} replace />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}
