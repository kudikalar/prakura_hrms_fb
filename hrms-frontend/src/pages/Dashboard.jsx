import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif",
      background: "#f1f5f9",
    },

    sidebar: {
      width: "250px",
      background: "linear-gradient(180deg, #0f172a, #1e293b)",
      color: "white",
      padding: "30px 20px",
      boxShadow: "5px 0 20px rgba(0,0,0,0.3)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    logo: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "40px",
      textAlign: "center",
      letterSpacing: "1px",
    },

    menu: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },

    menuItem: {
      textDecoration: "none",
      padding: "12px 15px",
      borderRadius: "8px",
      fontSize: "15px",
      fontWeight: "500",
      transition: "0.3s",
    },

    activeMenu: {
      background: "#334155",
      color: "white",
    },

    content: {
      flex: 1,
      padding: "30px",
    },

    navbar: {
      background: "white",
      padding: "15px 25px",
      borderRadius: "10px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      marginBottom: "25px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    logoutBtn: {
      padding: "8px 15px",
      borderRadius: "6px",
      border: "none",
      background: "#ef4444",
      color: "white",
      cursor: "pointer",
    },

    cardGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px",
    },

    card: {
      background: "white",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
      transition: "0.3s",
    },
  };

  const getNavStyle = ({ isActive }) => ({
    ...styles.menuItem,
    color: isActive ? "white" : "#cbd5e1",
    background: isActive ? "#334155" : "transparent",
  });

  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div>
          <div style={styles.logo}>HRMS</div>

          <div style={styles.menu}>
            <NavLink to="/dashboard" style={getNavStyle}>
              🏠 Dashboard
            </NavLink>

            <NavLink to="/employees" style={getNavStyle}>
              👨‍💼 Employees
            </NavLink>

            <NavLink to="/departments" style={getNavStyle}>
              🏢 Departments
            </NavLink>

            <NavLink to="/attendance" style={getNavStyle}>
              🕒 Attendance
            </NavLink>

            <NavLink to="/reports" style={getNavStyle}>
              📊 Reports
            </NavLink>
          </div>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <div style={styles.navbar}>
          <h2>Dashboard</h2>
          <span>Welcome Admin 👋</span>
        </div>

        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <h3>Total Employees</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>120</p>
          </div>

          <div style={styles.card}>
            <h3>Total Departments</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>8</p>
          </div>

          <div style={styles.card}>
            <h3>Active Projects</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>15</p>
          </div>
        </div>
      </div>
    </div>
  );
}
