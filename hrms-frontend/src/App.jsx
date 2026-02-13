import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AuthProvider from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// Employee nested pages
import EmployeeLayout from "./pages/employees/EmployeeLayout";
import CreateEmployee from "./pages/employees/CreateEmployee";
import EditEmployee from "./pages/employees/EditEmployee";
import DeleteEmployee from "./pages/employees/DeleteEmployee";


// =========================
// Protected Route
// =========================
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

// =========================
// Public Route (Login)
// =========================
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : children;
}


// =========================
// APP
// =========================
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Login */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Employees (Nested Layout) */}
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeeLayout />
              </PrivateRoute>
            }
          >
            <Route path="create" element={<CreateEmployee />} />
            <Route path="edit" element={<EditEmployee />} />
            <Route path="delete" element={<DeleteEmployee />} />

            {/* Default inside /employees */}
            <Route index element={<Navigate to="create" replace />} />
          </Route>

          {/* Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
