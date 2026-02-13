import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import logo from "../assets/logo.png"; // 👈 Put your logo inside src/assets

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "EMPLOYEE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ===============================
  // Handle Input Change
  // ===============================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ===============================
  // Clear Form
  // ===============================
  const handleClear = () => {
    setFormData({
      email: "",
      password: "",
      role: "EMPLOYEE",
    });
    setError("");
  };

  // ===============================
  // Handle Login
  // ===============================
  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", formData);

      if (!res?.data?.token) {
        setError("Invalid server response.");
        return;
      }

      login(res.data.token);
      navigate("/dashboard", { replace: true });

    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message;

      if (!err.response) {
        setError("Server not reachable.");
      } else if (status === 401) {
        setError(msg || "Invalid email or password.");
      } else {
        setError(msg || "Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        {/* Logo */}
        <div className="logo-container">
          <img src={logo} alt="Company Logo" />
        </div>

        <h2>Welcome Back</h2>
        <p className="subtitle">Access your HRMS Dashboard</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleLogin} noValidate>

          {/* Role Selection */}
          <div className="input-group">
            <label>Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="ADMIN">Admin</option>
              <option value="HR">HR</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Buttons */}
          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              className="clear-btn"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>

        </form>

        {/* Forgot Password */}
        <div className="forgot">
          <span onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </span>
        </div>

        <p className="footer">
          © {new Date().getFullYear()} HRMS Enterprise Suite
        </p>

      </div>

      <style jsx="true">{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a, #312e81, #1e293b);
          padding: 20px;
          font-family: "Segoe UI", sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(18px);
          border-radius: 18px;
          padding: 35px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          color: white;
        }

        .logo-container {
          text-align: center;
          margin-bottom: 15px;
        }

        .logo-container img {
          height: 60px;
        }

        .subtitle {
          text-align: center;
          font-size: 14px;
          color: #cbd5e1;
          margin-bottom: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
        }

        .input-group input,
        .input-group select {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.15);
          color: white;
          outline: none;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        button {
          flex: 1;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #6366f1;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .clear-btn {
          background: #475569;
        }

        .error-box {
          background: rgba(127, 29, 29, 0.9);
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 15px;
          border: 1px solid #ef4444;
        }

        .forgot {
          text-align: right;
          margin-top: 10px;
          font-size: 13px;
          cursor: pointer;
          color: #a5b4fc;
        }

        .forgot span:hover {
          text-decoration: underline;
        }

        .footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}