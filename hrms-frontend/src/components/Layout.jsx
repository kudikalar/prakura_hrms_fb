import { useAuth } from "../context/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // Show back button on everything except dashboard root
  const showBackButton = !location.pathname.startsWith("/dashboard");

  const handleBackToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div>
      {/* Header */}
      <header className="app-header">
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {showBackButton && (
            <button
              onClick={handleBackToDashboard}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "white",
              }}
            >
              ← Dashboard
            </button>
          )}

          <div className="logo">HRMS Admin Panel</div>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      {/* Page Content */}
      <main className="app-content">{children}</main>
    </div>
  );
} 