import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px 30px",
      backgroundColor: "#1e3c72",
      color: "white",
    },
    logo: {
      fontSize: "18px",
      fontWeight: "bold",
      letterSpacing: "1px",
    },
    links: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    link: {
      color: "white",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
    activeLink: {
      borderBottom: "2px solid white",
      paddingBottom: "2px",
    },
    logoutBtn: {
      backgroundColor: "#ff4d4d",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      color: "white",
      cursor: "pointer",
      fontSize: "13px",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>HRMS Portal</div>

      <div style={styles.links}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.activeLink }
              : styles.link
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          style={({ isActive }) =>
            isActive
              ? { ...styles.link, ...styles.activeLink }
              : styles.link
          }
        >
          Employees
        </NavLink>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
