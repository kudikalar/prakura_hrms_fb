import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "EMPLOYEE",
  });

  const [editId, setEditId] = useState(null);

  // =============================
  // STYLES
  // =============================
  const styles = {
    page: {
      minHeight: "100vh",
      padding: "40px",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      fontFamily: "Segoe UI, sans-serif",
      color: "white",
    },
    heading: {
      fontSize: "28px",
      marginBottom: "25px",
      fontWeight: "bold",
    },
    alertError: {
      background: "#7f1d1d",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "15px",
    },
    alertSuccess: {
      background: "#065f46",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "15px",
    },
    card: {
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
      padding: "25px",
      borderRadius: "15px",
      marginBottom: "30px",
      boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
    },
    formRow: {
      display: "flex",
      gap: "15px",
      flexWrap: "wrap",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.1)",
      color: "white",
      outline: "none",
    },
    select: {
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.1)",
      color: "white",
      outline: "none",
    },
    buttonPrimary: {
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      background: "#3b82f6",
      color: "white",
      fontWeight: "bold",
      cursor: "pointer",
    },
    buttonCancel: {
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      background: "#64748b",
      color: "white",
      cursor: "pointer",
    },
    tableCard: {
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(12px)",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      background: "rgba(255,255,255,0.1)",
      padding: "15px",
      textAlign: "left",
    },
    td: {
      padding: "12px 15px",
      borderTop: "1px solid rgba(255,255,255,0.1)",
    },
    badge: {
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "bold",
    },
    actionBtn: {
      padding: "6px 10px",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer",
      marginRight: "6px",
      color: "white",
    },
  };

  // =============================
  // FETCH EMPLOYEES (FIXED)
  // =============================
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("/employees");

      // Handle different backend response formats safely
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.employees
        ? res.data.employees
        : res.data.data
        ? res.data.data
        : [];

      setEmployees(data);

    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // =============================
  // CREATE OR UPDATE (INSTANT UI UPDATE)
  // =============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editId) {
        const res = await axios.put(`/employees/${editId}`, form);

        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === editId ? res.data : emp
          )
        );

        setSuccess("Employee updated successfully");
      } else {
        const res = await axios.post("/employees", form);

        setEmployees((prev) => [...prev, res.data]);

        setSuccess("Employee created successfully");
      }

      setForm({ name: "", email: "", role: "EMPLOYEE" });
      setEditId(null);

    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  // =============================
  // DELETE
  // =============================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    try {
      await axios.delete(`/employees/${id}`);

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));

      setSuccess("Employee deleted successfully");
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  // =============================
  // EDIT
  // =============================
  const handleEdit = (emp) => {
    setForm({
      name: emp.name,
      email: emp.email,
      role: emp.role,
    });
    setEditId(emp.id);
  };

  // =============================
  // UI
  // =============================
  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>Employee Management</h2>

      {error && <div style={styles.alertError}>{error}</div>}
      {success && <div style={styles.alertSuccess}>{success}</div>}
      {loading && <p>Loading...</p>}

      {/* FORM */}
      <div style={styles.card}>
        <form onSubmit={handleSubmit} style={styles.formRow}>
          <input
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={styles.input}
          />

          <input
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={styles.input}
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            style={styles.select}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="HR">HR</option>
            <option value="EMPLOYEE">EMPLOYEE</option>
          </select>

          <button type="submit" style={styles.buttonPrimary}>
            {editId ? "Update" : "Create"}
          </button>

          {editId && (
            <button
              type="button"
              style={styles.buttonCancel}
              onClick={() => {
                setEditId(null);
                setForm({ name: "", email: "", role: "EMPLOYEE" });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* TABLE */}
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: "20px", textAlign: "center" }}>
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td style={styles.td}>{emp.id}</td>
                  <td style={styles.td}>{emp.name}</td>
                  <td style={styles.td}>{emp.email}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background:
                          emp.role === "ADMIN"
                            ? "#ef4444"
                            : emp.role === "HR"
                            ? "#f59e0b"
                            : "#10b981",
                      }}
                    >
                      {emp.role}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.actionBtn, background: "#2563eb" }}
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ ...styles.actionBtn, background: "#dc2626" }}
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
