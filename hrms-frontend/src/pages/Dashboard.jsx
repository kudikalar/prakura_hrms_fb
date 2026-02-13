import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Layout from "../components/Layout";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Layout>
      <div className="page-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <div>
            <h3>HRMS</h3>

            <NavLink to="/dashboard">🏠 Dashboard</NavLink>
            <NavLink to="/employees">👨‍💼 Employees</NavLink>
            <NavLink to="/departments">🏢 Departments</NavLink>
            <NavLink to="/attendance">🕒 Attendance</NavLink>
            <NavLink to="/reports">📊 Reports</NavLink>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="card">
            <div className="dashboard-header">
              <h2>Dashboard</h2>
              <span className="welcome-text">Welcome Admin 👋</span>
            </div>
          </div>

          <div className="stats-grid">
            <div className="card stat-card">
              <h3>Total Employees</h3>
              <p className="stat-number text-indigo">120</p>
            </div>

            <div className="card stat-card">
              <h3>Total Departments</h3>
              <p className="stat-number text-green">8</p>
            </div>

            <div className="card stat-card">
              <h3>Active Projects</h3>
              <p className="stat-number text-yellow">15</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}