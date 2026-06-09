import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
        <label htmlFor="dashboard-name">Tên</label>
        <input id="dashboard-name" value={user.name} readOnly />
      </div>
      <div>
        <label htmlFor="dashboard-email">Email</label>
        <input id="dashboard-email" value={user.email} readOnly />
      </div>
      <div>
        <label htmlFor="dashboard-role">Vai trò</label>
        <input id="dashboard-role" value={user.role} readOnly />
      </div>
    </div>
  )
}
