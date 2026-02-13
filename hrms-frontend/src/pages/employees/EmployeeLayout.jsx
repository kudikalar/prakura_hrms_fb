import { NavLink, Outlet } from "react-router-dom";

export default function EmployeeLayout() {

  const styles = {
    layout: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Segoe UI, sans-serif",
    },
    sidebar: {
      width: "240px",
      background: "linear-gradient(180deg, #0f172a, #1e293b)",
      padding: "30px 20px",
      color: "white",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "30px",
    },
    link: {
      display: "block",
      padding: "10px",
      borderRadius: "8px",
      textDecoration: "none",
      marginBottom: "10px",
      transition: "0.3s",
    },
    content: {
      flex: 1,
      padding: "40px",
      background: "#f1f5f9",
    }
  };

  const navStyle = ({ isActive }) => ({
    ...styles.link,
    background: isActive ? "#334155" : "transparent",
    color: isActive ? "white" : "#cbd5e1"
  });

  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <div style={styles.title}>Employee Panel</div>

        <NavLink to="create" style={navStyle}>
          ➕ Create Employee
        </NavLink>

        <NavLink to="edit" style={navStyle}>
          ✏️ Edit Employee
        </NavLink>

        <NavLink to="delete" style={navStyle}>
          ❌ Delete Employee
        </NavLink>
      </div>

      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
