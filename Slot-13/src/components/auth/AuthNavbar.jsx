import { useAuth } from '../../context/AuthContext'

export default function AuthNavbar() {
  const { user, logout } = useAuth()

  return (
    <div>
      <strong>Auth Navbar</strong>
      {user ? (
        <div>
          <span>Xin chào, {user.name}</span>
          <button onClick={logout}>Đăng xuất</button>
        </div>
      ) : (
        <p>Chưa đăng nhập</p>
      )}
    </div>
  )
}
